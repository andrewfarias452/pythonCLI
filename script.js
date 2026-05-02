// ═══════════════════════════════════════════
// BOOT SEQUENCE (HACKER EXTREMO / MR. ROBOT)
// ═══════════════════════════════════════════

// Evitar que el navegador restaure la posición de scroll al recargar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', () => window.scrollTo(0, 0));
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

// --- SINTETIZADOR DE AUDIO GLOBAL ---
let audioCtx = null;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTypeSound() {
  try {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine'; // Onda senoidal: más limpia y sin saturación
    osc.frequency.setValueAtTime(600, audioCtx.currentTime); // Tono inicial más alto (clic)
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.015);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime); // Empieza en 0 para evitar el 'pop'
    gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.002); // Ataque rapidísimo
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02); // Decaimiento suave
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.025);
  } catch (e) {}
}

function playClickSound() {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // Tono inicial más agudo (tick UI)
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.01);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add('booting');
  
  const startBtn = document.getElementById('start-btn');
  const startOverlay = document.getElementById('start-overlay');
  
  // Sonido interactivo para botones, enlaces, pestañas y controles
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, .snippet-tab, .terminal-tab, .dot, .flow-box, .fstr-part, .compare-col');
    if (target) {
      playClickSound();
    }
  });

  startBtn.addEventListener('click', async function() {
    initAudio(); // Inicializamos el motor de audio en el primer clic
    startOverlay.style.pointerEvents = 'none';
    startOverlay.style.opacity = '0';
    setTimeout(() => startOverlay.remove(), 300);

    const bootText = document.getElementById('boot-text');
    const bootScreen = document.getElementById('boot-screen');

  // Utilidad mágica para pausar la ejecución exactamente los milisegundos que queramos
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Función para escribir texto letra a letra con velocidad variable
  async function typeLine(text, speed = 4, cssClass = "") {
    const span = document.createElement('span');
    if (cssClass) span.className = cssClass;
    bootText.appendChild(span);

    for (let i = 0; i < text.length; i++) {
      span.innerHTML += text.charAt(i);
      if (text.charAt(i) !== ' ') playTypeSound(); // Tocar sonido excepto en espacios
      // Math.random() hace que la velocidad de tipeo sea irregular (más humano/realista)
      await sleep(speed + Math.random() * 10);
    }
    bootText.appendChild(document.createElement('br'));
  }

  // FASE 1: VOLCADO DE MEMORIA (Basura hexadecimal a toda velocidad)
  async function memoryDump() {
     for(let i=0; i<18; i++) {
        // Genera direcciones de memoria falsas ej. [0x4F8A2C]
        let line = `[0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6,'0')}] `;
        // Genera bloques de códigos aleatorios
        for(let j=0; j<8; j++) line += Math.random().toString(36).substring(2, 6).toUpperCase() + " ";
        
        const span = document.createElement('span');
        span.style.opacity = "0.4"; // Se ve oscuro como texto de fondo
        span.innerHTML = line;
        bootText.appendChild(span);
        bootText.appendChild(document.createElement('br'));
        playTypeSound();
        await sleep(5); // Cae rapidísimo
     }
  }

  // === AQUÍ EMPIEZA LA PELÍCULA ===
  await sleep(150);
  await memoryDump();
  await sleep(150);
  
  // Limpiar pantalla después del volcado de basura
  bootText.innerHTML = "";
  
  // FASE 2: INTRUSIÓN (Comandos tácticos)
  await typeLine("INICIALIZANDO ENTORNO EDUCATIVO...", 2);
  await typeLine("CARGANDO MÓDULOS DE PYTHON...", 2);
  await sleep(100);
  await typeLine("VERIFICANDO SINTAXIS Y DEPENDENCIAS...", 2, "boot-cyan");
  await typeLine("PREPARANDO SIMULACIONES DE CONSOLA...", 6);
  await typeLine("ESTABLECIENDO CONEXIÓN...", 1);
  await sleep(150);

  // FASE 3: BARRA DE PROGRESO ANIMADA
  const progressLabel = document.createElement('span');
  progressLabel.innerHTML = "COMPILANDO RECURSOS: ";
  bootText.appendChild(progressLabel);

  const progressSpan = document.createElement('span');
  progressSpan.className = "boot-yellow";
  bootText.appendChild(progressSpan);
  
  for(let i=1; i<=20; i++) {
    let bar = "█".repeat(i) + "░".repeat(20-i);
    progressSpan.innerHTML = `[${bar}] ${i*5}%`;
    playTypeSound();
    await sleep(15); // Velocidad a la que se llena la barra
  }
  bootText.appendChild(document.createElement('br'));

  await sleep(100);
  await typeLine("SISTEMA OPERATIVO Y ENTORNO LISTOS.", 5, "boot-cyan");
  await sleep(200);

  // FASE 4: ACCESO CONCEDIDO (Flashing Invertido)
  bootText.appendChild(document.createElement('br'));
  const granted = document.createElement('span');
  granted.className = "boot-granted";
  granted.innerText = "[ ENTORNO VIRTUAL INICIADO ]";
  bootText.appendChild(granted);

  // Pausa dramática para que sientas la adrenalina del hackeo exitoso
  await sleep(800); 

  // FASE 5: APERTURA DEL SISTEMA (Fade out)
  bootScreen.classList.add('hidden');
  document.body.classList.remove('booting');
  setTimeout(() => bootScreen.remove(), 800); // Destruye el nodo para limpiar memoria
  }); // Fin del event listener del botón
});

