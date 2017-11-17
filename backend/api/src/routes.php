<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

function toHomeMW($request, $response, $next) {
    echo $request->getUri()->getPath();
    if ($request->getUri()->getPath() == '/') {
      echo $request->getUri()->getPath();
      //return $response->withRedirect('/home');
    }
    //return $next($request, $response);
    return $next($request, $response);
}

$app->get('/api',function (Request $request, Response $response, array $args) {
  // $this->logger->info("api route");
  $test = array('test' => "wow" );
  return $response->withJson($test);
});

$app->get('/',function (Request $request, Response $response, array $args) {
  // $this->logger->info("home route");
  return $this->renderer->render($response, 'index.html', $args);
});
