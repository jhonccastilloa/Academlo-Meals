import { DataTypes } from 'sequelize';
import db from '../database/db';
import { ReviewModelProps } from '../interfaces/types';

const ReviewModel = db.define<ReviewModelProps>('reviews', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});

export default ReviewModel;
