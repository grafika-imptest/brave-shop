// Screenshoty náhledu (Edge přes playwright-core):
//   node tools/shots.mjs <název> <hash|cesta> [--m] [--full] [--y=0,900,1800] [--style=interior] [--click=selektor]
import {createRequire} from 'node:module';
import {mkdirSync} from 'node:fs';
const require=createRequire('C:/Users/Omen/Documents/claude/braveshop-redesign/package.json');
const {chromium}=require('playwright-core');
const args=process.argv.slice(2);
const name=args[0]||'shot',route=args[1]||'#home';
const flag=k=>args.find(a=>a.startsWith('--'+k));
const val=k=>(flag(k)||'').split('=')[1];
const mobile=!!flag('m'),full=!!flag('full');
const ys=(val('y')||'0').split(',').map(Number);
const style=val('style')||'interior';
const B=process.env.B||'http://127.0.0.1:5360/';
mkdirSync('shots',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const ctx=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
const page=await ctx.newPage();
const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await page.addInitScript(()=>{try{localStorage.setItem('brave-consent','{"analytics":false,"marketing":false}')}catch{}});
await page.goto(`${B}?style=${style}${route.startsWith('#')?route:'#'+route}`,{waitUntil:'networkidle'});
await page.waitForTimeout(1200);
const click=val('click');if(click){await page.click(click);await page.waitForTimeout(900)}
for(const [i,y] of ys.entries()){
 await page.evaluate(y=>{window.__lenis?window.__lenis.scrollTo(y,{immediate:true}):window.scrollTo(0,y)},y);
 await page.waitForTimeout(1300);
 await page.screenshot({path:`shots/${name}_${i}.jpg`,type:'jpeg',quality:70,fullPage:full});
}
if(errs.length)console.log('ERRORS:\n'+[...new Set(errs)].join('\n'));
console.log('ok',ys.length,'shots');
await browser.close();
