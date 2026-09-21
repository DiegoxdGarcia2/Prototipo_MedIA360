/**
 * MedIA 360 - Módulo de Admisión y Triaje Inteligente
 * Clasificación de Urgencia según Algoritmo de Manchester + Detección de Banderas Rojas por IA
 */

import { CLINICAL_DATA } from '../data.js';

export class TriajeModule {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.renderTriajeQueue();
    this.attachEventListeners();
  }

  renderTriajeQueue() {
    const queueContainer = document.getElementById('triajeQueueBody');
    if (!queueContainer) return;

    queueContainer.innerHTML = CLINICAL_DATA.pacientes.map(paciente => {
      const t = paciente.triaje;
      let badgeClass = `t${t.nivel}`;
      return `
        <tr>
          <td>
            <strong>${paciente.nombre}</strong><br>
            <span style="font-size:0.75rem; color:var(--text-muted);">${paciente.id} | ${paciente.edad} años (${paciente.genero})</span>
          </td>
          <td>
            <span class="triage-badge ${badgeClass}">${t.etiqueta}</span><br>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">Máx: ${t.tiempoMaximo}</span>
          </td>
          <td>
            <div style="font-family:var(--font-mono); font-size:0.75rem; line-height:1.4;">
              <span>PA: <strong>${t.signosVitales.paSistolica}/${t.signosVitales.paDiastolica}</strong></span> |
              <span>FC: <strong>${t.signosVitales.fc}</strong> lpm</span><br>
              <span>SpO2: <strong style="${t.signosVitales.spo2 < 92 ? 'color:var(--danger-red);' : ''}">${t.signosVitales.spo2}%</strong></span> |
              <span>T°: <strong>${t.signosVitales.temperatura}°C</strong></span> |
              <span>Dolor: <strong>${t.signosVitales.evaDolor}/10</strong></span>
            </div>
          </td>
          <td>
            <div style="font-size:0.8rem; max-width:300px;">
              ${paciente.triaje.motivo}
              ${paciente.triaje.alertasIA.length ? `
                <div style="margin-top:4px; font-size:0.72rem; color:var(--danger-red); font-weight:600; display:flex; align-items:center; gap:4px;">
                  <span class="status-indicator alert"></span>
                  <span>${paciente.triaje.alertasIA[0]}</span>
                </div>
              ` : ''}
            </div>
          </td>
          <td>
            <span class="patient-pill" style="background:var(--primary-light); color:var(--primary);">
              ${paciente.especialidadAsignada}
            </span>
          </td>
          <td>
            <button class="btn btn-primary btn-sm btn-seleccionar-paciente" data-id="${paciente.id}">
              Atender
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  attachEventListeners() {
    // Calculadora dinámica de triaje
    const form = document.getElementById('formNuevoTriaje');
    if (form) {
      form.addEventListener('input', () => this.calcularTriajeEnTiempoReal());
      form.addEventListener('submit', (e) => this.guardarNuevoTriaje(e));
    }

    // Botones de atención rápida en la tabla
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-seleccionar-paciente');
      if (btn) {
        const pacId = btn.dataset.id;
        this.app.seleccionarPaciente(pacId);
        this.app.navegarA('consulta');
      }
    });

    // Chatbot de pre-admisión conversacional
    const sendBtn = document.getElementById('btnEnviarPreadmision');
    const inputChat = document.getElementById('inputChatPreadmision');
    if (sendBtn && inputChat) {
      sendBtn.addEventListener('click', () => this.procesarMensajePreadmision());
      inputChat.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.procesarMensajePreadmision();
      });
    }
  }

  calcularTriajeEnTiempoReal() {
    const fc = parseInt(document.getElementById('inputFC')?.value || 75);
    const pas = parseInt(document.getElementById('inputPAS')?.value || 120);
    const pad = parseInt(document.getElementById('inputPAD')?.value || 80);
    const fr = parseInt(document.getElementById('inputFR')?.value || 16);
    const spo2 = parseInt(document.getElementById('inputSpO2')?.value || 98);
    const temp = parseFloat(document.getElementById('inputTemp')?.value || 36.6);
    const dolor = parseInt(document.getElementById('inputDolor')?.value || 0);
    const dolorToracico = document.getElementById('chkDolorToracico')?.checked;
    const dificultadRespirar = document.getElementById('chkDificultadRespirar')?.checked;
    const sangrado = document.getElementById('chkSangrado')?.checked;

    let nivel = 5;
    let etiqueta = "Nivel 5: No Urgente";
    let color = "blue";
    let tiempo = "Hasta 120 min";
    let alertas = [];

    // Lógica Manchester
    if (spo2 < 88 || fc > 135 || fc < 40 || pas < 80) {
      nivel = 1;
      etiqueta = "Nivel 1: Reanimación (Inmediata)";
      color = "red";
      tiempo = "0 minutos (Atención Inmediata)";
      alertas.push("Compromiso hemodinámico o respiratorio severo.");
    } else if (dolorToracico && (dolor >= 7 || pas > 160 || fc > 100)) {
      nivel = 2;
      etiqueta = "Nivel 2: Muy Urgente";
      color = "orange";
      tiempo = "10 a 15 minutos";
      alertas.push("Síndrome coronario agudo / Riesgo cardiovascular crítico.");
    } else if (spo2 <= 92 || dificultadRespirar || sangrado) {
      nivel = 2;
      etiqueta = "Nivel 2: Muy Urgente";
      color = "orange";
      tiempo = "10 a 15 minutos";
      alertas.push("Insuficiencia respiratoria aguda o hemorragia activa.");
    } else if (temp >= 38.5 || dolor >= 6 || fr >= 24) {
      nivel = 3;
      etiqueta = "Nivel 3: Urgente";
      color = "yellow";
      tiempo = "30 a 45 minutos";
      alertas.push("Síndrome febril con taquipnea o dolor moderado-severo.");
    } else if (dolor >= 3) {
      nivel = 4;
      etiqueta = "Nivel 4: Menor Urgencia";
      color = "green";
      tiempo = "60 minutos";
      alertas.push("Condición estable sin compromiso vital.");
    }

    // Actualizar previsualización en el DOM
    const previewBadge = document.getElementById('triajeCalculadoBadge');
    const previewTexto = document.getElementById('triajeCalculadoTexto');
    const previewAlertas = document.getElementById('triajeCalculadoAlertas');

    if (previewBadge && previewTexto) {
      previewBadge.className = `triage-badge t${nivel}`;
      previewBadge.textContent = etiqueta;
      previewTexto.innerHTML = `<strong>Tiempo de espera recomendado:</strong> ${tiempo}`;
    }

    if (previewAlertas) {
      if (alertas.length > 0) {
        previewAlertas.innerHTML = alertas.map(a => `
          <div style="background:var(--accent-rose-bg); color:var(--accent-rose); padding:6px 10px; border-radius:6px; font-size:0.75rem; margin-top:6px; font-weight:600; border:1px solid var(--accent-rose);">
            <strong>Alerta IA:</strong> ${a}
          </div>
        `).join('');
      } else {
        previewAlertas.innerHTML = `
          <div style="background:var(--accent-emerald-bg); color:var(--accent-emerald); padding:6px 10px; border-radius:6px; font-size:0.75rem; margin-top:6px; border:1px solid var(--accent-emerald);">
            Signos vitales dentro de rangos normales de seguridad.
          </div>
        `;
      }
    }

    return { nivel, etiqueta, tiempo, alertas };
  }

  guardarNuevoTriaje(e) {
    e.preventDefault();
    const nombre = document.getElementById('inputNombrePaciente')?.value || "Paciente Nuevo";
    const edad = parseInt(document.getElementById('inputEdadPaciente')?.value || 30);
    const motivo = document.getElementById('inputMotivoTriaje')?.value || "Motivo general";
    const especialidad = document.getElementById('selectEspecialidadTriaje')?.value || "Medicina General";

    const calculo = this.calcularTriajeEnTiempoReal();

    const nuevoPaciente = {
      id: `PAC-${1000 + CLINICAL_DATA.pacientes.length + 1}`,
      nombre: nombre,
      edad: edad,
      genero: document.getElementById('selectGeneroPaciente')?.value || "Masculino",
      ci: "7729103 SC",
      telefono: "+591 700-11223",
      seguro: "Particular",
      grupoSanguineo: "O+",
      alergias: ["Ninguna registrada"],
      antecedentes: ["Sin comorbilidades previas registradas"],
      medicacionHabitual: [],
      estadoActual: "Esperando Atención",
      especialidadAsignada: especialidad,
      triaje: {
        nivel: calculo.nivel,
        color: calculo.nivel === 1 ? "red" : calculo.nivel === 2 ? "orange" : calculo.nivel === 3 ? "yellow" : "green",
        etiqueta: calculo.etiqueta,
        tiempoMaximo: calculo.tiempo,
        signosVitales: {
          fc: parseInt(document.getElementById('inputFC')?.value || 80),
          paSistolica: parseInt(document.getElementById('inputPAS')?.value || 120),
          paDiastolica: parseInt(document.getElementById('inputPAD')?.value || 80),
          fr: parseInt(document.getElementById('inputFR')?.value || 16),
          spo2: parseInt(document.getElementById('inputSpO2')?.value || 98),
          temperatura: parseFloat(document.getElementById('inputTemp')?.value || 36.6),
          evaDolor: parseInt(document.getElementById('inputDolor')?.value || 0)
        },
        motivo: motivo,
        alertasIA: calculo.alertas,
        fechaHora: new Date().toISOString().replace('T', ' ').substring(0, 16)
      },
      consultasPrevias: [],
      laboratorios: []
    };

    CLINICAL_DATA.pacientes.unshift(nuevoPaciente);
    this.renderTriajeQueue();
    this.app.seleccionarPaciente(nuevoPaciente.id);

    // Notificar al usuario
    this.app.mostrarNotificacion(`Paciente ${nombre} clasificado como ${calculo.etiqueta}. Asignado a ${especialidad}.`, "success");
    e.target.reset();
  }

  procesarMensajePreadmision() {
    const input = document.getElementById('inputChatPreadmision');
    const box = document.getElementById('chatPreadmisionFeed');
    if (!input || !box || !input.value.trim()) return;

    const textoUsuario = input.value.trim();
    input.value = '';

    // Añadir mensaje usuario
    box.innerHTML += `
      <div style="align-self:flex-end; background:var(--primary); color:#060911; font-weight:600; padding:8px 12px; border-radius:8px; font-size:0.825rem; max-width:80%;">
        ${textoUsuario}
      </div>
    `;
    box.scrollTop = box.scrollHeight;

    // Simular respuesta inteligente del asistente de pre-admisión
    setTimeout(() => {
      let respuestaIA = "Síntoma registrado para clasificación clínica.";
      let especialidadSugerida = "Medicina General";

      const lower = textoUsuario.toLowerCase();
      if (lower.includes("pecho") || lower.includes("corazon") || lower.includes("palpitac")) {
        respuestaIA = "Alerta Cardíaca: Síntoma precordial de alta prioridad. Se canaliza a Cardiología y se notifica al equipo de guardia.";
        especialidadSugerida = "Cardiología";
        const chk = document.getElementById('chkDolorToracico');
        if (chk) chk.checked = true;
      } else if (lower.includes("mancha") || lower.includes("lunar") || lower.includes("piel") || lower.includes("grano")) {
        respuestaIA = "Lesión cutánea reportada. Se canaliza al módulo de Dermatología para dermatoscopía digital.";
        especialidadSugerida = "Dermatología";
      } else if (lower.includes("tos") || lower.includes("pulmon") || lower.includes("respira") || lower.includes("fiebre")) {
        respuestaIA = "Síntomas respiratorios detectados. Se orienta a Radiología / Neumología.";
        especialidadSugerida = "Radiología";
      }

      box.innerHTML += `
        <div style="align-self:flex-start; background:var(--primary-subtle); color:var(--text-main); padding:8px 12px; border-radius:8px; font-size:0.825rem; max-width:85%; border-left:3px solid var(--primary);">
          <strong style="color:var(--primary);">MedIA NLP:</strong> ${respuestaIA}
          <div style="margin-top:6px; font-size:0.72rem; color:var(--text-muted);">
            Derivación sugerida: <strong>${especialidadSugerida}</strong>
          </div>
        </div>
      `;
      box.scrollTop = box.scrollHeight;

      // Autocompletar motivo de consulta en formulario
      const motivoInput = document.getElementById('inputMotivoTriaje');
      if (motivoInput && !motivoInput.value) {
        motivoInput.value = textoUsuario;
      }
    }, 600);
  }
}
