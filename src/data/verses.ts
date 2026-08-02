/*
 * RESCUE CHURCH — VERSE OF THE DAY DATA FILE
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for the header "Verse of the Day" strip.
 *
 * TRANSLATIONS: King James Version (English) + Reina-Valera 1909 (Spanish).
 * Both are public domain — safe to reproduce in full on a public site with
 * no licensing needed. This is a deliberate departure from the site's other
 * Bible resources (ERV / Reina Valera 1960 PDFs, which ARE copyrighted and
 * only linked, not reproduced) — see VERSES.md for the full reasoning.
 *
 * CURRENT SIZE: 118 verses (target is ~400 over time). Every verse here was
 * hand-selected to read as a complete, standalone thought — no verses that
 * only make sense mid-passage. Soft length target ~180 characters (English)
 * so the strip stays a clean 1–2 lines; a handful of especially well-known
 * passages run longer and are quoted in full rather than truncated.
 *
 * HOW TO ADD A VERSE
 *   Append an object to VERSES below: { ref, refES, textEN, textES }.
 *   - Quote the KJV / RV1909 text exactly (verbatim, no paraphrasing).
 *   - Prefer verses that stand alone without surrounding context.
 *   - No code changes needed — rotation picks up the new array length
 *     automatically. See VERSES.md for the full list and how to extend it.
 *
 * ROTATION: deterministic by day-of-year + year, so it changes once a day
 * and (once the list reaches 365+) never repeats twice in the same year.
 * Below 365 entries, it cycles roughly every `VERSES.length` days — expected
 * and fine for a growing list.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface DailyVerse {
  /** English book/chapter/verse reference, e.g. "Romans 8:28". */
  ref: string;
  /** Spanish reference, e.g. "Romanos 8:28". */
  refES: string;
  textEN: string;
  textES: string;
}

