import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/db';
import initModels from './initModels';
import userRouter from '../routes/users.routes';
import mealRouter from '../routes/meals.routes';
import orderRouter from '../routes/orders.routes';
import restaurantRouter from '../routes/restaurants.routes';
import globalErrorHandler from '../controllers/error.controller';
import AppError from '../utils/appError';

class Server {
  private app: Application;
  private PORT: string = process.env.PORT || '4003';
  private path = {
    users: '/api/v1/users',
    restaurants: '/api/v1/restaurants',
    meals: '/api/v1/meals',
    orders: '/api/v1/orders',
  };
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.path.users, userRouter);
    this.app.use(this.path.restaurants, restaurantRouter);
    this.app.use(this.path.meals, mealRouter);
    this.app.use(this.path.orders, orderRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`can't find ${req.originalUrl} on this server`, 404)
      );
    });
    this.app.use(globalErrorHandler);
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
