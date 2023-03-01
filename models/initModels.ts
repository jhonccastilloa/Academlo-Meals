import MealModel from './meal.models';
import OrderModel from './order.model';
import RestaurantModel from './restaurant.model';
import ReviewModel from './reviews.model';
import UserModel from './user.models';

const initModels = () => {
  UserModel.hasMany(ReviewModel);
  ReviewModel.belongsTo(UserModel);

  RestaurantModel.hasMany(ReviewModel);
  ReviewModel.belongsTo(RestaurantModel);

  RestaurantModel.hasMany(MealModel);
  MealModel.belongsTo(RestaurantModel);

  MealModel.hasOne(OrderModel);
  OrderModel.belongsTo(MealModel);

  UserModel.hasMany(OrderModel);
  OrderModel.belongsTo(UserModel);
};

export default initModels;
