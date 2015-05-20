
var net = require('net')
var client = net.Socket()

function receivedLine(line) {
  console.log(">", line)
}

var partialLine = ""

client.on("data", function(data) {
  var lines = data.toString().split("\n")
  var i = 0
  while (i < lines.length) {
    if (i + 1 <= lines.length - 1) {
      if (lines[i + 1] != "") {
        receivedLine(partialLine + lines[i])
        partialLine = ""
      }
    } else {
      partialLine += lines[0]
    }
    i += 1
  }
})

client.connect(4123, "127.0.0.1", function() {
  console.log("connected")
})

