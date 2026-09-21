/**
 * MedIA 360 - Módulo de Farmacia, Prescripción Asistida y Laboratorio
 * Motor de Detección de Interacciones, Alergias Cruzadas y Valores Críticos
 */

import { CLINICAL_DATA } from '../data.js';

export class FarmaciaLaboratorioModule {
  constructor(app) {
    this.app = app;
    this.recetaActual = [];
  }

  init() {
    this.renderCatalogoFarmacia();
    this.renderLaboratorios();
    this.attachEventListeners();
  }

  renderCatalogoFarmacia() {
    const list = document.getElementById('farmaciaCatalogoSelect');
    if (!list) return;

    list.innerHTML = `
      <option value="">-- Seleccionar fármaco para prescribir --</option>
      ${CLINICAL_DATA.catalogoFarmacia.map(m => `
        <option value="${m.id}">${m.nombre} (${m.dosis}) - Stock: ${m.stock} uds.</option>
      `).join('')}
    `;
  }

  renderLaboratorios() {
    const p = this.app.getPacienteActivo();
    const container = document.getElementById('laboratorioResultadosContainer');
    if (!container) return;

    if (!p.laboratorios || p.laboratorios.length === 0) {
      container.innerHTML = `
        <div style="padding:24px; text-align:center; color:var(--text-muted);">
          No se registran estudios de laboratorio recientes para el paciente seleccionado.
        </div>
      `;
      return;
    }

    container.innerHTML = p.laboratorios.map(lab => `
      <div class="card" style="margin-bottom:16px;">
        <div class="card-header">
          <div>
            <strong style="color:var(--primary); font-size:1rem;">${lab.estudio}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:10px;">Fecha: ${lab.fecha}</span>
          </div>
          <span class="patient-pill" style="background:var(--accent-emerald-bg); color:var(--accent-emerald);">Validado por Bioquímica</span>
        </div>
        
        <table class="clinical-table" style="margin-bottom:12px;">
          <thead>
            <tr>
              <th>Parámetro Bioquímico</th>
              <th>Resultado</th>
              <th>Valor Referencia</th>
              <th>Estado IA</th>
            </tr>
          </thead>
          <tbody>
            ${lab.parametros.map(param => `
              <tr style="${param.critico ? 'background:var(--accent-rose-bg);' : ''}">
                <td><strong>${param.nombre}</strong></td>
                <td>
                  <span style="font-family:var(--font-mono); font-size:1rem; font-weight:700; ${param.critico ? 'color:var(--accent-rose);' : ''}">
                    ${param.valor} ${param.unidad}
                  </span>
                </td>
                <td style="color:var(--text-muted); font-size:0.8rem;">${param.ref}</td>
                <td>
                  ${param.critico ? `
                    <span class="allergy-alert-pill" style="font-size:0.68rem;">VALOR CRÍTICO</span>
                  ` : `
                    <span style="color:var(--accent-emerald); font-size:0.8rem; font-weight:600;">Normal</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${lab.resumenIA ? `
          <div style="background:var(--primary-subtle); color:var(--primary); padding:10px 14px; border-radius:8px; font-size:0.825rem; border-left:3px solid var(--primary);">
            <strong>Interpretación Algorítmica MedIA:</strong> ${lab.resumenIA}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  attachEventListeners() {
    const btnPrescribir = document.getElementById('btnAgregarPrescripcion');
    if (btnPrescribir) {
      btnPrescribir.addEventListener('click', () => this.validarYPrescribir());
    }

    const btnEmitirReceta = document.getElementById('btnEmitirRecetaFinal');
    if (btnEmitirReceta) {
      btnEmitirReceta.addEventListener('click', () => this.emitirRecetaFinal());
    }
  }

  validarYPrescribir() {
    const select = document.getElementById('farmaciaCatalogoSelect');
    const dosisInput = document.getElementById('inputDosisPrescripcion');
    const viaSelect = document.getElementById('selectViaPrescripcion');
    const pac = this.app.getPacienteActivo();

    if (!select || !select.value) {
      alert("Por favor seleccione un medicamento de la lista.");
      return;
    }

    const med = CLINICAL_DATA.catalogoFarmacia.find(m => m.id === select.value);
    const dosis = dosisInput ? dosisInput.value : "Dosis estándar";
    const via = viaSelect ? viaSelect.value : "Oral";

    // MOTOR DE REGLAS DE SEGURIDAD (RF08)
    const tieneAlergiaBetalactamica = pac.alergias.some(a => a.toLowerCase().includes('penicilina'));
    const esFarmacoRiesgoso = med.alertaAlergia === 'Penicilina';

    if (tieneAlergiaBetalactamica && esFarmacoRiesgoso) {
      this.mostrarModalBloqueoAlergia(med, pac);
      return;
    }

    this.recetaActual.push({
      medicamento: med.nombre,
      dosis: dosis,
      via: via,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.renderListaReceta();
    this.app.mostrarNotificacion(`Prescripción de ${med.nombre} añadida a la orden médica.`, "success");
  }

  mostrarModalBloqueoAlergia(med, pac) {
    const modal = document.getElementById('modalAlertaFarmacologica');
    if (!modal) return;

    document.getElementById('modalFarmacoNombre').textContent = med.nombre;
    document.getElementById('modalPacienteAlergia').textContent = pac.alergias.join(', ');
    document.getElementById('modalDetalleRiesgo').innerHTML = `
      El fármaco seleccionado pertenece a la familia de los <strong>${med.familia}</strong>.<br>
      El paciente <strong>${pac.nombre}</strong> tiene antecedente registrado de shock / alergia grave a Penicilina.<br>
      <br>
      <strong>Sugerencia Terapéutica Asistida por IA:</strong><br>
      • Sustituir por Macrólido: <strong>Azitromicina 500 mg cada 24h</strong> o Claritromicina.<br>
      • En caso de dolor / antiinflamación: <strong>Paracetamol 1 g</strong>.
    `;

    modal.classList.add('active');

    document.getElementById('btnCancelarPrescripcionRiesgosa').onclick = () => {
      modal.classList.remove('active');
      this.app.mostrarNotificacion("Prescripción cancelada por seguridad médica.", "warn");
    };

    document.getElementById('btnForzarPrescripcionRiesgosa').onclick = () => {
      modal.classList.remove('active');
      this.recetaActual.push({
        medicamento: `${med.nombre} [AUTORIZADO CON ADVERTENCIA]`,
        dosis: "Dosis bajo criterio estricto",
        via: "Intravenosa vigilada",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.renderListaReceta();

      CLINICAL_DATA.auditoriaIA.unshift({
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        modulo: "Seguridad Farmacológica",
        usuario: "Dr. Médico Activo",
        paciente: pac.nombre,
        sugerenciaIA: `ALERTA BLOQUEADA: Prescripción forzada de ${med.nombre} sobre alergia a Penicilina`,
        accionUsuario: "DESESTIMACIÓN DE ALERTA BAJO FIRMA RESPONSABLE",
        estado: "Riesgo Asumido"
      });

      this.app.mostrarNotificacion("Advertencia: Prescripción forzada registrada en auditoría.", "warn");
    };
  }

  renderListaReceta() {
    const container = document.getElementById('recetaActivaItems');
    if (!container) return;

    if (this.recetaActual.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted); font-size:0.825rem; padding:12px 0;">No hay medicamentos en la orden médica actual.</div>`;
      return;
    }

    container.innerHTML = this.recetaActual.map((item, index) => `
      <div style="padding:10px 14px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:6px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--text-main); font-size:0.875rem;">${item.medicamento}</strong>
          <div style="font-size:0.72rem; color:var(--text-muted);">${item.dosis} (${item.via}) - ${item.timestamp}</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="window.medApp.eliminarItemReceta(${index})">Quitar</button>
      </div>
    `).join('');
  }

  eliminarItem(index) {
    this.recetaActual.splice(index, 1);
    this.renderListaReceta();
  }

  emitirRecetaFinal() {
    if (this.recetaActual.length === 0) {
      alert("No hay fármacos para emitir en la receta.");
      return;
    }
    const pac = this.app.getPacienteActivo();
    this.app.mostrarNotificacion(`Receta electrónica de ${this.recetaActual.length} fármacos firmada digitalmente y enviada a Farmacia para despacho.`, "success");
    this.recetaActual = [];
    this.renderListaReceta();
  }
}
