#!/usr/bin/php -q
<?php
error_reporting(E_ALL);

$address = '127.0.0.1';
#$address = '52.16.6.95';
$service_port = 4123;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
      echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
} else {
      echo "socket OK.\n";
}
$result = socket_connect($socket, $address, $service_port);
if ($result === false) {
      echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
} else {
      echo "OK.\n";
}
while ($out = socket_read($socket, 2048)) {
      echo "> ".$out;

      if (strpos($out,'; name ?') !== false) {
        $message = "phptestclient\n";
        echo "< ".$message;
        socket_write($socket, $message, strlen($message));

      }else if (strpos($out,'; ping') !== false) {
        $message = "pong\n";
        echo "< ".$message;
        socket_write($socket, $message, strlen($message));
      }
}
?>
