import  { isMainThread, Worker, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// only create new Worker if this is the main thread
if (isMainThread) {
    //threads use the same pid
    console.log(`This is the main thread pid: ${process.pid}`);
    new Worker(__filename, { workerData: [7,6,2,3] });
    new Worker(__filename, { workerData: [1,5,6,2] });
} else {
    // this is the worker thread
    console.log(`Worker thread pid: ${process.pid}`);
    console.log(`${workerData} sorted is ${workerData.sort()}`);
}