/**
 * --- DATABASE DE PERFILES DE ALEXIS NICOLAS HURTADO ---
 * Aquí gestionamos el contenido dinámico de cada especialización.
 */

const PROF_DATA = {
    ia: {
        title: "Especialista en Orquestación e IA",
        color: "#38bdf8",
        image: "assets/images/perfil-2.jpg",
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
        image: "assets/images/perfil-1.jpg",
        about: "Desarrollador con enfoque en arquitecturas escalables, diseño de sistemas y clean code. Apasionado por crear software que solucione problemas reales.",
        skills: ["JavaScript/Node.js", "React/Next.js", "SQL & NoSQL", "Docker/Git", "API Design", "Agile Methodologies"],
        projects: [
            { name: "Sistemas de Gestión", desc: "Desarrollo de CRMs y plataformas de control administrativo personalizadas." }
        ]
    },
    seguridad: {
        title: "Especialista en Ciberseguridad y Forense",
        color: "#f43f5e",
        image: "assets/images/perfil-1.jpg",
        about: "Analista enfocado en la protección de activos digitales, análisis de vulnerabilidades y forense informático. Capacidad para identificar brechas y proponer soluciones de mitigación robustas.",
        skills: ["Pentesting", "Análisis Forense", "Seguridad en Redes", "Ethical Hacking", "Linux Security", "Normativas ISO/IEC"],
        projects: [
            { name: "Auditoría de Sistemas", desc: "Evaluación integral de vulnerabilidades en infraestructuras locales." }
        ]
    },
    negocios: {
        title: "Bolsa de Valores, Finanzas y Administración",
        color: "#fbbf24",
        image: "assets/images/perfil-1.jpg",
        about: "Estratega financiero con experiencia en análisis técnico de mercados bursátiles y administración de negocios. Visión analítica para la toma de decisiones bajo riesgo y gestión de capital.",
        skills: ["Análisis Técnico/Fundamental", "Gestión de Portafolio", "Contabilidad", "Administración de Empresas", "Bolsa de Valores", "Excel Avanzado"],
        projects: [
            { name: "Estrategia de Inversión", desc: "Diseño de modelos de inversión basados en análisis técnico para mercados variables." }
        ]
    },
    real: {
        title: "Gestión de Negocios y Experiencia Real",
        color: "#fb923c",
        image: "assets/images/perfil-2.jpg",
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
    document.querySelector('.profile-img img').src = data.image;
    document.querySelector('#hero').style.borderColor = data.color;

// 1.1 Actualizar Enlaces de Descarga (Generador ATS)
    document.querySelector('#pdf1p').onclick = (e) => { e.preventDefault(); downloadATS(profileKey, 'pdf', 1); };
    document.querySelector('#pdf2p').onclick = (e) => { e.preventDefault(); downloadATS(profileKey, 'pdf', 2); };
    document.querySelector('#doc1p').onclick = (e) => { e.preventDefault(); downloadATS(profileKey, 'doc', 1); };
    document.querySelector('#doc2p').onclick = (e) => { e.preventDefault(); downloadATS(profileKey, 'doc', 2); };

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

    // Refrescar iconos Lucide
    lucide.createIcons();
}

/**
 * GENERADOR DE CV OPTIMIZADO PARA ATS (PDF/WORD)
 */
function downloadATS(roleKey, format, pages) {
    const data = PROF_DATA[roleKey];
    const name = "Alexis Nicolas Hurtado";
    const contact = "Email: alexmetal0429@gmail.com | GitHub: github.com/ANH-OkapyBeeee";
    
    // Estructura ATS (Solo Texto, Jerarquía Clara)
    let content = `
        <h1>${name.toUpperCase()}</h1>
        <p>${contact}</p>
        <hr>
        <h2>RESUMEN PROFESIONAL: ${data.title.toUpperCase()}</h2>
        <p>${data.about}</p>
        
        <h2>HABILIDADES TÉCNICAS</h2>
        <p>${data.skills.join(', ')}</p>
        
        <h2>EXPERIENCIA Y PROYECTOS</h2>
        ${data.projects.map(p => `
            <div>
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
        `).join('')}
    `;

    if (pages === 2) {
        content += `
            <h2>FORMACIÓN ADICIONAL</h2>
            <p>Especializaciones en el área de ${data.title}.</p>
            <h2>IDIOMAS</h2>
            <p>Español (Nativo) | Inglés (Técnico)</p>
        `;
    }

    if (format === 'pdf') {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>CV_${roleKey}_Alexis_Hurtado</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; }
                        h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
                        h2 { color: #444; margin-top: 25px; border-bottom: 1px solid #ccc; font-size: 1.2rem; }
                        strong { display: block; margin-top: 10px; }
                        p { margin: 5px 0; }
                    </style>
                </head>
                <body>${content}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } else {
        // Generación de Word (Docx) via Data URI
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>CV</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileLink = document.createElement("a");
        document.body.appendChild(fileLink);
        fileLink.href = source;
        fileLink.download = `CV_${roleKey}_Alexis_Hurtado.doc`;
        fileLink.click();
        document.body.removeChild(fileLink);
    }
}

// Inicializar con IA por defecto
window.onload = () => {
    switchProfile('ia');
    lucide.createIcons();
};
