import { getTriviasDocente } from './store'

export const trivias = [
  {
    id: 'trivia-dignidad',
    title: 'Derechos y Dignidad de la Mujer',
    icon: 'ph-fill ph-graduation-cap',
    description:
      'Pon a prueba tus conocimientos sobre los derechos humanos de las mujeres, la igualdad de género y la erradicación de la violencia. Ideal para estudiantes de secundaria y bachillerato.',
    questions: [
      {
        text: '¿Qué declaración internacional reconoce los derechos humanos de todas las personas, incluidas las mujeres?',
        options: [
          'La Declaración de la Independencia de Estados Unidos',
          'El Tratado de Versalles',
          'La Declaración Universal de Derechos Humanos',
          'La Carta Magna de 1215',
        ],
        correct: 2,
        points: 100,
        explanation:
          'La Declaración Universal de Derechos Humanos (1948) reconoce derechos humanos para todas las personas, incluidas las mujeres.',
      },
      {
        text: '¿Cómo se llama el instrumento internacional que protege de forma específica los derechos de las mujeres?',
        options: ['UNICEF', 'OMC', 'FMI', 'CEDAW'],
        correct: 3,
        points: 100,
        explanation:
          'CEDAW (Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer) protege de forma específica los derechos de las mujeres.',
      },
      {
        text: '¿Cuál es el principal derecho que la Convención de Belém do Pará protege para las mujeres?',
        options: [
          'El derecho a conducir vehículos',
          'El derecho a una vida libre de violencia',
          'El derecho a heredar solo entre hermanas',
          'El derecho a no trabajar',
        ],
        correct: 1,
        points: 100,
        explanation:
          'La Convención de Belém do Pará protege el derecho de las mujeres a una vida libre de violencia, tanto en el ámbito público como privado.',
      },
      {
        text: '¿Qué significa la igualdad sustantiva entre mujeres y hombres?',
        options: [
          'Que solo se aplica en la escuela',
          'Que las mujeres reciban trato preferente siempre',
          'Que no existen diferencias biológicas',
          'Igualdad real de resultados y oportunidades',
        ],
        correct: 3,
        points: 100,
        explanation:
          'La igualdad sustantiva busca la igualdad real de resultados y oportunidades, y no solo la igualdad ante la ley.',
      },
      {
        text: '¿Cuál de estas acciones promueve la dignidad y el respeto hacia las mujeres?',
        options: [
          'Burlarse de sus apariencias',
          'Ignorar sus aportaciones en clase',
          'Escuchar y creer en sus testimonios, evitando estereotipos',
          'Decidir por ellas lo que es mejor',
        ],
        correct: 2,
        points: 100,
        explanation:
          'Escuchar y creer en sus testimonios, evitando estereotipos, es una acción que promueve la dignidad y el respeto hacia las mujeres.',
      },
    ],
  },
  {
    id: 'trivia-mujeres-historia',
    title: 'Mujeres que Transformaron la Historia',
    icon: 'ph-fill ph-star',
    description:
      'Conoce a mujeres pioneras que lucharon por la igualdad, la ciencia y los derechos humanos. Una trivia para inspirar a las y los estudiantes.',
    questions: [
      {
        text: '¿Quién fue una de las primeras científicas en ganar dos premios Nobel?',
        options: ['Rosalind Franklin', 'Marie Curie', 'Ada Lovelace', 'Katherine Johnson'],
        correct: 1,
        points: 100,
        explanation:
          'Marie Curie ganó el Premio Nobel de Física (1903) y el de Química (1911), siendo pionera en la ciencia.',
      },
      {
        text: '¿Qué sufragista lideró la lucha por el voto femenino en Gran Bretaña?',
        options: ['Juana de Arco', 'Cleopatra', 'Emmeline Pankhurst', 'Frida Kahlo'],
        correct: 2,
        points: 100,
        explanation:
          'Emmeline Pankhurst lideró el movimiento sufragista británico que logró el derecho al voto de las mujeres.',
      },
      {
        text: '¿Quién escribió "Un cuarto propio", obra clave del feminismo literario?',
        options: ['Emily Dickinson', 'Jane Austen', 'Maya Angelou', 'Virginia Woolf'],
        correct: 3,
        points: 100,
        explanation: 'Virginia Woolf escribió "Un cuarto propio" (1929), una obra clave del feminismo literario.',
      },
    ],
  },
  {
    id: 'trivia-igualdad',
    title: 'Igualdad de Género y Dignidad de la Mujer',
    icon: 'ph-fill ph-gender-female',
    description:
      'Una trivia más amplia sobre igualdad de género, dignidad, estereotipos, violencia y los derechos de las mujeres en la sociedad.',
    questions: [
      {
        text: '¿Qué significa la igualdad de género?',
        options: [
          'Que hombres y mujeres deben ser idénticos en todo',
          'Que todas las personas tienen los mismos derechos, responsabilidades y oportunidades',
          'Que solo las mujeres tienen derechos',
          'Que los hombres deben tener más oportunidades',
        ],
        correct: 1,
        points: 100,
        explanation:
          'La igualdad de género significa que todas las personas gozan de los mismos derechos, responsabilidades y oportunidades, independientemente de su género.',
      },
      {
        text: '¿Cuál de estas situaciones es una forma de violencia contra las mujeres?',
        options: [
          'Felicitarla por su buen trabajo',
          'Cederle el asiento en el autobús',
          'Hacer comentarios ofensivos sobre su apariencia',
          'Invitarla a participar en clase',
        ],
        correct: 2,
        points: 100,
        explanation:
          'Los comentarios y burlas ofensivas sobre la apariencia son una forma de violencia psicológica o simbólica contra las mujeres.',
      },
      {
        text: '¿Qué es la brecha salarial de género?',
        options: [
          'La distancia entre países por sus sueldos',
          'El dinero que ganan solo las mujeres',
          'Un impuesto especial que pagan las empresas',
          'La diferencia de ingresos entre mujeres y hombres por un trabajo de igual valor',
        ],
        correct: 3,
        points: 100,
        explanation:
          'La brecha salarial es la diferencia de ingresos entre mujeres y hombres que realizan trabajos de igual valor.',
      },
      {
        text: '¿Qué promueve la perspectiva de género?',
        options: [
          'Analizar las desigualdades entre mujeres y hombres para transformarlas',
          'Ocultar los problemas que viven las mujeres',
          'Dar ventajas solo a los hombres',
          'Que las mujeres dejen de estudiar',
        ],
        correct: 0,
        points: 100,
        explanation:
          'La perspectiva de género permite identificar y analizar las desigualdades entre mujeres y hombres para transformarlas en igualdad real.',
      },
      {
        text: '¿Qué significa el empoderamiento de las mujeres?',
        options: [
          'Que las mujeres tengan más poder que los hombres',
          'Fortalecer su autonomía y capacidad para tomar decisiones',
          'Que las mujeres obedezcan las decisiones de otros',
          'Que las mujeres no participen en la sociedad',
        ],
        correct: 1,
        points: 100,
        explanation:
          'Empoderar a las mujeres significa fortalecer su autonomía, confianza y capacidad para decidir sobre su propia vida.',
      },
      {
        text: '¿Quién debe participar en la promoción de la igualdad de género?',
        options: [
          'Solo las mujeres',
          'Solo los gobiernos',
          'Todas las personas: hombres, mujeres, niñas y niños',
          'Solo las escuelas de nivel superior',
        ],
        correct: 2,
        points: 100,
        explanation:
          'La igualdad de género es responsabilidad de toda la sociedad; todas las personas pueden contribuir a promoverla.',
      },
      {
        text: '¿Cuál es una actitud que respeta la dignidad de las mujeres?',
        options: [
          'Interrumpirlas cuando hablan',
          'Decidir por ellas lo que es mejor',
          'Hacer chistes sobre su forma de vestir',
          'Reconocer y valorar sus aportaciones',
        ],
        correct: 3,
        points: 100,
        explanation:
          'Reconocer y valorar sus aportaciones, escucharlas y tratarlas con respeto protege la dignidad de las mujeres.',
      },
      {
        text: '¿Qué es el acoso sexual?',
        options: [
          'Conductas no deseadas de naturaleza sexual que crean un ambiente hostil',
          'Un cumplido que la persona agradece',
          'Un saludo de cortesía entre compañeros',
          'Una broma aceptada entre amigas y amigos',
        ],
        correct: 0,
        points: 100,
        explanation:
          'El acoso sexual son conductas no deseadas de naturaleza sexual que crean un ambiente hostil e intimidan a la persona.',
      },
      {
        text: '¿Cuál de estas afirmaciones es un estereotipo de género?',
        options: [
          '"Todas las personas merecen respeto"',
          '"Hombres y mujeres tienen los mismos derechos"',
          '"Las mujeres son débiles y los hombres no lloran"',
          '"Cada persona es diferente"',
        ],
        correct: 2,
        points: 100,
        explanation:
          'Los estereotipos de género asignan roles y características rígidas a mujeres y hombres, limitando su desarrollo libre.',
      },
      {
        text: '¿Qué documento internacional incluye el objetivo de lograr la igualdad de género?',
        options: [
          'El reglamento interno de una escuela',
          'El manual de instrucciones de un videojuego',
          'Un contrato de trabajo cualquiera',
          'La Agenda 2030 con sus Objetivos de Desarrollo Sostenible',
        ],
        correct: 3,
        points: 100,
        explanation:
          'La Agenda 2030 de la ONU incluye el Objetivo de Desarrollo Sostenible 5: lograr la igualdad de género y empoderar a todas las mujeres y niñas.',
      },
    ],
  },
  {
    id: 'trivia-acentos',
    title: 'Acentos en acción',
    icon: 'ph-fill ph-magic-wand',
    description:
      'Identifica y clasifica las palabras según su acentuación: agudas, graves y esdrújulas. Pon a prueba tu ortografía.',
    questions: [
      {
        text: '¿Cuál de estas palabras es AGUDA?',
        options: ['Árbol', 'Música', 'Canción', 'Lápiz'],
        correct: 2,
        points: 100,
        explanation: 'Las palabras agudas llevan la sílaba tónica en la última posición. "Canción" es aguda y se tilda al terminar en "n".',
      },
      {
        text: '¿Cuál de estas palabras es GRAVE o llana?',
        options: ['Corazón', 'Árbol', 'Fácilmente', 'Reloj'],
        correct: 1,
        points: 100,
        explanation: 'Las palabras graves tienen la sílaba tónica en la penúltima posición. "Árbol" es grave y se tilda por no terminar en n, s o vocal.',
      },
      {
        text: '¿Cuál de estas palabras es ESDRÚJULA?',
        options: ['Casa', 'Música', 'Papel', 'Azúcar'],
        correct: 1,
        points: 100,
        explanation: 'Las palabras esdrújulas llevan la sílaba tónica en la antepenúltima posición y SIEMPRE se tildan. "Música" es esdrújula.',
      },
      {
        text: 'La palabra "lápiz" es...',
        options: ['Aguda', 'Grave', 'Esdrújula', 'Sobresdrújula'],
        correct: 1,
        points: 100,
        explanation: '"Lápiz" es grave (tónica en penúltima sílaba). Se tilda porque termina en consonante distinta de n o s.',
      },
      {
        text: '¿En qué palabra recae la sílaba tónica de "pájaro"?',
        options: ['En la primera sílaba', 'En la segunda', 'En la última', 'No tiene tilde'],
        correct: 0,
        points: 100,
        explanation: '"Pájaro" es esdrújula: su sílaba tónica es "pá", la primera, por eso siempre lleva tilde.',
      },
    ],
  },
  {
    id: 'trivia-ortografia',
    title: 'Palabras voladoras: ortografía',
    icon: 'ph-fill ph-pen-nib',
    description:
      'Atrapa y escribe correctamente las palabras. Ejercita el uso de b/v, c/s/z, g/j y la tilde diacrítica.',
    questions: [
      {
        text: '¿Cuál es la escritura correcta?',
        options: ['Herbivoro', 'Herbívoro', 'Erbívoro', 'Herbivóro'],
        correct: 1,
        points: 100,
        explanation: '"Herbívoro" es esdrújula y se escribe con b y con tilde en la "i".',
      },
      {
        text: '¿Cuál es el plural correcto de "lápiz"?',
        options: ['Lápizes', 'Lápis', 'Lápices', 'Lapices'],
        correct: 2,
        points: 100,
        explanation: 'Las palabras que terminan en z cambian la z por c en el plural: lápiz → lápices.',
      },
      {
        text: '¿Cuál de estas palabras se escribe con "v"?',
        options: ['Bueno', 'Vaca', 'Bailar', 'Bola'],
        correct: 1,
        points: 100,
        explanation: '"Vaca" se escribe con v. Las otras (bueno, bailar, bola) se escriben con b.',
      },
      {
        text: 'Selecciona la palabra bien escrita con "h":',
        options: ['Olar', 'Holer', 'Oler', 'Hollar'],
        correct: 2,
        points: 100,
        explanation: '"Oler" se escribe con h inicial muda (aspirada en algunas regiones).',
      },
      {
        text: '¿Cuál es la forma correcta del verbo "saber"?',
        options: ['Saber', 'Saver', 'Saber', 'Zaber'],
        correct: 0,
        points: 100,
        explanation: '"Saber" se escribe con s. No lleva b ni z.',
      },
    ],
  },
  {
    id: 'trivia-vocabulario',
    title: 'Sopa de letras: vocabulario',
    icon: 'ph-fill ph-text-aa',
    description:
      'Amplía tu vocabulario encontrando sinónimos, antónimos y el significado correcto de las palabras.',
    questions: [
      {
        text: '¿Cuál es un sinónimo de "alegría"?',
        options: ['Tristeza', 'Felicidad', 'Enojo', 'Miedo'],
        correct: 1,
        points: 100,
        explanation: '"Felicidad" es un sinónimo de "alegría": ambas expresan un sentimiento positivo.',
      },
      {
        text: '¿Cuál es el antónimo de "grande"?',
        options: ['Enorme', 'Gigante', 'Pequeño', 'Alto'],
        correct: 2,
        points: 100,
        explanation: 'El antónimo de "grande" es "pequeño": expresan significados opuestos.',
      },
      {
        text: 'La palabra "biblioteca" se refiere a...',
        options: ['Un lugar para nadar', 'Una tienda de ropa', 'Un lugar donde se guardan y leen libros', 'Una herramienta de cocina'],
        correct: 2,
        points: 100,
        explanation: 'Una biblioteca es un lugar donde se guardan, catalogan y leen libros.',
      },
      {
        text: '¿Cuál de estas es una palabra PARÓNIMA de "actitud"?',
        options: ['Altitud', 'Actitud', 'Amplitud', 'Altura'],
        correct: 0,
        points: 100,
        explanation: '"Altitud" (altura sobre el nivel del mar) es parónima de "actitud" (forma de comportarse).',
      },
      {
        text: '¿Qué significa "efímero"?',
        options: ['Que dura mucho tiempo', 'Que dura poco tiempo', 'Que es muy grande', 'Que es muy pesado'],
        correct: 1,
        points: 100,
        explanation: '"Efímero" significa que dura muy poco tiempo, que es pasajero.',
      },
    ],
  },
  {
    id: 'trivia-gramatica',
    title: 'Ordena y aprende: gramática',
    icon: 'ph-fill ph-queue',
    description:
      'Ordena las ideas y reconoce sustantivos, verbos, adjetivos y las partes de la oración.',
    questions: [
      {
        text: 'En "El gato negro duerme", ¿qué palabra es un ADJETIVO?',
        options: ['gato', 'negro', 'duerme', 'el'],
        correct: 1,
        points: 100,
        explanation: '"Negro" es el adjetivo: describe una cualidad del sustantivo "gato".',
      },
      {
        text: '¿Cuál de estas palabras es un SUSTANTIVO?',
        options: ['correr', 'feliz', 'manzana', 'rápidamente'],
        correct: 2,
        points: 100,
        explanation: '"Manzana" es un sustantivo (nombre de una cosa). Correr es verbo, feliz adjetivo y rápidamente adverbio.',
      },
      {
        text: '¿Cuál es el VERBO de la oración "Los niños juegan en el parque"?',
        options: ['niños', 'parque', 'juegan', 'en'],
        correct: 2,
        points: 100,
        explanation: '"Juegan" es el verbo: indica la acción que realizan los niños.',
      },
      {
        text: 'Una oración que expresa una pregunta se llama...',
        options: ['Exclamativa', 'Interrogativa', 'Enunciativa', 'Imperativa'],
        correct: 1,
        points: 100,
        explanation: 'Las oraciones interrogativas expresan preguntas y se escriben entre signos de interrogación.',
      },
      {
        text: '¿Cuál es el sujeto de "María lee un libro"?',
        options: ['un libro', 'lee', 'María', 'la oración'],
        correct: 2,
        points: 100,
        explanation: '"María" es el sujeto: la persona que realiza la acción de leer.',
      },
    ],
  },
  {
    id: 'trivia-rima',
    title: 'Rima y gana',
    icon: 'ph-fill ph-music-notes',
    description:
      'Encuentra las palabras que riman entre sí. Ejercita tu oído poético con divertidas rimas.',
    questions: [
      {
        text: '¿Cuál palabra rima con "casa"?',
        options: ['Mesa', 'Casa', 'Risa', 'Pasa'],
        correct: 3,
        points: 100,
        explanation: '"Pasa" rima con "casa" porque comparten la terminación "-asa".',
      },
      {
        text: '¿Cuál rima con "flor"?',
        options: ['Mar', 'Amor', 'Sol', 'Pan'],
        correct: 1,
        points: 100,
        explanation: '"Amor" rima con "flor" porque comparten la terminación "-or".',
      },
      {
        text: '¿Qué palabra rima con "corazón"?',
        options: ['Canción', 'Casa', 'Río', 'Cielo'],
        correct: 0,
        points: 100,
        explanation: '"Canción" rima con "corazón" por la terminación "-ón".',
      },
      {
        text: 'La rima ASONANTE se produce cuando...',
        options: ['Coinciden todas las letras', 'Coinciden solo las vocales a partir de la sílaba tónica', 'No coinciden las vocales', 'Solo coinciden las consonantes'],
        correct: 1,
        points: 100,
        explanation: 'En la rima asonante solo coinciden las vocales a partir de la sílaba tónica; en la consonante coinciden vocales y consonantes.',
      },
      {
        text: '¿Cuál rima CONSONANTE con "viento"?',
        options: ['Lento', 'Río', 'Cielo', 'Mar'],
        correct: 0,
        points: 100,
        explanation: '"Lento" rima en forma consonante con "viento": coinciden vocales y consonantes desde la última sílaba tónica.',
      },
    ],
  },
  {
    id: 'trivia-literatura',
    title: 'Aventura histórica: literatura',
    icon: 'ph-fill ph-books',
    description:
      'Un recorrido por los géneros literarios, autores clásicos y obras que transformaron la historia de la literatura.',
    questions: [
      {
        text: '¿Cuál es el autor de "Don Quijote de la Mancha"?',
        options: ['Gabriel García Márquez', 'Miguel de Cervantes', 'Pablo Neruda', 'Sor Juana Inés de la Cruz'],
        correct: 1,
        points: 100,
        explanation: 'Miguel de Cervantes Saavedra escribió "El ingenioso hidalgo don Quijote de la Mancha" (1605).',
      },
      {
        text: '¿A qué género pertenece un cuento?',
        options: ['Lírico', 'Narrativo', 'Dramático', 'Épico'],
        correct: 1,
        points: 100,
        explanation: 'El cuento pertenece al género narrativo, pues relata una historia con narrador y personajes.',
      },
      {
        text: '¿Cuál de estas es una obra de teatro?',
        options: ['Poema', 'Novela', 'Romance', 'Drama'],
        correct: 3,
        points: 100,
        explanation: 'El drama es un subgénero teatral. Las obras de teatro pertenecen al género dramático.',
      },
      {
        text: '¿Qué es una metáfora?',
        options: ['Comparar algo con "como"', 'Decir que una cosa es otra sin usar "como"', 'Exagerar en extremo', 'Repetir un sonido'],
        correct: 1,
        points: 100,
        explanation: 'La metáfora consiste en identificar una cosa real con otra imaginaria sin usar nexos comparativos.',
      },
      {
        text: '¿Quién escribió "Cien años de soledad"?',
        options: ['Julio Cortázar', 'Gabriel García Márquez', 'Jorge Luis Borges', 'Isabel Allende'],
        correct: 1,
        points: 100,
        explanation: 'Gabriel García Márquez, Nobel de Literatura 1982, escribió "Cien años de soledad", obra del realismo mágico.',
      },
    ],
  },
]

export function getAllTrivias() {
  return [...trivias, ...getTriviasDocente()]
}

export function getTriviaById(id) {
  return triviaById(id)
}

function triviaById(id) {
  if (!id) return undefined
  const direct = getAllTrivias().find((t) => t.id === id)
  if (direct) return direct

  if (id.endsWith('-tiempo')) {
    const base = getAllTrivias().find((t) => t.id === id.replace('-tiempo', ''))
    if (base) {
      return {
        ...base,
        id,
        title: `${base.title} · Contrarreloj`,
        icon: 'ph-fill ph-timer',
        description: `Versión contrarreloj: responde rápido para sumar más puntos en preguntas cronometradas sobre ${base.title.toLowerCase()}.`,
      }
    }
  }
  return undefined
}
