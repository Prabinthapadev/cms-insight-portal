
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

Deno.serve(async (req) => {
  try {
    const baseUrl = 'https://cody-cms.org'; // Replace with your actual domain
    const urls: SitemapUrl[] = [];
    
    // Add static pages
    const staticPages = [
      { path: '/', priority: 1.0 },
      { path: '/cms', priority: 0.9 },
      { path: '/compare', priority: 0.8 },
      { path: '/categories', priority: 0.8 },
      { path: '/sitemap', priority: 0.5 },
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${baseUrl}${page.path}`,
        changefreq: 'weekly',
        priority: page.priority,
      });
    });

    // Add CMS pages
    const { data: cmsPages, error: cmsError } = await supabase
      .from('cms')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (cmsError) throw cmsError;

    cmsPages?.forEach(cms => {
      urls.push({
        loc: `${baseUrl}/cms/${cms.slug}`,
        lastmod: cms.updated_at,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    // Add category pages
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('slug');

    if (tagsError) throw tagsError;

    tags?.forEach(tag => {
      urls.push({
        loc: `${baseUrl}/categories/${tag.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
      });
    });

    // Generate XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
});
