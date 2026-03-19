/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ChevronRight, 
  Calendar, 
  User, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone,
  Youtube,
  Star,
  Globe,
  Menu,
  X,
  MessageCircle,
  Link,
  Instagram,
  Facebook,
  Linkedin,
  Percent,
  Coins,
  Zap,
  Gift,
  Mountain,
  Compass,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content?: React.ReactNode;
  categories: string[];
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

// --- Icons ---
const IconCoppie = () => (
  <div className="relative flex items-center">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
    <div className="absolute -top-1 -right-1">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  </div>
);

const IconFamiglie = () => (
  <div className="flex items-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Left Adult */}
      <path d="M7 21v-2a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v2" />
      <circle cx="3.5" cy="11" r="3" />
      {/* Right Adult */}
      <path d="M24 21v-2a3 3 0 0 0-3-3h-1a3 3 0 0 0-3 3v2" />
      <circle cx="20.5" cy="11" r="3" />
      {/* Child in middle */}
      <path d="M15 21v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  </div>
);

// --- Mock Data ---
const CATEGORIES: Category[] = [
  { id: 'all', name: 'Tutti gli articoli' },
  { id: 'garda', name: 'Lago di Garda', icon: <Compass size={14} /> },
  { id: 'sicilia', name: 'Sicilia', icon: <MapPin size={14} /> },
  { id: 'citta', name: 'Città', icon: <Globe size={14} /> },
  { id: 'tips', name: 'Tips', icon: <Zap size={14} /> },
  { id: 'attivita', name: 'Attività', icon: <Mountain size={14} /> },
  { id: 'famiglie', name: 'Famiglie', icon: <IconFamiglie /> },
  { id: 'coppie', name: 'Coppie', icon: <IconCoppie /> },
];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Peschiera del Garda: guida tra canali, storia e tramonti d'oro",
    excerpt: "Immaginate una cittadina dove l’acqua del lago abbraccia antiche mura veneziane, dove i ponti sembrano usciti da un dipinto e l’aria profuma di vacanza.",
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-red-700 pl-10 md:pl-20 py-2 break-words hyphens-none">
          Immaginate una cittadina dove l’acqua del lago abbraccia antiche mura veneziane, dove i ponti sembrano usciti da un dipinto e l’aria profuma di vacanza. Benvenuti a <strong>Peschiera del Garda</strong>, un gioiello fortificato che non è solo una meta, ma un’esperienza da vivere con lentezza.
        </p>
        
        <p className="text-lg text-slate-700 leading-relaxed">
          Che siate amanti della fotografia, appassionati di storia o semplicemente in cerca di un angolo di relax, Peschiera saprà conquistarvi. Ecco come trascorrere un pomeriggio perfetto in questo borgo <strong>Patrimonio UNESCO</strong>.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Un tuffo nel passato: perché Peschiera è unica</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Non capita tutti i giorni di passeggiare all'interno di una fortezza che ha cambiato il corso della storia. Peschiera deve la sua forma a stella e la sua fama alle imponenti <strong>fortificazioni veneziane</strong>. 
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il centro storico è un labirinto pedonale racchiuso tra canali e bastioni, dove ogni pietra racconta secoli di strategie militari e vita lacustre. La sua posizione strategica, proprio dove il Garda confluisce nel fiume Mincio, l'ha resa nei secoli una delle città murate più importanti d'Italia.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Da dove iniziare: il richiamo del Lungolago Mazzini</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il modo migliore per entrare in sintonia con il ritmo del lago è iniziare dal <strong>Lungolago Mazzini</strong>. 
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Passeggiate con il sole sul viso, ammirando le montagne che si stagliano all'orizzonte come una cornice naturale. Da qui, la vista sulle mura è maestosa: è il preludio perfetto prima di varcare le soglie del centro. Al termine della passeggiata, lasciatevi guidare dai profumi dei caffè e dei ristoranti che animano l'ingresso del borgo.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Cosa vedere a Peschiera: i tesori del borgo fortificato</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Varcare le porte storiche, come <strong>Porta Brescia</strong> o <strong>Porta Verona</strong>, è come attraversare un portale temporale. Il centro è compatto, accogliente e interamente pedonale.
        </p>

        <h3 className="text-2xl font-serif font-medium text-slate-900 mt-8">Il Ponte dei Voltoni: l’icona di Peschiera</h3>
        <p className="text-lg text-slate-700 leading-relaxed">
          Se c’è un luogo che non potete assolutamente perdere, è il <strong>Ponte dei Voltoni</strong>. Con le sue grandi arcate in cotto che si riflettono nel Canale di Mezzo, è il punto più fotografato della città. 
        </p>
        <div className="bg-red-50 p-6 pl-10 md:pl-20 rounded-2xl border-l-4 border-red-700 my-6 break-words hyphens-none">
          <p className="text-red-900 font-medium">
            <strong>Il consiglio dell'esperto:</strong> Aspettate il <strong>tramonto</strong>. Quando la luce calda del sole calante colpisce i mattoni e si specchia sull'acqua, l'atmosfera diventa pura magia.
          </p>
        </div>

        <h3 className="text-2xl font-serif font-medium text-slate-900 mt-8">Piazza Ferdinando di Savoia</h3>
        <p className="text-lg text-slate-700 leading-relaxed">
          Conosciuta anche come Piazza d'Armi, è il cuore pulsante della vita cittadina. Fermatevi per un aperitivo tra i palazzi storici, osservate il viavai e godetevi la vivacità di questo spazio che ospita eventi e mercatini durante tutto l'anno.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Non solo storia: sport, natura e relax</h2>
        <ul className="list-disc pl-6 space-y-4 text-lg text-slate-700">
          <li><strong>La Ciclabile del Mincio:</strong> Sapevate che da qui parte una delle piste ciclabili più belle d'Europa? Potete pedalare lungo il fiume fino a Mantova, o semplicemente godervi i primi chilometri immersi nel verde.</li>
          <li><strong>Golf Paradiso del Garda:</strong> A pochi minuti dal centro, vi aspetta un'oasi di pace per una sfida sul green con vista sulle colline.</li>
          <li><strong>Spiagge per ogni desiderio:</strong> Cercate un tuffo veloce? La <strong>Spiaggia dei Cappuccini</strong> è a due passi. Viaggiate con la famiglia? Il <strong>Lido Campanello</strong> è super attrezzato.</li>
        </ul>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Eventi da segnare in agenda</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Peschiera sa come festeggiare le sue tradizioni. Se pianificate la vostra visita a fine agosto, non perdetevi il <strong>Palio delle Mura</strong>: i canali si animano con regate storiche, musica e stand gastronomici.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Consigli pratici: come raggiungere il centro</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Soggiornando presso i nostri hotel, raggiungere Peschiera è semplicissimo grazie al nostro servizio navetta gratuita dal <strong>Parc Hotel</strong>. Se preferite l'auto, avete due ottime soluzioni: il <strong>Parcheggio Campo Sportivo</strong>, un'ottima opzione gratuita a soli 10 minuti a piedi dal centro, oppure il <strong>Parcheggio Centro Storico (a pagamento)</strong>, a soli 3 minuti a piedi dal centro, estremamente comodo se desideri fermarti vicino a negozi e ristoranti.
        </p>
      </div>
    ),
    categories: ['garda'],
    date: '27 Febbraio 2026',
    author: 'Redazione Travel',
    image: '/centropeschiera.png',
    featured: true
  },
  {
    id: 2,
    title: "Ciclabile del Mincio: itinerario in bici per famiglie tra natura e borghi",
    excerpt: "Pedala lungo le rive del fiume in un percorso pianeggiante e sicuro, perfetto per una giornata in famiglia o un'immersione totale nel verde tra Peschiera e Borghetto.",
    categories: ['attivita', 'famiglie'],
    date: '27 Febbraio 2026',
    author: 'Redazione Travel',
    image: '/biciminciofoto.png',
    content: (
      <div className="space-y-8 break-words hyphens-none">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Chiudi gli occhi e immagina: il fruscio leggero delle ruote sull'asfalto, il mormorio costante del fiume che ti accompagna e il profumo dell'erba bagnata che sale dagli argini. Benvenuti sulla <strong>Ciclabile del Mincio</strong>, dove il tempo rallenta e ogni pedalata è un invito alla scoperta.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
          Considerata uno degli itinerari più amati del <strong>Nord Italia</strong>, questa "<strong>autostrada verde</strong>" collega il <strong>Lago di Garda</strong> alla pianura mantovana in un abbraccio di natura e storia. Che tu sia un <strong>ciclista esperto</strong> in cerca di una sgambata rigenerante o una <strong>famiglia con bambini</strong> desiderosa di una gita sicura e senza stress, questo percorso saprà conquistarti.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Un tracciato per tutti: sicurezza e panorami</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il segreto del suo successo? È <strong>completamente pianeggiante</strong>. Dimentica le salite faticose: qui si pedala in totale relax, lontani dal traffico e immersi in un paesaggio che muta dolcemente tra pioppi, canneti e specchi d'acqua. 
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il percorso completo si snoda per circa 45 km fino a Mantova, ma per una giornata indimenticabile ti consigliamo il tratto più scenografico: quello che da <strong>Peschiera del Garda</strong> conduce al borgo incantato di <strong>Borghetto sul Mincio</strong>.
        </p>

        <div className="bg-slate-50 rounded-3xl p-8 my-12 border border-slate-100">
          <h3 className="text-xl font-bold mb-4 flex items-center text-slate-900">
            <Search size={20} className="mr-2 text-brand-red" /> Scheda Tecnica (Tratto Consigliato)
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
            <li><strong>Percorso:</strong> Peschiera - Borghetto</li>
            <li><strong>Distanza:</strong> 14-15 km</li>
            <li><strong>Durata:</strong> 1 - 1,5 ore (ritmo tranquillo)</li>
            <li><strong>Difficoltà:</strong> Facile / Per tutti</li>
          </ul>
        </div>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Tappa dopo tappa: da Peschiera a Borghetto</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          La tua avventura inizia a <strong>Peschiera del Garda</strong>, proprio all'imbocco della ciclabile, facilmente raggiungibile dal centro storico. Appena lasciata la cittadina, ti ritroverai subito immerso nel verde. Il tracciato segue fedelmente l'argine del fiume, offrendo continui scorci sull'acqua che faranno la gioia degli appassionati di fotografia.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Lungo il tragitto incontrerai graziosi ponticelli e <strong>aree verdi ombreggiate</strong>, ideali per una piccola sosta merenda con i bambini o semplicemente per respirare l'aria pura della valle del Mincio.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">L'arrivo a Borghetto: un gioiello fuori dal tempo</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Dopo circa 15 km, la fatica (poca!) viene ricompensata da una vista da cartolina: <strong>Borghetto sul Mincio</strong>. Questo piccolo gioiello, annoverato tra i borghi più belli d'Italia, sembra essersi fermato nel Medioevo. 
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Qui potrai sgranchirti le gambe tra mulini antichi, casette in pietra e i riflessi magici del fiume. Non perdere una passeggiata sul maestoso <strong>Ponte Visconteo</strong>, che domina la valle e offre una prospettiva scenografica su tutto il borgo. È il luogo perfetto per un pranzo informale o un gelato artigianale prima di riprendere la via del ritorno.
        </p>

        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12">Consigli da insider: quando andare?</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          La ciclabile è splendida tutto l'anno, ma dà il meglio di sé in <strong>primavera</strong> e all'inizio dell'<strong>autunno</strong>, quando i colori della natura esplodono e le temperature sono miti. Se decidi di percorrerla in estate, il consiglio è di partire al mattino presto o nel tardo pomeriggio per goderti la luce dorata del tramonto che si riflette sul fiume.
        </p>

        <div className="bg-brand-red/5 rounded-3xl p-8 mt-12 border border-brand-red/10">
          <h3 className="text-xl font-bold mb-4 text-slate-900">Informazioni Pratiche</h3>
          <p className="text-slate-700 mb-4">Puoi iniziare la pedalata da diversi punti strategici dotati di <strong>parcheggio gratuito</strong>:</p>
          <ul className="space-y-3 text-slate-600">
            <li><span className="text-brand-red mr-2">•</span> <strong>Via Campo Sportivo (Peschiera):</strong> Comodo per chi vuole visitare anche il centro storico.</li>
            <li><span className="text-brand-red mr-2">•</span> <strong>Via Valeggio:</strong> Vicino ai caselli autostradali, perfetto per un accesso rapido.</li>
            <li><span className="text-brand-red mr-2">•</span> <span className="whitespace-nowrap"><strong>La Littorina del Mincio (Valeggio):</strong></span> Un punto di sosta amato dai ciclisti, ideale per chi preferisce partire da metà percorso.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Parchi del Garda: da Gardaland alle gemme del lago, i 7 parchi imperdibili tra adrenalina e magia",
    excerpt: "Ai tuoi figli la piscina non basta più? Cerchi un'avventura che faccia battere il cuore anche a te? Scopri la capitale del divertimento.",
    categories: ['attivita', 'famiglie'],
    date: '26 Febbraio 2026',
    author: 'Redazione Travel',
    image: '/Gardaland.jpeg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Ai tuoi figli la piscina non basta più? Cerchi un'avventura che faccia battere il cuore anche a te? Il Lago di Garda è la capitale europea del divertimento, e non è difficile capire perché.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">1. Gardaland Park: Dove i sogni diventano giostre</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          È inutile girarci intorno: <strong>Gardaland</strong> è un’istituzione. È una vera città del divertimento dove i più piccoli possono scorrazzare tra giostre a loro misura, mentre i più coraggiosi si lanciano in montagne russe da capogiro. 
        </p>
        <div className="bg-brand-red/5 p-8 rounded-3xl border border-brand-red/10 my-12">
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-brand-red block mb-2 uppercase tracking-widest text-xs">Lo sapevi?</strong>
            Data la vicinanza delle nostre strutture al parco divertimenti di Gardaland ogni anno proponiamo una <strong>tariffa speciale</strong> che ti permette di avere soggiorno e pasti da noi e un <strong>biglietto a testa per Gardaland già incluso</strong> nella tariffa. Non farti scappare questa occasione!
          </p>
        </div>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">2. Sea Life Aquarium: Un tuffo nel mondo sottomarino</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il tempo è grigio? Niente paura. Il <strong>SEA LIFE Aquarium</strong> trasforma una giornata di pioggia in un’avventura negli abissi. Passeggiando tra tunnel trasparenti, potrai osservare squali, razze e pesci coloratissimi che ti nuotano sopra la testa. È un’esperienza che incanta i bambini e sorprende gli adulti con curiosità incredibili sul mondo marino.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">3. Movieland Park: Luci, camera... azione!</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Per chi ama il cinema e l’azione, <strong>Movieland</strong> è il posto dove i film prendono letteralmente vita. Non aspettarti le solite giostre: qui sarai catapultato su set interattivi, tra stuntman professionisti e acrobazie spettacolari. È il parco dove l'adrenalina incontra il grande schermo.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">4. Caneva Aquapark: Il regno del relax rinfrescante</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Quando il sole scotta, <strong>Caneva</strong> è la risposta. Scivoli mozzafiato per i ragazzi, piscine con le onde e zone relax immerse nel verde per chi vuole solo staccare la spina. È come avere un angolo di Caraibi proprio qui, sulle sponde del Garda.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">5. Parco Cavour: Avventure d’acqua nel verde</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Immagina un parco acquatico immerso in un immenso prato verde. <strong>Parco Cavour</strong> è perfetto per le famiglie che cercano un mix di divertimento e tranquillità. Tra lagune di sabbia bianca e torrette d'acqua, i bambini corrono liberi mentre i genitori si godono l'ombra delle palme.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">6. Parco Natura Viva: Un safari a portata di mano</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Vuoi vedere un leone da vicino? Al <strong>Parco Natura Viva</strong> puoi farlo. È un grande centro di tutela della biodiversità dove puoi fare un vero safari in auto o passeggiare tra specie esotiche e locali. Un’esperienza che unisce meraviglia, divertimento ed educazione ambientale.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">7. Parco Giardino Sigurtà: Natura da cartolina</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Se cerchi la pace assoluta, il <strong>Sigurtà</strong> è la tua meta. È un’oasi di fiori, laghetti e alberi secolari. Ideale per una lunga passeggiata a piedi o in bicicletta, lontano dal caos, immersi nei colori di uno dei giardini più belli del mondo.
        </p>

        <div className="mt-16 p-8 pl-10 md:pl-20 bg-slate-50 border-l-4 border-brand-red rounded-r-3xl text-left shadow-sm break-words hyphens-none">
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Per vivere al meglio queste avventure e assicurarti l'accesso senza attese, puoi acquistare i biglietti per i parchi direttamente su questo sito:
          </p>
          <div className="mt-16 flex justify-center">
            <a 
              href="https://parchotel.gardaway.it/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-red text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-red-900/20 hover:bg-red-800 hover:scale-105 transition-all active:scale-95 btn-centered"
            >
              Acquista i tuoi biglietti qui
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Terme di Sirmione e del Garda: fuga romantica tra vapori e relax",
    excerpt: "Il Lago di Garda ha un modo tutto suo di sussurrare parole d'amore. Scopri gli angoli di paradiso dove l'acqua termale diventa il segreto di una complicità ritrovata.",
    categories: ['coppie'],
    date: '26 Febbraio 2026',
    author: 'Redazione Travel',
    image: '/idromassaggimodelli.jpg',
    content: (
      <div className="space-y-8 text-left">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Per una coppia, non c'è niente di più rigenerante di una fuga dedicata al benessere, dove il tempo sembra fermarsi tra il calore dei vapori e il profumo degli ulivi. Se state sognando un weekend di puro relax, le sponde veronesi e bresciane offrono angoli di paradiso dove l'acqua diventa l'ingrediente segreto di una complicità ritrovata.
        </p>
        
        <p className="text-lg text-slate-700 leading-relaxed">
          Scopriamo insieme le tre perle del Garda e le esperienze wellness che le rendono uniche.
        </p>

        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12 break-words hyphens-none">Sirmione: L'abbraccio dell'Acqua Termale e della Storia</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Sirmione, la <strong>"Perla del Garda"</strong>, è una lingua di terra che si allunga nel blu, dove l'esperienza termale è legata a doppio filo con la storia millenaria del borgo.
        </p>
        <ul className="space-y-4 text-lg text-slate-700">
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Borgo:</strong> Passeggiare mano nella mano tra le mura del <strong>Castello Scaligero</strong> e i vicoli del centro storico è il preludio perfetto al relax.
          </li>
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Benessere in Centro:</strong> Proprio nel cuore della penisola, la vera protagonista è l'<strong>acqua sulfurea salsobromoiodica</strong>. È un'acqua preziosa che sgorga dal fondo del lago e porta con sé i benefici della terra. Immergersi in una vasca termale in pieno centro, con lo sguardo che spazia verso l'orizzonte mentre il vapore sale leggero, è un rito che rigenera corpo e spirito.
          </li>
        </ul>

        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12 break-words hyphens-none">Lazise: Relax nei Parchi Termali immersi nel Verde</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Poco più a sud, Lazise accoglie i visitatori con la sua eleganza senza tempo e le sue mura merlate. Qui, il benessere trova la sua massima espressione nel contatto con la natura.
        </p>
        <ul className="space-y-4 text-lg text-slate-700">
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Borgo:</strong> Il centro storico di Lazise è un salotto a cielo aperto, ideale per uno shopping di coppia o un aperitivo vista porto.
          </li>
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Benessere nel Verde:</strong> A pochi passi dal centro abitato, il relax si vive tra <strong>parchi termali e alberi secolari</strong>. È un'esperienza sensoriale completa: il suono dell'acqua che scorre tra le rocce e il calore delle piscine naturali. È il luogo ideale per ritrovare la propria dimensione, magari lasciandosi coccolare da <strong>idromassaggi sotto le stelle</strong>.
          </li>
        </ul>

        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12 break-words hyphens-none">Bardolino: Benessere e Vista Lago Mozzafiato</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Bardolino è sinonimo di armonia. Celebre per i suoi vigneti e per la bellezza del suo lungolago, questo borgo offre un approccio al wellness che unisce la cura del corpo alla contemplazione del paesaggio.
        </p>
        <ul className="space-y-4 text-lg text-slate-700">
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Borgo:</strong> Un centro vivace, perfetto per chi cerca un equilibrio tra attività e riposo, tra una camminata tra i filari e una sosta nelle piazze eleganti.
          </li>
          <li>
            <span className="text-brand-red mr-2">•</span> <strong>Il Benessere a Bardolino:</strong> In questa zona, le spa sono progettate come estensioni naturali del territorio. Molti centri wellness d'eccellenza sorgono proprio a ridosso del centro dove le aree relax offrono <strong>viste mozzafiato</strong> e permettono di ammirare la luce che cambia colore sulle acque mentre ci si rigenera tra saune e percorsi emozionali.
          </li>
        </ul>

        <div className="mt-16 p-8 pl-10 md:pl-20 bg-slate-50 border-l-4 border-brand-red rounded-r-3xl text-left shadow-sm break-words hyphens-none">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Il Benessere firmato Parc Hotels Italia</h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Se cercate il massimo della comodità senza rinunciare alla privacy, le nostre strutture offrono oasi di pace strategiche:
          </p>
          <ul className="space-y-6 text-lg text-slate-700">
            <li className="break-words hyphens-none">
              <span className="text-brand-red mr-2">•</span> <strong>A Peschiera del Garda:</strong> All'interno del <a href="https://www.parchotelpeschiera.it/centro-benessere/" target="_blank" rel="noopener noreferrer">Parc Hotel</a> e dell'<a href="https://www.activehotelparadisopeschiera.it/centro-benessere/" target="_blank" rel="noopener noreferrer">Active Hotel Paradiso & Golf</a>, troverete il centro <strong>Paradiso Wellness</strong>.
            </li>
            <li className="break-words hyphens-none">
              <span className="text-brand-red mr-2">•</span> <strong>A Bardolino:</strong> Potrete scegliere l'accoglienza del <a href="https://parchotelgrittibardolino.it/centro-benessere/" target="_blank" rel="noopener noreferrer">Parc Hotel Gritti</a> o l'esclusività del <a href="https://parchotelgermanobardolino.it/centro-benessere/" target="_blank" rel="noopener noreferrer">Parc Hotel Germano</a>, entrambi dotati di zone wellness e spa d'avanguardia.
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12 break-words hyphens-none">Un consiglio per il gran finale: il tramonto condiviso</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Una giornata dedicata al benessere sul Garda non può che concludersi con un rito semplice: il <strong>tramonto sul lungolago</strong>. Che siate a Sirmione, Lazise o Bardolino, cercate un molo tranquillo. Guardate insieme il sole che scompare dietro le colline, tingendo l'acqua di oro e viola. È in questo silenzio, con la pelle ancora calda e il cuore leggero, che si scopre la vera essenza di una fuga d'amore.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    title: "Bardolino: i migliori consigli per una vacanza perfetta tra natura e borgo",
    excerpt: "Tra vigneti, uliveti e scorci sul Lago di Garda, Bardolino è un borgo pittoresco dove storia, natura e buon cibo si incontrano. Scopri come vivere al meglio questo angolo di paradiso.",
    categories: ['garda'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/Bardolino.jpeg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Tra vigneti, uliveti e scorci sul Lago di Garda, Bardolino è un borgo pittoresco dove storia, natura e buon cibo si incontrano. Passeggiare tra i vicoli caratteristici, respirare l'aria dei piccoli porti e ammirare panorami sul lago rende ogni visita un'esperienza indimenticabile.
        </p>
        
        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Natura e Fascino</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Considerato uno dei borghi più affascinanti affacciati sul Lago di Garda, Bardolino combina paesaggi dolci e colline ricoperte di vigneti con un centro storico vivace e accogliente. Perfetto per passeggiate tranquille, fotografia e momenti di relax, il borgo offre scorci pittoreschi, piazze animate e un piccolo porto che raccontano la storia del luogo e l'antica tradizione vinicola.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Cosa fare a Bardolino in vacanza</h2>
        
        <h3 className="text-2xl font-serif font-medium text-slate-800">Passeggiate e lungolago</h3>
        <p className="text-lg text-slate-700 leading-relaxed">
          Inizia la tua visita con una passeggiata sul <strong>lungolago di Bardolino</strong>, tra acqua, panorami e locali affacciati sul lago. La passeggiata è ideale in ogni momento della giornata e regala scorci perfetti per fotografie memorabili.
        </p>

        <h3 className="text-2xl font-serif font-medium text-slate-800">Centro storico e porto</h3>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il cuore di Bardolino è il centro storico, fatto di vicoli pittoreschi, piazze vivaci e il piccolo porto dove si respira l'atmosfera autentica del borgo. Ogni angolo racconta una storia e invita a passeggiare con calma tra botteghe e locali tradizionali.
        </p>

        <h3 className="text-2xl font-serif font-medium text-slate-800">Attrazioni culturali</h3>
        <p className="text-lg text-slate-700 leading-relaxed">
          Bardolino custodisce piccoli grandi tesori da scoprire, come la <strong>Chiesa di San Severo</strong>, prezioso esempio di architettura romanica dell'XI secolo, e la <strong>Chiesa di San Zeno</strong>, intima e suggestiva. Il <strong>Parco di Villa Carrara Bottagisio</strong> e le spiagge lungo la riva completano l'esperienza, offrendo spazi perfetti per famiglie o un tuffo nelle acque del Garda.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Enogastronomia</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Bardolino è una zona rinomata per la sua tradizione enogastronomica e per i suoi vini di qualità. Il <strong>Museo del Vino – Cantina Zeni</strong> e il <strong>Museo dell'Olio d'Oliva</strong> accompagnano i visitatori in un viaggio affascinante tra storia, cultura e sapori locali.
        </p>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 my-12">
          <h2 className="text-2xl font-serif font-medium text-slate-900 mb-4">DA NON PERDERE: Punta San Vigilio</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            A pochi minuti dal centro di Garda si nasconde una delle perle più affascinanti del Lago di Garda: <strong>Punta San Vigilio</strong>, una sottile lingua di terra sospesa tra eleganza, natura e silenzio.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Qui si trova la celebre <strong>Baia delle Sirene</strong>, un parco privato con acque cristalline e natura rigogliosa, ideale per una giornata di puro relax lontano dalla routine.
          </p>
        </div>

        <div className="bg-red-50 p-6 pl-10 md:pl-20 rounded-2xl border-l-4 border-red-700 my-6 break-words hyphens-none">
          <p className="text-red-900 font-medium">
            <strong>Consiglio da insider:</strong> Se sei in città a fine primavera o inizio estate, partecipa al <strong>Palio del Chiaretto</strong>, la festa che celebra il celebre vino rosé di Bardolino tra degustazioni e musica.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Come raggiungere il porto di Bardolino dai nostri hotel</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-red-700 rounded-full flex-shrink-0"></span>
              <span><strong>Parc Hotel Gritti:</strong> 10 minuti a piedi dal porto</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 mt-2 mr-3 bg-red-700 rounded-full flex-shrink-0"></span>
              <span><strong>Parc Hotel Germano:</strong> 17 minuti a piedi oppure 5 minuti in macchina (parcheggio Prandini)</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: "Bardolino: itinerario ciclo-pedonale da Lazise a Garda lungo il lago",
    excerpt: "Scopri la pista ciclo-pedonale più scenografica del Lago di Garda. Un percorso pianeggiante e sicuro, ideale per famiglie, coppie e amanti delle due ruote.",
    categories: ['attivita', 'famiglie', 'coppie'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/modellipasseggiobardolino.jpg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          La pista ciclo-pedonale Lazise ↔ Bardolino ↔ Garda è un percorso lungolago scenografico, pianeggiante e sicuro, ideale sia a piedi che in bici, perfetto anche per famiglie con bambini.
        </p>
        
        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Tratto 1 — Da Lazise a Bardolino</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Si può partire dal lungolago di Lazise o direttamente dal centro storico. Il percorso corre a un soffio dall'acqua, tra spiaggette, panchine panoramiche e aree verdi. A metà strada spunta <strong>Cisano</strong>, vivace e accogliente, con il suo porticciolo e le aree gioco: la scusa perfetta per fermarsi un attimo prima di arrivare a Bardolino.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Tratto 2 — Da Bardolino a Garda</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Da Bardolino ti aspettano circa altri 6 km di ciclabile liscia e ben segnalata. Il panorama si fa sempre più aperto, con acque limpide e lo sguardo che corre fino a <strong>Punta San Vigilio</strong>. L'arrivo a Garda premia con un borgo vivace e spiagge pubbliche perfette per un tuffo rinfrescante.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Caratteristiche</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Distanza totale: circa 14 km</li>
              <li>• Terreno: asfaltato e pianeggiante</li>
              <li>• Sicurezza: protetto dal traffico</li>
              <li>• Adatto a: bici e passeggiate</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Consigli Utili</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Soste: Cisano o il porto di Bardolino</li>
              <li>• Relax: Bagno nel lago a Garda</li>
              <li>• Foto: Obbligatoria a Punta San Vigilio</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Un percorso da gustare a tappe</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Non devi per forza percorrere l'intero tragitto. Soggiornando a Bardolino, sei nel punto di partenza ideale per due splendide esplorazioni:
        </p>

        <div className="space-y-6">
          <div className="border-l-4 border-brand-red pl-10 md:pl-20">
            <h4 className="text-xl font-bold text-slate-900">1. Alla scoperta di Lazise (Bardolino → Lazise)</h4>
            <p className="text-slate-600 mt-2">Distanza: 6 km | Tempo a piedi: 1h 20min | Tempo in bici: 25-30min</p>
            <p className="text-slate-700 mt-2">Il borgo appare gradualmente tra riflessi sul lago e mura storiche, offrendo un ingresso scenografico.</p>
          </div>
          <div className="border-l-4 border-brand-red pl-10 md:pl-20">
            <h4 className="text-xl font-bold text-slate-900">2. Alla scoperta di Garda (Bardolino → Garda)</h4>
            <p className="text-slate-600 mt-2">Distanza: 6 km | Tempo a piedi: 1h 15min | Tempo in bici: 25-30min</p>
            <p className="text-slate-700 mt-2">Pista pianeggiante e ben segnalata con ampie vedute del lago e vicoli pittoreschi all'arrivo.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-left">Come raggiungere il porto di Bardolino dai nostri hotel</h3>
          <div className="space-y-4 text-lg text-slate-700 text-left break-words hyphens-none">
            <p>
              <a href="https://parchotelgrittibardolino.it/" target="_blank" rel="noopener noreferrer">Parc Hotel Gritti</a>: 10 minuti a piedi dal porto.
            </p>
            <p>
              <a href="https://parchotelgermanobardolino.it/" target="_blank" rel="noopener noreferrer">Parc Hotel Germano</a>: 17 minuti a piedi oppure 5 minuti in macchina (parcheggio Prandini).
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: "Limone sul Garda: guida tra vicoli fioriti, limonaie storiche e panorami mozzafiato",
    excerpt: "Affacciato sul Lago di Garda, Limone è un borgo pittoresco famoso per le sue limonaie storiche, le case color pastello e le viuzze acciottolate che si arrampicano sulle rocce.",
    categories: ['garda'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/limonecentro.jpeg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Affacciato sul Lago di Garda, <strong>Limone sul Garda</strong> è un borgo pittoresco famoso per le sue <strong>limonaie storiche</strong>, le case color pastello e le viuzze acciottolate che si arrampicano sulle rocce a picco sul lago.
        </p>
        
        <p className="text-lg text-slate-700 leading-relaxed">
          Passeggiare tra le stradine, fermarsi in un caffè e ammirare le barche ormeggiate al porto è un’esperienza che unisce <strong>storia, natura e relax</strong>. Perfetto per gli amanti della fotografia, della buona cucina e della vita all’aria aperta, Limone è una tappa imperdibile per chi visita il Lago di Garda.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">La storia di Limone sul Garda</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Il borgo di Limone deve il suo nome proprio ai <strong>limoni</strong>, coltivati da secoli sulle terrazze sospese tra lago e montagna. La posizione strategica del paese, tra acque cristalline e ripide scogliere, ha favorito la costruzione delle limonaie, piccoli miracoli di ingegneria con muri a secco, scale e coperture in legno per proteggere i frutti dal vento e dal freddo.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Le origini di Limone risalgono al Medioevo, quando il borgo era un piccolo centro agricolo e commerciale. Le strette vie del centro e le case colorate raccontano ancora oggi la vita dei pescatori e dei coltivatori, mentre il porto storico ricorda l’importanza del commercio via lago.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">7 Cose da fare a Limone sul Garda</h2>
        
        <div className="space-y-6 mt-8 hyphens-none">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🛍️ Centro storico, lungolago e mercatini</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Tra bar, barche colorate e case pittoresche, Limone è l'ideale per <strong>foto e relax</strong>. Passeggia tra vicoli e scalinate panoramiche e curiosa tra botteghe e mercatini dove troverai <strong>limoni, olio, miele</strong> e piccoli souvenir da portare a casa.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🚲 Ciclopista del Garda</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Una <strong>passerella sospesa</strong> tra roccia e acqua, ideale per una passeggiata o un giro in bicicletta. La vista sul lago è tra le più spettacolari di tutta la <strong>sponda occidentale</strong>. Se vuoi goderti l’esperienza in bici, passa in reception nei nostri hotel: i nostri colleghi ti daranno tutte le informazioni necessarie per il <strong>noleggio</strong>.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🍋 Le limonaie</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Addentrati nelle antiche limonaie tra <strong>terrazze di limoni</strong> e musei sulla storia delle loro coltivazioni. Durante i mesi estivi, non perdere gli eventi di <strong>“limonaie sotto le stelle”</strong> nella cornice mozzafiato della <strong>Limonaia Castèl</strong>: serate con degustazioni di prodotti tipici e musica dal vivo.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">☀️ Sentiero del Sole</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Una camminata <strong>facile e panoramica</strong> sopra il paese, immersa nella natura e ideale anche per escursionisti non esperti. Il percorso è ben segnalato e si snoda per circa <strong>7,5–10 km</strong> tra il centro e i tratti panoramici sopra il lago.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">⛪ Chiese storiche</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Scopri la <strong>Chiesa di San Benedetto</strong>: piccola e silenziosa, affacciata sul lago, perfetta per una pausa tranquilla. Non perdere la <strong>Chiesa di San Rocco</strong>: una gemma nascosta tra le vie del borgo dal fascino antico.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">🛶 Porto e sport acquatici</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Qui il lago si vive davvero: <strong>windsurf, kayak, paddle</strong> o gite in barca per scoprire il paese da una prospettiva unica mantenendosi <strong>attivi</strong>.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">⛴️ Giro in battello o traghetto</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Dal porto di Limone puoi attraversare il lago in battello e raggiungere località come <strong>Malcesine, Riva o Salò</strong>, godendo di scorci unici direttamente dall'acqua.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 my-12">
          <h2 className="text-2xl font-serif font-medium text-slate-900 mb-4">Curiosità: Limoni da record!</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            I limoni di Limone hanno un aroma e un gusto davvero unici, merito del clima mite e del terreno calcareo. Alcune limonaie custodiscono ancora varietà antiche che fanno impazzire chef e botanici.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Non dimenticare di assaggiare la <strong>Delizia al Limone</strong>: un dolce fresco e delicato che racchiude in ogni morso l’anima di questo territorio.
          </p>
        </div>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Eventi da non perdere</h2>
        <ul className="space-y-6">
          <li className="border-l-4 border-red-700 pl-10 md:pl-20 break-words hyphens-none">
            <h4 className="text-xl font-bold text-slate-900">Yellow Night (metà agosto)</h4>
            <p className="text-slate-700 mt-2">Due serate di festa estiva con musica dal vivo, spettacoli e fuochi d’artificio che illuminano il lago.</p>
          </li>
          <li className="border-l-4 border-red-700 pl-10 md:pl-20 break-words hyphens-none">
            <h4 className="text-xl font-bold text-slate-900">Limone My Love (giugno e agosto)</h4>
            <p className="text-slate-700 mt-2">Un evento esclusivo dedicato agli ospiti degli hotel con serate di gala, spettacoli eleganti e animazione curata.</p>
          </li>
        </ul>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Come raggiungere il centro dai nostri hotel</h3>
          <ul className="space-y-3 text-slate-700">
            <li>• <strong>Hotel Leonardo da Vinci:</strong> Navetta gratis o 25 minuti a piedi.</li>
            <li>• <strong>Hotel San Pietro e Cristina:</strong> Navetta (1,50€ a tratta) o 20 minuti a piedi.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Limone sul Garda in Vespa: itinerari romantici e avventure per tutta la famiglia",
    excerpt: "Vivi una giornata da film tra borghi incantati e strade panoramiche. Scopri i due itinerari perfetti per coppie in cerca di romanticismo e famiglie in cerca di relax.",
    categories: ['famiglie', 'coppie'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/salofoto.jpeg',
    content: (
      <div className="space-y-8 hyphens-none">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Vuoi vivere una giornata italiana da film? Sali in sella a una <strong>Vespa</strong> e lasciati guidare dalla bellezza del Lago di Garda.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
          Limone sul Garda è il punto di partenza perfetto per esplorare i borghi vicini con stile e libertà. Che tu sia in coppia per una <strong>fuga romantica</strong> o con la famiglia per una <strong>vacanza sicura e piacevole</strong>, abbiamo l'itinerario giusto per te.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Opzione 1: Salò, tra eleganza e relax</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Questo itinerario rilassato è perfetto per chi vuole esplorare <strong>Salò</strong> con calma, passeggiando tra le vie e il lungolago senza fretta.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-lg text-slate-700">
          <li><strong>Il viaggio:</strong> Noleggia la tua Vespa e sali sul traghetto verso Toscolano Maderno. Da lì, percorri i 10 km che ti separano dall'elegante Salò.</li>
          <li><strong>Cosa fare:</strong> Parcheggia e concediti una passeggiata nel centro storico tra negozi e botteghe, per poi rilassarti sul lungolago, considerato uno dei più belli del Garda.</li>
          <li><strong>Pausa Gustosa:</strong> Per pranzo, ti consigliamo il <a href="https://dipiusalo.it/" target="_blank" rel="noopener noreferrer"><strong>Di Più Salò</strong></a> in pieno centro storico: informale e senza pensieri.</li>
          <li><strong>Pomeriggio:</strong> Esplora le spiagge o visita il <a href="https://museodisalo.it/" target="_blank" rel="noopener noreferrer"><strong>MuSa - Museo di Salò</strong></a> per un tuffo nella cultura locale.</li>
        </ul>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Opzione 2: Toscolano e il Vittoriale</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Un percorso pensato per chi desidera immergersi nella storia e scoprire i tesori più iconici di <strong>Gardone Riviera</strong>.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-lg text-slate-700">
          <li><strong>Passeggiata sul lago:</strong> Inizia con una camminata rilassante sul lungolago di Toscolano, tra scorci aperti sull'acqua e spiagge tranquille.</li>
          <li><strong>Il Vittoriale degli Italiani:</strong> A Gardone Riviera ti aspetta la celebre casa di <strong>Gabriele D’Annunzio</strong>. Ricordati di prenotare in anticipo e prenditi il tempo per esplorare i giardini e le installazioni.</li>
          <li><strong>Aperitivo:</strong> Prima del rientro, goditi uno Spritz in uno dei tanti bar fronte lago nel centro di Gardone.</li>
        </ul>

        <div className="bg-red-50 p-6 pl-10 md:pl-20 rounded-2xl border-l-4 border-red-700 my-6 break-words hyphens-none">
          <p className="text-red-900 font-medium">
            <strong>Il consiglio dell'esperto:</strong> Per il rientro a Limone, percorri la <strong>strada panoramica della Gardesana</strong>. Sono 35 km di pura meraviglia tra l'acqua e le montagne. Rallenta e goditi la vista: è una delle strade più spettacolari d'Italia.
          </p>
        </div>

        <p className="text-lg text-slate-700 leading-relaxed text-center font-medium italic">
          Limone è perfetto per ogni tipo di viaggiatore: dagli scorci intimi per le coppie alle passeggiate sicure sul lungolago per le famiglie con bambini.
        </p>
      </div>
    )
  },
  {
    id: 13,
    title: "Guida ai vini del Lago di Garda: alla scoperta del Bardolino e del Lugana",
    excerpt: "Il Lago di Garda non è solo panorami mozzafiato, ma una terra d'elezione per il vino. Scopri le eccellenze del Bardolino e del Lugana in questa guida per intenditori.",
    categories: ['tips', 'coppie'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/vinobardolino.jpg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Il Lago di Garda non è solo sinonimo di panorami mozzafiato, ma è una vera e propria <strong>terra d'elezione per il vino</strong>. Tra le colline che abbracciano l'acqua, nascono eccellenze che raccontano la storia e la passione di questo territorio unico.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Il Bardolino: Il Rosso che sa di Lago</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Protagonista indiscusso della sponda orientale, il <strong>Bardolino</strong> è un vino che conquista per la sua incredibile bevibilità e il suo carattere vivace. È il compagno ideale per chi cerca un'esperienza sensoriale leggera e autentica, specialmente durante una <strong>cena romantica vista lago</strong>.
        </p>
        
        <ul className="space-y-4 text-lg text-slate-700">
          <li className="flex items-start">
            <span className="text-brand-red mr-2">•</span>
            <span><strong>Il carattere:</strong> Si presenta come un vino leggero e fruttato, capace di racchiudere in ogni sorso i profumi del territorio.</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-red mr-2">•</span>
            <span><strong>Le varietà:</strong> Oltre alla versione rossa classica, Bardolino è famoso per il <strong>Chiaretto</strong>, il celebre vino rosé celebrato ogni anno tra fine primavera e inizio estate con il suggestivo Palio del Chiaretto.</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-red mr-2">•</span>
            <span><strong>Cultura e Tradizione:</strong> Per chi vuole approfondire, il <strong>Museo del Vino - Cantina Zeni</strong> offre un viaggio affascinante tra la storia e le tecniche di produzione locali.</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-red mr-2">•</span>
            <span><strong>Abbinamenti perfetti:</strong> La sua delicatezza lo rende perfetto per accompagnare piatti locali, ma anche per essere sorseggiato durante un aperitivo al tramonto in uno dei tanti locali affacciati sul porto.</span>
          </li>
        </ul>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Un salto nel Lugana: L'eleganza del Bianco</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Non lontano da Bardolino, verso la sponda meridionale che unisce Veneto e Lombardia, si estende la prestigiosa zona del <strong>Lugana</strong>.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Questo vino bianco, nato da terreni argillosi unici nel loro genere, è celebre per la sua freschezza e la sua spiccata sapidità. Se il Bardolino è il re dei rossi leggeri, il Lugana è l'<strong>oro bianco del Garda</strong>: perfetto per brindare davanti a un tramonto indimenticabile o per accompagnare una cena a base di pesce fresco di lago.
        </p>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 my-12">
          <h2 className="text-2xl font-serif font-medium text-slate-900 mb-4">Un consiglio da insider</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Le colline che circondano Bardolino sono punteggiate di <strong>vigneti e uliveti secolari</strong>. Ti consigliamo di percorrere la <strong>Passeggiata Bardolino-Garda</strong> o di avventurarti tra i sentieri dell'entroterra: la vista dei filari che scendono verso l'azzurro del lago è uno scorcio da cartolina che non dimenticherai facilmente.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 14,
    title: "Ciclopista del Garda: pedalare sospesi tra cielo e acqua a Limone sul Garda",
    excerpt: "Hai mai sognato di pedalare direttamente sopra le onde? Scopri la Ciclopista del Garda, una delle passerelle più spettacolari d'Europa, perfetta per famiglie e coppie.",
    categories: ['attivita', 'famiglie', 'coppie'],
    date: '02 Marzo 2026',
    author: 'Redazione Travel',
    image: '/ciclabilelimone.jpg',
    content: (
      <div className="space-y-8">
        <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-brand-red pl-10 md:pl-20 py-2 break-words hyphens-none">
          Hai mai sognato di camminare o pedalare direttamente sopra le onde? A <strong>Limone sul Garda</strong> questo sogno diventa realtà grazie alla <strong>Ciclopista del Garda</strong>, definita una delle passerelle più spettacolari d’Europa.
        </p>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Un’esperienza mozzafiato per tutti</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Questa passerella è letteralmente <strong>sospesa tra la roccia e l’azzurro del lago</strong>. Offre una vista senza eguali sulla sponda occidentale, rendendo ogni scatto fotografico un piccolo capolavoro.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-red-50 p-6 pl-10 md:pl-20 rounded-2xl border-l-4 border-red-700 break-words hyphens-none">
            <h3 className="font-bold text-red-900 mb-2">Per tutti</h3>
            <p className="text-red-800 text-sm">Il percorso è <strong>pianeggiante e sicuro</strong>, ideale sia per una passeggiata rilassante in coppia che per un giro in bicicletta con tutta la famiglia, inclusi i più piccoli.</p>
          </div>
          <div className="bg-slate-50 p-6 pl-10 md:pl-20 rounded-2xl border-l-4 border-slate-400 break-words hyphens-none">
            <h3 className="font-bold text-slate-900 mb-2">Come viverla al meglio</h3>
            <p className="text-slate-700 text-sm">Se soggiorni presso le nostre strutture, puoi <strong>noleggiare la bici direttamente in reception</strong>: i nostri colleghi ti daranno tutti i consigli esperti necessari per goderti l'escursione in totale sicurezza.</p>
          </div>
        </div>

        <h2 className="text-3xl font-serif font-medium text-slate-900 mt-12">Non solo bici: il Sentiero del Sole</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          Se preferisci il trekking leggero, oltre alla ciclabile puoi esplorare il <strong>Sentiero del Sole</strong>. È una camminata panoramica ben segnalata (lunga circa 7,5-10 km) che si snoda sopra il paese, immersa nella natura rigogliosa di Limone.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Dopo lo sport, concediti un momento di relax nel centro storico tra le antiche limonaie e un rinfrescante aperitivo sul lungolago, ammirando il tramonto che tinge l'acqua di colori caldi.
        </p>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Come raggiungere il centro dai nostri hotel</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-700 rounded-full mr-3"></span>
              <span><strong>Hotel Leonardo da Vinci:</strong> Navetta gratis o 25 minuti a piedi dal lungolago.</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-700 rounded-full mr-3"></span>
              <span><strong>Hotel San Pietro e Cristina:</strong> Navetta (1,50€ a tratta) o 20 minuti a piedi.</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
];

const HOTELS = [
  { 
    name: 'Parc Hotel Germano & Suites', 
    location: 'Bardolino', 
    rating: 4.5, 
    image: '/parchotelgermano-esterni-16.jpg',
    url: 'https://parchotelgermanobardolino.it/'
  },
  { 
    name: 'Parc Hotel Gritti', 
    location: 'Bardolino', 
    rating: 4.0, 
    image: '/parchotelgritti.jpg',
    url: 'https://parchotelgrittibardolino.it/'
  },
  { 
    name: 'Active Hotel Paradiso', 
    location: 'Peschiera', 
    rating: 4.5, 
    image: '/activehotel.jpg',
    url: 'https://www.activehotelparadisopeschiera.it/'
  },
];

// --- Components ---
const Logo = ({ isSticky, onClick }: { isSticky: boolean; onClick?: () => void }) => (
  <button 
    onClick={onClick} 
    className="flex items-center hover:opacity-80 transition-opacity outline-none focus:ring-2 focus:ring-red-500 rounded cursor-pointer"
    aria-label="Vai alla Home"
  >
    {/* Mobile/Tablet Logo */}
    <img 
      src="/capitello-phi.png" 
      alt="Parc Hotels Italia - Logo Mobile" 
      className={`md:hidden transition-all duration-500 ${isSticky ? 'h-8' : 'h-10'} w-auto`}
    />
    {/* Desktop Logo */}
    <img 
      src="/logo-phi-orizzontale-no-sfondo-testo-grigio.png" 
      alt="Parc Hotels Italia - Logo Desktop" 
      className={`hidden md:block transition-all duration-500 ${isSticky ? 'h-10' : 'h-12'} w-auto`}
    />
  </button>
);

type Language = 'IT' | 'EN' | 'DE';

const translations = {
  IT: {
    home: "Home",
    blog: "Blog",
    backToBlog: "Torna al Blog",
    backToTop: "Torna su",
    bookNow: "Scopri di più",
    latestArticles: "Ultimi Articoli",
    resultsFor: "Risultati per",
    cancelSearch: "Annulla ricerca",
    discoverMore: "Scopri di più",
    featured: "In Evidenza",
    destinations: "Destinazioni",
    usefulLinks: "Link Utili",
    contacts: "Contatti",
    aboutUs: "Chi Siamo",
    workWithUs: "Lavora con noi",
    foundation: "Fondazione Germano Chincherini",
    discoverHotels: "Scopri i nostri hotel",
    rights: "Tutti i diritti riservati.",
    searchPlaceholder: "Cerca un articolo...",
    noResults: "Nessun risultato trovato per la tua ricerca.",
    readArticle: "Leggi l'articolo",
    loadMore: "Carica altri articoli",
    categories: {
      all: "Tutti gli articoli",
      garda: "Lago di Garda",
      sicilia: "Sicilia",
      citta: "Città",
      tips: "Tips",
      attivita: "Attività",
      famiglie: "Famiglie",
      coppie: "Coppie"
    }
  },
  EN: {
    home: "Home",
    blog: "Blog",
    backToBlog: "Back to Blog",
    backToTop: "Back to Top",
    bookNow: "Discover more",
    latestArticles: "Latest Articles",
    resultsFor: "Results for",
    cancelSearch: "Cancel search",
    discoverMore: "Discover more",
    featured: "Featured",
    destinations: "Destinations",
    usefulLinks: "Useful Links",
    contacts: "Contacts",
    aboutUs: "About Us",
    workWithUs: "Work with us",
    foundation: "Germano Chincherini Foundation",
    discoverHotels: "Discover our hotels",
    rights: "All rights reserved.",
    searchPlaceholder: "Search an article...",
    noResults: "No results found for your search.",
    readArticle: "Read article",
    loadMore: "Load more articles",
    categories: {
      all: "All articles",
      garda: "Lake Garda",
      sicilia: "Sicily",
      citta: "Cities",
      tips: "Tips",
      attivita: "Activities",
      famiglie: "Families",
      coppie: "Couples"
    }
  },
  DE: {
    home: "Home",
    blog: "Blog",
    backToBlog: "Zurück zum Blog",
    backToTop: "Nach oben",
    bookNow: "Mehr erfahren",
    latestArticles: "Neueste Artikel",
    resultsFor: "Ergebnisse für",
    cancelSearch: "Suche abbrechen",
    discoverMore: "Mehr entdecken",
    featured: "Hervorgehoben",
    destinations: "Reiseziele",
    usefulLinks: "Nützliche Links",
    contacts: "Kontakte",
    aboutUs: "Über uns",
    workWithUs: "Arbeite mit uns",
    foundation: "Germano Chincherini Stiftung",
    discoverHotels: "Entdecken Sie unsere Hotels",
    rights: "Alle Rechte vorbehalten.",
    searchPlaceholder: "Artikel suchen...",
    noResults: "Keine Ergebnisse für Ihre Suche gefunden.",
    readArticle: "Artikel lesen",
    loadMore: "Mehr Artikel laden",
    categories: {
      all: "Alle Artikel",
      garda: "Gardasee",
      sicilia: "Sizilien",
      citta: "Städte",
      tips: "Tipps",
      attivita: "Aktivitäten",
      famiglie: "Familien",
      coppie: "Paare"
    }
  }
};

// --- Components ---
const BackToTop = ({ t }: { t: any }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] p-3 md:p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all hover:scale-110 active:scale-95 group flex items-center gap-2 focus:outline-none"
          aria-label={t.backToTop}
        >
          <ArrowUp size={20} className="md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
          <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest pr-2">{t.backToTop}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'IT';
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language.toLowerCase();

    // Update hreflang tags
    const languages: Language[] = ['IT', 'EN', 'DE'];
    const currentUrl = window.location.href.split('#')[0];
    
    languages.forEach(lang => {
      let link = document.querySelector(`link[hreflang="${lang.toLowerCase()}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang.toLowerCase());
        document.head.appendChild(link);
      }
      link.setAttribute('href', currentUrl);
    });
  }, [language]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCategoryBarVisible, setIsCategoryBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMerged, setIsMerged] = useState(false);
  const categoryBarRef = React.useRef<HTMLDivElement>(null);
  const homeScrollPos = useRef(0);

  // Scroll Restoration Setting
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle Browser Back Button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.articleId) {
        const article = ARTICLES.find(a => a.id === event.state.articleId);
        setSelectedArticle(article || null);
      } else {
        setSelectedArticle(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenArticle = (article: Article) => {
    homeScrollPos.current = window.scrollY;
    // Store current category for breadcrumbs
    sessionStorage.setItem('lastCategory', activeCategory);
    window.history.pushState({ articleId: article.id }, '', `#article-${article.id}`);
    setSelectedArticle(article);
  };

  const handleCloseArticle = (resetScroll = false) => {
    if (resetScroll) {
      homeScrollPos.current = 0;
      setActiveCategory('all');
    }
    
    // If we have a specific category to return to
    const lastCategory = sessionStorage.getItem('lastCategory');
    if (lastCategory && !resetScroll) {
      setActiveCategory(lastCategory);
    }

    if (window.history.state && window.history.state.articleId) {
      window.history.back();
    } else {
      setSelectedArticle(null);
    }
    setIsMobileMenuOpen(false);
  };

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchFilter]);

  const searchRef = useRef<HTMLDivElement>(null);

  // Sliding Underline State
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex] = useState(2); // Blog is active by default
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const MENU_ITEMS = [
    { label: 'Hotel & Resort', href: '#' },
    { label: 'Offerte', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contatti', href: '#' },
  ];

  // Sticky Merge Logic
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the category bar is no longer visible at its original position
        // (because it scrolled under the header), we merge.
        setIsMerged(!entry.isIntersecting && entry.boundingClientRect.top <= 80);
      },
      { 
        threshold: [0, 1],
        rootMargin: "-80px 0px 0px 0px" // Height of the non-sticky header
      }
    );

    if (categoryBarRef.current) {
      observer.observe(categoryBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isSticky = isMerged || scrollY > 200;
  const isDetailSticky = scrollY > 20;

  useEffect(() => {
    const updateUnderline = () => {
      const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
      const targetElement = menuRefs.current[targetIndex];
      if (targetElement) {
        setUnderlineStyle({
          left: targetElement.offsetLeft,
          width: targetElement.offsetWidth,
        });
      }
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [hoveredIndex, activeIndex, isSticky]);

  // Scroll logic for header visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
      
      // Track scroll position when on home page for restoration
      if (!selectedArticle) {
        homeScrollPos.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

  // Handle Scroll to Top / Restoration when selectedArticle changes
  useEffect(() => {
    if (selectedArticle) {
      // Reset scroll to top when opening an article
      window.scrollTo(0, 0);
    } else {
      // Restore scroll position when returning home
      // Small timeout ensures DOM is ready
      const timer = setTimeout(() => {
        window.scrollTo(0, homeScrollPos.current);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedArticle]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = searchQuery.length > 2 
    ? ARTICLES.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearch = (query: string) => {
    setSearchFilter(query);
    setShowSuggestions(false);
    setActiveCategory('all');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const getCategoryName = (id: string) => {
    return t.categories[id as keyof typeof t.categories] || id;
  };

  const filteredArticles = ARTICLES.filter(a => {
    const matchesCategory = activeCategory === 'all' || a.categories.includes(activeCategory);
    const matchesSearch = !searchFilter || a.title.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES.find(a => a.featured);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <div className="relative">
          {/* Navigation for Article Detail */}
          <nav 
            className={`sticky top-0 z-50 transition-all duration-500 ${
              isDetailSticky 
                ? 'h-[60px] bg-white/95 backdrop-blur-md sticky-header-shadow border-b border-slate-100' 
                : 'h-20 bg-white'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center flex-1 min-w-0">
                  <button 
                    onClick={() => handleCloseArticle()}
                    className={`flex items-center text-slate-500 hover:text-red-700 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] mr-4 sm:mr-6 px-2 sm:px-3 py-2 rounded-full ${
                      isDetailSticky ? 'bg-slate-50 shadow-sm' : ''
                    }`}
                  >
                    <ArrowRight size={14} className="mr-1 sm:mr-2 rotate-180" /> 
                    <span className={isDetailSticky ? 'hidden sm:inline' : 'inline'}>{t.backToBlog}</span>
                    {isDetailSticky && <span className="sm:hidden">{t.blog}</span>}
                  </button>
                
                <div className="flex-shrink-0 flex items-center mr-4 sm:mr-8">
                  <Logo isSticky={isDetailSticky} onClick={() => handleCloseArticle(true)} />
                </div>

                {/* Main Menu in Detail View (Desktop) */}
                <div 
                  className="hidden lg:flex items-center space-x-8 relative mx-auto"
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {MENU_ITEMS.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      ref={(el) => (menuRefs.current[index] = el)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`text-sm font-bold uppercase tracking-widest transition-colors relative py-1 ${
                        activeIndex === index ? 'text-brand-red' : 'hover:text-brand-red'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                  
                  {/* Sliding Underline */}
                  <motion.div
                    className="absolute bottom-0 h-[2px] bg-brand-red"
                    initial={false}
                    animate={{
                      left: underlineStyle.left,
                      width: underlineStyle.width,
                    }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.35
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="hidden lg:block bg-red-700 text-white rounded-lg font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg px-6 py-2.5 text-sm hover:bg-red-800">
                  {t.bookNow}
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="p-2 text-slate-900 lg:hidden"
                  aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

        </nav>

        {/* Breadcrumbs for Article Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
          <nav className="flex text-xs text-slate-400 uppercase tracking-widest font-medium" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-y-2">
              <li className="flex items-center">
                <button onClick={() => handleCloseArticle(true)} className="hover:text-red-700 transition-colors py-1">{t.home}</button>
                <ChevronRight size={12} className="mx-2" />
              </li>
              <li className="flex items-center">
                <button onClick={() => handleCloseArticle(false)} className="hover:text-red-700 transition-colors py-1">{t.blog}</button>
                <ChevronRight size={12} className="mx-2" />
              </li>
              {(() => {
                const lastCategory = sessionStorage.getItem('lastCategory');
                const catId = (lastCategory && lastCategory !== 'all') ? lastCategory : selectedArticle.categories[0];
                const cat = CATEGORIES.find(c => c.id === catId);
                if (cat && cat.id !== 'all') {
                  return (
                    <li className="flex items-center">
                      <button 
                        onClick={() => {
                          sessionStorage.setItem('lastCategory', cat.id);
                          setActiveCategory(cat.id);
                          handleCloseArticle(false);
                        }} 
                        className="hover:text-red-700 transition-colors py-1"
                      >
                        {getCategoryName(cat.id)}
                      </button>
                      <ChevronRight size={12} className="mx-2" />
                    </li>
                  );
                }
                return null;
              })()}
              <li className="text-slate-900 break-words hidden md:inline-block">{selectedArticle.title}</li>
            </ol>
          </nav>
          
          {/* Mobile Title and Tags (Outside Hero) */}
          <div className="md:hidden mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {selectedArticle.categories.map(catId => {
                const cat = CATEGORIES.find(c => c.id === catId);
                return (
                  <span key={catId} className="text-red-700 text-[10px] font-bold uppercase tracking-widest">
                    {cat?.name || catId}
                  </span>
                );
              })}
              <span className="text-slate-300 text-[10px]">•</span>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{selectedArticle.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight font-serif">
              {selectedArticle.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <header className="mb-12 relative">
            <div className="article-hero-container group">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Gradient for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlaid Title and Metadata - Desktop Only */}
              <div className="absolute inset-0 hidden md:flex flex-col justify-between p-[20px_30px]">
                {/* Top Left: Metadata */}
                <div className="flex justify-start">
                  <div className="article-hero-meta flex flex-wrap items-center justify-start gap-3">
                    <div className="flex flex-wrap gap-2 justify-start">
                      {selectedArticle.categories.map(catId => {
                        const cat = CATEGORIES.find(c => c.id === catId);
                        return (
                          <span key={catId} className="bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                            {cat?.icon}
                            {cat?.name || catId}
                          </span>
                        );
                      })}
                    </div>
                    <span className="opacity-80">{selectedArticle.date}</span>
                    <span className="hidden sm:inline opacity-50">•</span>
                    <span className="hidden sm:inline opacity-80">{selectedArticle.author}</span>
                  </div>
                </div>

                {/* Bottom Left: Title */}
                <div className="flex justify-start items-end h-1/2">
                  <h1 className="article-hero-title max-w-xl drop-shadow-lg">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <div className="prose prose-slate prose-lg max-w-none">
            {selectedArticle.content || <p>{selectedArticle.excerpt}</p>}
          </div>

          <footer className="mt-20 pt-10 border-t border-slate-100 space-y-12">
            {/* Share Box */}
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Condividi l'articolo:</span>
              <div className="flex items-center space-x-3">
                <button title="WhatsApp" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-[#25D366] shadow-sm transition-all"><MessageCircle size={20} /></button>
                <button title="Email" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-red-700 shadow-sm transition-all"><Mail size={20} /></button>
                <button title="Facebook" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-[#1877F2] shadow-sm transition-all"><Facebook size={20} /></button>
                <button title="X" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-black shadow-sm transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"/>
                  </svg>
                </button>
                <button title="Copia Link" className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-red-700 shadow-sm transition-all"><Link size={20} /></button>
              </div>
            </div>

            {/* Loyalty Club Box */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-serif font-medium mb-4 text-red-700">Prima Parc Club</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto parc-club-description">
                Parc Hotels Italia è una grande famiglia di strutture distribuite in tutta Italia. Con il Prima Parc Club, la tua fedeltà attraversa lo stivale: iscriviti ora per ottenere sconti immediati e promozioni dedicate, valide in ogni hotel della nostra catena. Che tu scelga il relax del Lago di Garda o il calore della Sicilia, far parte del Club significa garantirti sempre il miglior prezzo e un trattamento prioritario in tutto il nostro network alberghiero.
              </p>
              <div className="flex justify-center">
                <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-red-800 transition-all shadow-lg btn-centered">
                  Iscriviti Ora
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* Discover Hotels Section (Repeated for conversion) */}
        <section className="bg-[#0E172B] text-white py-24 hotel-promo-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-medium">Soggiorna vicino a {selectedArticle.title.includes('Peschiera') ? 'Peschiera' : 'queste mete'}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HOTELS.map((hotel, idx) => (
                <div key={idx} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${hotel.name}/800/600`;
                      }}
                    />
                  </div>
                  <div className="hotel-card-content">
                    <div className="hotel-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(hotel.rating) ? "white" : "none"} stroke="white" />
                      ))}
                    </div>
                    <h4 className="hotel-name text-xl font-serif font-medium">{hotel.name}</h4>
                    <p className="hotel-location">
                      <MapPin size={14} className="mr-1" /> {hotel.location}, Lago di Garda
                    </p>
                    <a 
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hotel-cta py-3 px-8 rounded-lg bg-red-700 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-all"
                    >
                      {t.bookNow}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Menu Overlay (Article Detail) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center px-4 h-20 border-b border-slate-100">
                  <Logo isSticky={false} onClick={() => handleCloseArticle(true)} />
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 text-slate-900"
                    aria-label="Chiudi menu"
                  >
                    <X size={28} />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col justify-start px-10 py-12 space-y-12">
                  <div className="flex flex-col space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Menu</h4>
                    <ul className="space-y-6">
                      <li className="flex items-center group">
                        <span className="w-1.5 h-1.5 bg-brand-red mr-4"></span>
                        <button className="text-left text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => handleCloseArticle(true)}>{t.home} Blog</button>
                      </li>
                      <li className="flex items-center group">
                        <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Hotel & Resort</a>
                      </li>
                      <li className="flex items-center group">
                        <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Offerte</a>
                      </li>
                      <li className="flex items-center group">
                        <span className="w-1.5 h-1.5 bg-brand-red mr-4"></span>
                        <a href="#" className="text-lg font-montserrat font-bold uppercase tracking-wider text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>{t.blog}</a>
                      </li>
                      <li className="flex items-center group">
                        <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.contacts}</a>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-10 border-t border-slate-100">
                    <button className="w-full bg-brand-red text-white py-5 rounded-xl font-bold uppercase tracking-[0.15em] text-sm shadow-xl shadow-red-900/20 active:scale-95 transition-transform">
                      {t.bookNow}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <BackToTop t={t} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] font-sans text-slate-900">
      {/* --- Schema Markup --- */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog di Parc Hotels Italia",
          "description": "Consigli di viaggio, itinerari e ispirazioni per le tue vacanze in Italia.",
          "publisher": {
            "@type": "Organization",
            "name": "Parc Hotels Italia",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.parchotels.it/logo.png"
            }
          }
        })}
      </script>

      {/* --- Navigation --- */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          isSticky 
            ? 'h-[60px] bg-white/95 backdrop-blur-md sticky-header-shadow' 
            : 'h-20 bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0 flex items-center mr-8">
                <Logo isSticky={isSticky} onClick={() => handleCloseArticle(true)} />
              </div>

              {/* Integrated Categories in Sticky Mode (Only on Home) - REMOVED */}
              
              {/* Main Menu in Normal Mode or Detail View */}
              <div 
                className="hidden lg:flex items-center space-x-8 relative mx-auto"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {MENU_ITEMS.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    ref={(el) => (menuRefs.current[index] = el)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors relative py-1 ${
                      activeIndex === index ? 'text-brand-red' : 'hover:text-brand-red'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Sliding Underline */}
                <motion.div
                  className="absolute bottom-0 h-[2px] bg-brand-red"
                  initial={false}
                  animate={{
                    left: underlineStyle.left,
                    width: underlineStyle.width,
                  }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.35
                  }}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector Desktop */}
              <div className="hidden lg:flex items-center space-x-2 text-slate-900 font-montserrat font-bold text-xs mr-4">
                <Globe size={14} />
                <div className="flex items-center">
                  <button onClick={() => setLanguage('IT')} className={`${language === 'IT' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'}`}>IT</button>
                  <span className="mx-1 text-slate-300">|</span>
                  <button onClick={() => setLanguage('EN')} className={`${language === 'EN' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'}`}>EN</button>
                  <span className="mx-1 text-slate-300">|</span>
                  <button onClick={() => setLanguage('DE')} className={`${language === 'DE' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'}`}>DE</button>
                </div>
              </div>

              <button className="hidden lg:block bg-red-700 text-white rounded-lg font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg px-6 py-2.5 text-sm hover:bg-red-800">
                {t.bookNow}
              </button>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 text-slate-900 lg:hidden"
                aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Breadcrumbs --- - REMOVED FROM HOME */}

      {/* --- Hero Section --- */}
      <header className="relative py-8 md:py-12 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="hero-title mb-6">
              {language === 'IT' ? 'Ispirazioni di Viaggio' : language === 'EN' ? 'Travel Inspirations' : 'Reiseinspirationen'} <br />
              <span className="italic text-red-700">Parc Hotels Italia</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Scopri il cuore dell'ospitalità italiana. Itinerari esclusivi, segreti locali e consigli per rendere la tua vacanza sul Lago di Garda e in Italia un'esperienza indimenticabile.
            </p>
            <div className="relative max-w-md" ref={searchRef}>
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-slate-200 p-1">
                <div className="pl-4 text-slate-400"><Search size={20} /></div>
                <input 
                  type="text" 
                  placeholder="Cerca un'esperienza..." 
                  className="w-full px-4 py-2 bg-transparent focus:outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
                <button 
                  onClick={() => handleSearch(searchQuery)}
                  className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Cerca
                </button>
              </div>

              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-[9999] left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
                  >
                    {suggestions.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => {
                          handleOpenArticle(article);
                          setShowSuggestions(false);
                          setSearchQuery('');
                        }}
                        className="w-full px-6 py-4 text-left hover:bg-slate-50 flex items-center transition-colors border-b border-slate-50 last:border-0"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0 shadow-sm">
                          <img src={article.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate mb-0.5">{article.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {article.categories.map(catId => (
                              <p key={catId} className="text-[10px] text-red-700 uppercase tracking-widest font-bold">
                                {CATEGORIES.find(c => c.id === catId)?.name || catId}
                              </p>
                            ))}
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 ml-2" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-red-700/20 to-transparent" />
        </div>
      </header>

      {/* --- Category Filter (Original Position) - REMOVED --- */}
      <div ref={categoryBarRef}></div>

      {/* Mobile Initial Category Bar - REMOVED */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- Blog Categories Section (Inline) --- */}
        <div className="mb-12 border-b border-slate-100 category-nav-bar">
          <div className="flex items-center space-x-8 overflow-x-auto no-scrollbar py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-all relative py-3 flex items-center gap-2 category-item ${
                  activeCategory === cat.id 
                    ? 'text-brand-red' 
                    : 'text-slate-500 hover:text-brand-red'
                }`}
              >
                {cat.icon && <span className="opacity-70 flex-shrink-0">{cat.icon}</span>}
                <span className="category-text-wrapper">
                  {cat.id === 'all' ? (
                    <>Tutti gli <span className="mobile-br" />articoli</>
                  ) : cat.id === 'garda' ? (
                    <>Lago di <span className="mobile-br" />Garda</>
                  ) : (
                    cat.name
                  )}
                </span>
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- Featured Article (Banner Section) --- */}
        {activeCategory === 'all' && featuredArticle && (
          <section className="mb-24">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mb-8 flex items-center">
              <span className="w-8 h-px bg-slate-200 mr-4"></span>
              In Evidenza
            </h2>
            <motion.div 
              whileHover={{ y: -8 }}
              onClick={() => handleOpenArticle(featuredArticle)}
              className="cursor-pointer group focus-within:ring-4 focus-within:ring-red-500/50 outline-none"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenArticle(featuredArticle)}
              aria-label={`Leggi l'articolo in evidenza: ${featuredArticle.title}`}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-serif font-medium text-slate-900 leading-tight mb-8 group-hover:text-red-700 transition-colors">
                {featuredArticle.title}
              </h3>

              <div className="article-hero-container mb-10">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${featuredArticle.id}/1920/1080`;
                  }}
                />
              </div>

              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredArticle.categories.map(catId => {
                    const cat = CATEGORIES.find(c => c.id === catId);
                    return (
                      <span key={catId} className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border border-slate-200">
                        {cat?.icon}
                        {cat?.name || catId}
                      </span>
                    );
                  })}
                </div>
                
                <p className="text-base md:text-lg text-slate-600 line-clamp-3 mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center"><User size={14} className="mr-2 text-red-700" /> {featuredArticle.author}</span>
                    <span className="flex items-center"><Calendar size={14} className="mr-2 text-red-700" /> {featuredArticle.date}</span>
                  </div>
                  <span className="flex items-center text-slate-900 font-bold group-hover:text-red-700 group-hover:translate-x-2 transition-all">
                    Leggi l'articolo <ArrowRight size={16} className="ml-2" />
                  </span>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* --- Article Grid --- */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center">
                <span className="w-8 h-px bg-slate-200 mr-4"></span>
                {searchFilter 
                  ? `${t.resultsFor}: "${searchFilter}"` 
                  : activeCategory === 'all' ? t.latestArticles : `${getCategoryName(activeCategory)}`}
              </h2>
              {searchFilter && (
                <button 
                  onClick={() => { setSearchFilter(''); setSearchQuery(''); }}
                  className="text-[10px] text-red-700 font-bold uppercase tracking-widest hover:underline text-left pl-12"
                >
                  Annulla ricerca
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredArticles
                .filter(a => !a.featured || activeCategory !== 'all')
                .slice(0, visibleCount)
                .map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col cursor-pointer focus-within:ring-4 focus-within:ring-red-500/50 rounded-2xl outline-none"
                  onClick={() => handleOpenArticle(article)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpenArticle(article)}
                  aria-label={`Leggi l'articolo: ${article.title}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${article.id}/800/600`;
                      }}
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {article.categories.map(catId => {
                        const cat = CATEGORIES.find(c => c.id === catId);
                        return (
                          <span key={catId} className="bg-black/20 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
                            {cat?.icon}
                            {getCategoryName(catId)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-bold">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-4 leading-snug text-slate-900 group-hover:text-red-700 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex justify-center">
                    <button 
                      onClick={() => handleOpenArticle(article)}
                      className="inline-flex items-center text-slate-900 font-bold uppercase tracking-widest text-[10px] group/link"
                    >
                      {t.discoverMore} <ArrowRight size={14} className="ml-2 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 italic">Nessun articolo trovato in questa categoria.</p>
            </div>
          )}

          {visibleCount < filteredArticles.filter(a => !a.featured || activeCategory !== 'all').length && (
            <div className="mt-20 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-10 py-4 border-2 border-slate-200 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all btn-centered"
              >
                {t.loadMore}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* --- Discover Hotels Section --- */}
      <section className="bg-[#0E172B] text-white py-24 overflow-hidden relative hotel-promo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 mb-4">La tua prossima meta</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-medium text-white">Scopri i nostri Hotel & Resort</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOTELS.map((hotel, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${hotel.name}/800/600`;
                    }}
                  />
                </div>
                <div className="hotel-card-content">
                  <div className="hotel-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(hotel.rating) ? "white" : "none"} stroke="white" />
                    ))}
                  </div>
                  <h4 className="hotel-name text-xl font-serif font-medium">{hotel.name}</h4>
                  <p className="hotel-location">
                    <MapPin size={14} className="mr-1" /> {hotel.location}, Lago di Garda
                  </p>
                  <a 
                    href={hotel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hotel-cta py-3 px-8 rounded-lg border border-white/40 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-red-700 transition-all"
                    aria-label={`Vedi dettagli per ${hotel.name}`}
                  >
                    Vedi Struttura
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center text-white font-bold uppercase tracking-widest text-sm border-b border-white/40 pb-1 hover:border-white transition-colors">
              Esplora tutte le destinazioni <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
      </section>

      {/* --- Loyalty Section --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-red mb-8">
                Prima Parc Club
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg parc-club-description">
                Parc Hotels Italia è una grande famiglia di strutture distribuite in tutta Italia. Con il Prima Parc Club, la tua fedeltà attraversa lo stivale: iscriviti ora per ottenere sconti immediati e promozioni dedicate, valide in ogni hotel della nostra catena. Che tu scelga il relax del Lago di Garda o il calore della Sicilia, far parte del Club significa garantirti sempre il miglior prezzo e un trattamento prioritario in tutto il nostro network alberghiero.
              </p>
              <div className="flex justify-center lg:justify-center">
                <button className="bg-brand-red text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-red-800 transition-all shadow-lg btn-centered">
                  Iscriviti Ora
                </button>
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="text-[#9A7B3F] mb-4">
                  <Percent size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">SCONTO -10%</h4>
                <p className="text-sm text-slate-600">Iscriviti e hai subito il -10%</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="text-[#9A7B3F] mb-4">
                  <Coins size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">USA I TUOI PUNTI</h4>
                <p className="text-sm text-slate-600">Accumula punti e ottieni sconti</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="text-[#9A7B3F] mb-4">
                  <Zap size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">OFFERTE SPECIALI</h4>
                <p className="text-sm text-slate-600">Ricevi sconti in anteprima e offerte</p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="text-[#9A7B3F] mb-4">
                  <Gift size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">OMAGGI ESCLUSIVI</h4>
                <p className="text-sm text-slate-600">Scala i livelli e ottieni regali esclusivi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#696868] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-1 md:col-span-1">
                <img 
                  src="/logo-phi-orizzontale-no-sfondo-testo-grigio.png" 
                  alt="Parc Hotels Italia" 
                  className="h-12 w-auto mb-6 brightness-0 invert"
                />
                <p className="text-white/80 text-sm leading-relaxed mb-8">
                  Oltre 30 anni di eccellenza nell'ospitalità italiana. Strutture uniche pensate per ogni tipo di viaggiatore.
                </p>
              <div className="flex space-x-3">
                <a href="https://www.instagram.com/parchotelsitalia/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white hover:text-red-400 hover:bg-white/20 transition-all" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/parchotelsitalia" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white hover:text-red-400 hover:bg-white/20 transition-all" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/@parchotelsitalia" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white hover:text-red-400 hover:bg-white/20 transition-all" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://www.pinterest.it/parchotels/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white hover:text-red-400 hover:bg-white/20 transition-all" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.223 7.462-1.214 0-2.354-.63-2.744-1.37l-.749 2.848c-.27 1.031-1.002 2.324-1.492 3.12 1.12.345 2.304.53 3.535.53 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/parc-hotels-italia" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white hover:text-red-400 hover:bg-white/20 transition-all" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-6">{t.destinations}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'IT' ? 'Lago di Garda' : language === 'EN' ? 'Lake Garda' : 'Gardasee'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'IT' ? 'Sicilia' : language === 'EN' ? 'Sicily' : 'Sizilien'}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-6">{t.usefulLinks}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">{t.aboutUs}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.workWithUs}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.foundation}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-6">{t.contacts}</h4>
              <ul className="space-y-4 text-sm text-white">
                <li className="flex items-center">
                  <Mail size={16} className="mr-3 text-white" />
                  <a href="mailto:info@parchotels.it" className="hover:underline transition-all">info@parchotels.it</a>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-3 text-white" />
                  <a href="tel:+390365913540" className="hover:underline transition-all">+39 036 5913540</a>
                </li>
                <li className="mt-4">
                  <button className="text-[10px] font-bold uppercase tracking-widest border border-white/30 px-4 py-2 rounded hover:bg-white hover:text-slate-900 transition-all">
                    {t.discoverHotels}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/50 uppercase tracking-widest font-bold">
            <p>© 2024 Parc Hotels Italia. {t.rights}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
              <a href="#" className="hover:text-white">Termini e Condizioni</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay (Global) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 h-20 border-b border-slate-100">
                <Logo isSticky={false} onClick={() => handleCloseArticle(true)} />
                
                <div className="flex items-center space-x-6">
                  {/* Language Selector */}
                  <div className="flex items-center space-x-2 text-slate-900 font-montserrat font-bold text-sm">
                    <Globe size={18} />
                    <div className="flex items-center">
                      <button onClick={() => setLanguage('IT')} className={`${language === 'IT' ? 'text-brand-red' : 'text-slate-400'}`}>IT</button>
                      <span className="mx-1 text-slate-300">|</span>
                      <button onClick={() => setLanguage('EN')} className={`${language === 'EN' ? 'text-brand-red' : 'text-slate-400'}`}>EN</button>
                      <span className="mx-1 text-slate-300">|</span>
                      <button onClick={() => setLanguage('DE')} className={`${language === 'DE' ? 'text-brand-red' : 'text-slate-400'}`}>DE</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 text-slate-900 border border-slate-200 rounded-lg"
                    aria-label="Chiudi menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-start px-10 py-12 space-y-12">
                <div className="flex flex-col space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Menu</h4>
                  <ul className="space-y-6">
                    <li className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <button className="text-left text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => handleCloseArticle(true)}>{t.home}</button>
                    </li>
                    <li className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Hotel & Resort</a>
                    </li>
                    <li className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Offerte</a>
                    </li>
                    <li className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-brand-red mr-4"></span>
                      <a href="#" className="text-lg font-montserrat font-bold uppercase tracking-wider text-brand-red" onClick={() => setIsMobileMenuOpen(false)}>{t.blog}</a>
                    </li>
                    
                    {/* Prima Parc Club Highlighted */}
                    <li className="pt-2">
                      <a 
                        href="#" 
                        className="inline-block border border-brand-red rounded-lg px-5 py-3 text-lg font-montserrat font-bold uppercase tracking-wider text-brand-red hover:bg-brand-red hover:text-white transition-all" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Prima Parc Club
                      </a>
                    </li>

                    <li className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-brand-red mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <a href="#" className="text-lg font-montserrat font-medium uppercase tracking-wider hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.contacts}</a>
                    </li>
                  </ul>
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <button className="w-full bg-brand-red text-white py-5 rounded-xl font-bold uppercase tracking-[0.15em] text-sm shadow-xl shadow-red-900/20 active:scale-95 transition-transform">
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BackToTop t={t} />
    </div>
  );
}
