
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from '../App';

export function render(url: string) {
  const queryClient = new QueryClient();

  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  );

  return { html, state: queryClient.getQueryData(['cms-list']) };
}
