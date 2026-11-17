// Stáhne výsledky Magnificu podle mapy identifikátor → název a uloží je do raw/ a dist/assets/m/ jako WebP.
//   node tools/fetch-magnific.mjs <creations_get výstup .txt>
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire('C:/Users/Omen/Documents/claude/braveshop-redesign/package.json');
const sharp=require('sharp');
const MAP={yifDI1VPW9:'s-match',jUdA0TvLD0:'s-court',YMjC5NSWeC:'s-rally',mEilyp1hJQ:'s-tennis','3zq8CPhREY':'s-volley',VXSHxW4MMU:'s-shuttle',lJonDLkgv9:'s-football',yifDtiuPW9:'s-baseball','1lDRcUmr4r':'s-glove',s7BzDD5l8e:'s-hoop',Xmy1U77Bfo:'s-golf',bx0NzcR5Y2:'s-club',lJonpIAgv9:'s-bat',
'6AFBf5miJO':'n-protein','9Zudv5dNYZ':'n-honey','9ZudvkBNYZ':'n-rice',gO8YeuYSXO:'n-apples',p875gtSehw:'n-kiwi',O6aMtZiynm:'n-berries',bx0NnSK5Y2:'n-strawberry',xSe2V4yjfW:'n-lemon',s7Bzp38l8e:'n-pepper',bx0NnPs5Y2:'n-cucumber','8a9jOx3IrU':'n-oil',SyIWXVZUb8:'n-water',
'79hT8sZJAL':'sport-hero',SyIWXLFUb8:'sport-training',ov4xJBQ829:'sport-gym',bx0NYKa5Y2:'sport-detail','1lDRTsMr4r':'sport-golf',fH2wAs8CDY:'sport-pitch',
// Sport v2 (2026-11-17): hory, kola, lyže, turistika
'1lenDb0r4r':'o-road',Lwo0BgRswO:'o-mtb','1lenpgpr4r':'o-ebike',P3u8EzD42C:'o-bikehelmet','1lenpPfr4r':'o-cycleshoes',aFAP2l0fSh:'o-skis','3z5abmOREY':'o-skiboots','8a6UNOcIrU':'o-skihelmet',IfiwiCQtvE:'o-goggles','9ZFtFzLNYZ':'o-touring',UPhphZQwny:'o-xc',TdUkUCqVNR:'o-board',Cqz9zPBEEy:'o-sbboots','5jMAMnYKxe':'o-hikeboots',SymDm8WUb8:'o-backpack',P3u8uFr42C:'o-jacket','9ZFtHVwNYZ':'o-poles',
'6AqhboAiJO':'out-ski','79adfpEJAL':'out-road',lJIVtDOgv9:'out-mtb',rgdYXMextc:'out-skialp',jUBcoBfLD0:'out-snowboard',bxV2MvM5Y2:'out-hike',SymDhjhUb8:'out-detail',jUBc8PcLD0:'out-chalet',u5Y6cgqQLD:'out-ebike',
// Výživa v2 (2026-11-17): zdravá výživa v obalech s logem Brave Shop (reference = logo)
'3z5fritREY':'h-chia',s78Vaqml8e:'h-goji',ovNU2Do829:'h-spirulina',huZyYhcvqL:'h-maca',aFA40Q7fSh:'h-almonds',kspnIyO16B:'h-cashew',lJIMCG7gv9:'h-dates',eIys3kFdqL:'h-almondbutter',WDl5OHAcXe:'h-peanut',YMsbJnSWeC:'h-protein',CqzNMFJEEy:'h-collagen','4RQt1Z89Aa':'h-omega',YMsbOdNWeC:'h-shea',Ebn6DLTuuO:'h-argan',Bh9SA50oQR:'h-matcha',kspntZy16B:'h-tea',
s78VCjEl8e:'hz-hero',u5YieHeQLD:'hz-chia',LwoTCwrswO:'hz-cosmetics',gOtDQ48SXO:'hz-matcha',tC3JWqimZJ:'hz-wellness','4RQmKcQ9Aa':'hz-toast',jUBThyiLD0:'hz-pantry',
p875ShUehw:'food-hero',N2QXCWg6D9:'food-fresh',yifDho7PW9:'food-bowl',JNvVtIqOq4:'food-detail',UPtcoIywny:'food-pantry','1lDRTe7r4r':'food-drinks'};
const txt=readFileSync(process.argv[2],'utf8');
const urls={};let cur=null;
for(const line of txt.split('\n')){const id=line.match(/^\s+- identifier: (\S+)/);if(id)cur=id[1];const u=line.match(/^\s+url: "([^"]+)"/);if(u&&cur&&!urls[cur])urls[cur]=u[1];}
mkdirSync('raw',{recursive:true});mkdirSync('dist/assets/m',{recursive:true});
const log=[];
for(const [id,name] of Object.entries(MAP)){
 if(!urls[id])continue; // zpracovat jen fotky ze zadaného výpisu
 const raw=`raw/${name}.png`;
 if(!existsSync(raw)){if(!urls[id]){console.log('chybí URL',id,name);continue}const r=await fetch(urls[id]);if(!r.ok){console.log('HTTP',r.status,name);continue}writeFileSync(raw,Buffer.from(await r.arrayBuffer()));}
 const meta=await sharp(raw).metadata();
 await sharp(raw).resize({width:Math.min(meta.width,1600)}).webp({quality:80}).toFile(`dist/assets/m/${name}.webp`);
 await sharp(raw).resize({width:720}).webp({quality:78}).toFile(`dist/assets/m/${name}-s.webp`);
 log.push(`${name}\t${id}\t${meta.width}x${meta.height}`);
}
writeFileSync('raw/magnific-log.tsv',log.join('\n'));console.log(log.length,'hotovo');
