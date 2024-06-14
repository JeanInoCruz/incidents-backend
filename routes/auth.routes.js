import express from 'express'
import { register, login } from '../controllers/auth.controller.js'
const router = express.Router() // Asegúrate de que auth.controller.js tenga la extensión .js si es un archivo JavaScript
// import authMiddleware from '../middlewares/auth.middleware.js'; // Si necesitas middleware de autenticación, descomenta esta línea

router.post('/register', register)
router.post('/login', login)

export default router
