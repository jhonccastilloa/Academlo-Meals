import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/db';
import initModels from './initModels';

class Server {
  private app: Application;
  private PORT: string = process.env.PORT || '4003';
  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));

    initModels();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log('server is running on port', this.PORT);
    });
  }
}

export default Server;
