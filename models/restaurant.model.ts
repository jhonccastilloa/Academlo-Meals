import { DataTypes } from 'sequelize';
import db from '../database/db';
import { RestaurantModelProps } from '../interfaces/types';

const RestaurantModel = db.define<RestaurantModelProps>('restaurants', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.ENUM("1","2","3","4","5"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});

export default RestaurantModel;
