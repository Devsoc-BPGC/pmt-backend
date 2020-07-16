"use strict";
/**
 * Bootstrap your app
 *
 * @author DevSoc
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const cluster = require("cluster");
const http = require("http");
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    /**
     * Run the server on clusters.
     */
    // App.loadServer();
    http.createServer((req, res) => {
        res.writeHead(200);
        console.log('Hi! I am listening on 3000!');
        return;
    }).listen(3000);
    console.log(`Worker ${process.pid} started`);
}
//# sourceMappingURL=app.js.map