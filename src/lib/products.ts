export interface ProductPlan {
  id: string;
  priceMXN: number;
  taxIncluded: boolean;
  currency: string;
  imageUrl: string;
  es: {
    name: string;
    description: string;
    features: string[];
  };
  en: {
    name: string;
    description: string;
    features: string[];
  };
}

export const webPlans: ProductPlan[] = [
  {
    id: "plan-web-restaurantes",
    priceMXN: 19390.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web para Restaurantes",
      description:
        "Carta digital, módulo de reservaciones, pedidos por WhatsApp, ubicación en Google Maps y galería fotográfica.",
      features: [
        "Carta digital para consultar platillos",
        "Módulo de reservaciones en línea",
        "Pedidos y consultas mediante WhatsApp",
        "Ubicación integrada con Google Maps",
        "Galería fotográfica del restaurante",
      ],
    },
    en: {
      name: "Website Plan for Restaurants",
      description:
        "Digital menu, online booking module, WhatsApp ordering, Google Maps location, and a restaurant photo gallery.",
      features: [
        "Digital menu for browsing dishes",
        "Online reservation module",
        "Orders and inquiries through WhatsApp",
        "Integrated Google Maps location",
        "Restaurant photo gallery",
      ],
    },
  },
  {
    id: "plan-marca-sitio-web-profesional",
    priceMXN: 24530.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Marca + Sitio Web Profesional",
      description:
        "Creación de logotipo profesional, 3 conceptos visuales, colores corporativos, tipografía sugerida, sitio web de hasta 3 secciones, diseño adaptable, formulario e integración social.",
      features: [
        "Creación de logotipo profesional (3 propuestas)",
        "Definición de colores corporativos y tipografía",
        "Sitio web de hasta 3 secciones",
        "Diseño adaptable para dispositivos móviles",
        "Formulario de contacto y conexión con redes sociales",
      ],
    },
    en: {
      name: "Branding + Professional Website Plan",
      description:
        "Professional logo creation, 3 visual concepts, corporate colors, suggested typography, website with up to 3 sections, responsive layout, contact form, and social links.",
      features: [
        "Professional logo creation (3 concepts)",
        "Corporate color system and typography selection",
        "Website with up to 3 sections",
        "Responsive layout for mobile devices",
        "Contact form and social media connections",
      ],
    },
  },
  {
    id: "plan-web-marketing-digital",
    priceMXN: 21940.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web + Marketing Digital",
      description:
        "Página web profesional, preparación de Google Ads y Facebook Ads, instalación del píxel de seguimiento y configuración de Google Analytics.",
      features: [
        "Desarrollo de sitio web profesional",
        "Preparación de campañas en Google Ads",
        "Preparación de campañas en Facebook Ads",
        "Instalación del píxel para seguimiento",
        "Implementación de Google Analytics",
      ],
    },
    en: {
      name: "Website + Digital Marketing Plan",
      description:
        "Professional website, Google Ads and Facebook Ads preparation, tracking pixel installation, and Google Analytics implementation.",
      features: [
        "Professional website development",
        "Google Ads campaign preparation",
        "Facebook Ads campaign preparation",
        "Tracking pixel installation",
        "Google Analytics implementation",
      ],
    },
  },
  {
    id: "plan-landing-page-emprendedor",
    priceMXN: 4250.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Landing Page Emprendedor",
      description:
        "Diseño de landing page de una sola página, formulario de contacto, conexión con hasta 2 redes sociales y entrega digital. Servicio totalmente en línea.",
      features: [
        "Landing page de una sola página",
        "Formulario funcional de contacto",
        "Conexión con hasta 2 redes sociales",
        "Entrega completa en formato digital",
        "Proceso de servicio totalmente en línea",
      ],
    },
    en: {
      name: "Entrepreneur Landing Page Plan",
      description:
        "Single-page landing page design, contact form, connection with up to 2 social networks, and digital delivery. Fully online service.",
      features: [
        "Single-page landing page design",
        "Functional contact form",
        "Connection with up to 2 social networks",
        "Complete digital delivery",
        "Fully online service process",
      ],
    },
  },
  {
    id: "plan-web-empresarial",
    priceMXN: 17320.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web Empresarial",
      description:
        "Hasta 5 páginas internas, diseño UX/UI a la medida, formularios avanzados, configuración SEO inicial y mejora del rendimiento de carga.",
      features: [
        "Hasta 5 páginas interiores",
        "Diseño UX/UI profesional a la medida",
        "Formularios de contacto con funciones avanzadas",
        "Configuración SEO básica inicial",
        "Mejora del rendimiento y velocidad de carga",
      ],
    },
    en: {
      name: "Corporate Website Plan",
      description:
        "Up to 5 internal pages, tailored UX/UI design, advanced forms, initial SEO setup, and improved loading performance.",
      features: [
        "Up to 5 internal pages",
        "Tailored professional UX/UI design",
        "Contact forms with advanced functionality",
        "Initial basic SEO setup",
        "Loading speed and performance improvements",
      ],
    },
  },
  {
    id: "plan-web-seo-inicial",
    priceMXN: 16520.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web + SEO Inicial",
      description:
        "Sitio web de hasta 2 páginas, análisis de palabras clave, alta en Google Search Console, ajustes técnicos SEO y mejora del contenido.",
      features: [
        "Sitio web de hasta 2 páginas",
        "Análisis inicial de palabras clave",
        "Implementación de Google Search Console",
        "Ajustes técnicos básicos de SEO",
        "Optimización inicial de textos y contenido",
      ],
    },
    en: {
      name: "Website + Initial SEO Plan",
      description:
        "Website with up to 2 pages, keyword analysis, Google Search Console setup, technical SEO adjustments, and content improvements.",
      features: [
        "Website with up to 2 pages",
        "Initial keyword analysis",
        "Google Search Console implementation",
        "Basic technical SEO adjustments",
        "Initial text and content optimization",
      ],
    },
  },
  {
    id: "plan-sitio-web-profesional",
    priceMXN: 11370.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Sitio Web Profesional",
      description:
        "Hasta 3 páginas, diseño web hecho a la medida, SEO básico y publicación completa en el servidor proporcionado por el cliente.",
      features: [
        "Hasta 3 páginas de contenido",
        "Diseño web desarrollado a la medida",
        "Configuración SEO básica",
        "Publicación e instalación en el servidor del cliente",
      ],
    },
    en: {
      name: "Professional Website Plan",
      description:
        "Up to 3 pages, tailored web design, basic SEO setup, and complete deployment on the server provided by the client.",
      features: [
        "Up to 3 content pages",
        "Tailored website design",
        "Basic SEO setup",
        "Publishing and installation on the client server",
      ],
    },
  },
  {
    id: "plan-tienda-en-linea-basica",
    priceMXN: 25600.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Tienda en Línea Básica",
      description:
        "Tienda ecommerce con hasta 20 productos, carrito funcional, conexión con pasarelas de pago y panel administrativo para su gestión.",
      features: [
        "Tienda de comercio electrónico",
        "Carga y ajuste de hasta 20 productos",
        "Carrito de compra completamente funcional",
        "Conexión con pasarelas de pago",
        "Panel de administración autogestionable",
      ],
    },
    en: {
      name: "Basic Online Store Plan",
      description:
        "Ecommerce store with up to 20 products, functional shopping cart, payment gateway connection, and an admin panel for management.",
      features: [
        "Ecommerce online store",
        "Upload and setup of up to 20 products",
        "Fully functional shopping cart",
        "Payment gateway connection",
        "Self-managed administration panel",
      ],
    },
  },
  {
    id: "plan-presencia-digital-basica",
    priceMXN: 7420.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Presencia Digital Básica",
      description:
        "Sitio web de una sección, diseño adaptable para móviles, formulario de contacto y publicación en el servidor indicado por el cliente.",
      features: [
        "Sitio web de una sección tipo One Page",
        "Diseño optimizado para dispositivos móviles",
        "Formulario de contacto operativo",
        "Publicación en el servidor proporcionado por el cliente",
      ],
    },
    en: {
      name: "Basic Digital Presence Plan",
      description:
        "One-section website, mobile-responsive layout, contact form, and deployment on the server indicated by the client.",
      features: [
        "One-section One Page website",
        "Layout optimized for mobile devices",
        "Operational contact form",
        "Deployment on the server provided by the client",
      ],
    },
  },
  {
    id: "plan-web-para-profesionistas",
    priceMXN: 12770.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web para Profesionistas",
      description:
        "Sitio web de 3 secciones, blog especializado, agenda digital para citas y formularios de contacto integrados.",
      features: [
        "Sitio web organizado en 3 secciones",
        "Blog profesional incorporado",
        "Agenda digital para reservar citas",
        "Formularios de contacto integrados",
      ],
    },
    en: {
      name: "Website Plan for Professionals",
      description:
        "Three-section website, specialized blog, digital appointment calendar, and integrated contact forms.",
      features: [
        "Website organized into 3 sections",
        "Integrated professional blog",
        "Digital appointment booking calendar",
        "Integrated contact forms",
      ],
    },
  },
  {
    id: "plan-portal-inmobiliario",
    priceMXN: 48820.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Portal Inmobiliario",
      description:
        "Catálogo de propiedades, filtros de búsqueda avanzados, mapas integrados, panel para agentes y galerías de contenido multimedia.",
      features: [
        "Catálogo para publicar propiedades",
        "Filtros y buscador avanzado",
        "Mapas y ubicaciones integradas",
        "Panel independiente para agentes",
        "Galerías de fotografías y contenido multimedia",
      ],
    },
    en: {
      name: "Real Estate Portal Plan",
      description:
        "Property catalog, advanced search filters, integrated maps, agent dashboard, and multimedia content galleries.",
      features: [
        "Catalog for publishing properties",
        "Advanced filters and search tools",
        "Integrated maps and locations",
        "Independent dashboard for agents",
        "Photo and multimedia galleries",
      ],
    },
  },
  {
    id: "plan-ecommerce-avanzado",
    priceMXN: 64680.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Ecommerce Avanzado",
      description:
        "Tienda online para hasta 100 productos, panel con varios administradores, conexión logística, SEO ecommerce y métricas de ventas.",
      features: [
        "Tienda online para hasta 100 productos",
        "Panel con acceso para varios administradores",
        "Conexión con servicios logísticos de envío",
        "Configuración SEO enfocada en ecommerce",
        "Métricas y reportes básicos de ventas",
      ],
    },
    en: {
      name: "Advanced Ecommerce Plan",
      description:
        "Online store for up to 100 products, multi-admin panel, shipping logistics connection, ecommerce SEO, and sales metrics.",
      features: [
        "Online store for up to 100 products",
        "Panel with access for multiple administrators",
        "Connection with shipping logistics services",
        "SEO setup focused on ecommerce",
        "Basic sales metrics and reports",
      ],
    },
  },
  {
    id: "plan-portal-de-empleo",
    priceMXN: 51890.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Portal de Empleo",
      description:
        "Alta de empresas, publicación de oportunidades laborales, registro de candidatos, carga de currículums y panel administrativo.",
      features: [
        "Registro y administración de empresas",
        "Publicación de ofertas de trabajo",
        "Registro de perfiles de candidatos",
        "Carga digital de currículums",
        "Panel general de administración",
      ],
    },
    en: {
      name: "Job Portal Plan",
      description:
        "Company onboarding, job opportunity publishing, candidate registration, résumé uploads, and an administration dashboard.",
      features: [
        "Company registration and management",
        "Job opportunity publishing",
        "Candidate profile registration",
        "Digital résumé uploads",
        "General administration dashboard",
      ],
    },
  },
  {
    id: "plan-ecommerce-profesional",
    priceMXN: 41780.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Ecommerce Profesional",
      description:
        "Tienda online para hasta 60 productos, diseño personalizado, control de inventario, cupones promocionales y métodos de pago conectados.",
      features: [
        "Tienda online para hasta 60 productos",
        "Interfaz visual completamente personalizada",
        "Control y actualización de inventario",
        "Creación de cupones promocionales",
        "Pasarelas de pago conectadas",
      ],
    },
    en: {
      name: "Professional Ecommerce Plan",
      description:
        "Online store for up to 60 products, custom interface, inventory control, promotional coupons, and connected payment methods.",
      features: [
        "Online store for up to 60 products",
        "Fully customized visual interface",
        "Inventory control and updates",
        "Promotional coupon creation",
        "Connected payment gateways",
      ],
    },
  },
  {
    id: "plan-identidad-digital-emprendedor",
    priceMXN: 29840.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Identidad Digital Emprendedor",
      description:
        "Logotipo profesional, hasta 2 propuestas, una ronda de cambios, archivos PNG/JPG/vector, landing page adaptable, formulario, botón de WhatsApp y entrega digital.",
      features: [
        "Creación de logotipo profesional",
        "Hasta 2 propuestas visuales",
        "Una ronda de cambios y ajustes",
        "Archivos finales en PNG, JPG y vector",
        "Landing page de presentación profesional",
        "Diseño adaptable a dispositivos",
        "Formulario funcional de contacto",
        "Botón directo de WhatsApp",
        "Entrega completa en formato digital",
      ],
    },
    en: {
      name: "Entrepreneur Digital Identity Plan",
      description:
        "Professional logo, up to 2 concepts, one revision round, PNG/JPG/vector files, responsive landing page, contact form, WhatsApp button, and digital delivery.",
      features: [
        "Professional logo creation",
        "Up to 2 visual concepts",
        "One revision and adjustment round",
        "Final files in PNG, JPG, and vector",
        "Professional presentation landing page",
        "Responsive device-friendly design",
        "Functional contact form",
        "Direct WhatsApp button",
        "Complete digital delivery",
      ],
    },
  },
  {
    id: "plan-branding-web-empresarial",
    priceMXN: 33760.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Branding + Web Empresarial",
      description:
        "Logotipo premium, hasta 5 conceptos creativos, sistema de color y tipografías, favicon, kit social, web empresarial de hasta 3 páginas, SEO inicial y formularios avanzados.",
      features: [
        "Creación de logotipo premium",
        "Hasta 5 conceptos creativos",
        "Sistema de colores y tipografías corporativas",
        "Favicon y kit gráfico para redes sociales",
        "Sitio empresarial de hasta 3 páginas",
        "SEO inicial y formularios con funciones avanzadas",
      ],
    },
    en: {
      name: "Branding + Corporate Website Plan",
      description:
        "Premium logo, up to 5 creative concepts, color and typography system, favicon, social kit, corporate site with up to 3 pages, initial SEO, and advanced forms.",
      features: [
        "Premium logo creation",
        "Up to 5 creative concepts",
        "Corporate color and typography system",
        "Favicon and social media graphic kit",
        "Corporate website with up to 3 pages",
        "Initial SEO and forms with advanced functionality",
      ],
    },
  },
  {
    id: "plan-plataforma-cursos-online",
    priceMXN: 47800.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Plataforma de Cursos Online",
      description:
        "Sistema LMS con registro de estudiantes, organización de videos y recursos, además de evaluaciones disponibles en línea.",
      features: [
        "Sistema de aprendizaje tipo LMS",
        "Registro y acceso para estudiantes",
        "Gestión de videos y recursos descargables",
        "Evaluaciones y actividades en línea",
      ],
    },
    en: {
      name: "Online Course Platform Plan",
      description:
        "LMS system with student registration, organized videos and resources, plus assessments available online.",
      features: [
        "LMS learning management system",
        "Student registration and access",
        "Video and downloadable resource management",
        "Online assessments and activities",
      ],
    },
  },
  {
    id: "plan-web-corporativo-premium",
    priceMXN: 28580.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Plan Web Corporativo Premium",
      description:
        "Hasta 8 páginas, imagen corporativa personalizada, SEO técnico inicial, conexión con CRM y medidas avanzadas de seguridad web.",
      features: [
        "Hasta 8 páginas de contenido",
        "Imagen web corporativa personalizada",
        "Configuración técnica inicial de SEO",
        "Conexión e integración con un CRM",
        "Implementación de seguridad web avanzada",
      ],
    },
    en: {
      name: "Premium Corporate Website Plan",
      description:
        "Up to 8 pages, custom corporate visual design, initial technical SEO, CRM connection, and advanced web security measures.",
      features: [
        "Up to 8 content pages",
        "Custom corporate website design",
        "Initial technical SEO setup",
        "CRM connection and integration",
        "Advanced web security implementation",
      ],
    },
  },
  {
    id: "bolsa-soporte-digital",
    priceMXN: 2600.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Bolsa de Soporte Digital Prioritario",
      description:
        "Paquete de atención técnica para resolver varias solicitudes menores durante un periodo acordado. Pensado para negocios que necesitan apoyo recurrente sin contratar una mensualidad.",
      features: [
        "Incluye atención para hasta 5 solicitudes",
        "Resolución de incidencias técnicas sencillas",
        "Orientación adaptada a cada caso",
        "Atención prioritaria dentro del horario laboral",
        "Seguimiento hasta cerrar cada solicitud",
        "Entregable: bitácora digital de servicios atendidos",
      ],
    },
    en: {
      name: "Priority Digital Support Package",
      description:
        "Technical assistance package for resolving several minor requests during an agreed period. Designed for businesses needing recurring help without a monthly subscription.",
      features: [
        "Includes support for up to 5 requests",
        "Resolution of simple technical incidents",
        "Guidance adapted to each case",
        "Priority assistance during business hours",
        "Follow-up until each request is closed",
        "Deliverable: digital log of completed services",
      ],
    },
  },
  {
    id: "soporte-tecnico-remoto",
    priceMXN: 1890.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Soporte Técnico Remoto Básico",
      description:
        "Asistencia remota para atender fallas sencillas en sitios web, equipos, aplicaciones, ajustes, errores habituales o servicios digitales.",
      features: [
        "Incluye un máximo de 2 horas de soporte",
        "Corrección de fallas comunes y ajustes básicos",
        "Entregable: informe de las actividades efectuadas",
        "Validación final del servicio o sistema atendido",
      ],
    },
    en: {
      name: "Basic Remote Technical Support",
      description:
        "Remote assistance for simple issues involving websites, devices, applications, settings, common errors, or digital services.",
      features: [
        "Includes a maximum of 2 support hours",
        "Correction of common issues and basic settings",
        "Deliverable: report of completed activities",
        "Final validation of the serviced system or platform",
      ],
    },
  },
  {
    id: "configuracion-inicial",
    priceMXN: 1350.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Configuración Inicial de Herramientas",
      description:
        "Puesta en marcha básica de una herramienta o servicio digital, como correos empresariales, formularios, perfiles administrativos, accesos y aplicaciones de productividad.",
      features: [
        "Puesta en marcha de una plataforma digital",
        "Creación de cuentas, formularios o perfiles",
        "Comprobaciones básicas de funcionamiento",
        "Entregable: herramienta configurada y lista",
        "Evidencia digital del trabajo efectuado",
      ],
    },
    en: {
      name: "Initial Tools Setup",
      description:
        "Basic launch of a digital tool or service, including business email, forms, admin profiles, access permissions, and productivity applications.",
      features: [
        "Launch setup for a digital platform",
        "Creation of accounts, forms, or profiles",
        "Basic functionality checks",
        "Deliverable: configured and ready-to-use tool",
        "Digital evidence of the completed work",
      ],
    },
  },
  {
    id: "servicio-express-dudas",
    priceMXN: 510.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Servicio Express de Resolución de Dudas",
      description:
        "Sesión individual para aclarar dudas sobre páginas web, herramientas digitales, administración básica, procesos en línea o plataformas, con orientación práctica.",
      features: [
        "Atención mediante videollamada o canal digital",
        "Sesión con duración máxima de 30 minutos",
        "Orientación práctica con recomendaciones aplicables",
        "Entregable: resumen digital de respuestas y sugerencias",
        "Enlaces de apoyo cuando sean necesarios",
      ],
    },
    en: {
      name: "Express Doubt Resolution Service",
      description:
        "Individual session to clarify questions about websites, digital tools, basic administration, online processes, or platforms, with practical guidance.",
      features: [
        "Assistance through video call or digital channel",
        "Session lasting up to 30 minutes",
        "Practical guidance with applicable recommendations",
        "Deliverable: digital summary of answers and suggestions",
        "Helpful links whenever required",
      ],
    },
  },
  {
    id: "diagnostico-problemas",
    priceMXN: 890.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Diagnóstico de Problemas Digitales",
      description:
        "Análisis de fallas básicas en sitios web, correo, dominios, formularios, ajustes sencillos o herramientas digitales para determinar su origen.",
      features: [
        "Análisis de incidencias digitales básicas",
        "Detección del origen de la falla",
        "Corrección durante la sesión cuando sea viable",
        "Entregable: informe técnico de diagnóstico",
        "Acciones efectuadas o recomendaciones de solución",
      ],
    },
    en: {
      name: "Digital Problem Diagnostics",
      description:
        "Analysis of basic issues involving websites, email, domains, forms, simple settings, or digital tools to determine their origin.",
      features: [
        "Analysis of basic digital incidents",
        "Detection of the issue source",
        "Correction during the session when feasible",
        "Deliverable: technical diagnostic report",
        "Completed actions or recommended solutions",
      ],
    },
  },
  {
    id: "asesoria-digital-basica",
    priceMXN: 310.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Asesoría Digital Básica",
      description:
        "Acompañamiento personalizado para aclarar dudas o resolver problemas sencillos relacionados con plataformas, gestión web básica, herramientas en línea o procesos tecnológicos.",
      features: [
        "Atención por videollamada o canal digital",
        "Hasta 15 minutos de acompañamiento",
        "Resolución de un máximo de 2 dudas relacionadas",
        "Recomendaciones prácticas para poner en marcha",
        "Entregable: resumen digital de los temas revisados",
      ],
    },
    en: {
      name: "Basic Digital Consulting",
      description:
        "Personalized support to clarify questions or solve simple issues involving platforms, basic website management, online tools, or technology processes.",
      features: [
        "Assistance by video call or digital channel",
        "Up to 15 minutes of personalized support",
        "Resolution of up to 2 related questions",
        "Practical recommendations for implementation",
        "Deliverable: digital summary of reviewed topics",
      ],
    },
  },
  {
    id: "consulta-digital-rapida",
    priceMXN: 180.0,
    taxIncluded: false,
    currency: "MXN + IVA",
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    es: {
      name: "Consulta Digital Rápida",
      description:
        "Respuesta a una duda específica sobre herramientas digitales, plataformas, páginas web o procedimientos básicos, atendida por chat o correo electrónico.",
      features: [
        "Atención disponible por chat o correo electrónico",
        "Resolución de una sola consulta concreta",
        "Recomendación práctica para atender el inconveniente",
        "Respuesta digital dentro del plazo previamente acordado",
        "Servicio proporcionado completamente en línea",
      ],
    },
    en: {
      name: "Quick Digital Query",
      description:
        "Answer to one specific question about digital tools, platforms, websites, or basic procedures, handled through chat or email.",
      features: [
        "Assistance available through chat or email",
        "Resolution of one specific question",
        "Practical recommendation for addressing the issue",
        "Digital response within the previously agreed timeframe",
        "Service provided entirely online",
      ],
    },
  },
];

export function formatMXN(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}