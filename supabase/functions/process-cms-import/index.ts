
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { parse } from 'https://deno.land/std@0.181.0/encoding/csv.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    const importId = formData.get('importId') as string

    if (!file || !userId || !importId) {
      throw new Error('Missing required fields')
    }

    const text = await file.text()
    const records = parse(text, { skipFirstRow: true })
    
    let processedCount = 0
    let failedCount = 0

    for (const record of records) {
      try {
        const [name, description, website, marketShare, ...tags] = record

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

        const { error } = await supabase
          .from('cms')
          .insert({
            name,
            description,
            website,
            market_share: parseFloat(marketShare),
            slug,
            tags: tags.filter(Boolean),
            is_published: false
          })

        if (error) throw error
        processedCount++
      } catch (error) {
        console.error('Error processing record:', error)
        failedCount++
      }
    }

    await supabase
      .from('cms_imports')
      .update({
        status: 'completed',
        records_processed: processedCount,
        records_failed: failedCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', importId)

    return new Response(
      JSON.stringify({ 
        success: true,
        processed: processedCount,
        failed: failedCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
