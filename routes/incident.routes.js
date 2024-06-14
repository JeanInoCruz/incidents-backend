import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { createIncident, getIncidents, updateIncident, deleteIncident } from '../controllers/incident.controller.js'

const router = express.Router()

router.post('/incidents', authenticateToken, createIncident)
router.get('/incidents', getIncidents)

router.put('/:id', authenticateToken, updateIncident)

router.delete('/:id', authenticateToken, deleteIncident)

export default router
