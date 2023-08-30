const cluster = require("cluster");
const http = require("http");
const numCpus = require("os").cpus().length;

console.log(numCpus);

const PORT = process.argv[2] || 8080;

if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((req, res) => {
      const fecha = new Date();
      res.writeHead(200);
      res.end(
        `servidor en ${PORT} - ProcessID: ${process.pid} fecha: ${fecha}`
      );
    })
    .listen(PORT);
}
