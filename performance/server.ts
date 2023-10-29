import express from 'express';
import { Request, Response } from "express";
import cluster from 'cluster';
import os from 'os';

const app = express();

function delay(duration:number) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  const NUM_WORKERS = os.cpus().length;
  console.log(`Forking ${NUM_WORKERS} workers`);
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
  // cluster.fork();
  // cluster.fork();
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(3000);
}

