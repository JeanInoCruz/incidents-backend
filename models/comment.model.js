import { DataTypes } from 'sequelize'
import db from '../config/db.config.js'
import User from './user.model.js'
import Incident from './incident.model.js'

const Comment = db.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  incidentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Incident,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

Incident.hasMany(Comment, { foreignKey: 'incidentId' })
Comment.belongsTo(Incident, { foreignKey: 'incidentId' })

User.hasMany(Comment, { foreignKey: 'userId' })
Comment.belongsTo(User, { foreignKey: 'userId' })

export default Comment
