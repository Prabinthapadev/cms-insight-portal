
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.resolve(__dirname, '../ssr.config.ts'),
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const { render } = await vite.ssrLoadModule('/src/server/entry-server.tsx');
      const { html, state } = await render(url);

      const template = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>CMS Insight Portal</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `;

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  })
);
