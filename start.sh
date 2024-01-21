#!/bin/sh
npm start --prefix server &
npm start --prefix sockets &
wait
