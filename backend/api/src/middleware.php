<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

require_once __DIR__ . '/utils.php';

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

function isAuth(Request $request, Response $response, $next) {

   global $app;
   $authHeader = $request->getHeader('authorization');
   if ($authHeader && sizeof($authHeader) > 0) {
     list($jwt) = sscanf( $authHeader[0], 'Authorization: Bearer %s');
     if ($jwt) {
       try {
         $key = getConfig()['secretKey'];
         $token = JWT::decode($jwt, $key, array('HS256'));

         $stmt = $app->getContainer()->get('db')
            ->prepare("select *  from user where tokenId=:token");
         $stmt->bindParam('token', $token->jti);
         $stmt->execute();
         $results = $stmt->fetchAll();
         if (sizeof($results) > 0) {
           return $next($request, $response);
         }
       } catch(Exception $exc) {
         return $response->withStatus(401)
            ->withJson(['exc' => $exc, "msg" => "need a valid authentication", 'jwt' => $jwt]);
       }
     }
   }
   return $response->withStatus(401)->withJson("need authentication");
};

function allowAuthorizationHeader(Request $request, Response $response, $next) {
  $response = $next($request, $response);
  return $response->withAddedHeader('Access-Control-Expose-Headers', 'authorization')
    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    ->withHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, authorization');
}
