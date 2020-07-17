"use strict";
/**
 * Bootstrap your app
 *
 * @author DevSoc
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const cluster = require("cluster");
const Express_1 = require("./Express");
class App {
    constructor() {
        this.PORT = process.env.PORT || '5000';
    }
    run(clusterMode) {
        const mode = clusterMode;
        console.log(mode);
        if (mode) {
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
                Express_1.default.init(this.PORT);
                console.log(`Worker ${process.pid} started`);
            }
        }
        else {
            Express_1.default.init(this.PORT);
            console.log(`Worker ${process.pid} started`);
        }
    }
}
const mode = process.env.CLUSTER || false;
new App().run(mode);
//# sourceMappingURL=app.js.map