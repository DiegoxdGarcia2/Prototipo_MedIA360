/**
 * MedIA 360 - Módulo de Historia Clínica Electrónica Unificada (HCE)
 * Control de versiones, antecedentes, diagnósticos y trazabilidad clínica del paciente
 */

import { CLINICAL_DATA } from '../data.js';

export class HistoriaClinicaModule {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.renderHistoriaClinica();
  }

  renderHistoriaClinica() {
    const p = this.app.getPacienteActivo();
    if (!p) return;

    // Encabezado del paciente
    const headerElem = document.getElementById('hcePacienteHeader');
    if (headerElem) {
      headerElem.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--text-main); margin-bottom:4px;">
              ${p.nombre}
            </h2>
            <div style="font-size:0.85rem; color:var(--text-muted); display:flex; gap:16px; flex-wrap:wrap;">
              <span><strong>ID:</strong> ${p.id}</span>
              <span><strong>Edad:</strong> ${p.edad} años</span>
              <span><strong>Sexo:</strong> ${p.genero}</span>
              <span><strong>CI:</strong> ${p.ci}</span>
              <span><strong>Grupo Sanguíneo:</strong> <strong style="color:var(--danger-red);">${p.grupoSanguineo}</strong></span>
              <span><strong>Seguro:</strong> ${p.seguro}</span>
            </div>
          </div>
          <div>
            <span class="patient-pill" style="background:var(--primary-subtle); color:var(--primary); font-size:0.8rem; font-weight:700;">
              Servicio Activo: ${p.especialidadAsignada}
            </span>
          </div>
        </div>
      `;
    }

    // Banner de Alergias
    const alergiasElem = document.getElementById('hceAlergiasBox');
    if (alergiasElem) {
      if (p.alergias.length > 0) {
        alergiasElem.innerHTML = `
          <div style="background:var(--accent-rose-bg); border:1px solid var(--accent-rose); border-radius:8px; padding:12px 16px; display:flex; align-items:center; gap:12px;">
            <div>
              <strong style="color:var(--accent-rose); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.05em;">Alertas de Seguridad del Paciente (Alergias Activas)</strong>
              <div style="display:flex; gap:8px; margin-top:4px;">
                ${p.alergias.map(a => `<span class="allergy-alert-pill">${a}</span>`).join('')}
              </div>
            </div>
          </div>
        `;
      } else {
        alergiasElem.innerHTML = `
          <div style="background:var(--accent-emerald-bg); border:1px solid var(--accent-emerald); border-radius:8px; padding:10px 16px; color:var(--accent-emerald); font-size:0.825rem;">
            No se registran antecedentes de alergias farmacológicas hasta la fecha.
          </div>
        `;
      }
    }

    // Antecedentes Patológicos
    const antElem = document.getElementById('hceAntecedentesLista');
    if (antElem) {
      antElem.innerHTML = p.antecedentes.map(a => `
        <li style="margin-bottom:6px; font-size:0.85rem; color:var(--text-main);">
          • ${a}
        </li>
      `).join('');
    }

    // Medicación Habitual
    const medElem = document.getElementById('hceMedicacionLista');
    if (medElem) {
      if (p.medicacionHabitual && p.medicacionHabitual.length > 0) {
        medElem.innerHTML = p.medicacionHabitual.map(m => `
          <div style="padding:8px 12px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:6px; margin-bottom:6px; font-size:0.825rem; display:flex; justify-content:space-between;">
            <strong>${m.nombre}</strong>
            <span style="color:var(--text-muted);">${m.dosis} (${m.via})</span>
          </div>
        `).join('');
      } else {
        medElem.innerHTML = `<div style="font-size:0.825rem; color:var(--text-muted);">Sin fármacos de consumo habitual.</div>`;
      }
    }

    // Timeline de Atenciones y Consultas
    const timelineElem = document.getElementById('hceTimelineAtenciones');
    if (timelineElem) {
      const atenciones = [
        {
          fecha: p.triaje.fechaHora || "2026-09-21 14:15",
          tipo: "Triaje y Admisión de Urgencia",
          profesional: "Lic. Carmen Ortiz (Enfermería)",
          resumen: `${p.triaje.etiqueta} - Motivo: ${p.triaje.motivo}`,
          badge: `t${p.triaje.nivel}`
        },
        ...(p.consultasPrevias || []).map(c => ({
          fecha: c.fecha,
          tipo: "Consulta Externa Programada",
          profesional: c.medico,
          resumen: `${c.diagnostico} — ${c.plan}`,
          badge: "t4"
        }))
      ];

      timelineElem.innerHTML = atenciones.map(item => `
        <div style="position:relative; padding-left:24px; margin-bottom:20px; border-left:2px solid var(--border-color);">
          <div style="position:absolute; left:-7px; top:0; width:12px; height:12px; border-radius:50%; background:var(--primary);"></div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="font-size:0.875rem; color:var(--text-main);">${item.tipo}</strong>
            <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">${item.fecha}</span>
          </div>
          <div style="font-size:0.78rem; color:var(--primary); font-weight:600; margin-bottom:4px;">
            ${item.profesional}
          </div>
          <div style="font-size:0.825rem; color:var(--text-muted); line-height:1.4;">
            ${item.resumen}
          </div>
        </div>
      `).join('');
    }
  }
}
