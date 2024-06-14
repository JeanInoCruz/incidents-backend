import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { createComment, getComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/incidents/:incidentId/comments', authenticateToken, createComment)
router.get('/incidents/:incidentId/comments', getComments)

export default router
