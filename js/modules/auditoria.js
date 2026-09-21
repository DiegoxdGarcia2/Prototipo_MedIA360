/**
 * MedIA 360 - Módulo de Reportes, Auditoría de IA y Gestión Hospitalaria
 * Trazabilidad de decisiones médicas vs recomendaciones algorítmicas (RF11 y RF12)
 */

import { CLINICAL_DATA } from '../data.js';

export class AuditoriaModule {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.renderAuditoria();
    this.renderKpisHospitalarios();
  }

  renderAuditoria() {
    const tableBody = document.getElementById('auditoriaTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = CLINICAL_DATA.auditoriaIA.map(log => {
      let badgeClass = "t4";
      if (log.accionUsuario.includes("BLOQUEO") || log.accionUsuario.includes("RECHAZADO") || log.accionUsuario.includes("DESESTIMACIÓN")) {
        badgeClass = "t1";
      } else if (log.accionUsuario.includes("MODIFICAD")) {
        badgeClass = "t3";
      }

      return `
        <tr>
          <td><span style="font-family:var(--font-mono); font-size:0.75rem;">${log.timestamp}</span></td>
          <td><strong>${log.modulo}</strong></td>
          <td><span style="font-size:0.8rem; color:var(--primary); font-weight:600;">${log.usuario}</span></td>
          <td>${log.paciente}</td>
          <td>
            <div style="font-size:0.8rem; max-width:280px; color:var(--text-muted);">
              ${log.sugerenciaIA}
            </div>
          </td>
          <td>
            <span class="triage-badge ${badgeClass}" style="font-size:0.7rem;">
              ${log.accionUsuario}
            </span>
          </td>
          <td>
            <span style="font-size:0.75rem; font-weight:600; color:var(--text-main);">${log.estado}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderKpisHospitalarios() {
    const kpiBox = document.getElementById('hospitalKpisBox');
    if (!kpiBox) return;

    kpiBox.innerHTML = `
      <div class="grid-4">
        <div class="card" style="margin-bottom:0; border-top:3px solid var(--primary);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Pacientes Atendidos Hoy</div>
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:700; color:var(--text-main); margin-top:4px;">42</div>
          <div style="font-size:0.75rem; color:var(--health-green); font-weight:600;">↑ 12% vs promedio semanal</div>
        </div>
        
        <div class="card" style="margin-bottom:0; border-top:3px solid var(--warn-amber);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Tiempo Medio de Triaje</div>
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:700; color:var(--text-main); margin-top:4px;">4.2 min</div>
          <div style="font-size:0.75rem; color:var(--health-green); font-weight:600;">↓ Reducción de 65% con IA</div>
        </div>

        <div class="card" style="margin-bottom:0; border-top:3px solid var(--secondary);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Concordancia Médica / IA</div>
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:700; color:var(--text-main); margin-top:4px;">94.8%</div>
          <div style="font-size:0.75rem; color:var(--primary); font-weight:600;">Validación humana estricta</div>
        </div>

        <div class="card" style="margin-bottom:0; border-top:3px solid var(--danger-red);">
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Alertas Críticas Evitadas</div>
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:700; color:var(--danger-red); margin-top:4px;">7</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Alergias y dosis corregidas</div>
        </div>
      </div>
    `;
  }
}
