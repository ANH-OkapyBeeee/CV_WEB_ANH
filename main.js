/**
 * --- DATABASE DE PERFILES DE ALEXIS NICOLÁS HURTADO ---
 */

const PROF_DATA = {
    ia: {
        title: "Especialista en Orquestación e IA & IoT",
        color: "#38bdf8",
        image: "assets/images/perfil-2.jpg",
        about: "Ingeniero con 3 años de experiencia en la industria química (Afton Chemical), especializado en optimizar la cadena de valor mediante tecnología. Experto en traducr necesidades operativas de planta y laboratorio en soluciones de automatización e inteligencia de datos.",
        skills: ["ChatGPT/Gemini API", "Internet de las Cosas (IoT)", "Automatización con Python", "Power BI / Tableau", "Interconexión de Sistemas", "Prompt Engineering"],
        projects: [
            { name: "Automatización Industrial", desc: "Interconexión del sistema de básculas de planta con el ERP para registro automático de materia prima, eliminando errores manuales." },
            { name: "Dashboards Gerenciales", desc: "Creación de tableros dinámicos en Power BI para la toma de decisiones basada en datos de producción y costos." }
        ]
    },
    software: {
        title: "Ingeniero de Software & Gestión ERP",
        color: "#818cf8",
        image: "assets/images/perfil-1.jpg",
        about: "Desarrollador enfocado en la mejora de flujos de trabajo críticos. Durante mi estancia en Afton Chemical, logré optimizar procesos de inventario y facturación electrónica, traduciendo requerimientos operativos en arquitectura de software robusta.",
        skills: ["SQL Server / PostgreSQL", "SAP S/4HANA", "Dynamics 365", "JavaScript/Node.js", "Diagramación de Arquitectura", "Optimización de Consultas"],
        projects: [
            { name: "Optimización SQL", desc: "Mejora en bases de datos SQL que redujo drásticamente los tiempos de generación de reportes mensuales para finanzas." },
            { name: "Gestión de Requerimientos", desc: "Traducción de necesidades de planta, almacén y laboratorio a especificaciones técnicas escalables." }
        ]
    },
    seguridad: {
        title: "Infraestructura y Ciberseguridad Industrial",
        color: "#f43f5e",
        image: "assets/images/perfil-1.jpg",
        about: "Especialista en asegurar la disponibilidad de sistemas críticos. Experiencia sólida gestionando servidores Windows/Linux y Active Directory en entornos industriales de alta exigencia.",
        skills: ["Active Directory", "Servidores Windows/Linux", "Seguridad en Redes", "Gestión de Tickets", "Mantenimiento Crítico", "Análisis Forense"],
        projects: [
            { name: "Administración de Servidores", desc: "Garantía de disponibilidad 24/7 de sistemas operativos y bases de datos críticos para la producción de aditivos." },
            { name: "Soporte Nivel 2/3", desc: "Resolución de incidencias complejas y entrenamiento técnico al personal de planta para el uso correcto del software." }
        ]
    },
    negocios: {
        title: "Análisis Financiero y Administrativo",
        color: "#fbbf24",
        image: "assets/images/perfil-1.jpg",
        about: "Visión integral de la administración de negocios. Experiencia en supervisión de módulos de costos, inventarios y conciliación automática para reducir el error humano y optimizar utilidades.",
        skills: ["Costos de Producción", "Módulos de Inventario", "Facturación Electrónica", "Análisis de Datos", "SAP ERP", "Documentación de Usuarios"],
        projects: [
            { name: "Conciliación Automatizada", desc: "Implementación de scripts para la conciliación de inventarios, reduciendo el error humano en un entorno logístico masivo." },
            { name: "Manuales de Usuario", desc: "Creación de documentación técnica y diagramas de flujo para estandarizar la operación administrativa." }
        ]
    },
    real: {
        title: "Liderazgo y Gestión de Operaciones",
        color: "#fb923c",
        image: "assets/images/perfil-2.jpg",
        about: "Más allá del software, entiendo el mundo real. Desde la gestión de un negocio familiar (tienda de abarrotes) hasta operar en una planta química multinacional, domino la logística y el servicio al cliente.",
        skills: ["Liderazgo de Equipos", "Capacitación de Personal", "Logística y Almacén", "Atención al Cliente", "Resolución de Problemas", "Gestión de Inventarios"],
        projects: [
            { name: "Entrenamiento de Planta", desc: "Capacitación directa al personal operativo para maximizar la adopción de nuevas herramientas tecnológicas." },
            { name: "Optimización de Inventarios", desc: "Implementación de controles que mejoraron la rotación de producto y redujeron mermas en la cadena de logística." }
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
    document.querySelector('.profile-info h1').innerText = "Alexis Nicolás Hurtado";
    document.querySelector('#role-title').innerText = data.title;
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
    const name = "Alexis Nicolás Hurtado";
    const title = "Ingeniero en Sistemas Computacionales | Esp. en IoT";
    const contact = `Email: nha_Job@outlook.com / alexmetal0429@gmail.com  
Te: 720-422-3213 (WhatsApp/Llamadas) | 442-160-6931 (Solo WA) | 442-504-6771 (Solo Llamadas)`;
    
    // Estructura ATS (Solo Texto, Jerarquía Clara)
    let content = `
        <h1>${name.toUpperCase()}</h1>
        <p><strong>${title.toUpperCase()}</strong></p>
        <p>${contact}</p>
        <hr>
        
        <h2>ROL: ${data.title.toUpperCase()}</h2>
        <h3>SÍNTESIS PROFESIONAL</h3>
        <p>${data.about}</p>
        
        <h3>EXPERIENCIA CLAVE (Afton Chemical 2018-2021)</h3>
        ${data.projects.map(p => `
            <div>
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
        `).join('')}

        <h3>HABILIDADES TÉCNICAS</h3>
        <p>${data.skills.join(', ')}</p>
    `;

    if (pages === 2) {
        content += `
            <h3>FORMACIÓN PROFESIONAL</h3>
            <p><strong>Ingeniería en Sistemas Computacionales</strong> con especialidad en <strong>Internet de las Cosas (IoT)</strong>.</p>
            
            <h3>HERRAMIENTAS E INFRAESTRUCTURA</h3>
            <p>SAP S/4HANA, Microsoft Dynamics 365, SQL Server, PostgreSQL, Windows/Linux Server, Active Directory, Power BI, Tableau.</p>
            
            <h3>IDIOMAS</h3>
            <p>Español (Nativo) | Inglés (Técnico - Lectura de manuales y documentación)</p>
            
            <h3>LOGROS ADICIONALES</h3>
            <p>Documentación integral: Creación de manuales de usuario y diagramas de arquitectura. Entrenamiento de personal en sitio.</p>
        `;
    }

    if (format === 'pdf') {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>CV_${roleKey}_Alexis_Hurtado</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 40px; }
                        h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 5px; }
                        h2 { color: #555; font-size: 1.1rem; margin-top: 10px; }
                        h3 { color: #000; font-size: 1rem; margin-top: 15px; border-left: 4px solid #000; padding-left: 10px; text-transform: uppercase; }
                        strong { display: block; margin-top: 5px; color: #000; }
                        p { margin: 5px 0; font-size: 0.95rem; }
                        hr { border: 0; border-top: 1px solid #ddd; margin: 15px 0; }
                    </style>
                </head>
                <body>${content}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } else {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>CV</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileLink = document.createElement("a");
        document.body.appendChild(fileLink);
        fileLink.href = source;
        fileLink.download = `CV_Alexis_Hurtado_${roleKey}.doc`;
        fileLink.click();
        document.body.removeChild(fileLink);
    }
}

// Inicializar con IA por defecto al cargar
window.onload = () => {
    switchProfile('ia');
};
