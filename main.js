/**
 * --- DATABASE DE PERFILES DE ALEXIS NICOLAS HURTADO ---
 * Aquí gestionamos el contenido dinámico de cada especialización.
 */

const PROF_DATA = {
    ia: {
        title: "Especialista en Orquestación e IA",
        color: "#38bdf8",
        image: "perfil-2.png",
        about: "Experto en integración de modelos de lenguaje (LLMs) como GPT-4, Gemini y Claude. Especializado en orquestación de flujos de trabajo, Prompt Engineering y despliegue de modelos locales (Open-Source) para optimizar procesos empresariales.",
        skills: ["ChatGPT/Gemini/Claude", "IA Local (Ollama/Llama)", "Orquestación de Datos", "Prompt Engineering", "Python", "Automatización IA"],
        projects: [
            { name: "Agente de IA Local", desc: "Implementación de modelos open-source en servidores locales para privacidad total de datos." },
            { name: "Flujos Automatizados", desc: "Integración de IA en flujos de trabajo de oficina para reducir tiempos de respuesta." }
        ]
    },
    software: {
        title: "Ingeniero de Software Full-Stack",
        color: "#818cf8",
        image: "perfil-1.png",
        about: "Desarrollador con enfoque en arquitecturas escalables, diseño de sistemas y clean code. Apasionado por crear software que solucione problemas reales.",
        skills: ["JavaScript/Node.js", "React/Next.js", "SQL & NoSQL", "Docker/Git", "API Design", "Agile Methodologies"],
        projects: [
            { name: "Sistemas de Gestión", desc: "Desarrollo de CRMs y plataformas de control administrativo personalizadas." }
        ]
    },
    seguridad: {
        title: "Especialista en Ciberseguridad y Forense",
        color: "#f43f5e",
        image: "perfil-1.png",
        about: "Analista enfocado en la protección de activos digitales, análisis de vulnerabilidades y forense informático. Capacidad para identificar brechas y proponer soluciones de mitigación robustas.",
        skills: ["Pentesting", "Análisis Forense", "Seguridad en Redes", "Ethical Hacking", "Linux Security", "Normativas ISO/IEC"],
        projects: [
            { name: "Auditoría de Sistemas", desc: "Evaluación integral de vulnerabilidades en infraestructuras locales." }
        ]
    },
    negocios: {
        title: "Bolsa de Valores, Finanzas y Administración",
        color: "#fbbf24",
        image: "perfil-1.png",
        about: "Estratega financiero con experiencia en análisis técnico de mercados bursátiles y administración de negocios. Visión analítica para la toma de decisiones bajo riesgo y gestión de capital.",
        skills: ["Análisis Técnico/Fundamental", "Gestión de Portafolio", "Contabilidad", "Administración de Empresas", "Bolsa de Valores", "Excel Avanzado"],
        projects: [
            { name: "Estrategia de Inversión", desc: "Diseño de modelos de inversión basados en análisis técnico para mercados variables." }
        ]
    },
    real: {
        title: "Gestión de Negocios y Experiencia Real",
        color: "#fb923c",
        image: "perfil-2.png",
        about: "Emprendedor con experiencia tangible gestionando mi propia tienda de abarrotes. Liderazgo, control de inventarios, atención al cliente y resolución de problemas operativos diarios.",
        skills: ["Atención al Cliente", "Control de Inventarios", "Gestión de Personal", "Logística", "Ventas Directas", "Resolución de Conflictos"],
        projects: [
            { name: "Tienda de Abarrotado", desc: "Fundación y gestión exitosa de negocio local durante X años." }
        ]
    }
};

/**
 * Función para cambiar el perfil dinámicamente
 */
function switchProfile(profileKey) {
    const data = PROF_DATA[profileKey];
    if (!data) return;

    // 1. Actualizar Textos e Imagen
    document.querySelector('.profile-info h1').innerText = "Alexis Nicolas Hurtado";
    document.querySelector('.profile-info p').innerText = data.title;
    document.querySelector('#about p').innerText = data.about;
    document.querySelector('.profile-img img').src = data.image; // Cambio de foto
    document.querySelector('#hero').style.borderColor = data.color;

    // 2. Actualizar Skills
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = data.skills.map(s => `<div class="skill-tag">${s}</div>`).join('');

    // 3. Actualizar Proyectos
    const projectGrid = document.querySelector('#projects-container');
    projectGrid.innerHTML = data.projects.map(p => `
        <div class="project-card">
            <h3 style="color: ${data.color}">${p.name}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');

    // 4. Cambiar Color de Acento (CSS Variable)
    document.documentElement.style.setProperty('--gl-accent', data.color);
    
    // Activar botón
    document.querySelectorAll('.hub-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.hub-btn[onclick*="${profileKey}"]`).classList.add('active');
}

// Inicializar con IA por defecto
window.onload = () => {
    switchProfile('ia');
    lucide.createIcons();
};
