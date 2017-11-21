<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

require_once __DIR__ . '/middleware.php';

$app->get('/api/works', function(Request $request, Response $response) {
  $stmt = $this->db->prepare('select token as id, name, extrainfo, topic, smallimage, bigimage, location from work');
  $stmt->execute();
  $results = $stmt->fetchAll();

  return $response->withHeader('X-Total-Count', sizeof($results))
      ->withHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      ->withHeader('Content-type', 'application/json')
      ->withJson($results);
});

$app->get('/api/works/{id}', function(Request $request, Response $response, $args) {
  $stmt = $this->db->prepare('select token as id, name, extrainfo, topic, smallimage, bigimage, location from work where token=:id');
  $stmt->bindParam('id', $args['id']);
  $stmt->execute();
  $results = $stmt->fetchAll();

  return $response->withHeader('X-Total-Count', sizeof($results))
      ->withHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      ->withHeader('Content-type', 'application/json')
      ->withJson($results);
});

$app->post('/api/works', function (Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();

  $token = getToken(20);
  $stmt = $this->db->prepare("insert into WORK (name, extrainfo, topic, location, token) values (:name, :extrainfo, :topic, :location, :token)");
  $stmt->bindParam('name', $parsedBody['name']);
  $stmt->bindParam('extrainfo', $parsedBody['extrainfo']);
  $stmt->bindParam('topic', $parsedBody['topic']);
  $stmt->bindParam('location', $parsedBody['location']);
  $stmt->bindParam('token', $token);
  $stmt->execute();

  $parsedBody['token'] = $token;
  return $response->withJson($parsedBody);
})->add('isAuth')->add('allowAuthorizationHeader');

$app->post('/api/works/{token}/media', function (Request $request, Response $response, array $args) {
   $smallImageFile = $request->getUploadedFiles()['smallimage'];
   $bigImageFile = $request->getUploadedFiles()['bigimage'];

   if($smallImageFile->getError() === UPLOAD_ERR_OK && $bigImageFile->getError() === UPLOAD_ERR_OK){
     $stmt = $this->db->prepare("select * from WORK where token=:token");
     $stmt->bindParam('token', $args['token']);
     $stmt->execute();
     $results = $stmt->fetchAll();

     if (sizeof($results) > 0 ) {
       $smallFilename = moveUploadedFile($this->get('small_images_folder'), $smallImageFile, $args['token']);
       $bigFilename = moveUploadedFile($this->get('big_images_folder'), $bigImageFile, $args['token']);
       $smallmediaurl = $this->get('small_images_relative_folder') . DIRECTORY_SEPARATOR . $smallFilename;
       $bigmediaurl = $this->get('big_images_relative_folder') . DIRECTORY_SEPARATOR . $bigFilename;

       $stmt = $this->db->prepare("update WORK set smallimage=:smallimage, bigimage=:bigimage where token=:token");
       $stmt->bindParam('smallimage', $smallmediaurl);
       $stmt->bindParam('bigimage', $bigmediaurl);
       $stmt->bindParam('token', $args['token']);
       $stmt->execute();

       return $response->withJson([
         'smallImage' => $smallmediaurl,
         'bigImage' => $bigmediaurl
       ]);
     }
   }
   return $response->withStatus(400);
})->add('isAuth')->add('allowAuthorizationHeader');

$app->delete('/api/works/{token}', function(Request $request, Response $response, array $args) {
  $stmt = $this->db->prepare('delete from WORK where token=:token');
  $stmt->bindParam('token', $args['token']);
  $stmt->execute();

  return $response->withJson("success");
})->add('isAuth')->add('allowAuthorizationHeader');

$app->put('/api/works/{token}', function(Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();
  $mediaurl = $request->getParsedBody()['mediaurl'];

  $directory = $this->get('images_folder');
  $filename = saveBase64File($directory, $args['blogid'], $mediaurl);
  $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;


  $stmt = $this->db->prepare('update WORK set name=:name, extrainfo=:extrainfo, topic=:topic, location=:location  where token=:token');
  $stmt->bindParam('name', $parsedBody['name']);
  $stmt->bindParam('extrainfo', $parsedBody['extrainfo']);
  $stmt->bindParam('topic', $parsedBody['topic']);
  $stmt->bindParam('location', $parsedBody['location']);
  $stmt->bindParam('token', $args['token']);
  $stmt->execute();

  return $response->withJson($parsedBody);
})->add('isAuth')->add('allowAuthorizationHeader');



$app->post("/api/auth", function (Request $request, Response $response) {
  $config = getConfig();

  $parsedBody = $request->getParsedBody();
  $userName = $parsedBody['username'];
  $password = $parsedBody['password'];

  if ($userName && $password) {
    $stmt = $this->db->prepare("select *  from user where username=:username and password=:password");
    $stmt->bindParam(':username', $userName);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    $results = $stmt->fetchAll();

    if (sizeof($results) > 0) {
      $token = createToken($userName);
      $key = getConfig()["secretKey"];
      $jwt = JWT::encode($token, $key);

      $stmt = $this->db->prepare("update user set tokenId=:token, start=:start, expired=:expired "
        ."where username=:username and password=:password");
      $stmt->bindParam('token', $token['jti']);
      $stmt->bindParam('start', $token['iat']);
      $stmt->bindParam('expired', $token['exp']);
      $stmt->bindParam('username', $userName);
      $stmt->bindParam('password', $password);
      $stmt->execute();

      return $response->withJson(['jwt' => $jwt, 'userName' => $userName]);
    }
  }
  return $response->withStatus(400)->withJson($parsedBody);
});

