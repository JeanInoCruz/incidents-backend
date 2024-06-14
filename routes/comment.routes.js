import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { createComment, getComments } from '../controllers/comment.controller.js'

const router = express.Router() // Asegúrate de que auth.middleware.js tenga la extensión .js si es un archivo JavaScript

router.post('/incidents/:incidentId/comments', authenticateToken, createComment)
router.get('/incidents/:incidentId/comments', getComments)

export default router
