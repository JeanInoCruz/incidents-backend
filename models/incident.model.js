import { DataTypes } from 'sequelize'
import db from '../config/db.config.js'
import User from './user.model.js'

const Incident = db.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('cleaning', 'maintenance', 'plumbing', 'electrical', 'security', 'HVAC', 'landscaping', 'elevator', 'pest_control', 'other'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.ENUM(
      '101', '102', '103', '104',
      '201', '202', '203', '204',
      '301', '302', '303', '304',
      '401', '402', '403', '404',
      '501', '502', '503', '504',
      'common_area_1', 'common_area_2', 'common_area_3', 'common_area_4', 'common_area_5',
      'reception_hall', 'parking_lot', 'rooftop'
    ),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'resolved'),
    allowNull: false,
    defaultValue: 'pending'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

User.hasMany(Incident, { foreignKey: 'userId' })
Incident.belongsTo(User, { foreignKey: 'userId' })

export default Incident
