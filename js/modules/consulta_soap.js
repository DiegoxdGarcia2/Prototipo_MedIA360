/**
 * MedIA 360 - Módulo de Consulta con IA Ambiental y Generador SOAP
 * Simulación de transcripción speech-to-text en tiempo real + extracción de entidades + borrador clínico
 */

import { CLINICAL_DATA } from '../data.js';

export class ConsultaSOAPModule {
  constructor(app) {
    this.app = app;
    this.isRecording = false;
    this.audioTimer = null;
    this.dialogueIndex = 0;
    this.entidadesExtraidas = [];
  }

  init() {
    this.attachEventListeners();
    this.cargarPacienteEnConsulta();
  }

  cargarPacienteEnConsulta() {
    const paciente = this.app.getPacienteActivo();
    if (!paciente) return;

    const nombreElem = document.getElementById('soapPacienteNombre');
    const edadElem = document.getElementById('soapPacienteEdad');
    const alergiasElem = document.getElementById('soapPacienteAlergias');
    const motivoElem = document.getElementById('soapPacienteMotivo');

    if (nombreElem) nombreElem.textContent = paciente.nombre;
    if (edadElem) edadElem.textContent = `${paciente.edad} años | ${paciente.genero} | CI: ${paciente.ci}`;
    if (alergiasElem) {
      if (paciente.alergias.length > 0) {
        alergiasElem.innerHTML = paciente.alergias.map(a => `
          <span class="allergy-alert-pill"><span class="status-indicator alert" style="margin-right:4px;"></span>Alergia: ${a}</span>
        `).join(' ');
      } else {
        alergiasElem.innerHTML = `<span style="color:var(--text-muted); font-size:0.8rem;">Sin alergias registradas</span>`;
      }
    }
    if (motivoElem) motivoElem.textContent = paciente.triaje.motivo;
  }

  attachEventListeners() {
    const btnRecord = document.getElementById('btnIniciarGrabacionIA');
    if (btnRecord) {
      btnRecord.addEventListener('click', () => this.toggleGrabacion());
    }

    const btnGenerarSOAP = document.getElementById('btnGenerarSOAPManual');
    if (btnGenerarSOAP) {
      btnGenerarSOAP.addEventListener('click', () => this.generarNotaSOAP());
    }

    const btnAprobarSOAP = document.getElementById('btnAprobarSOAP');
    if (btnAprobarSOAP) {
      btnAprobarSOAP.addEventListener('click', () => this.aprobarSOAP());
    }

    const btnEditarSOAP = document.getElementById('btnEditarSOAP');
    if (btnEditarSOAP) {
      btnEditarSOAP.addEventListener('click', () => this.editarSOAP());
    }

    const btnRechazarSOAP = document.getElementById('btnRechazarSOAP');
    if (btnRechazarSOAP) {
      btnRechazarSOAP.addEventListener('click', () => this.rechazarSOAP());
    }
  }

