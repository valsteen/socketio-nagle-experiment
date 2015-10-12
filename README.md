# socketio-nagle-experiment
Experiment to try to keep socketio latency as low as possible.

Tried 3 approaches :

* send ack from server after each client message
* send filler packets each 10ms from client
* send filler packets each 10ms from server


Conclusion on chrome for android, same wifi network:

* without any strategy, pure client->server data, about 25% of the messages come with a latency > 50ms
* with acks from server after each client message: unexpectedly gives *no significant change*
* with filler packets each 10ms from server to client: actually great! 0% messages over 50ms. Average latency 4.47 which is great
* filler packets from client to server each 10ms gives similar results
