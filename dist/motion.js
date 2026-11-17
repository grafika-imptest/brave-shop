'use strict';
/* Pohyb a interakce: plynulé posouvání, hlavička, odhalování obsahu, parallax, karusely,
   kontextový kurzor, magnetická tlačítka a úvodní slider. Respektuje prefers-reduced-motion. */
(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const header=$('#site-header'),main=$('#main'),cursorEl=$('#cursor');
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));

/* ---------- Plynulé posouvání ---------- */
let lenis=null;
function startLenis(){if(lenis||reduced.matches||!window.Lenis)return;lenis=new window.Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true,wheelMultiplier:.95});window.__lenis=lenis;const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);lenis.on('scroll',tick);}
if(window.Lenis)startLenis();else window.addEventListener('load',startLenis);
reduced.addEventListener('change',()=>{if(reduced.matches&&lenis){lenis.destroy();lenis=null;window.__lenis=null}else startLenis()});
const scrollToY=(y,immediate=false)=>lenis?lenis.scrollTo(y,{immediate,force:true,duration:1.3}):window.scrollTo({top:y,behavior:immediate||reduced.matches?'instant':'smooth'});
// Zastavit plynulé posouvání, když je otevřený panel, dialog nebo mobilní menu.
const lockObserver=new MutationObserver(()=>{const locked=!$('#drawer').hidden||$('#modal').open||(!$('#mega-menu').hidden&&innerWidth<=1024);document.documentElement.classList.toggle('is-locked',locked);if(lenis)locked?lenis.stop():lenis.start();});
lockObserver.observe($('#drawer'),{attributes:true,attributeFilter:['hidden']});lockObserver.observe($('#modal'),{attributes:true,attributeFilter:['open']});lockObserver.observe($('#mega-menu'),{attributes:true,attributeFilter:['hidden']});

/* ---------- Hlavička ---------- */
let lastY=scrollY;
function updateHeader(){const y=scrollY,hero=$('#main > .hero');const hh=header.offsetHeight;const over=!!hero&&y<hero.offsetHeight-hh-4&&$('#mega-menu').hidden;header.classList.toggle('is-over',over);header.classList.toggle('is-scrolled',y>8);const menuOpen=!$('#mega-menu').hidden;if(Math.abs(y-lastY)>4){header.classList.toggle('is-hidden',y>lastY&&y>420&&!menuOpen);lastY=y;}}

/* ---------- Text po slovech ---------- */
function split(el,cls='w'){if(el.dataset.splitDone)return;el.dataset.splitDone='1';let i=0;const walk=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const frag=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return}const w=document.createElement('span');w.className=cls;const inner=document.createElement('span');inner.textContent=part;w.style.setProperty('--i',i++);w.appendChild(inner);frag.appendChild(w);});n.replaceWith(frag);}else if(n.nodeType===1&&n.tagName!=='BR')walk(n);});};walk(el);el.style.setProperty('--n',i);}
const inObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');inObserver.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
const FX='.product-card,.journal-card,.cat-card,.benefits>div,.trust-facts>div,.home-faq details,.mini-product,.rating-panel,.loyalty-panel,.footer-links>div,.runway-heading,.spotlight-copy>*,.feature-copy>p,.feature-copy>.btn,.bento-copy>p,.bento-copy>.text-link,.hero-content .eyebrow,.page-top>p,.section-head .text-link,.tabs,.pills,.catalog-toolbar,.article-body,.checkout>div,.manifesto>p';
function setupFx(root=main){if(reduced.matches){$$('[data-split],[data-reveal-img],.fx',root).forEach(el=>el.classList.add('is-in'));return}
 $$('[data-split]',root).forEach(el=>{split(el);if(!el.closest('.hero'))inObserver.observe(el)});
 $$('[data-scrub]',root).forEach(el=>split(el,'s'));
 $$('[data-reveal-img]',root).forEach(el=>inObserver.observe(el));
 const groups=new Map();$$(FX,root).forEach(el=>{if(el.classList.contains('fx'))return;el.classList.add('fx');const k=el.parentElement;const n=groups.get(k)||0;groups.set(k,n+1);el.style.setProperty('--d',Math.min(n,6)*70+'ms');inObserver.observe(el);});
 $$('.page-top h1',root).forEach(el=>{el.setAttribute('data-split','');split(el);inObserver.observe(el)});}

