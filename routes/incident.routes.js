import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { createIncident, getIncidents, updateIncident, deleteIncident } from '../controllers/incident.controller.js'

const router = express.Router() // Asegúrate de que auth.middleware.js tenga la extensión .js si es un archivo JavaScript

router.post('/incidents', authenticateToken, createIncident)
router.get('/incidents', getIncidents)

// PUT /api/incidents/:id - Update an incident
router.put('/:id', authenticateToken, updateIncident)

// DELETE /api/incidents/:id - Delete an incident
router.delete('/:id', authenticateToken, deleteIncident)

export default router
