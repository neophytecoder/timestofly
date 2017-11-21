<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
// $container['logger'] = function ($c) {
//     $settings = $c->get('settings')['logger'];
//     $logger = new Monolog\Logger($settings['name']);
//     $logger->pushProcessor(new Monolog\Processor\UidProcessor());
//     $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
//     return $logger;
// };

// Service factory for the PDO
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $servername = $db['host'];
    $dbname = $db['database'];
    $username = $db['username'];
    $password = $db['password'];
    $port = $db['port'];
    $unixSocket = $db['unix_socket'];

    $pdo = new PDO("mysql:host=$servername;port=$port;dbname=$dbname;unix_socket=$unixSocket",
    $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$container['images_folder'] = __DIR__ . '/../public/images' ;
$container['big_images_folder'] = __DIR__ . '/../public/images/big' ;
$container['small_images_folder'] = __DIR__ . '/../public/images/small' ;

$container['images_relative_folder'] = '/images';
$container['big_images_relative_folder'] = '/images/big';
$container['small_images_relative_folder'] = '/images/small';
