var express = require('express');

var app = express();
var port = process.env.PORT || 6180;

var http = require('http');
var server = http.createServer(app);
server.listen(port);

var io = require('socket.io')(server);


io.on('connection', function (socket) {
    var messages = [];
    var done = false;
    socket.on('message', function (data) {
        if (data === "done") {
            done = true;
            var result = [];
            for (var i = 0; i < messages.length; ++i) {
                var diff = messages[i][0] - messages[i][1];
                result.push(diff);
            }
            var smallest = Math.min.apply(null, result);
            result = result.map(function (x) {
                return x - smallest;
            });

            var average = result.reduce(function (res, x) {
                    return res + x
                }, 0) / result.length;
            var maximum = Math.max.apply(null, result);
            var toohigh = result.reduce(function (res, x) {
                if (x > 50) {
                    res += 1
                }
                return res;
            }, 0);
            var toohighpercent = (toohigh / messages.length) * 100;

            result.unshift("Average latency: " + average + "ms");
            result.unshift("Maximum latency: " + maximum + "ms");
            result.unshift(toohigh + " (" + toohighpercent + "%) messages above 50ms latency");

            socket.send(result.join("\n"));
        } else if (data === "filler") {
            // nop
        } else {
            // -- uncomment to test with acks. spoiler : this changes nothing on chrome for android
            //socket.send("ack");
            data = JSON.parse(data);
            data.unshift(Date.now());
            messages.push(data);
        }
    });
    socket.on("error", function (error) {
        console.log(error);
    });

    function fill() {
        socket.send("ack");
        if (!done) {
            setTimeout(fill, 10);
        }
    }

    // uncomment to send filler packet each 10ms. This actually gives great results.
    //fill();
});


app.use('/', express.static(__dirname));


exports = module.exports = app;
