package main

import (
	"bufio"
	"fmt"
	"net"
)

const (
	address = "127.0.0.1:4123"
	name    = "goclient"
)

func main() {
	tcpAddr, err := net.ResolveTCPAddr("tcp", address)
	if err != nil {
		fmt.Printf("ResolveTCPAddr %s failed:", address, err.Error())
		return
	}
	conn, err := net.DialTCP("tcp", nil, tcpAddr)

	if err != nil {
		fmt.Printf("Dial to TCP %s failed: %s", address, err.Error())
		return
	}
	fmt.Println("Connected to server ", address)

	reader := bufio.NewReader(conn)
	for {
		rawMessage, err := reader.ReadBytes('\n')
		if err != nil {
			fmt.Println("Couldn't read from socket:", err.Error())
			return
		}

		message := string(rawMessage)
		fmt.Printf("> %s", message)

		switch message {
		case "; name ?\n":
			write(conn, name)
		case "; ping ?\n":
			write(conn, "pong")
		}

	}

}

func write(conn *net.TCPConn, message string) {
	fmt.Println("< ", message)
	conn.Write([]byte(message + "\n"))
}
