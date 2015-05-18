
require 'socket'

s = TCPSocket.new("localhost", 4123)
while request = s.gets
  p request
  s.puts "my response is this"
end