// Función unificada de copiar código al portapapeles
function copyCode(btn, codeId) {
  const container = document.getElementById(codeId);
  const lines = container.querySelectorAll('.line-code');
  
  // Extrae el texto saltando los números de línea, asegurando copiado limpio
  const text = Array.from(lines).map(l => l.innerText).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    showCopiedState(btn);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopiedState(btn);
  });
}

function showCopiedState(btn) {
  btn.textContent = '✅ COPIADO';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = '📋 COPIAR CÓDIGO';
    btn.classList.remove('copied');
  }, 4000);
}

// Ejecutar la simulación para el snippet interactivo
function runSimulation(btn) {
  const container = btn.closest('.snippet-wrap');
  if (!container) return;
  
  // Forzar que el scroll se alinee perfectamente al centro de la pantalla
  container.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Cambiar a la pestaña de la terminal
  const tabs = container.querySelectorAll('.snippet-tab');
  const terminalTab = Array.from(tabs).find(t => t.textContent.trim().toLowerCase() === 'terminal');
  if (terminalTab) terminalTab.click();
  
  // Reiniciar la animación de las líneas de la terminal con "carga"
  const termLines = container.querySelectorAll('.snippet-panel[data-panel="tab-2"] .tl');
  if (termLines.length === 0) return;

  const firstLine = termLines[0];

  // Ocultar todas las líneas excepto la primera
  termLines.forEach((line, index) => {
    if (index > 0) line.style.display = 'none';
    line.style.animationName = 'none';
  });

  // Asegurar que la primera línea sea visible de inmediato
  firstLine.style.opacity = '1';
  firstLine.style.transform = 'translateY(0)';

  // Añadir spinner de carga
  let loader = firstLine.querySelector('.term-loader');
  if (!loader) {
    loader = document.createElement('span');
    loader.className = 'term-loader';
    firstLine.appendChild(loader);
  }

  // Después de 1.2 segundos, quitamos el loader y animamos el resto
  setTimeout(() => {
    if (loader) loader.remove();
    termLines.forEach((line, index) => {
      if (index > 0) {
        line.style.display = '';
        void line.offsetWidth; // Forzar reflow
        line.style.animationName = ''; // Restaurar animación CSS normal
      }
    });
  }, 1200);
}