  toggleGrabacion() {
    const btn = document.getElementById('btnIniciarGrabacionIA');
    const statusText = document.getElementById('recordingStatusText');
    const waveBox = document.getElementById('audioWaveContainer');
    const timerElem = document.getElementById('audioTimerClock');

    if (!this.isRecording) {
      this.isRecording = true;
      btn.innerHTML = `<span>Finalizar y Procesar</span>`;
      btn.classList.replace('btn-primary', 'btn-danger');
      if (statusText) statusText.textContent = "Escucha activa: Transcribiendo diálogo clínico en tiempo real...";
      if (waveBox) waveBox.classList.add('recording');

      this.dialogueIndex = 0;
      let seconds = 0;
      const feed = document.getElementById('transcriptFeedBox');
      if (feed) feed.innerHTML = '';

      // Ticker de simulación de diálogo
      this.audioTimer = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        if (timerElem) timerElem.textContent = `${mins}:${secs}`;

        // Desplegar diálogo progresivamente
        if (this.dialogueIndex < CLINICAL_DATA.conversacionAmbientalDemo.length) {
          const linea = CLINICAL_DATA.conversacionAmbientalDemo[this.dialogueIndex];
          this.agregarLineaTranscripcion(linea);
          this.dialogueIndex++;
        }
      }, 1500);

    } else {
      // Detener
      this.isRecording = false;
      clearInterval(this.audioTimer);
      btn.innerHTML = `<span>Iniciar Escucha Ambiental</span>`;
      btn.classList.replace('btn-danger', 'btn-primary');
      if (statusText) statusText.textContent = "Transcripción completada. Generando nota SOAP estructurada...";
      if (waveBox) waveBox.classList.remove('recording');

      // Generar automáticamente el SOAP
      this.generarNotaSOAP();
    }
  }

  agregarLineaTranscripcion(linea) {
    const feed = document.getElementById('transcriptFeedBox');
    if (!feed) return;

    const esDoc = linea.emisor === 'Médico';
    feed.innerHTML += `
      <div class="transcript-message ${esDoc ? 'doctor' : 'paciente'}">
        <div>
          <div class="speaker-tag">${linea.emisor} <span style="font-weight:400; color:var(--text-muted);">(${linea.tiempo})</span></div>
          <div>${linea.texto}</div>
        </div>
      </div>
    `;
    feed.scrollTop = feed.scrollHeight;

    // Detectar entidades en tiempo real
    this.analizarEntidadesEnTexto(linea.texto);
  }

  analizarEntidadesEnTexto(texto) {
    const entidadesBox = document.getElementById('entidadesClinicasTags');
    if (!entidadesBox) return;

    const lower = texto.toLowerCase();
    const patrones = [
      { key: "Dolor precordial opresivo", match: ["dolor", "pecho", "apretado"], tipo: "Síntoma Cardinal", color: "var(--accent-rose)" },
      { key: "Irradiación a mandíbula / brazo", match: ["cuello", "mandíbula", "brazo"], tipo: "Irradiación SCACEST", color: "var(--accent-amber)" },
      { key: "Diaforesis profusa", match: ["sudar", "frío"], tipo: "Signo Neurovegetativo", color: "var(--accent-amber)" },
      { key: "Alergia Grave a PENICILINA", match: ["alérgico", "penicilina"], tipo: "ALERTA SEGURIDAD", color: "var(--accent-rose)" },
      { key: "Hipertensión Arterial / Omisión Losartán", match: ["hipertenso", "losartán"], tipo: "Antecedente Crítico", color: "var(--primary)" }
    ];

    patrones.forEach(p => {
      const cumple = p.match.some(m => lower.includes(m));
      if (cumple && !this.entidadesExtraidas.includes(p.key)) {
        this.entidadesExtraidas.push(p.key);
        entidadesBox.innerHTML += `
          <span style="background:${p.color}; color:#ffffff; padding:3px 8px; border-radius:4px; font-family:var(--font-mono); font-size:0.7rem; font-weight:700;">
            ${p.key}
          </span>
        `;
      }
    });
  }

  generarNotaSOAP() {
    const demo = CLINICAL_DATA.borradorSOAPDemo;

    const s = document.getElementById('soapSubjetivo');
    const o = document.getElementById('soapObjetivo');
    const a = document.getElementById('soapAnalisis');
    const p = document.getElementById('soapPlan');
    const badge = document.getElementById('soapEstadoBadge');

    if (s) s.innerHTML = demo.subjetivo;
    if (o) o.innerHTML = demo.objetivo;
    if (a) a.innerHTML = demo.analisis.replace(/\n/g, '<br>');
    if (p) p.innerHTML = demo.plan.replace(/\n/g, '<br>');

    if (badge) {
      badge.className = "triage-badge t2";
      badge.textContent = "Borrador de IA (Pendiente de Firma)";
    }

    this.app.mostrarNotificacion("Borrador SOAP generado por LLM Clínico. Requiere validación médica obligatoria (RF05).", "info");
  }

  aprobarSOAP() {
    const badge = document.getElementById('soapEstadoBadge');
    if (badge) {
      badge.className = "triage-badge t4";
      badge.textContent = "Aprobado y Firmado Digitalmente";
    }

    // Registrar en auditoría
    CLINICAL_DATA.auditoriaIA.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      modulo: "Consulta IA Ambiental - Nota SOAP",
      usuario: "Dr. Médico Activo (Sesión Actual)",
      paciente: this.app.getPacienteActivo().nombre,
      sugerenciaIA: "Borrador estructurado SOAP (SCACEST + Alergia a Penicilina)",
      accionUsuario: "APROBADO Y FIRMADO SIN OBJECIONES",
      estado: "Válido Legalmente"
    });

    this.app.mostrarNotificacion("Nota clínica validada, firmada y guardada en la Historia Clínica Electrónica.", "success");
    
    // Sugerir derivación a Cardiología
    setTimeout(() => {
      this.app.navegarA('especialidades');
      this.app.mostrarNotificacion("Derivación asistida por IA: Se ha abierto el módulo de Cardiología.", "info");
    }, 1200);
  }

  editarSOAP() {
    const secciones = ['soapSubjetivo', 'soapObjetivo', 'soapAnalisis', 'soapPlan'];
    secciones.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.contentEditable = "true";
        el.style.outline = "2px dashed var(--primary)";
        el.style.padding = "6px";
        el.style.borderRadius = "4px";
      }
    });

    const badge = document.getElementById('soapEstadoBadge');
    if (badge) {
      badge.className = "triage-badge t3";
      badge.textContent = "Modo Edición Manual Activo";
    }

    this.app.mostrarNotificacion("Campos habilitados para edición médica. Puede modificar el texto directamente.", "info");
  }

  rechazarSOAP() {
    const motivo = prompt("Ingrese el motivo clínico del rechazo del borrador de IA:");
    if (!motivo) return;

    const badge = document.getElementById('soapEstadoBadge');
    if (badge) {
      badge.className = "triage-badge t1";
      badge.textContent = "Borrador Rechazado";
    }

    // Registrar rechazo en auditoría
    CLINICAL_DATA.auditoriaIA.unshift({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      modulo: "Consulta IA Ambiental - Nota SOAP",
      usuario: "Dr. Médico Activo",
      paciente: this.app.getPacienteActivo().nombre,
      sugerenciaIA: "Borrador SOAP generado",
      accionUsuario: `RECHAZADO: ${motivo}`,
      estado: "Descartado por Profesional"
    });

    this.app.mostrarNotificacion("Borrador rechazado y registrado en la bitácora de auditoría.", "warn");
  }
}
