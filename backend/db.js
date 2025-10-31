// backend/db.js
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import fs from 'fs'

const file = join(process.cwd(), 'backend', 'data', 'db.json')

// ensure data folder and file
fs.mkdirSync(join(process.cwd(), 'backend', 'data'), { recursive: true })
if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ testimonials: [], content: {} }))

const adapter = new JSONFile(file)
const defaultData = { testimonials: [], content: {} }
const db = new Low(adapter, defaultData)

async function initDB() {
  await db.read()
  if (!db.data) {
    db.data = { testimonials: [], content: {} }
    await db.write()
  }
}

export { db, initDB }