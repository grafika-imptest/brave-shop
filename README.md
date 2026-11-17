# Brave Shop — redesign šablony (v2)

Interaktivní statická maketa e-shopu Brave Shop ve třech stylech: **Interiér**, **Sport** a **Výživa** (`?style=interior|sport|nutrition`, přepínač vlevo dole). Funkčně vychází z původního dema https://demo.braveshop.cz/, vizuálně z prostorového pojetí https://wonder-theme-interior.myshopify.com/. Kompozice, texty i implementace jsou vlastní.

## Spuštění

```bash
npm run dev      # http://127.0.0.1:5360
npm run check    # kontrola syntaxe
npm test         # funkční test v Edge (playwright-core z ../braveshop-redesign)
```

Web je složka `dist/` bez sestavení. Veřejně: GitHub Pages z větve `gh-pages` (= obsah `dist/`).

## Co je nového ve v2

- **Čistě bílé stránky** bez podbarvených sekcí, jedna bezpatková rodina **Geist** (Google Fonts).
- **Fotografie až k okrajům**: hero slider přes celou obrazovku (pod průhlednou hlavičkou), bento mozaika, velká fotografie kolekce, „nakupte celý pokoj“, banner kategorie v katalogu.
- **Pohyb**: plynulé posouvání (Lenis 1.1.13), odhalování nadpisů po slovech, odkrývání fotografií, parallax, manifest zesvětlující se po slovech při posouvání, horizontální přehlídka a plovoucí karty ve scrollovacích scénách, nekonečný pás značek, přechod mezi stránkami.
- **Kontextový kurzor**: „Zobrazit“ nad produkty a kategoriemi, „Táhnout“ nad karusely, „Zvětšit“ v galerii, „Další ⟶“ nad sliderem. Magnetická hlavní tlačítka.
- **Produktové karty**: velká fotka 4:5, při najetí prolnutí do fotky v interiéru, rychlý nákup, oblíbené a porovnání.
- **Karusely** tažením myší se setrvačností a ukazatelem průběhu.
- **Detail produktu**: velká galerie (na mobilu posuvná se značkami), lepicí panel s nákupem, mobilní nákupní lišta, související produkty v karuselu.
- **Hlavička** se skrývá při posouvání dolů, nad heroem je průhledná s bílým logem. Logo **Brave Shop** všude (hlavička, patička přes celou šířku, favicon).
- Podpora `prefers-reduced-motion` (vše statické), klávesnice, dialogů a mobilu (390 px bez vodorovného přetečení).

## Zachované funkce

Oznámení, kategorie s mega menu a podkategoriemi, katalog (řazení, mřížka/seznam, načítání dalších, počet na stránku), pokročilé filtry, živé hledání bez diakritiky, detail s variantami, specifikací, výrobcem a poradnou, oblíbené, porovnání až 4 produktů, tisk/PDF, sdílení odkazu, hlídání ceny, košík v bočním panelu s limitem skladu, třikrokový checkout se slevovými kódy BRAVE5 / JARO2026, firemními údaji a jinou adresou, účet s objednávkami a věrnostními body, CZK/EUR, chat poradny, cookies, newsletter, blog a 20 obsahových stránek. Každý styl má vlastní košík, oblíbené, porovnání a objednávky (`localStorage`).

## Fotografie (Magnific)

Všechny fotografie jsou vygenerované přes Magnific MCP (model Nano Banana 2, 2k), uložené v `dist/assets/m/` jako WebP ve dvou velikostech (`název.webp` max 1600 px, `název-s.webp` 720 px, `srcset`).

- **Interiér** (24 produktů + 14 scén): převzato z dříve vygenerované sady v `../braveshop-redesign/theme/media` skriptem `tools/interior-media.mjs`.
- **Sport a Výživa** (25 produktů + 12 scén): vygenerováno 11. 11. 2026, mapa identifikátorů v `tools/fetch-magnific.mjs`, originální PNG v `raw/` (mimo git). Jedna scéna (míč na hřišti) byla přegenerována kvůli logu podobnému značce.

Jde o ilustrační fotografie bez log a textů; nezobrazují skutečné výrobky. Barvy variant fotografie nepřebarvují. Původní snímky z Unsplash, dummyjson a video Mixkit byly z webu odstraněny.

## Sport v2 (17. 11. 2026)

Sortiment Sportu přestavěn podle nabídky horského specialisty (inspirace barnexsport.cz): **Cyklistika** (silniční, horská a elektrokola, helmy, tretry), **Lyžování** (lyže, boty, helmy a brýle), **Skialp a běžky**, **Snowboard** a **Turistika** (boty, bunda, batoh, hole). 17 produktů v cenách 2 490–119 990 Kč místo míčků a košíčků. Všech 26 fotek (17 produktů + 9 horských scén) nově vygenerováno v Magnificu (mapa v `tools/fetch-magnific.mjs`, prefixy `o-` a `out-`). Texty „Brave Active“ a „Brave Pantry“ jsou z webu odstraněny; produkty bez výrobce značku nezobrazují.

## Výživa v2 (17. 11. 2026)

Sortiment Výživy přestavěn na prémiovou zdravou výživu podle nabídky specializovaného obchodu (inspirace jen-zdrave.cz): **Superpotraviny** (chia, goji, spirulina, maca), **Ořechy a plody** (mandle, kešu, datle Medjool), **Oříšková másla**, **Doplňky stravy** (rostlinný protein, kolagen, omega-3 z řas), **Přírodní kosmetika** (bambucké máslo s aloe vera, arganový olej) a **Čaje a matcha**. 16 produktů za 149–899 Kč, všechny jako vlastní řada v obalech s logem Brave Shop. Obaly vygenerovány v Magnificu (Nano Banana 2) s nahraným logem jako předlohou; k tomu 6 scén (prefixy `h-` a `hz-`). Texty na obalech jsou ilustrační, nejde o skutečné etikety ani výživová tvrzení.

## Zástupná loga značek

Pás „V dobré společnosti“ používá 25 smyšlených log vygenerovaných v Magnificu jako vektory (Recraft v4 Pro Vector): Interiér Nordvik, Atelier Lumo, Havn, Oakline, Sollen, Mira Studio, Kora, Fjeld & Co; Sport Altrova, Nordgrat, Velora, Firnline, Trailkin, Skarn, Hochvent, Pelvo, Kammweg; Výživa Olivea, Zrno, Bylinka, Polana, Kvas & Co, Lesana, Sad Hora, Molino. Skript `tools/logos.mjs` stáhne SVG, odstraní pozadí a ořízne okraje do `dist/assets/logos/`. Jde o zástupná loga; ostrý obchod je nahradí logy skutečných výrobců. Shodu názvů s existujícími ochrannými známkami jsme neověřovali.

## Rozsah a hranice

Maketa, ne migrace e-shopu: žádné skutečné přihlášení, platby, sklad, expedice, chat ani e-maily. Ceny, sklad, parametry a hodnocení Heureka 4,9 / 5 jsou ilustrační. Formuláře nic neodesílají.

## Ověření (tools/test.mjs, 17 testů, konzole bez chyb)

Košík 2 ks + BRAVE5 + dokončení objednávky, rychlý nákup, filtr látka do 10 000 Kč, oblíbené a porovnání, hledání „kreslo“, slider, taby, taby a zoom v detailu, účet, EUR, chat a cookies, Sport (míč Court 749 Kč, Velikost 7), Výživa (ovoce do 60 Kč → jablka a citrony), přepínač stylů, mobilní menu a nákupní lišta, všech 20 obsahových stránek, žádný rozbitý obrázek ve třech stylech.
