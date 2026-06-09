/**
 * Spanish-locale service pages — 4 priority services.
 *
 * Same shape as lib/services.ts so the page templates can render
 * either locale interchangeably. Content is native Spanish for the
 * Miami bilingual business audience — not translated from English.
 *
 * Slugs match the English versions so hreflang pairs cleanly:
 *   /services/meta-ads  ↔  /es/services/meta-ads
 *
 * Tone: confident, editorial, Spanish business register. Code-
 * switching with industry-standard English terms (Meta Ads, ROAS,
 * funnel) where that's how the audience actually speaks — forced
 * Spanish translations of those terms ("anuncios de Meta") read as
 * stiff and unfamiliar to the working audience.
 */

import type { Service } from "@/lib/services";

export const servicesEs: Service[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. META ADS — agencia de meta ads miami
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "meta-ads",
    title: "Meta Ads",
    short:
      "Campañas en Facebook e Instagram construidas sobre research real de clientes, testing creativo constante y ROAS. No alcance vanidoso.",
    outcome:
      "Una cuenta de Meta donde cada dólar está medido y los resultados mejoran mes a mes.",
    details: [
      "Research de audiencia y estrategia lookalike",
      "Matrices de testing creativo",
      "Atribución y medición post-iOS",
      "Escalado de presupuesto y reporting por cohorte",
    ],
    seo: {
      metaTitle: "Agencia de Meta Ads en Miami — JDT Inc.",
      metaDescription:
        "Meta Ads para crecimiento medible. JDT Inc. maneja campañas de Facebook e Instagram con research de clientes, testing creativo y ROAS.",
      primaryKeyword: "agencia de meta ads miami",
      secondaryKeywords: [
        "meta ads miami",
        "facebook ads agencia miami",
        "instagram ads agencia",
        "publicidad digital miami",
        "marketing en facebook miami",
        "ROAS optimización",
      ],
    },
    hero: {
      eyebrow: "Servicio · Meta Ads",
      h1: "Meta Ads que se pagan solas.",
      subheadline:
        "JDT Inc. es una agencia de Meta Ads en Miami. Manejamos campañas de Facebook e Instagram con research real de clientes, una cadencia constante de testing creativo y medición que sobrevivió a iOS. Todo se mide contra la métrica que paga la operación.",
    },
    outcomes: [
      { value: "−25–40%", label: "Reducción objetivo de costo por lead" },
      { value: "2–4×", label: "ROAS al que apuntamos" },
      { value: "30+", label: "Variantes creativas testeadas por trimestre" },
      { value: "Semanal", label: "Reporting por cohorte" },
    ],
    whoFor: {
      intro:
        "Meta funciona mejor para marcas con una historia clara, un comprador definido y disposición a testear. Los clientes que aprovechan más nuestro programa tienden a compartir el mismo perfil:",
      clients: [
        "Marcas DTC con producto funcionando y un equipo creativo que necesita apalancamiento",
        "Empresas de servicios profesionales donde la calidad del lead importa más que el volumen",
        "Marcas de lujo y lifestyle donde el listón creativo es el piso, no la meta",
      ],
      industries: [
        "Apparel y accesorios",
        "Salud y bienestar",
        "Belleza y cuidado personal",
        "Hospitalidad y F&B",
        "Servicios profesionales",
      ],
      stages: [
        "Marcas establecidas escalando más allá de $1M ARR",
        "Empresas DTC con financiamiento listas para el siguiente nivel",
        "Operadores locales expandiéndose a nuevos mercados",
      ],
    },
    methodology: {
      intro:
        "Cada engagement de Meta corre el mismo loop de cuatro etapas. Comprimimos el trabajo que las agencias tradicionales estiran durante meses, y mantenemos el loop en marcha mientras trabajamos juntos.",
      steps: [
        {
          step: "01",
          title: "Research de audiencia",
          body: "Mapeamos al comprador con tus datos de primera mano: historial de compra, transcripciones de calls, tickets de soporte, reseñas. De ahí sale una lista corta de audiencias, cada una con ángulos creativos concretos.",
        },
        {
          step: "02",
          title: "Sistema creativo",
          body: "Dirección creativa senior produce una matriz de variantes, cada una atada a un ángulo y un hook. Estáticos, motion y UGC se producen en paralelo, no en serie, así el volumen de testing es alto desde el día uno.",
        },
        {
          step: "03",
          title: "Testing estructurado",
          body: "Audiencias y creatividades se testean en condiciones controladas, no se lanzan variantes a la pared. Las combinaciones ganadoras se gradúan, las perdedoras se retiran, y la matriz evoluciona cada dos semanas.",
        },
        {
          step: "04",
          title: "Optimización por cohorte",
          body: "El gasto escala contra contribución verificada, no solo contra atribución reportada por la plataforma. Reportamos en cohortes, ventanas de payback y los indicadores que predicen el siguiente trimestre, no el último.",
        },
      ],
    },
    deliverables: {
      intro:
        "Lo que construimos y entregamos dentro de un engagement típico de Meta.",
      items: [
        {
          title: "Arquitectura de cuenta",
          body: "Estructura de campañas, jerarquía de audiencias, lógica de exclusiones y convenciones de nombres diseñadas para escalar limpiamente. Sin caos heredado.",
        },
        {
          title: "Sistema de producción creativa",
          body: "Dirección editorial, dirección de arte y output continuo: estáticos, motion, UGC. Construido para correr, no para entregar archivos una sola vez.",
        },
        {
          title: "Stack de medición",
          body: "Conversion API, eventos server-side, higiene de UTMs y una capa de atribución post-iOS que sobrevive a la siguiente actualización de privacidad.",
        },
        {
          title: "Roadmap de testing",
          body: "Un documento vivo que mapea los próximos 30, 60 y 90 días de tests de audiencia, creatividad y oferta, para que el testing nunca se frene.",
        },
        {
          title: "Reporting por cohorte",
          body: "Lecturas de performance semanales atadas a revenue, payback y contribución. No a impresiones y CPMs.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "La IA en Meta Ads se promete demasiado en pitch decks y se usa poco en la práctica. Aquí está exactamente dónde la aplicamos, y dónde deliberadamente no.",
      pillars: [
        {
          title: "Research de clientes a escala",
          body: "Transcripciones de soporte, grabaciones de calls de ventas y reseñas pasan por un pipeline con modelos de lenguaje que las agrupa en audiencias y ángulos. Trabajo que un equipo manual de analistas tardaría semanas en hacer a mano.",
        },
        {
          title: "Matrices de variantes creativas",
          body: "Hooks, headlines y copy se generan bajo restricciones de voz de marca, y después un editor humano los pule. Nada se publica solo. El resultado es un pool de testing 10× más grande, con cada variante revisada antes de ver un dólar.",
        },
        {
          title: "Detección de anomalías en gasto",
          body: "El performance diario se monitorea con un modelo que marca desviaciones significativas, como picos repentinos de CPM, fatiga de audiencia o brechas de atribución, antes de que un humano las note en el dashboard.",
        },
      ],
    },
    relatedCaseStudies: ["22nation", "carpet-cleaning-xperts"],
    faqs: [
      {
        question: "¿Cuál es el presupuesto mínimo mensual de Meta Ads con el que trabajan?",
        answer:
          "Típicamente arrancamos en $10K/mes en gasto de medios, más el retainer de gestión. Por debajo de eso, el testing estructurado se rompe. No hay volumen suficiente para leer variantes estadísticamente.",
      },
      {
        question: "¿Cómo se diferencia JDT de una agencia tradicional de Meta Ads?",
        answer:
          "Tres diferencias. Las personas que manejan tu cuenta llevan años haciéndolo, sin handoff a equipos junior. La creatividad se produce in-house, así que el volumen de testing no depende de partners externos. Y nuestro reporting ata el gasto a contribución verificada y ventanas de payback, no al ROAS reportado por la plataforma.",
      },
      {
        question: "¿En cuánto tiempo se ven resultados?",
        answer:
          "Esperamos lectura direccional de creatividad en 14–21 días, señal de audiencia en 30, y lectura limpia por cohorte a los 60–90 días. Quien prometa menos tiempo está siendo afortunado o mintiendo.",
      },
      {
        question: "¿Manejan creatividad in-house?",
        answer:
          "Sí. Dirección editorial, dirección de arte, estáticos, motion y sourcing de UGC son todos in-house. Las agencias que tercerizan creatividad no pueden correr una matriz real de testing.",
      },
      {
        question: "¿Trabajan con audiencias en español o bilingües?",
        answer:
          "Sí, y en Miami es exactamente donde más importa. Diseñamos programas en inglés, español y bilingüe como audiencias de primera clase, con creatividad nativa, no decks traducidos.",
      },
    ],
    related: ["ai-automation", "lead-generation", "funnel-optimization"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. AI AUTOMATION — automatización con IA miami
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "ai-automation",
    title: "Automatización con IA",
    short:
      "Automatizaciones que comprimen semanas de trabajo manual en horas, a través de marketing, ventas y reporting.",
    outcome:
      "Automatizaciones que corren en segundo plano y liberan a tu equipo del trabajo repetitivo.",
    details: [
      "Workflows de enriquecimiento y scoring de leads",
      "Pipelines de generación de contenido y creatividad",
      "Agentes de reporting y analítica",
      "CRM y automatización de lifecycle",
    ],
    seo: {
      metaTitle: "Automatización con IA para Marketing — JDT Inc.",
      metaDescription:
        "Automatización con IA que comprime semanas de trabajo manual en horas: research de clientes, enriquecimiento de leads, workflows de contenido y reporting que corren solos.",
      primaryKeyword: "automatización con ia miami",
      secondaryKeywords: [
        "agencia de ia miami",
        "automatización de marketing miami",
        "ai marketing miami",
        "automatización ia para empresas",
        "workflows con inteligencia artificial",
        "ia para marketing",
      ],
    },
    hero: {
      eyebrow: "Servicio · Automatización con IA",
      h1: "Automatización con IA que de verdad se entrega.",
      subheadline:
        "La mayoría de las agencias venden IA como buzzword. Nosotros construimos y operamos los sistemas reales: enriquecimiento de leads, research de clientes, workflows de contenido y reportes que se escriben solos. Las personas se quedan en el loop donde importa el juicio.",
    },
    outcomes: [
      { value: "10×+", label: "Velocidad en research de audiencia" },
      { value: "−60%", label: "Tiempo de reporting manual" },
      { value: "24/7", label: "Cadencia de enriquecimiento de leads" },
      { value: "Semanas", label: "Time-to-production de un sistema" },
    ],
    whoFor: {
      intro:
        "La automatización con IA paga más rápido donde hay trabajo de conocimiento repetible y datos limpios. Los clientes que sacan más apalancamiento comparten estos rasgos:",
      clients: [
        "Negocios liderados por founders donde la gente senior está atrapada en trabajo manual",
        "Empresas con equipo de ventas y alto volumen de leads con calificación inconsistente",
        "Equipos de marketing ahogados en pedidos de reporting de leadership",
      ],
      industries: [
        "Servicios profesionales",
        "B2B SaaS",
        "Servicios financieros",
        "Salud y bienestar",
        "Servicios locales y hogar",
      ],
      stages: [
        "Equipos de 10–100 chocando con techos operativos",
        "Empresas en fases de scaling de PE/VC",
        "Operadores establecidos automatizando antes de escalar headcount",
      ],
    },
    methodology: {
      intro:
        "Cada engagement de automatización corre las mismas cuatro etapas. No entregamos demos. Entregamos sistemas funcionando, con documentación, monitoreo y un runbook.",
      steps: [
        {
          step: "01",
          title: "Auditoría de workflows",
          body: "Nos sentamos con la gente que hace el trabajo, documentamos los pasos, identificamos qué es repetible y mapeamos dónde la IA agrega apalancamiento versus dónde agrega riesgo. No todo debería automatizarse.",
        },
        {
          step: "02",
          title: "Diseño del sistema",
          body: "Cada workflow se diseña paso por paso: inputs, transformaciones, validación, gates de revisión humana, output. Elegimos herramientas (Clay, n8n, Zapier, Make, código custom, las APIs de OpenAI / Anthropic) según el trabajo, no la moda.",
        },
        {
          step: "03",
          title: "Build de producción",
          body: "Los sistemas se construyen con monitoreo, manejo de errores y ownership claro. Las personas revisan donde el juicio importa: aprobación de copy, calificación de leads, respuesta a anomalías. La calidad se sostiene porque alguien es dueño de ella.",
        },
        {
          step: "04",
          title: "Handoff operativo",
          body: "Documentamos el runbook, entrenamos a tu equipo, y nos quedamos en retainer el primer trimestre para afinar. El sistema es tuyo cuando terminamos, no una caja negra que se rompe el día que nos vamos.",
        },
      ],
    },
    deliverables: {
      intro:
        "Lo que se construye dentro de un engagement típico de automatización con IA.",
      items: [
        {
          title: "Enriquecimiento y scoring de leads",
          body: "Leads inbound y outbound enriquecidos con datos firmográficos, de intención y persona, y después calificados contra tu cliente ideal con un modelo entrenado en tu historial de ventas cerradas.",
        },
        {
          title: "Pipelines de contenido y creatividad",
          body: "Pipelines de generación con voz de marca para ad copy, email, social y scripts de short-form. Un creativo revisa cada output antes de que se publique.",
        },
        {
          title: "Agentes de reporting",
          body: "Digests de performance semanales compilados automáticamente desde Meta, Google, GA4 y tu CRM, escritos en la voz de tu equipo, no en inglés genérico de template.",
        },
        {
          title: "Research de clientes",
          body: "Transcripciones de calls con clientes, tickets de soporte y reseñas agrupadas en audiencias que informan creatividad, copy y posicionamiento de producto.",
        },
        {
          title: "Runbook operativo",
          body: "Documentación de cada workflow, owner, alerta de monitoreo y ruta de escalación, para que tu equipo pueda correr el sistema sin nosotros.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "La mayoría de las agencias dicen que 'usan IA.' Esto es cómo se ve eso en producción para nuestros clientes.",
      pillars: [
        {
          title: "Prompting estructurado, no chat",
          body: "Los sistemas de producción usan prompts estructurados con esquemas explícitos, validación y lógica de retry, no un compañero copiando outputs de ChatGPT. La diferencia es confiabilidad y trazabilidad.",
        },
        {
          title: "Humano en el loop donde importa",
          body: "Cada sistema tiene un gate definido donde una persona revisa. El copy pasa por editores. Los leads van por un calificador. Los reportes se aprueban antes de salir. Velocidad sin juicio es solo errores más rápidos.",
        },
        {
          title: "Diseño agnóstico de herramienta",
          body: "Construimos sobre Clay, n8n, Make, Zapier, código custom y las APIs de los modelos principales según el trabajo. Nada queda atado a un solo vendor, así que cuando los modelos o los precios cambian, el trabajo no se rompe.",
        },
      ],
    },
    relatedCaseStudies: ["22nation"],
    faqs: [
      {
        question: "¿Esto es estrategia de IA o implementación?",
        answer:
          "Ambos, pero pesa fuerte hacia implementación. No entregamos un deck de estrategia sin ownership de los sistemas que salen de él. El deliverable es software funcionando, documentado y monitoreado. No un roadmap.",
      },
      {
        question: "¿En qué herramientas construyen?",
        answer:
          "La elección de herramienta la determina el trabajo. Enriquecimiento de leads usualmente corre en Clay. Orquestación de workflows en n8n, Zapier o Make. Pipelines de generación en las APIs de OpenAI y Anthropic según el caso. Evitamos lock-in.",
      },
      {
        question: "¿Reemplazan a nuestro equipo de marketing?",
        answer:
          "No. Lo hacen más difícil de reemplazar. La meta es apalancamiento, no reducir headcount. Tu mejor gente se libera del trabajo manual para hacer las partes que requieren juicio.",
      },
      {
        question: "¿Cuánto toma un build?",
        answer:
          "Un primer sistema en producción típicamente sale en 4–8 semanas, dependiendo de la calidad de los datos y la complejidad del workflow. Dimensionamos proyectos contra valor de negocio, no contra tiempo de ingeniería.",
      },
      {
        question: "¿Quién es dueño de los sistemas que construimos?",
        answer:
          "Tú. Documentamos todo, entrenamos a tu equipo, y el runbook vive en tus herramientas. Nos quedamos en retainer si quieres optimización continua, pero el sistema no es nuestro para llevárnoslo.",
      },
    ],
    related: ["lead-generation", "meta-ads", "funnel-optimization"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. LEAD GENERATION — generación de leads miami
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "lead-generation",
    title: "Generación de leads",
    short:
      "Inbound calificado y listo para ventas. Paid acquisition, landing pages, scoring y handoff a CRM diseñados como una sola máquina.",
    outcome:
      "Un pipeline predecible de compradores que tu equipo de ventas realmente puede cerrar. No una bandeja llena de curiosos.",
    details: [
      "Paid acquisition para ofertas de lead-gen",
      "Arquitectura de landing pages y formularios",
      "Scoring y enriquecimiento de leads",
      "Handoff a ventas y nurture",
    ],
    seo: {
      metaTitle: "Agencia de Generación de Leads en Miami — JDT Inc.",
      metaDescription:
        "Inbound calificado y listo para ventas. Paid acquisition, landing pages, scoring y CRM diseñados como una sola máquina. JDT Inc., Miami.",
      primaryKeyword: "generación de leads miami",
      secondaryKeywords: [
        "agencia de leads miami",
        "lead gen miami",
        "generación de prospectos miami",
        "captación de clientes miami",
        "marketing b2b miami",
        "prospección digital",
      ],
    },
    hero: {
      eyebrow: "Servicio · Generación de leads",
      h1: "Generación de leads, construida como un solo sistema.",
      subheadline:
        "La mayoría de los programas de lead-gen tienen fugas entre canales y el CRM. Nosotros diseñamos todo como una sola máquina: paid acquisition, landing pages, lógica de calificación, enriquecimiento y handoff a ventas. Los leads llegan al escritorio del rep precalificados y con contexto.",
    },
    outcomes: [
      { value: "−30–50%", label: "Costo objetivo por lead calificado" },
      { value: "2–3×", label: "Conversión de MQL a SQL" },
      { value: "100%", label: "Leads enriquecidos al llegar" },
      { value: "<5 min", label: "Speed-to-lead a rep" },
    ],
    whoFor: {
      intro:
        "La generación de leads funciona mejor donde hay un comprador definido, una motion de ventas real, y alguien del otro lado listo para cerrar.",
      clients: [
        "Negocios de servicios con reps de ventas y un ICP definido",
        "Empresas B2B SaaS más allá de la etapa de venta del founder",
        "Operadores locales con ofertas cotizables y ambición de territorio",
      ],
      industries: [
        "Servicios profesionales",
        "B2B SaaS",
        "Servicios locales y hogar",
        "Servicios financieros",
        "Salud y bienestar",
      ],
      stages: [
        "Operadores reemplazando pipelines puramente referidos con paid acquisition",
        "Equipos de ventas chocando con el techo del flujo inbound",
        "Empresas preparándose para escalar headcount contra un número real",
      ],
    },
    methodology: {
      intro:
        "Lead generation como sistema, no como campaña. Nuestro build de cuatro etapas:",
      steps: [
        {
          step: "01",
          title: "ICP y oferta",
          body: "Mapeamos al comprador ideal usando data de ventas cerradas, y después diseñamos o afilamos la oferta: lo que realmente vale dejar un email. La oferta es la mitad del trabajo; los canales son la parte fácil.",
        },
        {
          step: "02",
          title: "Stack de adquisición",
          body: "Canales paid (Meta, Google, LinkedIn cuando aplica) emparejados con landing pages diseñadas para la oferta, no homepages reciclados. El tracking se monta antes de que un dólar de gasto vaya en vivo.",
        },
        {
          step: "03",
          title: "Calificación y enriquecimiento",
          body: "Cada lead inbound se enriquece al enviar el form con datos firmográficos, de persona y de intención. Un modelo de scoring entrenado en tu historial de ventas cerradas manda los leads calientes directo a reps y descalifica el ruido obvio.",
        },
        {
          step: "04",
          title: "Handoff a ventas",
          body: "Los leads calientes aterrizan en el CRM con contexto completo: fuente, score, enriquecimiento, interacciones previas. Los reps reciben notificación en menos de cinco minutos. Las secuencias de nurture toman a todos los demás automáticamente.",
        },
      ],
    },
    deliverables: {
      intro: "Lo que se construye en un engagement de generación de leads.",
      items: [
        {
          title: "Documento de oferta y ICP",
          body: "El comprador y la oferta, por escrito: qué decimos, a quién, a cambio de qué.",
        },
        {
          title: "Campañas de adquisición",
          body: "Paid acquisition en Meta, Google y LinkedIn donde la matemática lo soporta. Las campañas las manejan las mismas personas que las diseñaron; la creatividad se produce in-house.",
        },
        {
          title: "Landing pages de conversión",
          body: "Landing pages diseñadas para la oferta, instrumentadas para testing, escritas en voz de marca.",
        },
        {
          title: "Pipeline de enriquecimiento",
          body: "Enriquecimiento en tiempo real en cada lead (firmográfico, persona, intención), alimentando el modelo de scoring.",
        },
        {
          title: "Scoring y routing",
          body: "Scoring de leads entrenado en tu data de closed-won. Leads calientes van a reps; tibios entran a nurture; fríos se atrapan antes de contaminar el funnel.",
        },
        {
          title: "Nurture y re-engagement",
          body: "Secuencias de email que mueven leads tibios hacia una conversación real, y reactivan los fríos sin spamear la lista.",
        },
      ],
    },
    aiDifferentiation: {
      intro: "La IA aparece en todo el sistema de lead-gen, silenciosamente. Donde hace trabajo real:",
      pillars: [
        {
          title: "Scoring de ICP entrenado en tu data",
          body: "Construimos un modelo de scoring sobre tu historial de ventas cerradas y perdidas, no un template genérico. Cada lead llega con un score que significa algo específico para tu funnel.",
        },
        {
          title: "Enriquecimiento e intención en tiempo real",
          body: "Los leads inbound se enriquecen al enviar el form con señales firmográficas y de intención desde Clay, Apollo, ZoomInfo o feeds custom, para que el rep tenga contexto antes de la primera llamada.",
        },
        {
          title: "Drafts de respuesta asistidos por IA",
          body: "Las respuestas de primer toque se redactan en tu voz de marca con contexto completo del lead: score, fuente, enriquecimiento. El rep edita y envía. El tiempo de respuesta baja sin que la calidad baje.",
        },
      ],
    },
    relatedCaseStudies: ["carpet-cleaning-xperts"],
    faqs: [
      {
        question: "¿En qué canales corre típicamente esto?",
        answer:
          "Meta y Google para la mayoría de las ofertas B2C y prosumer; LinkedIn cuando el ICP es enterprise B2B; cold email y outbound integrados cuando aplica. La mezcla de canales se decide después del trabajo de ICP y oferta, no antes.",
      },
      {
        question: "¿Cómo se define un 'lead calificado'?",
        answer:
          "Por la data de ventas cerradas de tu equipo, no por un template genérico. Escribimos cómo se ve un comprador real para tu negocio (firmográfico, persona, comportamiento) y el modelo de scoring mantiene al resto del sistema alineado.",
      },
      {
        question: "¿Se integran con nuestro CRM?",
        answer:
          "Sí. HubSpot, Salesforce, Close, Pipedrive y Attio son comunes. CRMs custom son trabajables. La integración es parte del build, no un proyecto posterior.",
      },
      {
        question: "¿Qué es lo primero que típicamente mejora?",
        answer:
          "Speed-to-lead y contexto del lead. Los reps dejan de perder tiempo persiguiendo leads fríos y empiezan cada llamada ya informados. El lift en conversión MQL-a-SQL típicamente aparece dentro de los primeros 60 días.",
      },
      {
        question: "¿Pueden manejar audiencias en español?",
        answer:
          "Sí. Las landings, ads y sequences de email se diseñan en inglés, español o bilingüe según donde viva el ICP. En Miami, eso casi siempre significa los tres.",
      },
    ],
    related: ["meta-ads", "ai-automation", "funnel-optimization"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. FUNNEL OPTIMIZATION — optimización de embudos miami
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "funnel-optimization",
    title: "Optimización de embudos",
    short:
      "Convierte más de tu tráfico en clientes. Landing pages, conversion testing y tracking en todo el embudo.",
    outcome:
      "Un embudo donde cada paso está instrumentado, cada cambio se testea, y cada trimestre la matemática de conversión mejora.",
    details: [
      "Auditoría e instrumentación de embudo",
      "Diseño de sistema de landing pages",
      "Testing de conversion rate",
      "Medición full-funnel",
    ],
    seo: {
      metaTitle: "Optimización de Embudos y CRO en Miami — JDT Inc.",
      metaDescription:
        "Convierte más de tu tráfico en clientes. Landing pages, conversion testing y tracking en todo el embudo. JDT Inc., Miami.",
      primaryKeyword: "optimización de embudos miami",
      secondaryKeywords: [
        "optimización de conversión miami",
        "agencia cro miami",
        "landing page optimization miami",
        "embudo de ventas miami",
        "optimización funnel miami",
        "auditoría de funnel",
      ],
    },
    hero: {
      eyebrow: "Servicio · Optimización de embudos",
      h1: "Optimización de embudos, de punta a punta.",
      subheadline:
        "La adquisición es la mitad ruidosa del crecimiento. El embudo es la mitad silenciosa, y la que la mayoría ignora. Auditamos, instrumentamos y reconstruimos embudos para mejoras medibles, desde la primera impresión paid hasta el revenue cerrado.",
    },
    outcomes: [
      { value: "+20–60%", label: "Lift objetivo en pasos clave de conversión" },
      { value: "End-to-end", label: "Profundidad de instrumentación" },
      { value: "Quincenal", label: "Cadencia de testing" },
      { value: "Trimestral", label: "Auditoría de arquitectura del funnel" },
    ],
    whoFor: {
      intro:
        "La optimización de embudos paga donde hay tráfico suficiente para testear y disposición para cambiar lo que no funciona. El perfil que encaja:",
      clients: [
        "Marcas con paid acquisition ya corriendo y matemática de conversión poco clara",
        "Operadores sentados sobre tráfico que no convierten del todo",
        "Empresas preparándose para un launch o un movimiento de categoría",
      ],
      industries: [
        "Ecommerce y DTC",
        "Servicios profesionales",
        "B2B SaaS",
        "Servicios locales y hogar",
        "Salud y bienestar",
      ],
      stages: [
        "Marcas con $5K+/mes en paid acquisition y sin disciplina de CRO",
        "Empresas con tráfico fuerte y conversión débil",
        "Operadores preparando el embudo antes de escalar gasto",
      ],
    },
    methodology: {
      intro: "El trabajo de embudo corre sobre instrumentación primero, opiniones después. El loop de cuatro etapas:",
      steps: [
        {
          step: "01",
          title: "Auditoría e instrumentación",
          body: "Mapeamos el embudo completo, desde la impresión paid hasta el revenue cerrado, e instrumentamos cada paso. La mayoría de los engagements arrancan exponiendo 30–60% de la data que el setup existente debió haber capturado.",
        },
        {
          step: "02",
          title: "Stack de hipótesis",
          body: "Los hallazgos se vuelven un stack priorizado de hipótesis, rankeadas por impacto, evidencia y esfuerzo. Testeamos primero las suposiciones más grandes; las opiniones sobre el color de un botón van al final.",
        },
        {
          step: "03",
          title: "Build y test",
          body: "Las variantes se construyen rápido, se testean en condiciones controladas, y se leen contra muestras estadísticamente significativas. Los ganadores se publican; los perdedores se retiran; los aprendizajes alimentan la siguiente ronda.",
        },
        {
          step: "04",
          title: "Cadencia de composición",
          body: "Ciclos de testing quincenales, lecturas mensuales del funnel, auditorías trimestrales de arquitectura. El punto no es ganar un test. Es asegurarse de que el funnel mejore cada trimestre sin nosotros en la sala.",
        },
      ],
    },
    deliverables: {
      intro: "Lo que entregamos durante un engagement de optimización de embudo.",
      items: [
        {
          title: "Documento de auditoría del embudo",
          body: "Un mapa documentado del embudo existente, cada punto de fuga y el stack priorizado de hipótesis.",
        },
        {
          title: "Capa de instrumentación",
          body: "GA4, tracking server-side, Conversion API, eventos custom. La medición que ya debería haber existido.",
        },
        {
          title: "Sistema de landing pages",
          body: "Templates, componentes, patrones de copy y hooks de instrumentación diseñados para testing, no páginas sueltas.",
        },
        {
          title: "Programa de testing",
          body: "Ciclos de testing quincenales con hipótesis documentadas, outcomes y aprendizajes. El conocimiento acumulado es el activo de largo plazo.",
        },
        {
          title: "Reporting del embudo",
          body: "Lecturas de conversión paso a paso, análisis de drop-off y comportamiento por cohorte, visibles sin export manual.",
        },
      ],
    },
    aiDifferentiation: {
      intro: "La IA ayuda al trabajo de embudo en tres lugares, y se mantiene fuera del resto.",
      pillars: [
        {
          title: "Generación de variantes con voz de marca",
          body: "Variantes de headlines y body copy generadas en la voz de marca documentada, ampliando el pool de testing sin bajar el estándar. Cada variante se edita por humano antes de publicarse.",
        },
        {
          title: "Análisis de sesiones por comportamiento",
          body: "Grabaciones de sesiones y heatmaps procesados por modelos multimodales para identificar patrones como rage clicks, loops de navegación o formas de abandono, a una velocidad que un analista humano no puede igualar.",
        },
        {
          title: "Detección de anomalías en el embudo",
          body: "El performance del embudo paso a paso se monitorea continuamente. Caídas repentinas en conversión, brechas de tracking, comportamiento anómalo por cohorte se marcan antes del meeting semanal.",
        },
      ],
    },
    relatedCaseStudies: ["22nation", "carpet-cleaning-xperts"],
    faqs: [
      {
        question: "¿Esto es CRO o trabajo full-funnel?",
        answer:
          "Ambos. Arrancamos a nivel de funnel (instrumentación, auditoría, fugas) y el programa de testing corre continuamente debajo. CRO sin contexto de funnel es jugar whack-a-mole.",
      },
      {
        question: "¿Cuánto tráfico necesitamos para que el testing funcione?",
        answer:
          "No hay un número limpio. Depende de la conversion rate y la escala del test. Como piso aproximado, 20K visitantes mensuales y 200+ conversiones empiezan a soportar tests significativos en pasos clave. Por debajo, nos enfocamos primero en estructura del funnel y testing estadístico después.",
      },
      {
        question: "¿Construyen las landing pages?",
        answer:
          "Sí. La mayoría de los engagements incluyen un sistema de landing pages, construido en el lenguaje de la marca con tracking incorporado. También podemos trabajar dentro de Webflow, Framer o tu CMS existente.",
      },
      {
        question: "¿Qué típicamente está roto cuando llegan?",
        answer:
          "Tracking, casi siempre. Después atribución, match de mensaje-creatividad y fricción en formularios. Los primeros 30 días usualmente exponen más revenue arreglando instrumentación que cualquier test creativo.",
      },
      {
        question: "¿Cómo se coordina el trabajo de funnel con las cuentas de ads?",
        answer:
          "De forma estrecha. Creatividad de ads, copy de landing y estructura de funnel se diseñan como una sola pieza, no como tres. Ese es el punto.",
      },
    ],
    related: ["meta-ads", "lead-generation", "ai-automation"],
  },
];

export function getServiceEs(slug: string) {
  return servicesEs.find((s) => s.slug === slug);
}
