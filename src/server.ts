import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import axios, { AxiosError } from 'axios';

import config from './config.json';
import { Gnome } from './models/Gnome';
import { apiRouter } from './routes'

const app = express();

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json.
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded.
app.use('/api/gnomes', apiRouter.gnomes); // API routes.

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(config.mongo.uri, { // We have to connect the DB before starting the server.
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((): void => {
    Gnome.estimatedDocumentCount()
      .then(async count => {
        function startServer() {
          try {
            http.createServer(app).listen(config.server.port, '0.0.0.0');
          } catch (error) {
            throw error; // Throws error when HTTP server can't start.
          }

          console.log(`Server listening on ${config.server.port}`);
        }

        if (count === 0) {
          axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
            .then(response => {
            })
            .catch((error: AxiosError) => {
              throw error;
            })
            .finally(() => {
            });
        } else
          startServer();
      })
      .catch(error => {
        throw error;
      });
  })
  .catch(error => {
    throw error; // Throws error when mongoose can't connect.
  });
