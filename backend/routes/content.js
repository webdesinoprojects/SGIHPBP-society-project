// backend/routes/content.js
import express from 'express'
import { db } from '../db.js'

const router = express.Router()

// GET /api/content/:key
router.get('/:key', async (req, res) => {
  const key = req.params.key
  await db.read()
  res.json({ key, value: db.data.content[key] || null })
})

// PUT /api/content/:key
router.put('/:key', async (req, res) => {
  const key = req.params.key
  const value = req.body.value
  await db.read()
  db.data.content[key] = value
  await db.write()
  res.json({ key, value })
})

export default router