// ═══════════════════════════════════════════
// EFECTOS DE SCROLL (SIN BUGS DE PARPADEO)
// ═══════════════════════════════════════════

// --- AUTO-HIDE NAVBAR Y VOLVER ARRIBA ---
let lastScrollTop = 0;
const navbar = document.querySelector('nav');
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 60) {
    navbar.classList.add('nav-hidden'); // Ocultar al bajar
  } else if (scrollTop < lastScrollTop) {
    navbar.classList.remove('nav-hidden'); // Mostrar al subir
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Botón volver arriba
  if (backToTopBtn) {
    if (scrollTop > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0 // Cambiado a 0 para activar cuando cualquier parte entre en viewport
  };

  // --- RESALTADO DE SINTAXIS (Corchetes, Llaves, Paréntesis) ---
  function highlightBrackets() {
    const elements = document.querySelectorAll('pre, .line-code');
    elements.forEach(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      const nodesToReplace = [];
      let node;
      while (node = walker.nextNode()) {
        const parentClass = node.parentElement.className || '';
        // Evitar alterar comentarios o cadenas de texto estáticas
        if (parentClass.includes('cmt') || parentClass.includes('str')) continue;
        if (/[\(\)\[\]\{\}]/.test(node.nodeValue)) nodesToReplace.push(node);
      }
      nodesToReplace.forEach(node => {
        const frag = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = node.nodeValue
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/([\(\)\[\]\{\}])/g, m => {
            if (m === '(' || m === ')') return `<span class="prn">${m}</span>`;
            if (m === '[' || m === ']') return `<span class="brk">${m}</span>`;
            return `<span class="brc">${m}</span>`;
          });
        while(tempDiv.firstChild) frag.appendChild(tempDiv.firstChild);
        node.parentNode.replaceChild(frag, node);
      });
    });
  }
  highlightBrackets();
  // -------------------------------------------------------------

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // entry.target ahora es nuestro "guardia invisible" (el wrapper).
      // Buscamos el elemento real animado que está adentro.
      const realElement = entry.target.firstElementChild;
      
      if (!realElement) return;

      if (entry.isIntersecting) {
        // La caja invisible entró en pantalla: activamos el bloque real
        realElement.classList.add('active');
      } else {
        // La caja invisible salió de pantalla: lo apagamos
        realElement.classList.remove('active');
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.module-header, .compare-grid, .flowchart, .snippet-wrap, .fstring-anatomy');
  
  elementsToAnimate.forEach((el) => {
    // 🛠 SOLUCIÓN AL BUG: Creamos un "wrapper" estático en el HTML con JavaScript
    const wrapper = document.createElement('div');
    // Insertamos el wrapper justo antes del elemento
    el.parentNode.insertBefore(wrapper, el);
    // Metemos el elemento dentro del wrapper
    wrapper.appendChild(el);
    
    el.classList.add('reveal');
    
    // Le decimos a JS que vigile la caja que NO se mueve, no el elemento que salta
    observer.observe(wrapper); 
  });

  // Retraso de tipeo para las líneas de código (Se mantiene igual)
  document.querySelectorAll('.code-lines').forEach(codeBlock => {
    const lines = codeBlock.querySelectorAll('.line');
    lines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.01}s`;
    });
  });

  // Animación dinámica para las líneas de terminal
  document.querySelectorAll('.terminal-body').forEach(terminalBody => {
    const lines = terminalBody.querySelectorAll('.tl');
    lines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.01}s`;
    });
  });

  // Animación dinámica para el diagrama de flujo (elemento por elemento)
  document.querySelectorAll('.flowchart').forEach(flowchart => {
    const elements = flowchart.querySelectorAll('.flow-box, .flow-arrow, .flow-label');
    elements.forEach((el, index) => {
      el.style.transitionDelay = `${0.15 + (index * 0.05)}s`;
    });
  });

  // Animación dinámica para las filas de la tabla
  document.querySelectorAll('.fstr-table').forEach(table => {
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, index) => {
      row.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
    });
  });
});