export const VERSES: DailyVerse[] = [
  // ── Faith & Trust ──────────────────────────────────────────────────────
  { ref: "Proverbs 3:5-6", refES: "Proverbios 3:5-6",
    textEN: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    textES: "Fíate de Jehová de todo tu corazón, Y no estribes en tu prudencia. Reconócelo en todos tus caminos, Y él enderezará tus veredas." },
  { ref: "Hebrews 11:1", refES: "Hebreos 11:1",
    textEN: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    textES: "Es pues la fe la sustancia de las cosas que se esperan, la demostración de las cosas que no se ven." },
  { ref: "Isaiah 41:10", refES: "Isaías 41:10",
    textEN: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    textES: "No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia." },
  { ref: "Romans 8:28", refES: "Romanos 8:28",
    textEN: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    textES: "Y sabemos que á los que á Dios aman, todas las cosas les ayudan á bien, es á saber, á los que conforme al propósito son llamados." },
  { ref: "Psalm 46:10", refES: "Salmo 46:10",
    textEN: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
    textES: "Estad quietos, y conoced que yo soy Dios: Ensalzado he de ser entre las gentes, ensalzado seré en la tierra." },
  { ref: "Joshua 1:9", refES: "Josué 1:9",
    textEN: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    textES: "Mira que te mando que te esfuerces y seas valiente: no temas ni desmayes, porque Jehová tu Dios será contigo en donde quiera que fueres." },
  { ref: "Psalm 56:3", refES: "Salmo 56:3",
    textEN: "What time I am afraid, I will trust in thee.",
    textES: "En el día que temo, Yo en ti confío." },
  { ref: "Proverbs 16:3", refES: "Proverbios 16:3",
    textEN: "Commit thy works unto the LORD, and thy thoughts shall be established.",
    textES: "Encomienda á Jehová tus obras, Y tus pensamientos serán afirmados." },

  // ── Hope ───────────────────────────────────────────────────────────────
  { ref: "Jeremiah 29:11", refES: "Jeremías 29:11",
    textEN: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    textES: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis." },
  { ref: "Romans 15:13", refES: "Romanos 15:13",
    textEN: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    textES: "Y el Dios de esperanza os llene de todo gozo y paz creyendo, para que abundéis en esperanza por la virtud del Espíritu Santo." },
  { ref: "Lamentations 3:22-23", refES: "Lamentaciones 3:22-23",
    textEN: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    textES: "Es por la misericordia de Jehová que no somos consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; Grande es tu fidelidad." },
  { ref: "Psalm 42:11", refES: "Salmo 42:11",
    textEN: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.",
    textES: "¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? Espera á Dios; porque aún he de alabarle, Salud de mi rostro, y Dios mío." },
  { ref: "Romans 5:5", refES: "Romanos 5:5",
    textEN: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.",
    textES: "Y la esperanza no avergüenza; porque el amor de Dios está derramado en nuestros corazones por el Espíritu Santo que nos es dado." },

  // ── Strength ───────────────────────────────────────────────────────────
  { ref: "Philippians 4:13", refES: "Filipenses 4:13",
    textEN: "I can do all things through Christ which strengtheneth me.",
    textES: "Todo lo puedo en Cristo que me fortalece." },
  { ref: "Isaiah 40:31", refES: "Isaías 40:31",
    textEN: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    textES: "Empero los que esperan á Jehová tendrán nuevas fuerzas; levantarán las alas como águilas, correrán, y no se cansarán, caminarán, y no se fatigarán." },
  { ref: "2 Corinthians 12:9", refES: "2 Corintios 12:9",
    textEN: "My grace is sufficient for thee: for my strength is made perfect in weakness.",
    textES: "Bástate mi gracia; porque mi potencia en la flaqueza se perfecciona." },
  { ref: "Psalm 28:7", refES: "Salmo 28:7",
    textEN: "The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.",
    textES: "Jehová es mi fortaleza y mi escudo; En él confió mi corazón, y fuí ayudado: Por lo que se gozó mi corazón, Y con mi canción le alabaré." },
  { ref: "Nehemiah 8:10", refES: "Nehemías 8:10",
    textEN: "...for the joy of the LORD is your strength.",
    textES: "...porque el gozo de Jehová es vuestra fortaleza." },
  { ref: "Ephesians 6:10", refES: "Efesios 6:10",
    textEN: "Finally, my brethren, be strong in the Lord, and in the power of his might.",
    textES: "Por lo demás, hermanos míos, confortaos en el Señor, y en la potencia de su fortaleza." },

  // ── Peace & Comfort ────────────────────────────────────────────────────
  { ref: "Philippians 4:6-7", refES: "Filipenses 4:6-7",
    textEN: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    textES: "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús." },
  { ref: "John 14:27", refES: "Juan 14:27",
    textEN: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    textES: "La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy. No se turbe vuestro corazón, ni tenga miedo." },
  { ref: "Psalm 34:18", refES: "Salmo 34:18",
    textEN: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    textES: "Cercano está Jehová á los quebrantados de corazón; Y salva á los contritos de espíritu." },
  { ref: "Matthew 11:28", refES: "Mateo 11:28",
    textEN: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    textES: "Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar." },
  { ref: "Psalm 23:1", refES: "Salmo 23:1",
    textEN: "The LORD is my shepherd; I shall not want.",
    textES: "Jehová es mi pastor; nada me faltará." },
  { ref: "Isaiah 26:3", refES: "Isaías 26:3",
    textEN: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    textES: "Tú le guardarás en completa paz, cuyo pensamiento en ti persevera; porque en ti se ha confiado." },
  { ref: "2 Thessalonians 3:16", refES: "2 Tesalonicenses 3:16",
    textEN: "Now the Lord of peace himself give you peace always by all means. The Lord be with you all.",
    textES: "Y el mismo Señor de paz os dé siempre paz en toda manera. El Señor sea con todos vosotros." },
  { ref: "Psalm 55:22", refES: "Salmo 55:22",
    textEN: "Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.",
    textES: "Echa sobre Jehová tu carga, y él te sustentará; No dejará para siempre caído al justo." },

  // ── Love ───────────────────────────────────────────────────────────────
  { ref: "John 3:16", refES: "Juan 3:16",
    textEN: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    textES: "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
  { ref: "1 John 4:19", refES: "1 Juan 4:19",
    textEN: "We love him, because he first loved us.",
    textES: "Nosotros le amamos á él, porque él nos amó primero." },
  { ref: "Romans 8:38-39", refES: "Romanos 8:38-39",
    textEN: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.",
    textES: "Por lo cual estoy cierto que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, Ni lo alto, ni lo bajo, ni ninguna criatura nos podrá apartar del amor de Dios, que es en Cristo Jesús Señor nuestro." },
  { ref: "1 Corinthians 13:4", refES: "1 Corintios 13:4",
    textEN: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
    textES: "La caridad es sufrida, es benigna; la caridad no tiene envidia, la caridad no hace sinrazón, no se ensancha." },
  { ref: "1 John 4:18", refES: "1 Juan 4:18",
    textEN: "There is no fear in love; but perfect love casteth out fear.",
    textES: "En amor no hay temor; mas el perfecto amor echa fuera el temor." },
  { ref: "Zephaniah 3:17", refES: "Sofonías 3:17",
    textEN: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.",
    textES: "Jehová en medio de ti, poderoso, él salvará; gozarse ha sobre ti con alegría, callará de amor, se gozará sobre ti con cántico." },

  // ── Wisdom & Guidance ──────────────────────────────────────────────────
  { ref: "James 1:5", refES: "Santiago 1:5",
    textEN: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
    textES: "Y si alguno de vosotros tiene falta de sabiduría, demándela á Dios, el cual da á todos abundantemente y sin vituperar; y le será dada." },
  { ref: "Psalm 119:105", refES: "Salmo 119:105",
    textEN: "Thy word is a lamp unto my feet, and a light unto my path.",
    textES: "Lámpara es á mis pies tu palabra, Y lumbrera á mi camino." },
  { ref: "Proverbs 22:6", refES: "Proverbios 22:6",
    textEN: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
    textES: "Instruye al niño en su carrera: Aun cuando fuere viejo no se apartará de ella." },
  { ref: "Micah 6:8", refES: "Miqueas 6:8",
    textEN: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    textES: "Oh hombre, él te ha declarado qué sea lo bueno, y qué pida de ti Jehová: solamente hacer juicio, y amar misericordia, y humillarte para andar con tu Dios." },
  { ref: "Proverbs 4:23", refES: "Proverbios 4:23",
    textEN: "Keep thy heart with all diligence; for out of it are the issues of life.",
    textES: "Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida." },

  // ── Provision ──────────────────────────────────────────────────────────
  { ref: "Philippians 4:19", refES: "Filipenses 4:19",
    textEN: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
    textES: "Mi Dios, pues, suplirá todo lo que os falta conforme á sus riquezas en gloria en Cristo Jesús." },
  { ref: "Matthew 6:33", refES: "Mateo 6:33",
    textEN: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    textES: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas." },
  { ref: "Psalm 37:4", refES: "Salmo 37:4",
    textEN: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
    textES: "Deléitate asimismo en Jehová, Y él te dará las peticiones de tu corazón." },
  { ref: "Psalm 34:10", refES: "Salmo 34:10",
    textEN: "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing.",
    textES: "Los leoncillos empobrecen y tienen hambre; Pero los que buscan á Jehová, no tendrán falta de ningún bien." },

  // ── Salvation & Grace ──────────────────────────────────────────────────
  { ref: "Ephesians 2:8-9", refES: "Efesios 2:8-9",
    textEN: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
    textES: "Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios: No de obras, para que nadie se gloríe." },
  { ref: "Romans 10:9", refES: "Romanos 10:9",
    textEN: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
    textES: "Que si confesares con tu boca al Señor Jesús, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo." },
  { ref: "2 Corinthians 5:17", refES: "2 Corintios 5:17",
    textEN: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    textES: "De modo que si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron; he aquí todas son hechas nuevas." },
  { ref: "Titus 3:5", refES: "Tito 3:5",
    textEN: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.",
    textES: "No por obras de justicia que nosotros habíamos hecho, mas por su misericordia nos salvó, por el lavamiento de la regeneración, y de la renovación del Espíritu Santo." },
  { ref: "John 1:12", refES: "Juan 1:12",
    textEN: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.",
    textES: "Mas á todos los que le recibieron, dióles potestad de ser hechos hijos de Dios, á los que creen en su nombre." },

  // ── Joy ────────────────────────────────────────────────────────────────
  { ref: "Psalm 16:11", refES: "Salmo 16:11",
    textEN: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
    textES: "Enseñarme has la senda de la vida: Hartura de alegrías hay con tu rostro; Deleites en tu diestra para siempre." },
  { ref: "Psalm 30:5", refES: "Salmo 30:5",
    textEN: "...weeping may endure for a night, but joy cometh in the morning.",
    textES: "...Por la tarde durará el lloro, Y á la mañana vendrá la alegría." },
  { ref: "James 1:2-3", refES: "Santiago 1:2-3",
    textEN: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.",
    textES: "Hermanos míos, tened por sumo gozo cuando cayereis en diversas tentaciones; Sabiendo que la prueba de vuestra fe obra paciencia." },
  { ref: "Psalm 118:24", refES: "Salmo 118:24",
    textEN: "This is the day which the LORD hath made; we will rejoice and be glad in it.",
    textES: "Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él." },

  // ── Prayer ─────────────────────────────────────────────────────────────
  { ref: "1 Thessalonians 5:16-18", refES: "1 Tesalonicenses 5:16-18",
    textEN: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    textES: "Estad siempre gozosos. Orad sin cesar. Dad gracias en todo; porque esta es la voluntad de Dios para con vosotros en Cristo Jesús." },
  { ref: "Matthew 7:7", refES: "Mateo 7:7",
    textEN: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",
    textES: "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá." },
  { ref: "James 5:16", refES: "Santiago 5:16",
    textEN: "...The effectual fervent prayer of a righteous man availeth much.",
    textES: "...La oración eficaz del justo puede mucho." },
  { ref: "Jeremiah 33:3", refES: "Jeremías 33:3",
    textEN: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.",
    textES: "Clama á mí, y te responderé, y te enseñaré cosas grandes y dificultosas que tú no sabes." },

  // ── Gratitude ──────────────────────────────────────────────────────────
  { ref: "Psalm 100:4-5", refES: "Salmo 100:4-5",
    textEN: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.",
    textES: "Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza: Alabadle, bendecid su nombre. Porque Jehová es bueno; para siempre es su misericordia, Y su verdad por todas las generaciones." },
  { ref: "1 Chronicles 16:34", refES: "1 Crónicas 16:34",
    textEN: "O give thanks unto the LORD; for he is good; for his mercy endureth for ever.",
    textES: "Aclamad á Jehová, porque es bueno; Porque su misericordia es para siempre." },
  { ref: "Colossians 3:15", refES: "Colosenses 3:15",
    textEN: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",
    textES: "Y la paz de Dios gobierne en vuestros corazones, á la cual asimismo sois llamados en un cuerpo; y sed agradecidos." },

  // ── Family ─────────────────────────────────────────────────────────────
  { ref: "Joshua 24:15", refES: "Josué 24:15",
    textEN: "...but as for me and my house, we will serve the LORD.",
    textES: "...pero yo y mi casa serviremos á Jehová." },
  { ref: "Psalm 127:3", refES: "Salmo 127:3",
    textEN: "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.",
    textES: "He aquí, herencia de Jehová son los hijos: Cosa de estima el fruto del vientre." },
  { ref: "Ephesians 6:1", refES: "Efesios 6:1",
    textEN: "Children, obey your parents in the Lord: for this is right.",
    textES: "Hijos, obedeced en el Señor á vuestros padres; porque esto es justo." },
  { ref: "Deuteronomy 6:6-7", refES: "Deuteronomio 6:6-7",
    textEN: "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children.",
    textES: "Y estas palabras que yo te mando hoy, estarán sobre tu corazón: Y las repetirás á tus hijos." },

  // ── Perseverance & Trials ──────────────────────────────────────────────
  { ref: "James 1:12", refES: "Santiago 1:12",
    textEN: "Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.",
    textES: "Bienaventurado el varón que sufre la tentación; porque cuando fuere probado, recibirá la corona de vida, que Dios ha prometido á los que le aman." },
  { ref: "Romans 5:3-4", refES: "Romanos 5:3-4",
    textEN: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience; And patience, experience; and experience, hope.",
    textES: "Y no sólo esto, mas aun nos gloriamos en las tribulaciones, sabiendo que la tribulación produce paciencia; Y la paciencia, prueba; y la prueba, esperanza." },
  { ref: "2 Corinthians 4:17", refES: "2 Corintios 4:17",
    textEN: "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory.",
    textES: "Porque esto que es al presente momentáneo y leve de nuestra tribulación, nos obra un sobremanera alto y eterno peso de gloria." },
  { ref: "Galatians 6:9", refES: "Gálatas 6:9",
    textEN: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    textES: "No nos cansemos, pues, de hacer bien; que á su tiempo segaremos, si no hubiéremos desmayado." },
  { ref: "James 1:4", refES: "Santiago 1:4",
    textEN: "But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.",
    textES: "Mas tenga la paciencia perfecta su obra, para que seáis perfectos y cabales, sin faltar en ninguna cosa." },

  // ── Protection ─────────────────────────────────────────────────────────
  { ref: "Psalm 91:1-2", refES: "Salmo 91:1-2",
    textEN: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
    textES: "El que habita al abrigo del Altísimo, Morará bajo la sombra del Omnipotente. Diré yo á Jehová: Esperanza mía, y castillo mío; Mi Dios, en él confiaré." },
  { ref: "Psalm 121:7-8", refES: "Salmo 121:7-8",
    textEN: "The LORD shall preserve thee from all evil: he shall preserve thy soul. The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
    textES: "Jehová te guardará de todo mal; Él guardará tu alma. Jehová guardará tu salida y tu entrada Desde ahora y para siempre." },
  { ref: "Proverbs 18:10", refES: "Proverbios 18:10",
    textEN: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",
    textES: "Torre fuerte es el nombre de Jehová: A él correrá el justo, y será levantado." },
  { ref: "2 Thessalonians 3:3", refES: "2 Tesalonicenses 3:3",
    textEN: "But the Lord is faithful, who shall stablish you, and keep you from evil.",
    textES: "Mas fiel es el Señor, que os confirmará y guardará del mal." },

  // ── Forgiveness ────────────────────────────────────────────────────────
  { ref: "1 John 1:9", refES: "1 Juan 1:9",
    textEN: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    textES: "Si confesamos nuestros pecados, él es fiel y justo para que nos perdone nuestros pecados, y nos limpie de toda maldad." },
  { ref: "Colossians 3:13", refES: "Colosenses 3:13",
    textEN: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.",
    textES: "Sufriéndoos los unos á los otros, y perdonándoos unos á otros si alguno tuviere queja del otro: de la manera que Cristo os perdonó, así también hacedlo vosotros." },
  { ref: "Psalm 103:12", refES: "Salmo 103:12",
    textEN: "As far as the east is from the west, so far hath he removed our transgressions from us.",
    textES: "Cuanto está lejos el oriente del occidente, Hizo alejar de nosotros nuestras rebeliones." },
  { ref: "Micah 7:19", refES: "Miqueas 7:19",
    textEN: "...thou wilt cast all their sins into the depths of the sea.",
    textES: "...y echarás en los profundos de la mar todos nuestros pecados." },

  // ── Courage ────────────────────────────────────────────────────────────
  { ref: "Deuteronomy 31:6", refES: "Deuteronomio 31:6",
    textEN: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
    textES: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos: que Jehová tu Dios es el que va contigo: no te dejará ni te desamparará." },
  { ref: "1 Corinthians 16:13", refES: "1 Corintios 16:13",
    textEN: "Watch ye, stand fast in the faith, quit you like men, be strong.",
    textES: "Velad, estad firmes en la fe; portaos varonilmente, y esforzaos." },
  { ref: "Psalm 27:1", refES: "Salmo 27:1",
    textEN: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
    textES: "Jehová es mi luz y mi salvación: ¿de quién temeré? Jehová es la fortaleza de mi vida: ¿de quién he de atemorizarme?" },
  { ref: "2 Timothy 1:7", refES: "2 Timoteo 1:7",
    textEN: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    textES: "Porque no nos ha dado Dios el espíritu de cobardía, sino el de fortaleza, y de amor, y de templanza." },

  // ── God's Character ────────────────────────────────────────────────────
  { ref: "Numbers 23:19", refES: "Números 23:19",
    textEN: "God is not a man, that he should lie; neither the son of man, that he should repent: hath he said, and shall he not do it? or hath he spoken, and shall he not make it good?",
    textES: "Dios no es hombre, para que mienta; Ni hijo de hombre para que se arrepienta: Él dijo, ¿y no hará?; Habló, ¿y no lo ejecutará?" },
  { ref: "Malachi 3:6", refES: "Malaquías 3:6",
    textEN: "For I am the LORD, I change not.",
    textES: "Porque yo Jehová no me mudo." },
  { ref: "James 1:17", refES: "Santiago 1:17",
    textEN: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights, with whom is no variableness, neither shadow of turning.",
    textES: "Toda dádiva buena y todo don perfecto es de lo alto, que desciende del Padre de las luces, en el cual no hay mudanza, ni sombra de variación." },
  { ref: "Psalm 145:9", refES: "Salmo 145:9",
    textEN: "The LORD is good to all: and his tender mercies are over all his works.",
    textES: "Bueno es Jehová para con todos; Y sus misericordias sobre todas sus obras." },
  { ref: "Exodus 34:6", refES: "Éxodo 34:6",
    textEN: "...The LORD, The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth.",
    textES: "...Jehová, Jehová, fuerte, misericordioso, y piadoso; tardo para la ira, y grande en benignidad y verdad." },

  // ── Worship & Praise ───────────────────────────────────────────────────
  { ref: "Psalm 150:6", refES: "Salmo 150:6",
    textEN: "Let every thing that hath breath praise the LORD. Praise ye the LORD.",
    textES: "Todo lo que respira alabe á JAH. Aleluya." },
  { ref: "Psalm 34:1", refES: "Salmo 34:1",
    textEN: "I will bless the LORD at all times: his praise shall continually be in my mouth.",
    textES: "Bendeciré á Jehová en todo tiempo; Su alabanza estará de continuo en mi boca." },
  { ref: "Psalm 95:6", refES: "Salmo 95:6",
    textEN: "O come, let us worship and bow down: let us kneel before the LORD our maker.",
    textES: "Venid, adoremos y postrémonos; Arrodillémonos delante de Jehová nuestro hacedor." },
  { ref: "Psalm 108:1", refES: "Salmo 108:1",
    textEN: "O God, my heart is fixed; I will sing and give praise, even with my glory.",
    textES: "Dispuesto está, oh Dios, mi corazón; Cantaré y salmearé aun en mi gloria." },

  // ── Identity in Christ ─────────────────────────────────────────────────
  { ref: "Galatians 2:20", refES: "Gálatas 2:20",
    textEN: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.",
    textES: "Con Cristo estoy juntamente crucificado, y vivo, no ya yo, mas vive Cristo en mí: y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó, y se entregó á sí mismo por mí." },
  { ref: "Ephesians 2:10", refES: "Efesios 2:10",
    textEN: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
    textES: "Porque somos hechura suya, criados en Cristo Jesús para buenas obras, las cuales Dios preparó para que anduviésemos en ellas." },
  { ref: "1 Peter 2:9", refES: "1 Pedro 2:9",
    textEN: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.",
    textES: "Mas vosotros sois linaje escogido, real sacerdocio, gente santa, pueblo adquirido, para que anunciéis las virtudes de aquel que os ha llamado de las tinieblas á su luz admirable." },
  { ref: "2 Corinthians 3:17", refES: "2 Corintios 3:17",
    textEN: "...where the Spirit of the Lord is, there is liberty.",
    textES: "...y en donde hay el Espíritu del Señor, allí hay libertad." },

  // ── The Word ───────────────────────────────────────────────────────────
  { ref: "2 Timothy 3:16", refES: "2 Timoteo 3:16",
    textEN: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
    textES: "Toda Escritura es inspirada divinamente y útil para enseñar, para redargüir, para corregir, para instituir en justicia." },
  { ref: "Hebrews 4:12", refES: "Hebreos 4:12",
    textEN: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.",
    textES: "Porque la palabra de Dios es viva y eficaz, y más penetrante que toda espada de dos filos: y que alcanza hasta partir el alma, y aun el espíritu, y las coyunturas y tuétanos, y discierne los pensamientos y las intenciones del corazón." },
  { ref: "Matthew 4:4", refES: "Mateo 4:4",
    textEN: "...Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.",
    textES: "...No con solo el pan vivirá el hombre, mas con toda palabra que sale de la boca de Dios." },

  // ── Humility & Service ─────────────────────────────────────────────────
  { ref: "Philippians 2:3-4", refES: "Filipenses 2:3-4",
    textEN: "Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others.",
    textES: "Nada hagáis por contienda ó por vanagloria; antes bien en humildad, estimando cada uno á los demás mejores que él mismo." },
  { ref: "James 4:10", refES: "Santiago 4:10",
    textEN: "Humble yourselves in the sight of the Lord, and he shall lift you up.",
    textES: "Humillaos delante del Señor, y él os ensalzará." },
  { ref: "Mark 10:45", refES: "Marcos 10:45",
    textEN: "For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.",
    textES: "Porque el Hijo del hombre tampoco vino para ser servido, mas para servir, y dar su vida en rescate por muchos." },
  { ref: "Galatians 5:13", refES: "Gálatas 5:13",
    textEN: "...by love serve one another.",
    textES: "...servíos por amor los unos á los otros." },
  { ref: "1 Peter 5:6", refES: "1 Pedro 5:6",
    textEN: "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time.",
    textES: "Humillaos, pues, bajo la poderosa mano de Dios, para que él os ensalce cuando fuere tiempo." },

  // ── Second Coming & Eternal Hope ───────────────────────────────────────
  { ref: "John 14:3", refES: "Juan 14:3",
    textEN: "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
    textES: "Y si me fuere, y os aparejare lugar, vendré otra vez, y os tomaré á mí mismo: para que donde yo estoy, vosotros también estéis." },
  { ref: "Revelation 21:4", refES: "Apocalipsis 21:4",
    textEN: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
    textES: "Y limpiará Dios toda lágrima de los ojos de ellos; y la muerte no será más; y no habrá más llanto, ni clamor, ni dolor: porque las primeras cosas son pasadas." },
  { ref: "1 Corinthians 15:57", refES: "1 Corintios 15:57",
    textEN: "But thanks be to God, which giveth us the victory through our Lord Jesus Christ.",
    textES: "Mas á Dios gracias, que nos da la victoria por el Señor nuestro Jesucristo." },
  { ref: "Titus 2:13", refES: "Tito 2:13",
    textEN: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.",
    textES: "Esperando aquella esperanza bienaventurada, y la manifestación gloriosa del gran Dios y Salvador nuestro Jesucristo." },

  // ── Rest ───────────────────────────────────────────────────────────────
  { ref: "Psalm 46:1", refES: "Salmo 46:1",
    textEN: "God is our refuge and strength, a very present help in trouble.",
    textES: "Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones." },
  { ref: "Exodus 33:14", refES: "Éxodo 33:14",
    textEN: "And he said, My presence shall go with thee, and I will give thee rest.",
    textES: "Y él dijo: Mi rostro irá contigo, y te haré descansar." },
  { ref: "Hebrews 4:9", refES: "Hebreos 4:9",
    textEN: "There remaineth therefore a rest to the people of God.",
    textES: "Por tanto, queda un reposo para el pueblo de Dios." },

  // ── Contentment ────────────────────────────────────────────────────────
  { ref: "Philippians 4:11", refES: "Filipenses 4:11",
    textEN: "...for I have learned, in whatsoever state I am, therewith to be content.",
    textES: "...porque he aprendido á contentarme con lo que tengo." },
  { ref: "1 Timothy 6:6", refES: "1 Timoteo 6:6",
    textEN: "But godliness with contentment is great gain.",
    textES: "Pero grande granjería es la piedad con contentamiento." },
  { ref: "Habakkuk 3:18", refES: "Habacuc 3:18",
    textEN: "Yet I will rejoice in the LORD, I will joy in the God of my salvation.",
    textES: "Con todo yo me alegraré en Jehová, Y me gozaré en el Dios de mi salud." },

  // ── Trust in Hard Times ────────────────────────────────────────────────
  { ref: "Psalm 34:19", refES: "Salmo 34:19",
    textEN: "Many are the afflictions of the righteous: but the LORD delivereth him out of them all.",
    textES: "Muchas son las aflicciones del justo; Pero de todas ellas le librará Jehová." },
  { ref: "Nahum 1:7", refES: "Nahúm 1:7",
    textEN: "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.",
    textES: "Bueno es Jehová para fortaleza en el día de angustia; y conoce á los que en él confían." },
  { ref: "John 16:33", refES: "Juan 16:33",
    textEN: "...In the world ye shall have tribulation: but be of good cheer; I have overcome the world.",
    textES: "...En el mundo tendréis aflicción: mas confiad, yo he vencido al mundo." },
  { ref: "Psalm 73:26", refES: "Salmo 73:26",
    textEN: "My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.",
    textES: "Mi carne y mi corazón desfallecen: Mas la roca de mi corazón y mi porción es Dios para siempre." },

  // ── God's Presence ─────────────────────────────────────────────────────
  { ref: "Deuteronomy 31:8", refES: "Deuteronomio 31:8",
    textEN: "And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.",
    textES: "Y Jehová va delante de ti; él estará contigo, no te dejará, ni te desamparará; no temas, ni te intimides." },
  { ref: "Psalm 139:7", refES: "Salmo 139:7",
    textEN: "Whither shall I go from thy spirit? or whither shall I flee from thy presence?",
    textES: "¿Adónde me iré de tu espíritu? ¿Y adónde huiré de tu presencia?" },
  { ref: "Matthew 28:20", refES: "Mateo 28:20",
    textEN: "...and, lo, I am with you alway, even unto the end of the world.",
    textES: "...y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo." },
  { ref: "Isaiah 43:2", refES: "Isaías 43:2",
    textEN: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.",
    textES: "Cuando pasares por las aguas, yo seré contigo; y por los ríos, no te anegarán." },
];

/**
 * Deterministic verse for a given date: index = (day-of-year + year) % length.
 * Changes once per calendar day. Guaranteed zero repeats within a year once
 * VERSES.length reaches 365+; below that it cycles roughly every N days,
 * which is expected while the list is still growing toward ~400.
 */
export function getVerseOfDay(date: Date = new Date()): DailyVerse {
  const start = Date.UTC(date.getFullYear(), 0, 1);
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfYear = Math.floor((now - start) / 86_400_000);
  const index = (dayOfYear + date.getFullYear()) % VERSES.length;
  return VERSES[index];
}