$app->delete("/api/auth", function (Request $request, Response $response, array $args) {
  $authHeader = $request->getHeader('authorization');
  if ($authHeader && sizeof($authHeader) > 0) {
    list($jwt) = sscanf( $authHeader[0], 'Authorization: Bearer %s');
    if ($jwt) {
      try {
        $key = getConfig()['secretKey'];
        $token = JWT::decode($jwt, $key, array('HS256'));

        $stmt = $this->db->prepare("UPDATE user set tokenId=NULL where tokenId=:token");
        $stmt->bindParam('token', $token->jti);
        $stmt->execute();
        return $response->withStatus(200)->withJson("success");
      } catch(Exception $exc) {
        return $response->withStatus(401)
           ->withJson(['exc' => $exc, "msg" => "need a valid authentication"]);
      }
    }
  }
  return $response->withStatus(401)->withJson("error");
})->add('isAuth');

$app->any('/api/auth/test',function (Request $request, Response $response, array $args) {
  return $response->withJson("test auth");
})->add('isAuth')->add('allowAuthorizationHeader');



// $app->post('/api/blogs/{blogid}/media', function (Request $request, Response $response, array $args) {
//    $uploadedFile = $request->getUploadedFiles()['image'];
//    if($uploadedFile->getError() === UPLOAD_ERR_OK){
//      $directory = $this->get('images_folder');
//
//      $stmt = $this->db->prepare("select * from BLOG where blogid=:blogid");
//      $stmt->bindParam('blogid', $args['blogid']);
//      $stmt->execute();
//      $results = $stmt->fetchAll();
//      if (sizeof($results) > 0 ) {
//        $filename = moveUploadedFile($directory, $uploadedFile, $results[0]['blogid']);
//        $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;
//
//        $stmt = $this->db->prepare("update BLOG set mediaurl=:mediaurl where blogid=:blogid");
//        $stmt->bindParam('mediaurl', $mediaurl);
//        $stmt->bindParam('blogid', $args['blogid']);
//        $stmt->execute();
//
//        return $response->withJson($filename);
//      }
//    }
//    return $response->withStatus(400);
// })->add('isAuth');

$app->delete('/api/blogs/{blogid}', function(Request $request, Response $response, array $args) {
  $stmt = $this->db->prepare('delete from blog where blogid=:blogid');
  $stmt->bindParam('blogid', $args['blogid']);
  $stmt->execute();

  return $response->withJson("success");
})->add('isAuth');

$app->get('/api/blogs/{blogid}', function(Request $request, Response $response, array $args) {

  $stmt = $this->db->prepare('select * from blog where blogid=:blogid');
  $stmt->bindParam('blogid', $args['blogid']);
  $stmt->execute();
  $results = $stmt->fetchAll();
  if (sizeof($results)>0) {
    return $response->withJson($results[0]);
  }

  return $response->withStatus(400)->withJson('error');
});

$app->put('/api/blogs/{blogid}', function(Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();
  $title = $parsedBody['title'];
  $content = $parsedBody['content'];
  $mediaurl = $parsedBody['mediaurl'];
  // echo $title;
  // echo $content;

  $directory = $this->get('images_folder');
  $filename = saveBase64File($directory, $args['blogid'], $mediaurl);
  $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;

  $stmt = $this->db->prepare('update blog set title=:title, content=:content, mediaurl=:mediaurl where blogid=:blogid');
  $stmt->bindParam('blogid', $args['blogid']);
  $stmt->bindParam('title', $title);
  $stmt->bindParam('content', $content);
  $stmt->bindParam('mediaurl', $mediaurl);
  $stmt->execute();

  return $response->withJson([
    'title' => $title,
    'content' => $content,
    'mediaurl' => $mediaurl
  ]);
})->add('isAuth');

$app->post('/api/blogs', function (Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();

  $token = getToken(20);
  $directory = $this->get('images_folder');
  $filename = saveBase64File($directory, $token, $parsedBody['mediaurl']);
  $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;

  $time = time();
  $stmt = $this->db->prepare("insert into BLOG (TITLE, CONTENT, POSTED, BLOGID, MEDIAURL) values (:title, :content, :posted, :blogid, :mediaurl)");
  $stmt->bindParam('title', $parsedBody['title']);
  $stmt->bindParam('content', $parsedBody['content']);
  $stmt->bindParam('posted', $time);
  $stmt->bindParam('blogid', $token);
  $stmt->bindParam('mediaurl', $mediaurl);
  $stmt->execute();

  return $response->withJson([
    'title' => $parsedBody['title'],
    'content' => $parsedBody['content'],
    'posted' => $time,
    'blogid' => $token,
    'mediaurl' => $mediaurl
  ]);
})->add('isAuth');

$app->get('/api/blogs', function(Request $request, Response $response) {
  $stmt = $this->db->prepare('select title, content, posted, blogid as id, blogid, mediaurl from blog');
  $stmt->execute();
  $results = $stmt->fetchAll();

  return $response->withHeader('X-Total-Count', sizeof($results))
      ->withHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      ->withHeader('Content-type', 'application/json')
      ->withJson($results);
})->add('allowAuthorizationHeader');




$app->get('/',function (Request $request, Response $response, array $args) {
  // $this->logger->info("home route");
  return $this->renderer->render($response, 'index.phtml', $args);
});
