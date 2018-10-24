const app = require("../src/app");
const debug = require("debug")("nodestr:server");

const port = process.env.PORT || "3000";
app.set("port", port);

app.listen(3000, () => {
  console.log(`Servidor rodando na url: http://localhost:${port}`);
  console.log("Para fechar o servidor é só dar CTRL + C");
});
app.on("error", onError);
app.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = app.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
