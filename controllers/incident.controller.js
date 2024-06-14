import Incident from '../models/incident.model.js'
import multer from 'multer'
import User from '../models/user.model.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

export const createIncident = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { subject, type, description, location } = req.body
      const image = req.file ? req.file.filename : null
      const incident = new Incident({ userId: req.user.id, subject, type, description, location, image })
      await incident.save()
      res.status(201).json(incident)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
]

export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.findAll({ include: User })
    res.json(incidents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateIncident = async (req, res) => {
  const { subject, type, description, location } = req.body
  const { id } = req.params

  try {
    const incident = await Incident.findByPk(id)

    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' })
    }

    // Update fields
    incident.subject = subject
    incident.type = type
    incident.description = description
    incident.location = location

    await incident.save()

    res.status(200).json({ message: 'Incident updated successfully', incident })
  } catch (error) {
    console.error('Error updating incident:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete an incident by ID
export const deleteIncident = async (req, res) => {
  const { id } = req.params

  try {
    const incident = await Incident.findByPk(id)

    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' })
    }

    await incident.destroy()

    res.status(200).json({ message: 'Incident deleted successfully' })
  } catch (error) {
    console.error('Error deleting incident:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
