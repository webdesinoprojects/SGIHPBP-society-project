// backend/routes/membership.js
import express from 'express'
import { db } from '../db.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// GET /api/membership - Get all membership applications (for admin)
router.get('/', async (req, res) => {
  await db.read()
  res.json(db.data.membershipApplications || [])
})

// POST /api/membership/apply - Submit membership application
router.post('/apply', async (req, res) => {
  const { 
    fullName, 
    email, 
    phone, 
    qualification, 
    institution, 
    experience, 
    membershipType, 
    specialization 
  } = req.body
  
  // Validation
  const requiredFields = ['fullName', 'email', 'qualification', 'membershipType']
  const missing = requiredFields.filter(field => !req.body[field])
  
  if (missing.length > 0) {
    return res.status(400).json({ 
      error: `Missing required fields: ${missing.join(', ')}` 
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' })
  }

  // Membership type validation
  if (!['life', 'adhoc'].includes(membershipType)) {
    return res.status(400).json({ error: 'Membership type must be either "life" or "adhoc"' })
  }

  await db.read()
  
  // Initialize membership applications array if it doesn't exist
  if (!db.data.membershipApplications) {
    db.data.membershipApplications = []
  }

  // Check for duplicate email
  const existingApplication = db.data.membershipApplications.find(app => 
    app.email.toLowerCase() === email.toLowerCase()
  )
  if (existingApplication) {
    return res.status(409).json({ 
      error: 'An application with this email already exists',
      existingApplicationId: existingApplication.id
    })
  }

  const applicationFee = membershipType === 'life' ? 10000 : 2000

  const newApplication = {
    id: nanoid(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    qualification: qualification.trim(),
    institution: institution?.trim() || '',
    experience: experience?.trim() || '',
    specialization: specialization?.trim() || '',
    membershipType,
    applicationFee,
    status: 'pending', // pending, approved, rejected
    paymentStatus: 'unpaid', // unpaid, paid, verified
    createdAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null
  }

  db.data.membershipApplications.push(newApplication)
  await db.write()
  
  res.status(201).json({ 
    message: 'Membership application submitted successfully',
    applicationId: newApplication.id,
    applicationFee,
    nextSteps: 'Please proceed with payment and submit proof of payment for review.'
  })
})

// GET /api/membership/:id - Get specific application
router.get('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const application = (db.data.membershipApplications || []).find(app => app.id === id)
  
  if (!application) {
    return res.status(404).json({ error: 'Application not found' })
  }
  
  res.json(application)
})

// PUT /api/membership/:id - Update application (for admin review)
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { status, paymentStatus, reviewedBy, notes } = req.body
  
  await db.read()
  const application = (db.data.membershipApplications || []).find(app => app.id === id)
  if (!application) return res.status(404).json({ error: 'Application not found' })
  
  // Update allowed fields
  if (status) application.status = status
  if (paymentStatus) application.paymentStatus = paymentStatus
  if (reviewedBy) application.reviewedBy = reviewedBy
  if (notes) application.notes = notes
  
  application.reviewedAt = new Date().toISOString()
  
  await db.write()
  res.json(application)
})

// GET /api/membership/fees/calculate - Calculate membership fees
router.get('/fees/calculate', (req, res) => {
  res.json({
    life: {
      amount: 10000,
      currency: 'INR',
      description: 'One-time payment for lifetime membership'
    },
    adhoc: {
      amount: 2000,
      currency: 'INR',
      description: 'Annual membership fee'
    }
  })
})

export default router