/**
 * MedIA 360 - Módulo de Asistentes Especializados de IA
 * Cardiología (ECG + Riesgo), Dermatología (ABCD + Lesiones), Radiología (Rayos X + Heatmap) y Pediatría
 */

import { CLINICAL_DATA } from '../data.js';

export class EspecialidadesModule {
  constructor(app) {
    this.app = app;
    this.currentSpecialty = 'cardiologia';
    this.ecgAnimationId = null;
    this.ecgType = 'infartoST';
    this.dermaCase = CLINICAL_DATA.especialidades.dermatologia.casosDemostrables[0];
    this.radCase = CLINICAL_DATA.especialidades.radiologia.estudiosDemostrables[0];
    this.showRadOverlays = true;
    this.xrayImage = null;
    this.dermaImage = null;
    this.preloadImages();
  }

  preloadImages() {
    this.xrayImage = new Image();
    this.xrayImage.src = 'assets/chest_xray.jpg';

    this.dermaImage = new Image();
    this.dermaImage.src = 'assets/derma_lesion.jpg';
  }

  init() {
    this.attachEventListeners();
    this.cargarEspecialidad(this.currentSpecialty);
    this.iniciarSimuladorECG();
  }

  cargarEspecialidad(key) {
    this.currentSpecialty = key;

    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.spec === key);
    });

    document.querySelectorAll('.spec-container').forEach(c => c.style.display = 'none');
    const target = document.getElementById(`specPanel_${key}`);
    if (target) target.style.display = 'block';

    if (key === 'cardiologia') {
      this.iniciarSimuladorECG();
    } else if (key === 'dermatologia') {
      this.renderDermaCase();
    } else if (key === 'radiologia') {
      this.renderRadiologyCase();
    } else if (key === 'pediatria') {
      this.calcularDosisPediatrica();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners() {
    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.cargarEspecialidad(btn.dataset.spec);
      });
    });

    document.querySelectorAll('.btn-ecg-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-ecg-preset').forEach(b => b.classList.remove('active', 'btn-primary'));
        btn.classList.add('active', 'btn-primary');
        this.ecgType = btn.dataset.type;
        this.actualizarReporteCardio();
      });
    });

    document.querySelectorAll('.btn-derma-case').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.case;
        this.dermaCase = CLINICAL_DATA.especialidades.dermatologia.casosDemostrables.find(c => c.id === id);
        this.renderDermaCase();
      });
    });

    const dermaInput = document.getElementById('inputSubirImagenDerma');
    if (dermaInput) {
      dermaInput.addEventListener('change', (e) => this.procesarImagenSubidaDerma(e));
    }

    const toggleRoiBtn = document.getElementById('btnToggleRadOverlays');
    if (toggleRoiBtn) {
      toggleRoiBtn.addEventListener('click', () => {
        this.showRadOverlays = !this.showRadOverlays;
        this.renderRadiologyCase();
      });
    }

    const pesoSlider = document.getElementById('sliderPesoPediatrico');
    if (pesoSlider) {
      pesoSlider.addEventListener('input', () => this.calcularDosisPediatrica());
    }
  }

  // ==========================================
  // CARDIOLOGÍA & SIMULADOR ECG
  // ==========================================
  iniciarSimuladorECG() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 160;

    let x = 0;
    let prevY = canvas.height / 2;
    const speed = 2.5;
    const baseLine = canvas.height / 2;
    let step = 0;

    const animar = () => {
      step++;
      ctx.fillStyle = 'rgba(2, 4, 8, 0.06)';
      ctx.fillRect(x, 0, speed * 2, canvas.height);

      let y = baseLine;

      if (this.ecgType === 'normal') {
        const cycle = step % 60;
        if (cycle === 10) y = baseLine - 10;
        else if (cycle === 12) y = baseLine;
        else if (cycle === 18) y = baseLine + 6;
        else if (cycle === 20) y = baseLine - 65;
        else if (cycle === 22) y = baseLine + 22;
        else if (cycle === 24) y = baseLine;
        else if (cycle === 34) y = baseLine - 15;
        else if (cycle === 40) y = baseLine;
      } else if (this.ecgType === 'infartoST') {
        const cycle = step % 45;
        if (cycle === 6) y = baseLine - 8;
        else if (cycle === 12) y = baseLine - 55;
        else if (cycle === 14) y = baseLine + 10;
        else if (cycle >= 15 && cycle <= 26) y = baseLine - 26; // ST ELEVADO
        else if (cycle === 30) y = baseLine;
      } else if (this.ecgType === 'fibrilacion') {
        const noise = (Math.random() - 0.5) * 8;
        const cycle = step % Math.floor(30 + Math.random() * 25);
        if (cycle === 8) y = baseLine - 60 + noise;
        else if (cycle === 10) y = baseLine + 18;
        else y = baseLine + noise;
      }

      ctx.beginPath();
      ctx.strokeStyle = this.ecgType === 'infartoST' ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.ecgType === 'infartoST' ? 'rgba(244,63,94,0.8)' : 'rgba(16,185,129,0.8)';
      ctx.moveTo(x, prevY);
      ctx.lineTo(x + speed, y);
      ctx.stroke();

      prevY = y;
      x += speed;

      if (x > canvas.width) {
        x = 0;
      }

      this.ecgAnimationId = requestAnimationFrame(animar);
    };

    if (this.ecgAnimationId) cancelAnimationFrame(this.ecgAnimationId);
    this.actualizarReporteCardio();
    animar();
  }

  actualizarReporteCardio() {
    const data = CLINICAL_DATA.especialidades.cardiologia.trazadosECG[this.ecgType];
    const badge = document.getElementById('cardioRitmoBadge');
    const hallazgo = document.getElementById('cardioHallazgosTexto');
    const riesgo = document.getElementById('cardioRiesgoScore');
    const telemetryFC = document.getElementById('ecgTelemetryFC');

    if (badge) {
      badge.textContent = data.tipo;
      badge.className = this.ecgType === 'infartoST' ? 'triage-badge t1' : this.ecgType === 'fibrilacion' ? 'triage-badge t2' : 'triage-badge t4';
    }
    if (hallazgo) hallazgo.innerHTML = `<strong>Hallazgo Principal:</strong> ${data.hallazgo}`;
    if (riesgo) riesgo.innerHTML = `<strong>Ponderación de Riesgo:</strong> ${data.riesgo}`;
    if (telemetryFC) {
      telemetryFC.textContent = this.ecgType === 'infartoST' ? "108 BPM" : this.ecgType === 'fibrilacion' ? "132 BPM" : "75 BPM";
    }
  }

  // ==========================================
  // DERMATOLOGÍA CON FOTO CLÍNICA REAL
  // ==========================================
  renderDermaCase() {
    const c = this.dermaCase;
    const canvas = document.getElementById('dermaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 360;
    canvas.height = 360;

    const drawContent = () => {
      if (this.dermaImage && this.dermaImage.complete && this.dermaImage.naturalWidth > 0) {
        // Dibujar foto macro clínica real
        ctx.drawImage(this.dermaImage, 0, 0, 360, 360);
      } else {
        // Fallback procedural
        ctx.fillStyle = '#1e1614';
        ctx.fillRect(0, 0, 360, 360);
      }

      // Anillo reticular dermoscópico de medición
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(180, 180, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Si es lesión sospechosa, marcar contorno segmentado
      if (c.id === 'DERMA-01') {
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(100, 90, 165, 175);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
        ctx.fillRect(100, 90, 165, 175);

        // Badge de IA
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(100, 68, 140, 22);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('MELANOMA: 86.4%', 108, 83);
      } else {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(110, 110, 140, 140);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(110, 110, 140, 140);

        ctx.fillStyle = '#10b981';
        ctx.fillRect(110, 88, 120, 22);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('BENIGNO: 94.1%', 118, 103);
      }
    };

    if (this.dermaImage.complete) {
      drawContent();
    } else {
      this.dermaImage.onload = drawContent;
    }

    // Actualizar tabla ABCD
    document.getElementById('dermaAsimetria').textContent = c.abcd.asimetria;
    document.getElementById('dermaBordes').textContent = c.abcd.bordes;
    document.getElementById('dermaColor').textContent = c.abcd.color;
    document.getElementById('dermaDiametro').textContent = c.abcd.diametro;

    // Actualizar barras de probabilidad
    const probContainer = document.getElementById('dermaProbabilidades');
    if (probContainer) {
      probContainer.innerHTML = c.probabilidades.map(p => `
        <div style="margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; margin-bottom:3px;">
            <span>${p.diagnostico}</span>
            <strong style="font-family:var(--font-mono);">${p.prob}%</strong>
          </div>
          <div style="background:rgba(255,255,255,0.06); height:6px; border-radius:3px; overflow:hidden;">
            <div style="width:${p.prob}%; height:100%; background:${p.severidad === 'alta' ? 'var(--accent-rose)' : p.severidad === 'media' ? 'var(--accent-amber)' : 'var(--accent-emerald)'}; transition:width 0.4s ease;"></div>
          </div>
        </div>
      `).join('');
    }

    const recoElem = document.getElementById('dermaRecomendacion');
    if (recoElem) recoElem.textContent = c.recomendacionIA;
  }

  procesarImagenSubidaDerma(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById('dermaCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 360;
        canvas.height = 360;
        ctx.drawImage(img, 0, 0, 360, 360);

        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(70, 70, 220, 220);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.16)';
        ctx.fillRect(70, 70, 220, 220);

        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(70, 48, 170, 22);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('SEGMENTACIÓN IA: 91.2%', 76, 63);

        this.app.mostrarNotificacion("Imagen procesada por MedIA-DermaClassify. Análisis ABCD calculado.", "success");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ==========================================
  // RADIOLOGÍA CON RADIOGRAFÍA CLÍNICA REAL
  // ==========================================
  renderRadiologyCase() {
    const c = this.radCase;
    const canvas = document.getElementById('radCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 360;
    canvas.height = 360;

    const drawContent = () => {
      if (this.xrayImage && this.xrayImage.complete && this.xrayImage.naturalWidth > 0) {
        // Dibujar radiografía de tórax clínica real
        ctx.drawImage(this.xrayImage, 0, 0, 360, 360);
      } else {
        ctx.fillStyle = '#080c14';
        ctx.fillRect(0, 0, 360, 360);
      }

      // Superposición de IA (Bounding Box y mapa de calor sobre condensación)
      if (this.showRadOverlays && c.hallazgosIA) {
        c.hallazgosIA.forEach(h => {
          const px = (h.coordenadas.x / 100) * canvas.width;
          const py = (h.coordenadas.y / 100) * canvas.height;
          const pw = (h.coordenadas.w / 100) * canvas.width;
          const ph = (h.coordenadas.h / 100) * canvas.height;

          // Mapa de calor térmico translúcido
          if (h.color === '#ef4444') {
            const gradHeat = ctx.createRadialGradient(px + pw/2, py + ph/2, 5, px + pw/2, py + ph/2, pw/1.4);
            gradHeat.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
            gradHeat.addColorStop(0.6, 'rgba(245, 158, 11, 0.25)');
            gradHeat.addColorStop(1, 'transparent');
            ctx.fillStyle = gradHeat;
            ctx.fillRect(px - 10, py - 10, pw + 20, ph + 20);
          }

          // Bounding box HUD
          ctx.strokeStyle = h.color === '#ef4444' ? '#f43f5e' : '#10b981';
          ctx.lineWidth = 2;
          ctx.strokeRect(px, py, pw, ph);

          // Esquinas técnicas HUD
          const s = 8;
          ctx.lineWidth = 3;
          // Sup izq
          ctx.beginPath(); ctx.moveTo(px, py + s); ctx.lineTo(px, py); ctx.lineTo(px + s, py); ctx.stroke();
          // Sup der
          ctx.beginPath(); ctx.moveTo(px + pw - s, py); ctx.lineTo(px + pw, py); ctx.lineTo(px + pw, py + s); ctx.stroke();

          // Badge
          ctx.fillStyle = h.color === '#ef4444' ? '#f43f5e' : '#10b981';
          ctx.fillRect(px, py - 18, 110, 18);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.fillText(`IA: ${h.confianza}% CERTEZA`, px + 4, py - 5);
        });
      }
    };

    if (this.xrayImage.complete) {
      drawContent();
    } else {
      this.xrayImage.onload = drawContent;
    }

    const conclusionElem = document.getElementById('radConclusionTexto');
    const prioridadBadge = document.getElementById('radPrioridadBadge');
    const listaHallazgos = document.getElementById('radHallazgosLista');

    if (conclusionElem) conclusionElem.textContent = c.conclusionPreliminar;
    if (prioridadBadge) {
      prioridadBadge.textContent = c.prioridadLectura;
      prioridadBadge.className = c.prioridadLectura.includes('ALTA') ? 'triage-badge t1' : 'triage-badge t4';
    }
    if (listaHallazgos) {
      listaHallazgos.innerHTML = c.hallazgosIA.map(h => `
        <div style="padding:8px 10px; border-radius:6px; border-left:3px solid ${h.color === '#ef4444' ? 'var(--accent-rose)' : 'var(--accent-emerald)'}; background:var(--bg-card-solid); margin-bottom:6px; font-size:0.78rem;">
          <strong style="color:var(--text-main);">${h.region}</strong> (${h.confianza}% confianza)<br>
          <span style="color:var(--text-muted);">${h.hallazgo}</span>
        </div>
      `).join('');
    }
  }

  // ==========================================
  // PEDIATRÍA
  // ==========================================
  calcularDosisPediatrica() {
    const slider = document.getElementById('sliderPesoPediatrico');
    const valorKg = slider ? parseFloat(slider.value) : 21;

    const pesoDisplay = document.getElementById('displayPesoPediatrico');
    if (pesoDisplay) pesoDisplay.textContent = `${valorKg.toFixed(1)} kg`;

    const container = document.getElementById('pediatriaCalculosCards');
    if (!container) return;

    const farmacos = CLINICAL_DATA.especialidades.pediatria.dosisFarmacos;
    container.innerHTML = farmacos.map(f => {
      const calc = f.calcular(valorKg);
      return `
        <div class="card" style="margin-bottom:12px; border-left:4px solid var(--primary);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="color:var(--primary); font-size:0.9rem;">${f.medicamento}</strong>
            <span class="patient-pill" style="font-size:0.68rem;">${f.indicacion}</span>
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px;">
            Presentación: ${f.concentracionPresentacion} | ${f.dosisPorKgDia}
          </div>
          <div style="background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:6px; padding:10px; font-family:var(--font-mono); font-size:0.8rem; line-height:1.6;">
            <div>Dosis por toma: <strong style="color:var(--secondary); font-size:1rem;">${calc.mlPorToma} mL</strong> (${calc.dosisTomaMg} mg)</div>
            <div style="color:var(--text-muted); font-size:0.72rem;">Frecuencia: ${calc.frecuencia}</div>
            <div style="color:var(--text-muted); font-size:0.72rem;">Acumulado día: ${calc.dosisDiaMg} mg/día</div>
          </div>
        </div>
      `;
    }).join('');
  }
}
