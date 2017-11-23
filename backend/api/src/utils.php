<?php

use Slim\Http\UploadedFile;

function getConfig() {
  return require __DIR__ . '/config.php';
}

function createToken($username) {
  $config = getConfig();
  $key = $config['secretKey'];

  $issuedAt = time();
  $expire = time() + 60*60;
  $issuer = $_SERVER['REQUEST_URI'];
  $token = array(
    "iss" => $issuer,
    "iat" => $issuedAt,
    "exp" => $expire,
    "data" => [
        'userName' => $userName
    ],
    'jti' => getToken(20) // todo should be random
  );
  return $token;
}

function crypto_rand_secure($min, $max)
{
    $range = $max - $min;
    if ($range < 1) return $min; // not so random...
    $log = ceil(log($range, 2));
    $bytes = (int) ($log / 8) + 1; // length in bytes
    $bits = (int) $log + 1; // length in bits
    $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
    do {
        $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
        $rnd = $rnd & $filter; // discard irrelevant bits
    } while ($rnd > $range);
    return $min + $rnd;
}

function getToken($length)
{
    $token = "";
    $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
    $codeAlphabet.= "0123456789";
    $max = strlen($codeAlphabet); // edited

    for ($i=0; $i < $length; $i++) {
        $token .= $codeAlphabet[crypto_rand_secure(0, $max-1)];
    }

    return $token;
}

function moveUploadedFile($directory, UploadedFile $uploadedFile, $basename) {
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

function saveBase64File($directory, $basename, $data) {
  $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
  $filename = $basename . '.png';
  file_put_contents($directory . DIRECTORY_SEPARATOR . $filename, $data);
  return $filename;
}

function createAndUpdateWork($token, $parsedBody, $query) {
  global $app;

  $small_directory = $app->getContainer()->get('small_images_folder');
  $big_directory = $app->getContainer()->get('big_images_folder');
  if (array_key_exists('smallimage', $parsedBody)) {
    $smallFilename = saveBase64File($small_directory, $token, $parsedBody['smallimage']);
    $smallmediaurl = $app->getContainer()->get('small_images_relative_folder') . DIRECTORY_SEPARATOR . $smallFilename;
  }
  if (array_key_exists('bigimage', $parsedBody)) {
    $bigFilename = saveBase64File($big_directory, $token, $parsedBody['bigimage']);
    $bigmediaurl = $app->getContainer()->get('big_images_relative_folder') . DIRECTORY_SEPARATOR . $bigFilename;
  }

  $stmt = $app->getContainer()->get('db')->prepare($query);
  $stmt->bindParam('name', $parsedBody['name']);
  $stmt->bindParam('extrainfo', $parsedBody['extrainfo']);
  $stmt->bindParam('topic', $parsedBody['topic']);
  $stmt->bindParam('location', $parsedBody['location']);
  $stmt->bindParam('token', $token);
  if (array_key_exists('smallimage', $parsedBody)) {
    $stmt->bindParam('smallimage', $smallmediaurl);
  }
  if (array_key_exists('bigimage', $parsedBody)) {
    $stmt->bindParam('bigimage', $bigmediaurl);
  }
  $stmt->execute();

  $parsedBody['token'] = $token;
  $parsedBody['smallimage'] = $smallmediaurl;
  $parsedBody['bigimage'] = $bigmediaurl;
  return $parsedBody;
}
