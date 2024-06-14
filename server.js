import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import incidentRoutes from './routes/incident.routes.js' // Asegúrate de que incidentRoutes.js tenga la extensión .js si es un archivo JavaScript
import authRoutes from './routes/auth.routes.js' // Asegúrate de que authRoutes.js tenga la extensión .js si es un archivo JavaScript
import commentRoutes from './routes/comment.routes.js'
import sequelize from './config/db.config.js'
import passport from './config/passport.js'
dotenv.config({ path: './config/config.env' })
// Load environment variables from .env file

// Initialize Express
const app = express()

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// sequelize.sync({ alter: true }) // Usa { force: true } para recrear las tablas si es necesario
//   .then(() => {
//     console.log('Database & tables created!')
//   })
//   .catch(error => {
//     console.error('Error creating database & tables:', error)
//   })
// Middleware
app.use(express.json())
app.use(passport.initialize())
app.use(cors())

// Routes
app.use('/api/incidents', incidentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/comments', commentRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error')
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
