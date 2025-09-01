import {NextRequest, NextResponse} from 'next/server'
import {promises as fs} from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function validateFileExtension(fileName: string, mimeType: string): boolean {
  const ext = path.extname(fileName).toLowerCase()
  
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return false
  }
  
  const mimeToExt: Record<string, string[]> = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp']
  }
  
  return mimeToExt[mimeType]?.includes(ext) || false
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    if (!validateFileExtension(file.name, file.type)) {
      return NextResponse.json(
        { error: 'File extension does not match file type.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      )
    }

    try {
      await fs.access(UPLOAD_DIR)
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true })
    }

    const fileExtension = path.extname(file.name).toLowerCase()
    const timestamp = Date.now()
    const randomString = crypto.randomBytes(8).toString('hex')
    const sanitizedName = sanitizeFileName(path.basename(file.name, fileExtension))
    const fileName = `${timestamp}_${randomString}_${sanitizedName}${fileExtension}`
    const filePath = path.join(UPLOAD_DIR, fileName)

    try {
      const buffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(filePath, buffer)
    } catch (writeError) {
      console.error('File write error:', writeError)
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      )
    }

    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName,
      size: file.size
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}