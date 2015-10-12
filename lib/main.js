import io from 'socket.io-client';

var url = window.location.protocol + "//" + window.location.host + "/";
var opts = {};//{transports: ["websocket"]};

var socket = io(url, opts);




function random1() {
    var n = 1;
    while (n >= 1) {
        n = Math.log(1 - Math.random()) / (-8); // random distribution with more low results
    }
    return n;
}

var count = 100;

socket.on("connect", () => {
    var done = false;
    function sendRandom() {
        var waitingTime = random1() * 1000;
        setTimeout(() => {
            socket.send(JSON.stringify([Date.now(), "datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata"]));
            document.getElementById("done").innerHTML = count;
            if (--count > 0) {
                sendRandom();
            } else {
                document.getElementById("done").innerHTML = "Done!";
                socket.send("done");
            }
        }, waitingTime);
    }
    sendRandom();

    socket.on("message", (data) => {
        if (data !== "ack") {
            done = true;
            document.getElementById("done").innerHTML = data;
        }
    });

    function fill() {
        socket.send("filler");
        if (!done) {
            setTimeout(fill, 10);
        }
    }

    // uncomment to send client->server filler packet each 10ms. gives great results as well
    // fill();
});