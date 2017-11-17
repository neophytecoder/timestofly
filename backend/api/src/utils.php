<?php

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
