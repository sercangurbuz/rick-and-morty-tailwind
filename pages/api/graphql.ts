import { IncomingMessage } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

let apiUrl = process.env.NEXT_API_URL;

const proxy = createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
  logLevel: 'debug',
  cookieDomainRewrite: 'localhost',
  onProxyRes: (proxyRes: IncomingMessage) => {
    // You can manipulate the cookie here

    if (!proxyRes.headers['set-cookie']) {
      return;
    }

    // For example you can remove secure and SameSite security flags so browser can save the cookie in dev env
    const adaptCookiesForLocalhost = proxyRes.headers['set-cookie'].map(
      (cookie) =>
        cookie.replace(/; secure/gi, '').replace(/; SameSite=None/gi, '')
    );

    proxyRes.headers['set-cookie'] = adaptCookiesForLocalhost;
  },
  onError: (err: Error) => console.error(err),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  // Don't allow requests to hit the proxy when not in development mode
  // NextJS doesn't allow conditional API routes
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ message: 'Not found' });
  }
  // @ts-ignore
  return proxy(req, res);
}

export const config = {
  api: {
    bodyParser: false, // enable POST requests
    externalResolver: true, // hide warning message
  },
};
