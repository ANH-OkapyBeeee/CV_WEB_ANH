/**
 * --- DATABASE DE PERFILES DE ALEXIS NICOLÁS HURTADO ---
 */

const PROF_DATA = {
    ia: {
        title: "Especialista en IA & IoT Industrial",
        color: "#38bdf8",
        image: "assets/images/perfil-2.jpg",
        about: "Ingeniero enfocado en la convergencia de IA e infraestructura. Especializado en automatizar la cadena de valor y asegurar la continuidad operativa mediante monitoreo inteligente y soluciones de IoT en planta.",
        skills: ["ChatGPT/Gemini API", "IoT & Sensores", "Python / SQL", "Power BI Dashboards", "Automatización de Procesos", "Integración de Sistemas"],
        projects: [
            { name: "IoT & ERP Link", desc: "Interconexión de básculas industriales con ERP para registro automático, optimizando la materia prima." },
            { name: "IA en Flujos Operativos", desc: "Implementación de modelos de lenguaje para análisis de reportes de planta y laboratorio." }
        ]
    },
    software: {
        title: "Ingeniero de Software y Sistemas",
        color: "#818cf8",
        image: "assets/images/perfil-1.jpg",
        about: "Desarrollo de soluciones alineadas a los objetivos del negocio. Experto en gestión de bases de datos, administración de ERPs (SAP/Dynamics) y virtualización con VMware para hosting de aplicaciones.",
        skills: ["SQL Server / PostgreSQL", "SAP S/4HANA & Dynamics", "Virtualización VMware", "JavaScript / PHP", "Arquitectura de Software", "Hosting & Email Admin"],
        projects: [
            { name: "Optimización SQL", desc: "Reducción de tiempos en reportes mensuales mediante tuning de bases de datos." },
            { name: "Estandarización de Infra", desc: "Alineación de tecnología con los objetivos empresariales para mejorar el rendimiento del software." }
        ]
    },
    seguridad: {
        title: "Especialista en Ciberseguridad y DRP",
        color: "#f43f5e",
        image: "assets/images/perfil-1.jpg",
        about: "Consultor en seguridad informática y recuperación ante desastres. Experto en protección perimetral con Fortinet, seguridad del SGCS y gestión de respaldos críticos en servidores Windows/Linux.",
        skills: ["Firewall Fortinet & VPN", "Seguridad Perimetral", "Plan de Recuperación (DRP)", "Monitoreo de Enlaces", "SGCS & Compliance", "Backups Críticos"],
        projects: [
            { name: "Plan de Continuidad", desc: "Seguimiento puntual al plan de recuperación de desastres, asegurando la integridad de la información." },
            { name: "Hardening de Servidores", desc: "Configuración y corrección de la infraestructura tecnológica para mitigar vulnerabilidades." }
        ]
    },
    redes: {
        title: "Ingeniero de Redes y Telecomunicaciones",
        color: "#10b981",
        image: "assets/images/perfil-1.jpg",
        about: "Especialista en infraestructura de red y telecomunicaciones. Desde el cableado estructurado hasta la administración por CLI de switches Capa 2, redes Aruba y telefonía IP con Asterisk.",
        skills: ["Fortinet & VPNs", "Switching L2 (CLI)", "Wireless Aruba", "Telefonía IP Asterisk", "Cableado Estructurado", "UPS Administrables"],
        projects: [
            { name: "Infraestructura Multi-Oficina", desc: "Monitoreo y funcionamiento de enlaces de internet, telefonía y redes privadas entre sucursales." },
            { name: "Optimización de Conectividad", desc: "Estandarización de racks, ponchado y organización de cableado para alta disponibilidad." }
        ]
    },
    negocios: {
        title: "Gerencia de TI y Proyectos",
        color: "#fbbf24",
        image: "assets/images/perfil-1.jpg",
        about: "Gestor tecnológico con enfoque en la cadena de valor. Experiencia en contratación de servicios de TI, gestión de proveedores de hosting y alineación tecnológica estratégica.",
        skills: ["Gestión de Proveedores", "Presupuestos de TI", "Estrategia Operativa", "Control de Inventarios", "Capacitación de Personal", "Análisis de Datos"],
        projects: [
            { name: "Gestión de Enlaces", desc: "Seguimiento a la contratación y monitoreo de enlaces de internet y servicios de hosting corporativos." },
            { name: "Optimización Administrativa", desc: "Automatización de conciliación de inventarios reduciendo errores humanos y costos operativos." }
        ]
    },
    real: {
        title: "Experiencia Real y Operativa",
        color: "#fb923c",
        image: "assets/images/perfil-2.jpg",
        about: "Liderazgo pragmático formado en la industria química y comercial. Capacidad para gestionar desde la logística de almacén hasta la infraestructura tecnológica de una planta multinacional.",
        skills: ["Liderazgo Pragmático", "Logística Avanzada", "Soporte Técnico 24/7", "Resolución de Conflictos", "Mentoring Técnico", "Gestión de Planta"],
        projects: [
            { name: "Transformación Digital Afton", desc: "Liderazgo en la transición tecnológica durante la adquisición de Aditivos Mexicanos por Afton Chemical." },
            { name: "Entrenamiento de Equipos", desc: "Formación de personal en el uso eficiente de nuevas tecnologías de infraestructura y software." }
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
    const setClick = (id, pf, fmt, pgs) => {
        const el = document.querySelector(id);
        if(el) el.onclick = (e) => { e.preventDefault(); downloadATS(pf, fmt, pgs); };
    };
    setClick('#pdf1p', profileKey, 'pdf', 1);
    setClick('#pdf2p', profileKey, 'pdf', 2);
    setClick('#doc1p', profileKey, 'doc', 1);
    setClick('#doc2p', profileKey, 'doc', 2);

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
    const title = "Ingeniero en Sistemas Computacionales | Especialista en IoT";
    const contact = `Email: nha_Job@outlook.com / alexmetal0429@gmail.com  
Te: 720-422-3213 (WhatsApp/Llamadas) | 442-160-6931 (Solo WA) | 442-504-6771 (Solo Llamadas)`;
    
    // Contenido estructurado para ATS
    let content = `
        <h1>${name.toUpperCase()}</h1>
        <p><strong>${title.toUpperCase()}</strong></p>
        <p>${contact}</p>
        <hr>
        
        <h2>PERFIL: ${data.title.toUpperCase()}</h2>
        <h3>RESUMEN PROFESIONAL</h3>
        <p>${data.about}</p>
        
        <h3>EXPERIENCIA Y LOGROS DESTACADOS</h3>
        ${data.projects.map(p => `
            <div>
                <strong>${p.name}</strong>
                <p>${p.desc}</p>
            </div>
        `).join('')}

        <h3>COMPETENCIAS TÉCNICAS</h3>
        <p>${data.skills.join(', ')}</p>
    `;

    if (pages === 2) {
        content += `
            <h3>TRAYECTORIA LABORAL (2018 - 2021)</h3>
            <p><strong>Compañía:</strong> Afton Chemical (Aditivos Mexicanos)</p>
            <p><strong>Rol:</strong> Ingeniería de Sistemas e Infraestructura</p>
            <ul>
                <li>Administración de Firewalls Fortinet, VPNs y Seguridad Perimetral.</li>
                <li>Gestión de infraestructura de red (Switches L2, Aruba Wireless, Telefonía IP).</li>
                <li>Administración de Servidores Windows/Linux y Virtualización con VMware.</li>
                <li>Gestión de presupuesto y proveedores de enlaces de internet y hosting.</li>
                <li>Liderazgo en planes de recuperación de desastres (DRP) y SGCS.</li>
            </ul>

            <h3>HERRAMIENTAS ESPECIALIZADAS</h3>
            <p>SAP S/4HANA, Dynamics 365, SQL Server, Power BI, Tableau, Asterisk, UPS Administrables.</p>
            
            <h3>ESTUDIOS</h3>
            <p>Ingeniería en Sistemas Computacionales con Especialidad en IoT.</p>
        `;
    }

    if (format === 'pdf') {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>CV_Alexis_Hurtado</title>
                    <style>
                        body { font-family: 'Segoe UI', Arial; line-height: 1.4; color: #333; padding: 40px; }
                        h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; }
                        h3 { color: #000; font-size: 1rem; margin-top: 15px; border-left: 4px solid #000; padding-left: 10px; text-transform: uppercase; }
                        strong { display: block; margin-top: 5px; }
                        li { font-size: 0.95rem; margin-bottom: 3px; }
                    </style>
                </head>
                <body>${content}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } else {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileLink = document.createElement("a");
        fileLink.href = source;
        fileLink.download = `CV_Alexis_Hurtado_${roleKey}.doc`;
        fileLink.click();
    }
}

window.onload = () => {
    switchProfile('ia');
};
