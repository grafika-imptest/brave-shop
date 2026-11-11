# Brave Shop — tři světy jedné šablony

Interaktivní statická maketa redesignu e-shopu. Inspirována původním demem https://demo.braveshop.cz/ a prostorovým, obrazovým pojetím reference https://wonder-theme-interior.myshopify.com/. Vlastní kompozice, texty a implementace. Přepínač vlevo dole mění celý obchod: Interiér, Sport a Výživa. Přímé odkazy používají `?style=interior`, `?style=sport` a `?style=nutrition`.

## Spuštění a GitHub Pages

1. Nahrajte obsah tohoto projektu do GitHub repozitáře na větev `main`.
2. V repozitáři nastavte **Settings → Pages → Source → GitHub Actions**.
3. Přiložený workflow zveřejní složku `dist`. Není potřeba instalace balíčků ani sestavení.

Alternativně lze samotný obsah `dist` nahrát do kořene repozitáře nebo složky `docs` a publikovat přes Pages z větve. Soubor `.nojekyll` ponechte přítomný.

Relativní cesty a navigace za `#` fungují také v projektové podsložce GitHub Pages, včetně obnovení detailů produktů. Lokálně: `npm run dev`, otevřete http://localhost:4173. Kontrola syntaxe: `npm run check`.

## Co maketa obsahuje

| Oblast původního dema | Zpracování v maketě |
| --- | --- |
| Oznámení a úvodní slider | Ručně přepínatelné, bez automatického rušení čtení |
| Kategorie a podkategorie | Šest hlavních kategorií, rozbalovací menu, podkategorie |
| Katalog | Interiér 18, Sport 13 a Výživa 12 ukázkových produktů; řazení, mřížka/seznam, načítání dalších |
| Pokročilé filtrování | Interiér: původní sada parametrů. Sport a Výživa: cena, typ produktu, štítky a sklad. Relevantní varianty a porovnání pro každý styl. |
| Vyhledávání | Živé hledání bez diakritiky podle názvu, značky, materiálu a kategorie |
| Detail produktu | Galerie, zvětšení, specifikace, výrobce/dodavatel, poradna, barva, povrch, záruka, množství, sklad |
| Doplňkové akce | Oblíbené, porovnání do 4 produktů, tisk / uložit jako PDF, kopírování odkazu, formulář hlídání ceny |
| Košík | Boční panel, více variant, množství, odebrání, mezisoučet, limit skladového množství napříč variantami |
| Objednávka | Doprava, platba, slevové kódy, kontaktní/firemní údaje, jiná adresa, kontrola a ukázkové dokončení |
| Účet | Ukázkové přihlášení, registrace, obnova hesla, osobní údaje, objednávky, věrnostní body |
| Obsah | Blog a články, události, aktuality, příběh značky, FAQ, kontakty, poradna, konzultace, výrobci, dodavatelé, reference, recenze, slovník, mapa stránek a informační stránky |
| Newsletter a formuláře | Místní validace a ukázkové potvrzení bez odesílání |
| Chat a cookies | Ukázková poradna s předpřipravenými odpověďmi, panel soukromí |
| Jazyk a měna | Česká verze; přepínání CZK/EUR pevným ukázkovým kurzem 25 Kč/EUR |

## Rozsah a hranice

Jde o maketu, nikoli migraci původního e-shopu. Neobsahuje původní kompletní katalog, administraci CMS, skutečné přihlašování, synchronizaci skladu, platební bránu, expedici, reálný chat ani e-mailové služby. Tyto interakce jsou demonstrovány lokálně. Překlady do dalších jazyků nejsou součástí. Panel Heureka používá zřetelně označené ilustrační hodnocení 4,9 / 5; není napojen na živý feed ani certifikaci konkrétního prodejce.

Fotografie jsou ilustrační a nemusí zobrazovat model či značku uvedenou u ukázkového produktu. Barvy variant nepřebarvují fotografie. Ceny, skladové počty, technické parametry, slevy a služby jsou ukázková data; v ostrém řešení je nahradí data klienta. Hlídání ceny a formuláře žádnou službu neaktivují. Platební symboly ukazují možnosti šablony, žádná platební služba není napojena.

Košík, oblíbené, porovnání, preference, profil a přehled ukázkových objednávek se uchovávají v `localStorage` tohoto prohlížeče. Každý styl má vlastní košík, oblíbené, porovnání a objednávky. Profil a měna jsou společné. Hesla ani platební údaje se neukládají. Kontaktní údaje objednávky se neodesílají a po dokončení se neuchovávají v historii objednávek. Vymazáním dat webu lze demo resetovat.

## Fotografie a design

Přes připojený Magnific MCP byly vyhledány a staženy:

- **Sofa with shadows in the living room** — Freepik/Magnific stock 11789480, `magnific-sofa.jpg`.
- **Beautiful and modern plants deco** — Freepik/Magnific stock 20823797, `magnific-interior.jpg`.
- **Closeup shot of a soft fancy chair on a white plain background** — Freepik/Magnific stock 31177812, `magnific-chair.jpg`.

Staženy jako stock fotografie s filtrem bez AI; třetí soubor může mít charakter studiové vizualizace. Použití se řídí licencí účtu, přes který byly získány. Uchovejte si doklady z fotobanky pro případ veřejného produkčního užití.

