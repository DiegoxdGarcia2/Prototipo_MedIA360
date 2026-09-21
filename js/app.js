/**
 * MedIA 360 - Aplicación Principal y Enrutador Clínico
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

import { CLINICAL_DATA } from './data.js';
import { TriajeModule } from './modules/triaje.js';
import { ConsultaSOAPModule } from './modules/consulta_soap.js';
import { EspecialidadesModule } from './modules/especialidades.js';
import { HistoriaClinicaModule } from './modules/historia_clinica.js';
import { FarmaciaLaboratorioModule } from './modules/farmacia_laboratorio.js';
import { AuditoriaModule } from './modules/auditoria.js';

class MedIAApp {
  constructor() {
    this.pacienteActivoId = 'PAC-1001'; // Carlos Mendoza por defecto
    this.currentRole = 'medico';
    this.currentView = 'triaje';

    // Instanciar módulos
    this.triajeMod = new TriajeModule(this);
    this.soapMod = new ConsultaSOAPModule(this);
    this.especialidadesMod = new EspecialidadesModule(this);
    this.hceMod = new HistoriaClinicaModule(this);
    this.farmaciaLabMod = new FarmaciaLaboratorioModule(this);
    this.auditoriaMod = new AuditoriaModule(this);
  }

  init() {
    this.setupTheme();
    this.setupRoleSwitcher();
    this.setupNavigation();
    this.setupPatientContextBar();

    // Inicializar submódulos
    this.triajeMod.init();
    this.soapMod.init();
    this.especialidadesMod.init();
    this.hceMod.init();
    this.farmaciaLabMod.init();
    this.auditoriaMod.init();

    // Iniciar en la vista por defecto
    this.navegarA('triaje');

    // Asignar objeto global para callbacks de UI
    window.medApp = this;
  }

  getPacienteActivo() {
    return CLINICAL_DATA.pacientes.find(p => p.id === this.pacienteActivoId) || CLINICAL_DATA.pacientes[0];
  }

  seleccionarPaciente(id) {
    this.pacienteActivoId = id;
    this.setupPatientContextBar();
    this.soapMod.cargarPacienteEnConsulta();
    this.hceMod.renderHistoriaClinica();
    this.farmaciaLabMod.renderLaboratorios();

    const p = this.getPacienteActivo();
    this.mostrarNotificacion(`Contexto clínico cambiado a: ${p.nombre} (${p.id})`, "info");
  }

  setupPatientContextBar() {
    const p = this.getPacienteActivo();
    const nameEl = document.getElementById('contextPatientName');
    const badgeEl = document.getElementById('contextPatientBadge');
    const allergyEl = document.getElementById('contextPatientAllergies');

    if (nameEl) nameEl.textContent = `${p.nombre} (${p.edad}a - ${p.id})`;
    if (badgeEl) {
      badgeEl.className = `triage-badge t${p.triaje.nivel}`;
      badgeEl.textContent = p.triaje.etiqueta;
    }
    if (allergyEl) {
      if (p.alergias.length > 0) {
        allergyEl.innerHTML = p.alergias.map(a => `<span class="allergy-alert-pill"><span class="status-indicator alert" style="margin-right:4px;"></span>Alergia: ${a}</span>`).join(' ');
        allergyEl.style.display = 'inline-flex';
      } else {
        allergyEl.style.display = 'none';
      }
    }
  }

  setupRoleSwitcher() {
    const selector = document.getElementById('roleSelector');
    if (!selector) return;

    selector.addEventListener('change', (e) => {
      this.currentRole = e.target.value;
      this.adaptarInterfazPorRol();
    });
  }

  adaptarInterfazPorRol() {
    const role = this.currentRole;
    const title = document.getElementById('currentRoleLabel');
    if (title) title.textContent = role.toUpperCase();

    // Filtros de vistas recomendadas por rol
    if (role === 'enfermeria') {
      this.navegarA('triaje');
      this.mostrarNotificacion("Modo Enfermería: Prioridad en Triaje Manchester y Signos Vitales.", "info");
    } else if (role === 'medico') {
      this.navegarA('consulta');
      this.mostrarNotificacion("Modo Médico General: Acceso completo a Consulta con IA Ambiental y SOAP.", "info");
    } else if (role === 'especialista') {
      this.navegarA('especialidades');
      this.mostrarNotificacion("Modo Especialista: Asistentes de Cardiología, Dermatología y Radiología activados.", "info");
    } else if (role === 'farmacia') {
      this.navegarA('farmacia_lab');
      this.mostrarNotificacion("Modo Farmacia: Validación de recetas y alertas de seguridad cruzada.", "info");
    } else if (role === 'admin') {
      this.navegarA('auditoria');
      this.mostrarNotificacion("Modo Auditoría / Administración: Explicabilidad y registro de actividad.", "info");
    }
  }

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) this.navegarA(view);
      });
    });

    // Botón Tour Demostrativo Rápido
    const tourBtn = document.getElementById('btnIniciarDemoTour');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => this.ejecutarDemoTour());
    }
  }

  navegarA(viewId) {
    this.currentView = viewId;

    // Actualizar nav lateral
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Cambiar panel visible
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const target = document.getElementById(`view_${viewId}`);
    if (target) target.classList.add('active');

    // Refrescar vistas específicas
    if (viewId === 'especialidades') {
      this.especialidadesMod.cargarEspecialidad(this.especialidadesMod.currentSpecialty);
    } else if (viewId === 'auditoria') {
      this.auditoriaMod.renderAuditoria();
    } else if (viewId === 'hce') {
      this.hceMod.renderHistoriaClinica();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  setupTheme() {
    const btn = document.getElementById('btnToggleTheme');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      btn.innerHTML = isDark ? '<i data-lucide="moon" style="width:18px;height:18px;"></i>' : '<i data-lucide="sun" style="width:18px;height:18px;"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  mostrarNotificacion(mensaje, tipo = "info") {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '12px';
      toast.style.color = 'white';
      toast.style.fontSize = '0.85rem';
      toast.style.fontWeight = '600';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }

    if (tipo === "success") toast.style.backgroundColor = '#10b981';
    else if (tipo === "warn") toast.style.backgroundColor = '#f59e0b';
    else if (tipo === "danger") toast.style.backgroundColor = '#ef4444';
    else toast.style.backgroundColor = '#0284c7';

    toast.innerHTML = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3500);
  }

  ejecutarDemoTour() {
    this.mostrarNotificacion("Iniciando Recorrido Demostrativo MedIA 360...", "info");
    
    // Paso 1: Triaje
    this.seleccionarPaciente('PAC-1001');
    this.navegarA('triaje');

    setTimeout(() => {
      // Paso 2: Consulta y Audio
      this.navegarA('consulta');
      this.soapMod.toggleGrabacion();

      setTimeout(() => {
        // Detener y generar SOAP
        this.soapMod.toggleGrabacion();
        
        setTimeout(() => {
          // Paso 3: Especialidades
          this.navegarA('especialidades');
          this.especialidadesMod.cargarEspecialidad('cardiologia');

          setTimeout(() => {
            // Paso 4: Farmacia y Alergia
            this.navegarA('farmacia_lab');
            this.mostrarNotificacion("Recorrido completado: Pruebe prescribir Amoxicilina para verificar el bloqueo por alergia.", "success");
          }, 3000);
        }, 2000);
      }, 4000);
    }, 1500);
  }

  eliminarItemReceta(index) {
    this.farmaciaLabMod.eliminarItem(index);
  }
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new MedIAApp();
  app.init();
});
