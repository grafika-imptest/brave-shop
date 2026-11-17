// Převezme fotky interiéru vygenerované v Magnificu (projekt braveshop-redesign) do dist/assets/m/
// ve stejném formátu jako ostatní: <název>.webp (max 1600 px) + <název>-s.webp (720 px).
import {createRequire} from 'node:module';
import {mkdirSync,existsSync} from 'node:fs';
const require=createRequire('C:/Users/Omen/Documents/claude/braveshop-redesign/package.json');
const sharp=require('sharp');
const SRC='C:/Users/Omen/Documents/claude/braveshop-redesign/theme/media/';
const products={orsa:77,nesna:9,rana:16,lund:102,falun:12,norsborg:13,tofta:78,'kreslo-lund':21,'postel-lund':27,'stul-husa':39,'zidle-orsa':41,lampa:54,skrin:33,'set-tofta':58,pracovna:55,'kreslo-rana':22,komoda:51,police:45,slunecnik:60,lenoska:62,'zidle-husa':56,usak:75,'skrin-falun':32,'tv-tofta':18};
const scenes={'i-living':'categories/obyvaci-pokoj','i-bedroom':'categories/loznice','i-dining':'categories/kuchyne-a-jidelna','i-storage':'categories/ulozne-prostory','i-office':'categories/kancelar-a-pracovna','i-garden':'categories/zahrada-a-balkon','i-bed-detail':'editorial/bedroom-detail','i-craft':'editorial/craft','i-lookbook':'editorial/lookbook-dining','i-materials':'editorial/materials','i-evening':'editorial/newsletter','i-outdoor':'editorial/sale-outdoor','i-hero':'hero/hero-home','i-hero-garden':'hero/hero-garden'};
mkdirSync('dist/assets/m',{recursive:true});
async function out(src,name){const m=await sharp(src).metadata();await sharp(src).resize({width:Math.min(1600,m.width)}).webp({quality:80}).toFile(`dist/assets/m/${name}.webp`);await sharp(src).resize({width:720}).webp({quality:78}).toFile(`dist/assets/m/${name}-s.webp`);}
for(const [id,n] of Object.entries(products)){const l=`${SRC}products/p-${n}-l.webp`;await out(existsSync(l)?l:`${SRC}products/p-${n}.webp`,'i-'+id)}
for(const [name,f] of Object.entries(scenes))await out(`${SRC}${f}.webp`,name);
for(const h of ['hero-home','hero-garden'])await sharp(`${SRC}hero/${h}-m.webp`).webp({quality:80}).toFile(`dist/assets/m/i-${h==='hero-home'?'hero':'hero-garden'}-m.webp`);
console.log('ok',Object.keys(products).length,'produktů',Object.keys(scenes).length,'scén');
