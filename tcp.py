#!/usr/bin/python
import socket


class TCPConn:
    addr = '127.0.0.1'
    port = 4123

    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((self.addr, self.port))

    def send(self, message):
        print '< ' + message
        sent = self.sock.send(message + "\n")
        if sent == 0:
            raise RuntimeError("socket connection broken")

    def readline(self):
        message = b''
        end_of_message = b'\n'
        while len(message) == 0 or message[-1] != end_of_message:
            char = self.sock.recv(2)
            message = message + char

        print '> ' + message[:-1]
        return str(message)


if __name__ == '__main__':
    conn = TCPConn()
    while True:
        line = conn.readline()

        if line == '; name ?\n':
            conn.send("pythonclient")
            continue
        if line == '; ping ?\n':
            conn.send("pong")
            continue
