/*
 * EduQuest Sounds — efectos de sonido sintetizados con Web Audio API.
 * No requiere archivos de audio externos.
 */
(function () {
    'use strict';

    let ctx = null;

    function audio() {
        if (!ctx) {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctx = new AC();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        return ctx;
    }

    // Desbloquea el audio con el primer gesto del usuario (política de autoplay).
    function unlock() {
        audio();
    }
    document.addEventListener('pointerdown', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });

    function tone(freq, delay, duration, type, volume) {
        var c = audio();
        if (!c) return;
        var osc = c.createOscillator();
        var gain = c.createGain();
        var t0 = c.currentTime + delay;
        var vol = volume || 0.18;
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t0);
        osc.stop(t0 + duration + 0.05);
    }

    window.EduQuestSounds = {
        // Tic suave del cronómetro (cada segundo)
        tick: function () {
            tone(880, 0, 0.06, 'square', 0.06);
        },
        // Tic fuerte de los últimos segundos
        tickUrgent: function () {
            tone(1200, 0, 0.1, 'square', 0.12);
        },
        // Clic al enviar respuesta
        click: function () {
            tone(640, 0, 0.08, 'triangle', 0.15);
        },
        // Secuencia ascendente (respuesta correcta)
        correct: function () {
            tone(523.25, 0, 0.15, 'sine', 0.2);      // Do5
            tone(659.25, 0.15, 0.15, 'sine', 0.2);   // Mi5
            tone(783.99, 0.3, 0.28, 'sine', 0.22);   // Sol5
        },
        // Zumbido grave (respuesta incorrecta)
        incorrect: function () {
            tone(220, 0, 0.25, 'sawtooth', 0.14);
            tone(174.61, 0.25, 0.35, 'sawtooth', 0.14);
        },
        // Doble tono bajo (tiempo agotado)
        timeout: function () {
            tone(330, 0, 0.22, 'triangle', 0.16);
            tone(220, 0.25, 0.4, 'triangle', 0.16);
        }
    };
})();
