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

  $smallimage = '';
  $smallimagevalue = '';
  if (array_key_exists('smallimage', $parsedBody)) {
    echo "<br/>small exist<br/>";
    $smallimage = ' , smallimage ';
    $smallimagevalue = ' , :smallimage ';
  }

  $bigimage = '';
  $bigimagevalue = '';
  if (array_key_exists('bigimage', $parsedBody)) {
    echo "<br/>big exist<br/>";
    $bigimage = ' , bigimage ';
    $bigimagevalue = ' , :bigimage ';
  }

  $query = 'insert into WORK (name, extrainfo, topic, location, token ' . $smallimage . $bigimage . ' ) values (:name, :extrainfo, :topic, :location, :token ' . $smallimagevalue . $bigimagevalue . ' )';
  echo $query;
  return $response->withJson(createAndUpdateWork($token, $parsedBody, $query));
  // $small_directory = $this->get('small_images_folder');
  // $big_directory = $this->get('big_images_folder');
  // $smallFilename = saveBase64File($small_directory, $token, $parsedBody['smallimage']);
  // $bigFilename = saveBase64File($big_directory, $token, $parsedBody['bigimage']);
  // $smallmediaurl = $this->get('small_images_relative_folder') . DIRECTORY_SEPARATOR . $smallFilename;
  // $bigmediaurl = $this->get('big_images_relative_folder') . DIRECTORY_SEPARATOR . $bigFilename;
  //
  // $stmt = $this->db->prepare("insert into WORK (name, extrainfo, topic, location, token, smallimage, bigimage) values (:name, :extrainfo, :topic, :location, :token, :smallimage, :bigimage)");
  // $stmt->bindParam('name', $parsedBody['name']);
  // $stmt->bindParam('extrainfo', $parsedBody['extrainfo']);
  // $stmt->bindParam('topic', $parsedBody['topic']);
  // $stmt->bindParam('location', $parsedBody['location']);
  // $stmt->bindParam('token', $token);
  // $stmt->bindParam('smallimage', $smallmediaurl);
  // $stmt->bindParam('bigimage', $bigmediaurl);
  // $stmt->execute();
  //
  // $parsedBody['token'] = $token;
  // $parsedBody['smallimage'] = $smallimage;
  // $parsedBody['bigimage'] = $bigimage;
  // return $response->withJson($parsedBody);
});

$app->post('/api/works/{token}/media/small', function (Request $request, Response $response, array $args) {
   $smallImageFile = $request->getUploadedFiles()['image'];

   if($smallImageFile->getError() === UPLOAD_ERR_OK){
     $stmt = $this->db->prepare("select * from WORK where token=:token");
     $stmt->bindParam('token', $args['token']);
     $stmt->execute();
     $results = $stmt->fetchAll();

     if (sizeof($results) > 0 ) {
       $smallFilename = moveUploadedFile($this->get('small_images_folder'), $smallImageFile, $args['token']);
       $smallmediaurl = $this->get('small_images_relative_folder') . DIRECTORY_SEPARATOR . $smallFilename;

       $stmt = $this->db->prepare("update WORK set smallimage=:smallimage where token=:token");
       $stmt->bindParam('smallimage', $smallmediaurl);
       $stmt->bindParam('token', $args['token']);
       $stmt->execute();

       return $response->withJson([
         'smallImage' => $smallmediaurl
       ]);
     }
   }
   return $response->withStatus(400);
})->add('isAuth');

$app->post('/api/works/{token}/media/big', function (Request $request, Response $response, array $args) {
   $bigImageFile = $request->getUploadedFiles()['image'];

   if($bigImageFile->getError() === UPLOAD_ERR_OK){
     $stmt = $this->db->prepare("select * from WORK where token=:token");
     $stmt->bindParam('token', $args['token']);
     $stmt->execute();
     $results = $stmt->fetchAll();

     if (sizeof($results) > 0 ) {
       $bigFilename = moveUploadedFile($this->get('big_images_folder'), $bigImageFile, $args['token']);
       $bigmediaurl = $this->get('big_images_relative_folder') . DIRECTORY_SEPARATOR . $bigFilename;

       $stmt = $this->db->prepare("update WORK set bigimage=:bigimage where token=:token");
       $stmt->bindParam('bigimage', $bigmediaurl);
       $stmt->bindParam('token', $args['token']);
       $stmt->execute();

       return $response->withJson([
         'bigImage' => $bigmediaurl
       ]);
     }
   }
   return $response->withStatus(400);
})->add('isAuth');

