import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

type UserRole = 'normal' | 'admin';
type Status = 'available' | 'unavailable';
type OrderStatus = 'active' | 'cancelled' | 'completed';

export interface UserModelProps
  extends Model<
    InferAttributes<UserModelProps>,
    InferCreationAttributes<UserModelProps>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  status: CreationOptional<Status>;
  role: CreationOptional<UserRole>;
}

export interface MealModelProps
  extends Model<
    InferAttributes<MealModelProps>,
    InferCreationAttributes<MealModelProps>
  > {
  id: CreationOptional<number>;
  name: string;
  price: number;
  restaurantId: number;
  status: CreationOptional<Status>;
}

export interface OrderModelProps
  extends Model<
    InferAttributes<OrderModelProps>,
    InferCreationAttributes<OrderModelProps>
  > {
  id: CreationOptional<number>;
  mealId: number;
  userId: number;
  totalPrice: number;
  quantity: number;
  status: CreationOptional<OrderStatus>;
}

export interface RestaurantModelProps
  extends Model<
    InferAttributes<RestaurantModelProps>,
    InferCreationAttributes<RestaurantModelProps>
  > {
  id: CreationOptional<number>;
  name: string;
  address: string;
  rating: number;
  status: CreationOptional<Status>;
}

export interface ReviewModelProps
  extends Model<
    InferAttributes<ReviewModelProps>,
    InferCreationAttributes<ReviewModelProps>
  > {
  id: CreationOptional<number>;
  userId: number;
  comment: string;
  restaurantId: number;
  rating: number;
}