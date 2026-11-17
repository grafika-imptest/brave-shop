// Lokální náhled složky dist/:  node serve.mjs [port]   (výchozí 4173)
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'dist');
const port=Number(process.argv[2]||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.mp4':'video/mp4','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!path.startsWith(root)){res.writeHead(403).end();return}let file=path;if((await stat(file)).isDirectory())file=resolve(file,'index.html');const content=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});res.end(content)}catch{res.writeHead(404).end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
