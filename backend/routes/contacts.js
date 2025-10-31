// backend/routes/contacts.js
import express from 'express'
import { db } from '../db.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// GET /api/contacts - Get all contact submissions (for admin)
router.get('/', async (req, res) => {
  await db.read()
  res.json(db.data.contacts || [])
})

// POST /api/contacts - Submit contact form
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body
  
  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      error: 'All fields (name, email, subject, message) are required' 
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' })
  }

  await db.read()
  
  // Initialize contacts array if it doesn't exist
  if (!db.data.contacts) {
    db.data.contacts = []
  }

  const newContact = {
    id: nanoid(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'unread'
  }

  db.data.contacts.push(newContact)
  await db.write()
  
  res.status(201).json({ 
    message: 'Thank you for your message. We will get back to you soon!',
    id: newContact.id 
  })
})

// PUT /api/contacts/:id - Update contact status (for admin)
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { status } = req.body
  
  await db.read()
  const contact = (db.data.contacts || []).find(c => c.id === id)
  if (!contact) return res.status(404).json({ error: 'Contact not found' })
  
  contact.status = status || contact.status
  await db.write()
  res.json(contact)
})

// DELETE /api/contacts/:id - Delete contact (for admin)
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const idx = (db.data.contacts || []).findIndex(c => c.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Contact not found' })
  
  db.data.contacts.splice(idx, 1)
  await db.write()
  res.json({ message: 'Contact deleted successfully' })
})

export default router