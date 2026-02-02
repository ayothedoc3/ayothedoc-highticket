import { Router, Request, Response } from 'express'

const router = Router()

interface LeadData {
  firstName: string
  email: string
  company?: string
  source: string // e.g., 'checklist', 'contact'
}

// POST /api/leads - Store a new lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, email, company, source }: LeadData = req.body

    if (!firstName || !email) {
      return res.status(400).json({ error: 'First name and email are required' })
    }

    // Check for Airtable configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads'

    if (!airtableApiKey || !airtableBaseId) {
      console.warn('Airtable not configured - lead stored locally only')
      // Still return success, just log the lead
      console.log('New lead:', { firstName, email, company, source, timestamp: new Date().toISOString() })
      return res.json({
        success: true,
        message: 'Lead captured (Airtable not configured)',
        data: { firstName, email }
      })
    }

    // Store in Airtable
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`

    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${airtableApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'First Name': firstName,
              'Email': email,
              'Company': company || '',
              'Source': source || 'website',
              'Date': new Date().toISOString().split('T')[0],
              'Status': 'New'
            }
          }
        ]
      })
    })

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error('Airtable error:', errorData)
      // Still return success to user, but log the error
      return res.json({
        success: true,
        message: 'Lead captured',
        data: { firstName, email }
      })
    }

    const airtableData = await airtableResponse.json()
    console.log('Lead stored in Airtable:', airtableData.records?.[0]?.id)

    res.json({
      success: true,
      message: 'Lead captured successfully',
      data: { firstName, email }
    })

  } catch (error) {
    console.error('Error capturing lead:', error)
    res.status(500).json({ error: 'Failed to capture lead' })
  }
})

export default router
