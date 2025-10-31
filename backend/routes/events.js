// backend/routes/events.js
import express from 'express'
import { db } from '../db.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  await db.read()
  const events = db.data.events || []
  
  // Sort by date (upcoming first, then past events)
  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    const now = new Date()
    
    // Upcoming events first
    const aIsUpcoming = dateA >= now
    const bIsUpcoming = dateB >= now
    
    if (aIsUpcoming && !bIsUpcoming) return -1
    if (!aIsUpcoming && bIsUpcoming) return 1
    
    // For events of same type (both upcoming or both past), sort by date
    return aIsUpcoming ? dateA - dateB : dateB - dateA
  })
  
  res.json(sortedEvents)
})

// GET /api/events/upcoming - Get only upcoming events
router.get('/upcoming', async (req, res) => {
  await db.read()
  const events = db.data.events || []
  const now = new Date()
  
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  
  res.json(upcomingEvents)
})

// POST /api/events - Create new event (admin)
router.post('/', async (req, res) => {
  const { 
    title, 
    description, 
    date, 
    endDate, 
    location, 
    type, 
    registrationUrl, 
    isRegistrationOpen,
    maxAttendees,
    tags
  } = req.body
  
  // Validation
  if (!title || !date || !location || !type) {
    return res.status(400).json({ 
      error: 'Title, date, location, and type are required' 
    })
  }

  // Date validation
  if (isNaN(new Date(date))) {
    return res.status(400).json({ error: 'Invalid date format' })
  }

  await db.read()
  
  if (!db.data.events) {
    db.data.events = []
  }

  const newEvent = {
    id: nanoid(),
    title: title.trim(),
    description: description?.trim() || '',
    date: new Date(date).toISOString(),
    endDate: endDate ? new Date(endDate).toISOString() : null,
    location: location.trim(),
    type: type.trim(), // conference, workshop, webinar, cme, etc.
    registrationUrl: registrationUrl?.trim() || '',
    isRegistrationOpen: isRegistrationOpen || false,
    maxAttendees: maxAttendees || null,
    currentAttendees: 0,
    tags: Array.isArray(tags) ? tags : [],
    status: 'active', // active, cancelled, completed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  db.data.events.push(newEvent)
  await db.write()
  
  res.status(201).json(newEvent)
})

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const event = (db.data.events || []).find(e => e.id === id)
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' })
  }
  
  res.json(event)
})

// PUT /api/events/:id - Update event (admin)
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const updates = req.body
  
  await db.read()
  const event = (db.data.events || []).find(e => e.id === id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  
  // Update allowed fields
  const allowedFields = [
    'title', 'description', 'date', 'endDate', 'location', 'type', 
    'registrationUrl', 'isRegistrationOpen', 'maxAttendees', 'tags', 'status'
  ]
  
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      if (field === 'date' || field === 'endDate') {
        event[field] = updates[field] ? new Date(updates[field]).toISOString() : null
      } else {
        event[field] = updates[field]
      }
    }
  })
  
  event.updatedAt = new Date().toISOString()
  
  await db.write()
  res.json(event)
})

// DELETE /api/events/:id - Delete event (admin)
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const idx = (db.data.events || []).findIndex(e => e.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Event not found' })
  
  db.data.events.splice(idx, 1)
  await db.write()
  res.json({ message: 'Event deleted successfully' })
})

// POST /api/events/:id/register - Register for event
router.post('/:id/register', async (req, res) => {
  const id = req.params.id
  const { name, email, phone, affiliation } = req.body
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  await db.read()
  const event = (db.data.events || []).find(e => e.id === id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  
  if (!event.isRegistrationOpen) {
    return res.status(400).json({ error: 'Registration is not open for this event' })
  }

  if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
    return res.status(400).json({ error: 'Event is full' })
  }

  // Initialize registrations array if it doesn't exist
  if (!db.data.eventRegistrations) {
    db.data.eventRegistrations = []
  }

  // Check if already registered
  const existingRegistration = db.data.eventRegistrations.find(reg => 
    reg.eventId === id && reg.email.toLowerCase() === email.toLowerCase()
  )
  
  if (existingRegistration) {
    return res.status(409).json({ error: 'You are already registered for this event' })
  }

  const registration = {
    id: nanoid(),
    eventId: id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    affiliation: affiliation?.trim() || '',
    registeredAt: new Date().toISOString(),
    status: 'confirmed'
  }

  db.data.eventRegistrations.push(registration)
  event.currentAttendees = (event.currentAttendees || 0) + 1
  
  await db.write()
  
  res.status(201).json({ 
    message: 'Registration successful',
    registrationId: registration.id,
    event: event.title
  })
})

export default router