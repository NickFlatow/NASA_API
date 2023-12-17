import express from 'express';
// import cluster from 'cluster';
// import os from 'os';
const app = express();
function delay(duration) {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        //event loop is blocked...
    }
}
app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
});
app.get('/timer', (req, res) => {
    delay(4000);
    res.send(`Dong dong dong! ${process.pid}`);
});
// if (cluster.isPrimary) {
console.log(`Master ${process.pid} is running`);
//   const NUM_WORKERS = os.cpus().length;
//   console.log(`Forking ${NUM_WORKERS} workers`);
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// cluster.fork();
// cluster.fork();
// } else {
//   console.log(`Worker ${process.pid} started`);
app.listen(3000);
// }
