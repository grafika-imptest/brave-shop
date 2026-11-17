// Zástupná loga značek (Magnific, Recraft v4 Pro Vector). Stáhne SVG, odstraní bílé pozadí,
// ořízne viewBox na obsah a uloží do dist/assets/logos/.   node tools/logos.mjs
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
const require=createRequire('C:/Users/Omen/Documents/claude/braveshop-redesign/package.json');
const sharp=require('sharp');
const T='?token=exp=1795219200~hmac=';
const L={
 'i-nordvik':'6068238983/3882987467.svg'+T+'a9277fed831295ace9f4e20b78dbbe7927293d06fc7d3e7a27b5fd7899ad6f82',
 'i-lumo':'6068250458/3882993137.svg'+T+'8aa51d9cd21a6dfefdfb8b788d7f80f37a45d55681f591ba850a3f6e90761bf2',
 'i-havn':'6068250926/3882993252.svg'+T+'4bb57eb860ae66ab46969a70adcf4efc9ef4cbade54709d5e97e74461ecd628b',
 'i-oakline':'6068251112/3882993426.svg'+T+'9116c3c8a94c6d364423568245959c940e7041367cb902bb95d8bee4dd9e27eb',
 'i-sollen':'6068251409/3882993576.svg'+T+'c9f33857f2771b39cb50a6f1f33b9710811ebf10f61281f13ac2349b84658faf',
 'i-mira':'6068251567/3882993696.svg'+T+'2a72c47f973fb766635af7ebc6e2864fe8ef00ecea59d6022f9f693ad4f1a450',
 'i-kora':'6068251700/3882993837.svg'+T+'ad3ed0061f24a77da600c7706280f6d6d608be57186a3ed8419950237c3f9855',
 'i-fjeld':'6068251912/3882993952.svg'+T+'a29a4882043f693eef4cf8fc423f9ed6674e65e5050a2b1edb44f6174d70992b',
 'o-altrova':'6068252464/3882994069.svg'+T+'2bb7ac256c4c366fe1f486007d98b9dad6480b0dd5738f4aad1e1e699138cf01',
 'o-nordgrat':'6068255681/3882995594.svg'+T+'63525804f152b5da229e955b0466f04e83a5f689a1b4e779741527fd121911f1',
 'o-firnline':'6068255905/3882995730.svg'+T+'b93ca44a66fc4142edcb0fa2ccb2517284d568b82146761c5b0d5e5dd9bad7ad',
 'o-trailkin':'6068256294/3882995832.svg'+T+'c1a96786815797792d457ec543f79242a956f62272a0f79bb785e0d3e1c2c684',
 'o-velora':'6068256246/3882995937.svg'+T+'cb56b5adc348888034585787e0768c3aaaf5968a3f8a0be2ba2c97c9ab12d2f8',
 'o-skarn':'6068256655/3882996049.svg'+T+'a703064b71dcce2e1973856af517a8bd33eb9ca229b6dcef1576d164e6512a9e',
 'o-pelvo':'6068257222/3882996187.svg'+T+'a18620a3d5075c222e2c822d6417a5ad02bc2fddb4dcce007a795ee78585169b',
 'o-hochvent':'6068257309/3882996364.svg'+T+'f02da57b012e9261845f89de4f22d09759c94d46a89966829c1dd65cccf6ebea',
 'o-kammweg':'6068257791/3882996492.svg'+T+'fea29d827568f701be8e9faad00661fb82aca75bdcdf55a917d3d8053c44421f',
 'n-olivea':'6068262672/3882998725.svg'+T+'7708d2ad9b519ea84b5be1bca0a3ca7f3f12522d66e8e5db85298298b2f6f64d',
 'n-zrno':'6068262780/3882998855.svg'+T+'ccbbb832b70c09ec57a2126f6cbf730a35b676b909a2aa8e0ac92012085fe6c5',
 'n-bylinka':'6068263773/3882999045.svg'+T+'7c76a6a1682eaabb25670970867adc1eaefb9e552a39e1a9caed485504d772dc',
 'n-polana':'6068263817/3882999166.svg'+T+'d01932b0c2e933e4b96fab61076f0bba82f28dadf2a1d4ad0706b424e3f23a66',
 'n-kvas':'6068263872/3882999262.svg'+T+'6b9d032c598e3d4a71e0a61aed441237a4eae58811acfc01f2953c9c580443ed',
 'n-lesana':'6068264334/3882999380.svg'+T+'cf3c42c33c7985dc8a407485d898c8682f693f29fd910526c1bc211e60af7ca7',
 'n-sadhora':'6068265153/3882999557.svg'+T+'393a860add968331ec1ec2bfff87f9402f309387d8995bfd695cb5bf0ec3debf',
 'n-molino':'6068265384/3882999708.svg'+T+'c315b0e353e7074fc355348b5c8946c87698988f2623fa236af4fcb267e279a4'};
mkdirSync('raw/logos',{recursive:true});mkdirSync('dist/assets/logos',{recursive:true});
for(const [name,path] of Object.entries(L)){
 const raw=`raw/logos/${name}.svg`;
 if(!existsSync(raw)){const r=await fetch('https://pikaso.cdnpk.net/private/production/'+path);if(!r.ok){console.log('HTTP',r.status,name);continue}writeFileSync(raw,await r.text());}
 let svg=readFileSync(raw,'utf8');
 const vb=svg.match(/viewBox="0 0 (\d+) (\d+)"/);const W=+vb[1],H=+vb[2];
 // obsahový rámeček z rastru (bílá = pozadí)
 const {info}=await sharp(Buffer.from(svg)).flatten({background:'#fff'}).trim({background:'#fff',threshold:30}).toBuffer({resolveWithObject:true});
 const x=-info.trimOffsetLeft,y=-info.trimOffsetTop,w=info.width,h=info.height,p=Math.round(Math.max(w,h)*.02);
 svg=svg.replace(new RegExp(`<path[^>]*fill="rgb\\(2[3-5]\\d,2[3-5]\\d,2[3-5]\\d\\)"[^>]*d="M 0 0 L ${W} 0 L ${W} ${H} L 0 ${H} L 0 0 z"[^>]*></path>`),'')
  .replace(/<metadata><\/metadata>/,'')
  .replace(/ style="display: block;"/,'')
  .replace(/viewBox="[^"]*" width="\d+" height="\d+" preserveAspectRatio="none"/,`viewBox="${x-p} ${y-p} ${w+2*p} ${h+2*p}"`);
 writeFileSync(`dist/assets/logos/${name}.svg`,svg);
 console.log(name,`${w}x${h}`,Math.round(svg.length/1024)+' kB');
}
