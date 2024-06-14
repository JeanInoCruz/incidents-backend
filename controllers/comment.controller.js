import Comment from '../models/comment.model.js' 
import User from '../models/user.model.js'

export const createComment = async (req, res) => {
  try {
    const { incidentId, comment } = req.body
    const newComment = new Comment({ incidentId, userId: req.user.id, comment })
    await newComment.save()
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { incidentId: req.params.incidentId }, include: User })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
