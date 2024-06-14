import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import incidentRoutes from './routes/incident.routes.js'
import authRoutes from './routes/auth.routes.js'
import commentRoutes from './routes/comment.routes.js'
import sequelize from './config/db.config.js'
import passport from './config/passport.js'
dotenv.config({ path: './config/config.env' })

const app = express()

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

app.use(express.json())
app.use(passport.initialize())
app.use(cors())

app.use('/api/incidents', incidentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/comments', commentRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
