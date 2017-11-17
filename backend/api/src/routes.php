<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

require_once __DIR__ . '/middleware.php';

$app->post("/api/auth", function (Request $request, Response $response) {
  $config = getConfig();

  $parsedBody = $request->getParsedBody();
  $userName = $parsedBody['userName'];
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
  return $response->withJson($parsedBody);
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

$app->get('/api/auth/test',function (Request $request, Response $response, array $args) {
  return $response->withJson("test auth");
})->add('isAuth');

$app->get('/',function (Request $request, Response $response, array $args) {
  // $this->logger->info("home route");
  return $this->renderer->render($response, 'index.phtml', $args);
});