Ostatní ilustrační snímky jsou z Unsplash; jsou uložené lokálně ve `dist/assets`. Web nevyužívá dočasné podepsané odkazy Magnificu. Celý web používá jedinou rodinu písma Manrope z Google Fonts s lokální systémovou zálohou. Sekundární patkové a kurzivní písmo bylo odstraněno.

Nové fotografie Unsplash: sportHero `1517836357463-d25dfeac3438`, sportGym `1534438327276-14e5300c3a48`, sportTraining `1518611012118-696072aa579a`, sportDetail `1540497077202-7c8a3999166f`, foodHero `1490645935967-10de6ba17061`, foodFresh `1542838132-92c53300491e`, foodBowl `1511690743698-d9d85f2fbf38`, foodDetail `1540420773420-3366772f4999`.

Základní produktové výřezy pro prototyp pocházejí z veřejného demonstračního katalogu https://dummyjson.com/docs/products (Furniture, Sports Accessories a Groceries). Fotografie nábytku ve scénách ilustrují kategorii a nemusí zobrazovat totožný model s detailem produktu.

Přes Magnific bylo pomocí dodaného SVG loga upraveno 7 produktů: protein, med, olej, voda, basketbalový míč, fotbalový míč a tenisová raketa. Každý výstup je průhledný PNG 1000 × 1000 px; soubory `brave-*.png` slouží katalogu, detailům, košíku i scrollovacím scénám. Výstupy jsou uložené v projektu Personal v Magnificu. Celkem 7 úprav Ideogram 4.5 Medium po 80 kreditech a 7 odstranění pozadí po 3 kreditech = 581 kreditů. Jde o ilustrační obaly a vybavení pro demo, nikoli výrobní etikety nebo skutečnou nabídku těchto výrobků.

Vzhled: teplý světlý podklad, olivová, velká typografie, fotografie až k okrajům, jemné odhalování sekcí, zoom při najetí, kontextový kurzor a body pro nákup z interiéru. Podpora `prefers-reduced-motion`, klávesnice, dialogů a mobilního rozložení.

Sport má tmavou zelenou a limetkovou identitu; Výživa krémovou a zelenou. Každý styl má vlastní texty, fotografie, katalog, doporučení i magazín. Na HP jsou dvě scrollovací scény: velký text s plovoucími výřezy produktů a horizontální produktová přehlídka. Produkty lze rozkliknout. Při omezeném pohybu se scény zobrazí jako statické rozložení.

## Doplněný obsah podle původního dema

Na HP přibyl panel Heureka, souhrn důvěryhodnosti, první nákup s kódem BRAVE5, věrnostní program, rozbalovací otázky a kontakt na poradnu. Místo obecného tvrzení o 4 800 skladových položkách je uveden skutečný počet produktů této ukázky. Neaktuální sezónní odpočet ani neověřené expediční sliby se nepřebírají. Ostrý obchod připojí vlastní hodnocení, sklad a reálné obchodní podmínky.

## Ověření

- Kontrola syntaxe JavaScriptu.
- V prohlížeči: přidání 2 ks olivové varianty do košíku, přepočet 18 828 Kč, kód BRAVE5 → 17 887 Kč, průchod a dokončení ukázkové objednávky.
- Filtr látka + cena do 10 000 Kč → 2 odpovídající produkty.
- Uložení oblíbeného produktu a srovnání dvou produktů.
- Vizuální kontrola úvodní stránky na počítači a při šířce 390 px.
- Přepnutí všech tří stylů, samostatné košíky a fotografie bez chybějících souborů.
- Sport: míč Court za 749 Kč s variantou Velikost 7. Výživa: protein za 549 Kč s variantou 1 balení, bez nábytkových parametrů.
- Výživa: filtr Ovoce do 60 Kč → jablka a citrony; BRAVE5 s dopravou → celkem 671 Kč.
- Vizuální kontrola 7 značkových produktů a mobilní scrollovací scény s výřezy bez pozadí.

Kontrola všech kombinací parametrů ani ověření parity s administrací původního CMS není součástí této makety.


## Dodaná identita Brave Shop

V hlavičce i patičce je originální soubor brave_shop_logo.svg dodaný uživatelem; favicon používá dodaný symbol brave_favicon.svg. Původní logo IMPnet již není součástí webu.

## Bezplatné video v úvodu

Na prvním snímku úvodního banneru je video „Modern living room with wooden furniture“, autor Edgar Fernandez, Mixkit: https://mixkit.co/free-stock-video/modern-living-room-with-wooden-furniture-3090/. Konkrétní stránka uvádí bezplatné komerční i osobní použití pod Mixkit Stock Video Free License: https://mixkit.co/license/#videoFree. Staženo 10. listopadu 2026, bez placeného účtu a bez použití kreditů Magnific.

Lokální soubor hero-room.mp4 má přibližně 3 MB a délku 10 sekund. Přehrává se bez zvuku ve smyčce, s možností pozastavení. Na mobilu, při omezení animací nebo dat se vloží pouze fotografie; video se pro tyto návštěvy vůbec nevloží. Po opuštění viditelné oblasti či skrytí záložky se přehrávání pozastaví. Při chybě přehrávání zůstane obrázková záloha. Druhý snímek slideru zůstává fotografický.

Vyřazený klip Magnific není součástí webu ani exportu.
