
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  let vite;
  if (!isProduction) {
    // Create Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Read index.html
      let template = fs.readFileSync(
        isProduction
          ? path.resolve(__dirname, 'dist/client/index.html')
          : path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      if (!isProduction) {
        // Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);
      }

      // Load server entry
      let render;
      if (!isProduction) {
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        render = (await import('./dist/server/entry-server.js')).render;
      }

      // Render the app
      const appHtml = await render(url);

      // Inject app-rendered HTML into template
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // Send rendered HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173');
  });
}

createServer();
