System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "socket.io-client": "github:socketio/socket.io-client@1.3.7",
    "traceur": "github:jmcriffey/bower-traceur@0.0.91",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91"
  }
});