$app->delete('/api/works/{token}', function(Request $request, Response $response, array $args) {
  $stmt = $this->db->prepare('delete from WORK where token=:token');
  $stmt->bindParam('token', $args['token']);
  $stmt->execute();

  return $response->withJson("success");
})->add('isAuth')->add('allowAuthorizationHeader');

$app->put('/api/works/{token}', function(Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();

  $stmt = $this->db->prepare("update WORK set name=:name, extrainfo=:extrainfo, topic=:topic, location=:location where token=:token");
  $stmt->bindParam('name', $parsedBody['name']);
  $stmt->bindParam('extrainfo', $parsedBody['extrainfo']);
  $stmt->bindParam('topic', $parsedBody['topic']);
  $stmt->bindParam('location', $parsedBody['location']);
  $stmt->bindParam('token', $args['token']);
  $stmt->execute();

  $parsedBody['token'] = $args['token'];
  return $response->withJson($parsedBody);
})->add('isAuth');


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

$app->post('/api/blogs/{blogid}/media', function (Request $request, Response $response, array $args) {
   $uploadedFile = $request->getUploadedFiles()['image'];
   print_r($uploadedFile);
   if($uploadedFile->getError() === UPLOAD_ERR_OK) {
     $directory = $this->get('images_folder');

     $stmt = $this->db->prepare("select * from BLOG where blogid=:blogid");
     $stmt->bindParam('blogid', $args['blogid']);
     $stmt->execute();
     $results = $stmt->fetchAll();
     if (sizeof($results) > 0 ) {
       $filename = moveUploadedFile($directory, $uploadedFile, $results[0]['blogid']);
       $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;

       $stmt = $this->db->prepare("update BLOG set mediaurl=:mediaurl where blogid=:blogid");
       $stmt->bindParam('mediaurl', $mediaurl);
       $stmt->bindParam('blogid', $args['blogid']);
       $stmt->execute();
       return $response->withStatus(200)->withJson($filename);
     }
   }
   return $response->withStatus(500)->withJson('failed');
})->add('isAuth');

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
  // $mediaurl = $parsedBody['mediaurl'];

  // $directory = $this->get('images_folder');
  // $filename = saveBase64File($directory, $args['blogid'], $mediaurl);
  // $mediaurl = $this->get('images_relative_folder') . DIRECTORY_SEPARATOR . $filename;

  $stmt = $this->db->prepare('update blog set title=:title, content=:content where blogid=:blogid');
  $stmt->bindParam('blogid', $args['blogid']);
  $stmt->bindParam('title', $title);
  $stmt->bindParam('content', $content);
  // $stmt->bindParam('mediaurl', $mediaurl);
  $stmt->execute();

  return $response->withJson([
    'title' => $title,
    'content' => $content
  ]);
})->add('isAuth');

$app->post('/api/blogs', function (Request $request, Response $response, array $args) {
  $parsedBody = $request->getParsedBody();

  $token = getToken(20);
  $time = time();
  $stmt = $this->db->prepare("insert into BLOG (TITLE, CONTENT, POSTED, BLOGID) values (:title, :content, :posted, :blogid)");
  $stmt->bindParam('title', $parsedBody['title']);
  $stmt->bindParam('content', $parsedBody['content']);
  $stmt->bindParam('posted', $time);
  $stmt->bindParam('blogid', $token);
  $stmt->execute();

  return $response->withJson([
    'title' => $parsedBody['title'],
    'content' => $parsedBody['content'],
    'posted' => $time,
    'blogid' => $token,
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
