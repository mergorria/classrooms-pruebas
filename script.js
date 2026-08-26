// 🪄 Animación del Arco (Latidos iniciales)
(function () {
    const glow = document.getElementById('glowArco');
    const arco = document.getElementById('arcoLink');
    const times = 10; // cantidad de latidos
    let c = 0;
    arco._ended = false; // desactiva hover y tip durante el efecto

    const pulse = setInterval(() => {
        const active = (c % 2 === 0);
        glow.style.opacity = active ? '1' : '0.15';
        arco.style.transform = active ? 'scale(1.08)' : 'scale(1)';
        arco.style.filter = active ? 'brightness(1.08)' : 'brightness(1)';
        c++;

        if (c >= times * 2) {
            clearInterval(pulse);
            glow.style.transition = 'opacity 1.2s ease';
            glow.style.opacity = '0'; // glow desaparece
            arco.style.transform = 'scale(1)';
            arco.style.filter = 'brightness(1)';
            arco._ended = true; // activa hover + tip
        }
    }, 900);
})();

// Control de Hover interactivo para elementos con tip centrado o inferior
document.addEventListener("DOMContentLoaded", () => {
    const elementosMapa = document.querySelectorAll(".map-item");

    elementosMapa.forEach(el => {
        el.addEventListener("mouseenter", () => {
            el.style.transform = 'translate(-50%,-50%) scale(1.08)';
            el.style.filter = 'brightness(1.08) drop-shadow(0 18px 40px rgba(0,0,0,.55))';
            const t = el.querySelector('.tip');
            if (t) {
                t.style.opacity = '1';
                if (t.classList.contains('info-tip')) {
                    t.style.transform = 'translate(-50%,0)';
                }
            }
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = 'translate(-50%,-50%) scale(1)';
            el.style.filter = 'drop-shadow(0 10px 24px rgba(0,0,0,.40))';
            const t = el.querySelector('.tip');
            if (t) {
                t.style.opacity = '0';
                if (t.classList.contains('info-tip')) {
                    t.style.transform = 'translate(-50%,10px)';
                }
            }
        });
    });
});

// Comportamiento del Asistente Consejero
(function () {
    const asist = document.getElementById('asistenteConsejero');
    const globo = document.getElementById('globoConsejo');

    if (!asist || !globo) return;

    // Entra después de 0.8 s
    setTimeout(() => {
        asist.style.right = '20px';
    }, 800);

    // Cambia automáticamente al segundo consejo tras 12s
    const autoNext = setTimeout(() => {
        window.mostrarSegundo();
    }, 12000);

    window.mostrarSegundo = function () {
        clearTimeout(autoNext);
        globo.style.opacity = '0';
        setTimeout(() => {
            globo.innerHTML = `💡 <b>Consejo:</b><br>
            Comencá el recorrido desde el espacio <b>"Inicio"</b>.
            <button class="cerrar-btn" onclick="cerrarAsistente(this)">×</button>`;
            globo.style.opacity = '1';
        }, 400);

        setTimeout(() => {
            asist.style.transition = 'right 1s ease';
            asist.style.right = '-320px';
            setTimeout(() => asist.remove(), 1000);
        }, 12000);
    };
})();

// Función global para cerrar el asistente manualmente
function cerrarAsistente(button) {
    const contenedor = button.closest('#asistenteConsejero');
    if (contenedor) {
        contenedor.style.right = '-320px';
        setTimeout(() => contenedor.remove(), 800);
    }
}