// backend/routes/publications.js
import express from 'express'
import { db } from '../db.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// GET /api/publications - Get all publications with optional filtering
router.get('/', async (req, res) => {
  await db.read()
  let publications = db.data.publications || []
  
  const { category, search, author, year } = req.query
  
  // Filter by category
  if (category && category !== 'all') {
    publications = publications.filter(pub => 
      pub.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  // Search in title, description, authors
  if (search) {
    const searchTerm = search.toLowerCase()
    publications = publications.filter(pub => 
      pub.title.toLowerCase().includes(searchTerm) ||
      pub.description.toLowerCase().includes(searchTerm) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }
  
  // Filter by author
  if (author) {
    publications = publications.filter(pub =>
      pub.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
    )
  }
  
  // Filter by year
  if (year) {
    publications = publications.filter(pub => pub.year === parseInt(year))
  }
  
  // Sort by publication date (newest first)
  publications.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  
  res.json(publications)
})

// GET /api/publications/categories - Get all publication categories
router.get('/categories', async (req, res) => {
  await db.read()
  const publications = db.data.publications || []
  
  const categories = [...new Set(publications.map(pub => pub.category))]
  res.json(categories)
})

// POST /api/publications - Create new publication (admin)
router.post('/', async (req, res) => {
  const { 
    title, 
    description, 
    authors, 
    category, 
    year,
    journal,
    doi,
    pdfUrl,
    externalUrl,
    tags,
    featured,
    imageUrl
  } = req.body
  
  // Validation
  if (!title || !authors || !Array.isArray(authors) || authors.length === 0 || !category) {
    return res.status(400).json({ 
      error: 'Title, authors (array), and category are required' 
    })
  }

  await db.read()
  
  if (!db.data.publications) {
    db.data.publications = []
  }

  const newPublication = {
    id: nanoid(),
    title: title.trim(),
    description: description?.trim() || '',
    authors: authors.map(author => author.trim()),
    category: category.trim(),
    year: year || new Date().getFullYear(),
    journal: journal?.trim() || '',
    doi: doi?.trim() || '',
    pdfUrl: pdfUrl?.trim() || '',
    externalUrl: externalUrl?.trim() || '',
    imageUrl: imageUrl?.trim() || '',
    tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : [],
    featured: featured || false,
    downloadCount: 0,
    viewCount: 0,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  db.data.publications.push(newPublication)
  await db.write()
  
  res.status(201).json(newPublication)
})

// GET /api/publications/featured - Get featured publications
router.get('/featured', async (req, res) => {
  await db.read()
  const publications = db.data.publications || []
  
  const featured = publications
    .filter(pub => pub.featured)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5) // Limit to 5 featured publications
  
  res.json(featured)
})

// GET /api/publications/:id - Get specific publication
router.get('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const publication = (db.data.publications || []).find(pub => pub.id === id)
  
  if (!publication) {
    return res.status(404).json({ error: 'Publication not found' })
  }
  
  // Increment view count
  publication.viewCount = (publication.viewCount || 0) + 1
  await db.write()
  
  res.json(publication)
})

// PUT /api/publications/:id - Update publication (admin)
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const updates = req.body
  
  await db.read()
  const publication = (db.data.publications || []).find(pub => pub.id === id)
  if (!publication) return res.status(404).json({ error: 'Publication not found' })
  
  // Update allowed fields
  const allowedFields = [
    'title', 'description', 'authors', 'category', 'year', 'journal', 
    'doi', 'pdfUrl', 'externalUrl', 'tags', 'featured', 'imageUrl'
  ]
  
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      publication[field] = updates[field]
    }
  })
  
  publication.updatedAt = new Date().toISOString()
  
  await db.write()
  res.json(publication)
})

// DELETE /api/publications/:id - Delete publication (admin)
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await db.read()
  const idx = (db.data.publications || []).findIndex(pub => pub.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Publication not found' })
  
  db.data.publications.splice(idx, 1)
  await db.write()
  res.json({ message: 'Publication deleted successfully' })
})

// POST /api/publications/:id/download - Track download
router.post('/:id/download', async (req, res) => {
  const id = req.params.id
  await db.read()
  const publication = (db.data.publications || []).find(pub => pub.id === id)
  
  if (!publication) {
    return res.status(404).json({ error: 'Publication not found' })
  }
  
  if (!publication.pdfUrl) {
    return res.status(400).json({ error: 'No download available for this publication' })
  }
  
  // Increment download count
  publication.downloadCount = (publication.downloadCount || 0) + 1
  await db.write()
  
  res.json({ 
    message: 'Download tracked',
    downloadUrl: publication.pdfUrl 
  })
})

export default router