// backend/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { initDB } from './db.js'
import testimonialsRouter from './routes/testimonials.js'
import contentRouter from './routes/content.js'
import contactsRouter from './routes/contacts.js'
import membershipRouter from './routes/membership.js'
import eventsRouter from './routes/events.js'
import publicationsRouter from './routes/publications.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://sgihpbp-society-project.vercel.app/' || 'http://localhost:5173'

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN, // Your Vercel URL (handles with/without slash)
  'http://localhost:5173'       // Your local dev URL
];


app.use(express.json())

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman/curl) or from our list
    // We use .some() and .startsWith() to avoid issues with trailing slashes
    if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use('/public', express.static(path.join(process.cwd(), 'backend', 'public')))

// init DB
await initDB()

// routes
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/content', contentRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/membership', membershipRouter)
app.use('/api/events', eventsRouter)
app.use('/api/publications', publicationsRouter)

// constitution endpoints: view and download
app.get('/api/constitution', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'Constitution of Society.pdf')
  res.sendFile(filePath)
})

app.get('/api/constitution/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'Constitution of Society.pdf')
  res.download(filePath, 'SGIHPBPS-Constitution.pdf')
})

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})