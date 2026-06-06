/* global process, Buffer */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serverless-api-emulator',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/')) {
            const apiPath = req.url.split('?')[0];
            const handlerName = apiPath.replace('/api/', '');
            const handlerFilePath = path.resolve(process.cwd(), `api/${handlerName}.js`);
            
            if (fs.existsSync(handlerFilePath)) {
              try {
                let body = {};
                if (req.method === 'POST') {
                  const buffers = [];
                  for await (const chunk of req) {
                    buffers.push(chunk);
                  }
                  const data = Buffer.concat(buffers).toString();
                  if (data) {
                    body = JSON.parse(data);
                  }
                }
                
                const emulatedReq = {
                  method: req.method,
                  headers: req.headers,
                  body,
                  url: req.url,
                  query: {}
                };
                
                const emulatedRes = {
                  statusCode: 200,
                  headers: {},
                  setHeader(name, value) {
                    this.headers[name.toLowerCase()] = value;
                  },
                  status(code) {
                    this.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.writeHead(this.statusCode, {
                      'Content-Type': 'application/json',
                      ...this.headers
                    });
                    res.end(JSON.stringify(data));
                  },
                  end(data) {
                    res.writeHead(this.statusCode, this.headers);
                    res.end(data);
                  }
                };
                
                // Dynamically import local serverless handler
                const modulePath = `file://${handlerFilePath}?t=${Date.now()}`;
                const { default: handler } = await import(modulePath);
                
                await handler(emulatedReq, emulatedRes);
                return;
              } catch (err) {
                console.error("Vite API Emulator Error:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
                return;
              }
            }
          }
          next();
        });
      }
    }
  ]
})