/* ---------- Parallax a scrub ---------- */
let frame=0;function tick(){if(!frame)frame=requestAnimationFrame(paint)}
function paint(){frame=0;updateHeader();if(reduced.matches)return;const vh=innerHeight;
 for(const el of $$('[data-parallax]',main)){const r=el.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)continue;const f=parseFloat(el.dataset.parallax)||.1;el.style.setProperty('--py',((r.top+r.height/2-vh/2)*-f).toFixed(1)+'px');}
 for(const el of $$('[data-scrub]',main)){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)continue;const p=clamp((vh*.88-r.top)/(r.height+vh*.42));const words=$$('.s',el),n=words.length;words.forEach((w,i)=>{w.style.opacity=(.14+.86*clamp(p*n*1.15-i)).toFixed(3)});}
 const banner=$('.catalog-banner .parallax-wrap',main);if(banner){const r=banner.getBoundingClientRect();banner.style.setProperty('--py',(r.top*-.18).toFixed(1)+'px')}}
addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick,{passive:true});

/* ---------- Karusely (tažení myší, setrvačnost, průběh) ---------- */
function setupRail(r){if(r.dataset.railReady)return;r.dataset.railReady='1';const wrap=r.closest('.rail-wrap'),bar=wrap?.querySelector('.rail-progress i');
 const update=()=>{const max=r.scrollWidth-r.clientWidth;wrap?.classList.toggle('no-scroll',max<4);if(!bar)return;const w=clamp(r.clientWidth/r.scrollWidth,.08,1)*100,p=max>0?r.scrollLeft/max:0;bar.style.width=w+'%';bar.style.left=(p*(100-w))+'%';const [prev,next]=$$('button',wrap.querySelector('.rail-btns'));prev.disabled=r.scrollLeft<4;next.disabled=r.scrollLeft>max-4;};
 r.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
 wrap?.querySelector('[data-rail-prev]').addEventListener('click',()=>r.scrollBy({left:-r.clientWidth*.8,behavior:'smooth'}));
 wrap?.querySelector('[data-rail-next]').addEventListener('click',()=>r.scrollBy({left:r.clientWidth*.8,behavior:'smooth'}));
 let down=false,moved=0,startX=0,startL=0,lastX=0,lastT=0,vel=0,inertia=0;
 r.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,input,select'))return;cancelAnimationFrame(inertia);down=true;moved=0;startX=lastX=e.clientX;startL=r.scrollLeft;lastT=performance.now();vel=0;});
 addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-startX;moved=Math.max(moved,Math.abs(dx));if(moved>4){r.classList.add('is-dragging');r.scrollLeft=startL-dx;const t=performance.now();vel=(e.clientX-lastX)/Math.max(1,t-lastT);lastX=e.clientX;lastT=t;}});
 addEventListener('pointerup',()=>{if(!down)return;down=false;if(moved>4){let v=vel*16;const glide=()=>{r.scrollLeft-=v;v*=.93;if(Math.abs(v)>.4)inertia=requestAnimationFrame(glide);else r.classList.remove('is-dragging');};inertia=requestAnimationFrame(glide);}else r.classList.remove('is-dragging');});
 r.addEventListener('click',e=>{if(moved>4){e.preventDefault();e.stopPropagation();moved=0}},true);
 r.addEventListener('dragstart',e=>e.preventDefault());}
window.refreshRails=()=>{$$('[data-rail]').forEach(r=>{delete r.dataset.railReady;setupRail(r)});setupFx();};
document.addEventListener('click',e=>{if(e.target.closest('[data-action="home-tab"]')){const r=$('#home-products');if(r){r.scrollLeft=0;delete r.dataset.railReady;setupRail(r);setupFx(r);r.dispatchEvent(new Event('scroll'))}}});

