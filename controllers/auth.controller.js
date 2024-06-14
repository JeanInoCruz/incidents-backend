import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js' // Asegúrate de que user.model.js tenga la extensión .js si es un archivo JavaScript

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = new User({ name, email, password: hashedPassword, role })
    await user.save()
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('Request Body:', req.body) // Verificar los datos recibidos

    const user = await User.findOne({ where: { email } })
    console.log('User:', user) // Verificar el usuario encontrado

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password Valid:', isPasswordValid) // Verificar la comparación de la contraseña

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Error during login:', error) // Agregar más detalles de error
    res.status(500).json({ message: error.message })
  }
}
