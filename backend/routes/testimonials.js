// backend/routes/testimonials.js
import express from 'express'
import { db } from '../db.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// GET /api/testimonials
router.get('/', async (req, res) => {
  await db.read()
  res.json(db.data.testimonials || [])
})

// POST /api/testimonials
// body: { name, message, role, approved: boolean }
router.post('/', async (req, res) => {
  const { name, message, role } = req.body
  if (!name || !message) return res.status(400).json({ error: 'name and message required' })

  await db.read()
  const newItem = {
    id: nanoid(),
    name,
    message,
    role: role || '',
    createdAt: new Date().toISOString(),
    approved: false
  }
  db.data.testimonials.push(newItem)
  await db.write()
  res.status(201).json(newItem)
})

// DELETE /api/testimonials/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const idx = (db.data.testimonials || []).findIndex(t => t.id === id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  db.data.testimonials.splice(idx, 1)
  await db.write()
  res.json({ ok: true })
})

// (Optional) PUT /api/testimonials/:id to approve/edit
router.put('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const item = (db.data.testimonials || []).find(t => t.id === id)
  if (!item) return res.status(404).json({ error: 'not found' })
  Object.assign(item, req.body)
  await db.write()
  res.json(item)
})

export default router