/* ---------- Kurzor ---------- */
let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy,cs=0,ts=0,cursorRaf=0;
function cursorLoop(){cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;cs+=(ts-cs)*.2;cursorEl.style.transform=`translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%) scale(${cs.toFixed(3)})`;cursorRaf=(Math.abs(tx-cx)+Math.abs(ty-cy)+Math.abs(ts-cs)>.05)?requestAnimationFrame(cursorLoop):0;}
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!fine.matches)return;tx=e.clientX;ty=e.clientY;const target=e.target.closest('[data-cursor]');const interactive=e.target.closest('button,input,select,textarea,label,.product-meta a,.product-tools,.quick-add,.hero-links,.hero-label,.text-link,.btn');const show=!!target&&!!target.dataset.cursor&&(!interactive||target.contains(interactive)&&interactive.matches('[data-cursor]')||interactive===target);ts=show?1:0;if(show){cursorEl.textContent=target.dataset.cursor;cursorEl.dataset.type=target.dataset.cursorType||''}cursorEl.classList.toggle('visible',show);if(!cursorRaf)cursorRaf=requestAnimationFrame(cursorLoop);},{passive:true});
document.addEventListener('pointerleave',()=>{ts=0;if(!cursorRaf)cursorRaf=requestAnimationFrame(cursorLoop)});
addEventListener('pointerdown',()=>cursorEl.classList.add('is-down'));addEventListener('pointerup',()=>cursorEl.classList.remove('is-down'));

/* ---------- Magnetická tlačítka ---------- */
document.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches)return;const m=e.target.closest('[data-magnetic]');$$('[data-magnetic].is-mag').forEach(x=>{if(x!==m){x.classList.remove('is-mag');x.style.transform=''}});if(!m)return;const r=m.getBoundingClientRect();m.classList.add('is-mag');m.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.18).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.3).toFixed(1)}px)`;},{passive:true});

/* ---------- Úvodní slider ---------- */
function heroGo(dir){const slides=$$('.hero-slide');if(slides.length<2)return;heroSlide=(heroSlide+dir+slides.length)%slides.length;slides.forEach((s,i)=>{const on=i===heroSlide;s.classList.toggle('is-active',on);if(on)s.removeAttribute('aria-hidden');else s.setAttribute('aria-hidden','true');s.dataset.cursor=on?'Další ⟶':'';const h=$('[data-split]',s);if(h){h.classList.remove('is-in');if(on)requestAnimationFrame(()=>requestAnimationFrame(()=>h.classList.add('is-in')))}});const c=$('.hero-count b');if(c)c.textContent='0'+(heroSlide+1);}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action="hero-next"],[data-action="hero-prev"]');if(b){e.stopPropagation();heroGo(b.dataset.action==='hero-next'?1:-1);return}const area=e.target.closest('[data-hero-area]');if(area&&!e.target.closest('a,button')&&fine.matches)heroGo(1);},true);
let sx=null;document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'&&e.target.closest('.hero'))sx=e.clientX},{passive:true});document.addEventListener('pointerup',e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>50)heroGo(dx<0?1:-1)},{passive:true});
document.addEventListener('click',e=>{const a=e.target.closest('[data-scroll-to]');if(!a)return;e.preventDefault();const t=$(a.dataset.scrollTo);if(t)scrollToY(t.getBoundingClientRect().top+scrollY-20);});

/* ---------- Galerie detailu (mobil) ---------- */
function setupGallery(){const g=$('[data-pd-gallery]');if(!g)return;const dots=$$('.pd-dots i',g);g.addEventListener('scroll',()=>{const i=Math.round(g.scrollLeft/g.clientWidth);dots.forEach((d,j)=>d.classList.toggle('on',i===j))},{passive:true});}

/* ---------- Napojení na vykreslování stránek ---------- */
function afterRender(routeChange){document.body.classList.toggle('is-home',!!$('#main > .hero'));document.body.classList.toggle('has-buybar',!!$('.pd-mobile-buy'));$$('[data-rail]').forEach(setupRail);setupFx();setupGallery();
 const h=$('.hero-slide.is-active [data-split]');if(h)requestAnimationFrame(()=>requestAnimationFrame(()=>h.classList.add('is-in')));
 if(routeChange){main.classList.remove('enter');void main.offsetWidth;main.classList.add('enter');if(lenis){lenis.scrollTo(0,{immediate:true,force:true});lenis.resize()}header.classList.remove('is-hidden');}
 lastY=scrollY;tick();}
const baseRender=render;render=function(scroll=true){baseRender(scroll);afterRender(scroll)};
const baseShowCart=showCart;showCart=function(){baseShowCart();setupFx($('#drawer'))};
afterRender(true);
// Obrázky v detailu: po načtení přepočítat výšky (Lenis, scény).
addEventListener('load',()=>{lenis?.resize();tick()});
})();
