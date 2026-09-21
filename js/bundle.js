(function() {
"use strict";

// ==================== js/data.js ====================
/**
 * MedIA 360 - Mock Database & Clinical Knowledge Base
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

const CLINICAL_DATA = {
  // Lista de pacientes demostrativos con historias clínicas integradas
  pacientes: [
    {
      id: "PAC-1001",
      nombre: "Carlos Mendoza Vaca",
      edad: 54,
      genero: "Masculino",
      ci: "4892110 SC",
      telefono: "+591 773-89012",
      seguro: "Seguro Universitario / Particular",
      grupoSanguineo: "O+",
      alergias: ["Penicilina", "Sulfamidas"],
      antecedentes: [
        "Hipertensión arterial esencial (diagnóstico 2019)",
        "Dislipidemia mixta en tratamiento",
        "Tabaquismo suspendido hace 3 años"
      ],
      medicacionHabitual: [
        { nombre: "Losartán", dosis: "50 mg cada 12h", via: "Oral" },
        { nombre: "Atorvastatina", dosis: "20 mg noche", via: "Oral" }
      ],
      estadoActual: "En Consulta - Sala 3",
      especialidadAsignada: "Cardiología",
      triaje: {
        nivel: 2,
        color: "orange",
        etiqueta: "Nivel 2: Muy Urgente",
        tiempoMaximo: "10-15 minutos",
        signosVitales: {
          fc: 108, // lpm
          paSistolica: 165,
          paDiastolica: 98,
          fr: 22, // rpm
          spo2: 95, // %
          temperatura: 36.8, // °C
          evaDolor: 8 // 1-10
        },
        motivo: "Dolor torácico opresivo de 45 minutos de evolución con irradiación a mandíbula y diaforesis.",
        alertasIA: [
          "Alerta: Síndrome coronario agudo probable (EVA 8/10 + PA 165/98 + FC 108)",
          "Antecedente cardiovascular de alto riesgo (Hipertensión + Dislipidemia)",
          "Requiere ECG inmediato (<10 min) y troponinas de alta sensibilidad"
        ],
        fechaHora: "2026-09-21 14:15"
      },
      consultasPrevias: [
        {
          fecha: "2026-06-10",
          medico: "Dra. Sofía Morales (Medicina General)",
          motivo: "Control rutinario de hipertensión",
          diagnostico: "I10 - Hipertensión esencial controlada",
          plan: "Mantener Losartán 50mg, control lipídico en 3 meses."
        }
      ],
      laboratorios: [
        {
          fecha: "2026-09-21",
          estudio: "Marcadores Cardíacos y Bioquímica de Urgencia",
          parametros: [
            { nombre: "Troponina I de alta sensibilidad", valor: 0.18, unidad: "ng/mL", ref: "< 0.04", critico: true },
            { nombre: "CPK-MB", valor: 38, unidad: "U/L", ref: "< 25", critico: true },
            { nombre: "Glucosa", valor: 112, unidad: "mg/dL", ref: "70 - 100", critico: false },
            { nombre: "Creatinina", valor: 1.05, unidad: "mg/dL", ref: "0.7 - 1.2", critico: false }
          ],
          resumenIA: "Elevación significativa de Troponina I (>4x valor de corte) y CPK-MB. Sugiere necrosis miocárdica en curso."
        }
      ]
    },
    {
      id: "PAC-1002",
      nombre: "Elena Rojas Aguilera",
      edad: 29,
      genero: "Femenino",
      ci: "6783901 SC",
      telefono: "+591 710-44582",
      seguro: "Particular",
      grupoSanguineo: "A+",
      alergias: ["AINEs (Ibuprofeno)"],
      antecedentes: ["Sin antecedentes patológicos relevantes", "Fototipo II según Fitzpatrick"],
      medicacionHabitual: ["Anticonceptivos orales combinados"],
      estadoActual: "En Espera - Dermatología",
      especialidadAsignada: "Dermatología",
      triaje: {
        nivel: 4,
        color: "green",
        etiqueta: "Nivel 4: Menor Urgencia",
        tiempoMaximo: "60-120 minutos",
        signosVitales: {
          fc: 74,
          paSistolica: 115,
          paDiastolica: 75,
          fr: 16,
          spo2: 99,
          temperatura: 36.5,
          evaDolor: 1
        },
        motivo: "Lesión pigmentada en antebrazo derecho con crecimiento asimétrico y oscurecimiento en los últimos 2 meses.",
        alertasIA: [
          "Criterios clínicos ABCD alterados (Asimetría + Bordes irregulares)",
          "Fototipo cutáneo claro (Riesgo incrementado de lesión melanocítica)"
        ],
        fechaHora: "2026-09-21 14:40"
      },
      consultasPrevias: [],
      laboratorios: []
    },
    {
      id: "PAC-1003",
      nombre: "María Ugarte Suárez",
      edad: 67,
      genero: "Femenino",
      ci: "3491022 SC",
      telefono: "+591 760-99211",
      seguro: "Caja Nacional de Salud / Convenio",
      grupoSanguineo: "B+",
      alergias: ["Ninguna conocida"],
      antecedentes: ["EPOC estadio GOLD B", "Ex-fumadora 20 paquetes/año"],
      medicacionHabitual: ["Salmeterol/Fluticasona aerosol cada 12h"],
      estadoActual: "En Espera - Imagenología / Radiología",
      especialidadAsignada: "Radiología",
      triaje: {
        nivel: 3,
        color: "yellow",
        etiqueta: "Nivel 3: Urgencia",
        tiempoMaximo: "30-45 minutos",
        signosVitales: {
          fc: 92,
          paSistolica: 130,
          paDiastolica: 82,
          fr: 26,
          spo2: 91,
          temperatura: 38.6,
          evaDolor: 4
        },
        motivo: "Disnea progresiva, tos con expectoración mucopurulenta y fiebre de 3 días de evolución.",
        alertasIA: [
          "Saturación O2 comprometida en paciente EPOC (91% ambiente)",
          "Síndrome febril con taquipnea (FR 26) → Alerta neumonía adquirida en la comunidad",
          "Priorizar Rayos X de tórax PA y lateral"
        ],
        fechaHora: "2026-09-21 15:00"
      },
      consultasPrevias: [],
      laboratorios: [
        {
          fecha: "2026-09-21",
          estudio: "Hemograma y Reactantes de Fase Aguda",
          parametros: [
            { nombre: "Leucocitos totales", valor: 16800, unidad: "/mm3", ref: "4500 - 10000", critico: true },
            { nombre: "Neutrófilos %", valor: 84, unidad: "%", ref: "55 - 65", critico: true },
            { nombre: "Proteína C Reactiva (PCR)", valor: 88, unidad: "mg/L", ref: "< 5", critico: true },
            { nombre: "Procalcitonina", valor: 2.1, unidad: "ng/mL", ref: "< 0.5", critico: true }
          ],
          resumenIA: "Leucocitosis con neutrofilia marcada y PCR elevada. Fuerte correlato de infección bacteriana pulmonar activa."
        }
      ]
    },
    {
      id: "PAC-1004",
      nombre: "Lucas Silva Salvatierra",
      edad: 6,
      genero: "Masculino",
      ci: "Menor (Tutor: Ana Salvatierra)",
      telefono: "+591 755-12345",
      seguro: "Seguro Escolar",
      grupoSanguineo: "O+",
      alergias: ["Ninguna conocida"],
      antecedentes: ["Asma infantil leve intermitente", "Vacunación PAI completa"],
      medicacionHabitual: ["Salbutamol inhalador a demanda"],
      estadoActual: "En Espera - Pediatría",
      especialidadAsignada: "Pediatría",
      triaje: {
        nivel: 3,
        color: "yellow",
        etiqueta: "Nivel 3: Urgencia",
        tiempoMaximo: "30-45 minutos",
        signosVitales: {
          fc: 115,
          paSistolica: 98,
          paDiastolica: 62,
          fr: 28,
          spo2: 97,
          temperatura: 38.9,
          evaDolor: 5
        },
        motivo: "Fiebre persistente de 39°C, odinofagia intensa, rechazo parcial a la ingesta oral.",
        alertasIA: [
          "Fiebre pediátrica alta (>38.5°C) con taquicardia reactiva",
          "Ajustar cualquier dosis farmacológica por peso exacto (21 kg)"
        ],
        fechaHora: "2026-09-21 15:10"
      },
      consultasPrevias: [],
      laboratorios: []
    }
  ],

  // Guías de Especialidades y Modelos IA especializados
  especialidades: {
    cardiologia: {
      nombre: "Cardiología Clínica",
      modeloIA: "MedIA-Cardio-Vision & Risk v3.4",
      capacidades: [
        "Monitoreo continuo y análisis de trazados ECG 12 derivaciones",
        "Detección de elevación ST (SCACEST vs SCASEST)",
        "Calculador de riesgo cardiovascular Framingham y SCORE",
        "Detección de arritmias (Fibrilación auricular, Flutter, Extrasístoles)"
      ],
      trazadosECG: {
        normal: {
          tipo: "Ritmo Sinusal Normal",
          ritmo: "Regular a 75 lpm",
          eje: "Normal (+60°)",
          intervaloPR: "0.16 seg (Normal)",
          qrs: "0.08 seg (Estrecho)",
          hallazgo: "Sin alteraciones patológicas en repolarización ventricular.",
          riesgo: "Bajo (Score Framingham: 4.2% a 10 años)"
        },
        infartoST: {
          tipo: "Infarto Agudo de Miocardio con Elevación del ST (SCACEST)",
          ritmo: "Taquicardia sinusal a 108 lpm",
          eje: "Desviado a izquierda (+15°)",
          intervaloPR: "0.14 seg",
          qrs: "0.10 seg",
          hallazgo: "Elevación cóncava del segmento ST > 2.5 mm en derivaciones V2-V4. Onda T invertida en derivaciones precordiales anteriores.",
          riesgo: "Crítico / Emergencia Código Infarto: Derivar inmediatamente a sala de Hemodinamia para cateterismo."
        },
        fibrilacion: {
          tipo: "Fibrilación Auricular con Respuesta Ventricular Rápida",
          ritmo: "Irregularmente irregular a 132 lpm",
          eje: "Normal",
          intervaloPR: "Ausente (Ondas f caóticas)",
          qrs: "0.08 seg",
          hallazgo: "Ausencia de ondas P identificables. Intervalos R-R completamente caóticos.",
          riesgo: "Alto riesgo tromboembólico (Score CHA2DS2-VASc: 3 puntos → Requiere anticoagulación oral)."
        }
      }
    },

    dermatologia: {
      nombre: "Dermatología Digital",
      modeloIA: "MedIA-DermaClassify-ResNet50 v2.1",
      capacidades: [
        "Evaluación automatizada de regla ABCD (Asimetría, Bordes, Color, Diámetro)",
        "Clasificación probabilística de lesiones cutáneas",
        "Segmentación de contorno y análisis de pigmentación multiespectral",
        "Comparativa longitudinal fotográfica evolutiva"
      ],
      casosDemostrables: [
        {
          id: "DERMA-01",
          nombreLesion: "Lesión melanocítica atípica en antebrazo",
          imagen: "derma_lesion_1.svg",
          abcd: {
            asimetria: "Alta (Eje mayor y menor no coincidentes: índice 0.82)",
            bordes: "Irregulares, festoneados y mal delimitados en cuadrante superior",
            color: "Heterogéneo (3 tonos: marrón oscuro, pardo y punto negro azabache)",
            diametro: "7.8 mm (> 6 mm límite de sospecha)"
          },
          probabilidades: [
            { diagnostico: "Melanoma maligno in situ / extensivo superficial", prob: 86.4, severidad: "alta" },
            { diagnostico: "Nevus displásico de Clark atípico", prob: 11.2, severidad: "media" },
            { diagnostico: "Queratosis seborreica pigmentada", prob: 2.4, severidad: "baja" }
          ],
          recomendacionIA: "Lesión de alto índice de sospecha. Se recomienda dermatoscopía digital confocal y biopsia excisional con margen de 2-3 mm para confirmación histopatológica urgente."
        },
        {
          id: "DERMA-02",
          nombreLesion: "Placa queratósica benigna en hombro",
          imagen: "derma_lesion_2.svg",
          abcd: {
            asimetria: "Baja (Simétrica bilateralmente: índice 0.15)",
            bordes: "Regulares y bien circunscritos en todo el perímetro",
            color: "Homogéneo tono café uniforme",
            diametro: "4.2 mm (< 6 mm)"
          },
          probabilidades: [
            { diagnostico: "Nevus melanocítico común intradérmico", prob: 94.1, severidad: "baja" },
            { diagnostico: "Lentigo solar senil benigno", prob: 4.5, severidad: "baja" },
            { diagnostico: "Melanoma", prob: 1.4, severidad: "alta" }
          ],
          recomendacionIA: "Patrón compatible con lesión benigna sin estigmas de malignidad. Control fotográfico preventivo en 12 meses."
        }
      ]
    },

    radiologia: {
      nombre: "Radiología e Imagenología",
      modeloIA: "MedIA-ChestScan-DenseNet v4.0",
      capacidades: [
        "Segmentación y delimitación de campos pleuropulmonares",
        "Detección de condensaciones, infiltrados alveolares e intersticiales",
        "Cálculo del índice cardiotorácico (ICT) para cardiomegalia",
        "Triaje de urgencia para priorización en lista de lectura radiológica"
      ],
      estudiosDemostrables: [
        {
          id: "RAD-01",
          estudio: "Radiografía de Tórax PA - Paciente PAC-1003",
          imagen: "chest_xray_pneumonia.svg",
          hallazgosIA: [
            {
              region: "Lóbulo Inferior Derecho (LID)",
              hallazgo: "Consolidación alveolar con presencia de broncograma aéreo nítido",
              confianza: 94.7,
              coordenadas: { x: 55, y: 52, w: 32, h: 28 }, // % dentro del canvas
              color: "#ef4444"
            },
            {
              region: "Seno costofrénico derecho",
              hallazgo: "Velamiento angular parcial compatible con leve derrame paraneumónico",
              confianza: 87.2,
              coordenadas: { x: 62, y: 78, w: 22, h: 16 },
              color: "#f59e0b"
            },
            {
              region: "Silueta cardíaca",
              hallazgo: "Índice Cardiotorácico (ICT): 0.48 (Normal < 0.50)",
              confianza: 98.1,
              coordenadas: { x: 38, y: 48, w: 25, h: 30 },
              color: "#10b981"
            }
          ],
          conclusionPreliminar: "Patrón radiológico clásico de Neumonía Lobar bacteriana en base pulmonar derecha asociada a mínimo derrame pleural paraneumónico.",
          prioridadLectura: "ALTA - Examen priorizado al inicio de cola del radiólogo de guardia."
        },
        {
          id: "RAD-02",
          estudio: "Radiografía de Tórax PA - Control Normal",
          imagen: "chest_xray_normal.svg",
          hallazgosIA: [
            {
              region: "Campos pulmonares bilaterales",
              hallazgo: "Parénquima pulmonar bien ventilado, sin infiltrados ni áreas focales de consolidación",
              confianza: 97.5,
              coordenadas: { x: 20, y: 25, w: 60, h: 55 },
              color: "#10b981"
            }
          ],
          conclusionPreliminar: "Estudio torácico dentro de límites normales. Senos libres, silueta mediastínica y parénquima conservados.",
          prioridadLectura: "NORMAL - Lectura rutinaria dentro de 24h."
        }
      ]
    },

    pediatria: {
      nombre: "Pediatría Integral",
      modeloIA: "MedIA-PediaCare-DoseCalc v2.0",
      dosisFarmacos: [
        {
          medicamento: "Amoxicilina",
          indicacion: "Faringoamigdalitis / Otitis media aguda",
          dosisPorKgDia: "80 mg/kg/día dividido cada 8 horas",
          concentracionPresentacion: "250 mg / 5 mL suspensión",
          calcular: (pesoKg) => {
            const dosisDia = pesoKg * 80;
            const dosisTomaMg = dosisDia / 3;
            const mlToma = (dosisTomaMg * 5) / 250;
            return {
              dosisDiaMg: Math.round(dosisDia),
              dosisTomaMg: Math.round(dosisTomaMg),
              mlPorToma: mlToma.toFixed(1),
              frecuencia: "Cada 8 horas por 7 a 10 días"
            };
          }
        },
        {
          medicamento: "Paracetamol (Acetaminofén)",
          indicacion: "Antipirético / Analgésico infantil",
          dosisPorKgDia: "15 mg/kg por toma (máx cada 6 horas)",
          concentracionPresentacion: "120 mg / 5 mL jarabe (o gotas 100 mg/mL)",
          calcular: (pesoKg) => {
            const dosisTomaMg = pesoKg * 15;
            const mlToma = (dosisTomaMg * 5) / 120;
            return {
              dosisDiaMg: Math.round(dosisTomaMg * 4),
              dosisTomaMg: Math.round(dosisTomaMg),
              mlPorToma: mlToma.toFixed(1),
              frecuencia: "Cada 6 a 8 horas condicional a fiebre > 38°C"
            };
          }
        },
        {
          medicamento: "Ibuprofeno Infantil",
          indicacion: "Antiinflamatorio / Fiebre refractaria",
          dosisPorKgDia: "10 mg/kg por toma",
          concentracionPresentacion: "100 mg / 5 mL suspensión",
          calcular: (pesoKg) => {
            const dosisTomaMg = pesoKg * 10;
            const mlToma = (dosisTomaMg * 5) / 100;
            return {
              dosisDiaMg: Math.round(dosisTomaMg * 3),
              dosisTomaMg: Math.round(dosisTomaMg),
              mlPorToma: mlToma.toFixed(1),
              frecuencia: "Cada 8 horas con alimentos"
            };
          }
        }
      ]
    }
  },

  // Simulación de Conversación Clínica para Transcripción y Generación SOAP
  conversacionAmbientalDemo: [
    { tiempo: "00:03", emisor: "Médico", texto: "Buenos días, don Carlos. Cuénteme, ¿qué molestias lo traen por acá el día de hoy?" },
    { tiempo: "00:09", emisor: "Paciente", texto: "Doctora, hace como 45 minutos me empezó un dolor muy fuerte y apretado en el centro del pecho, como si tuviera un peso enorme encima." },
    { tiempo: "00:18", emisor: "Médico", texto: "¿El dolor se le queda ahí o se le corre a alguna otra parte del cuerpo?" },
    { tiempo: "00:23", emisor: "Paciente", texto: "Se me sube hacia el cuello y la mandíbula del lado izquierdo, y siento el brazo flojo y pesado. Además empecé a sudar frío y me falta el aire." },
    { tiempo: "00:32", emisor: "Médico", texto: "¿Tiene antecedentes de presión alta o problemas del corazón? ¿Qué medicamentos toma?" },
    { tiempo: "00:38", emisor: "Paciente", texto: "Sí, soy hipertenso hace 5 años. Tomo Losartán 50 miligramos en la mañana y noche, y Atorvastatina en la noche. Pero hoy con el apuro de la mañana se me olvidó tomar mi pastilla." },
    { tiempo: "00:49", emisor: "Médico", texto: "¿Tiene alguna alergia a medicamentos conocida?" },
    { tiempo: "00:53", emisor: "Paciente", texto: "Sí, soy muy alérgico a la penicilina, una vez casi me muero con una inyección." },
    { tiempo: "00:59", emisor: "Médico", texto: "De acuerdo, don Carlos. En este momento su presión está en 165 sobre 98 y el pulso en 108. Vamos a realizarle un electrocardiograma de inmediato, pedir troponinas y administrarle oxígeno y aspirina mientras evaluamos." }
  ],

  // Borrador SOAP pre-estructurado por el LLM Clínico
  borradorSOAPDemo: {
    subjetivo: "Paciente masculino de 54 años de edad con antecedentes de hipertensión arterial y dislipidemia, refiere cuadro de 45 minutos de evolución caracterizado por dolor precordial opresivo de intensidad 8/10 en escala EVA, con irradiación a mandíbula y extremidad superior izquierda, acompañado de diaforesis profusa y disnea. Refiere omisión de dosis matutina de Losartán. Alergia conocida y grave a Penicilina.",
    objetivo: "Signos Vitales: PA: 165/98 mmHg, FC: 108 lpm, FR: 22 rpm, SpO2: 95% aire ambiente, T°: 36.8°C. Paciente lúcido, orientado pero angustiado, con palidez mucocutánea y sudoración fría. Tórax con ruidos cardíacos taquicárdicos sin soplos audibles. Murmullo vesicular conservado bilateralmente sin estertores agregados.",
    analisis: "1. Síndrome Coronario Agudo con sospecha de Infarto de Miocardio (SCACEST probable anterior vs Angina Inestable) de alto riesgo.\n2. Crisis hipertensiva tipo Urgencia asociada a episodio coronario y abandono temporal de tratamiento antihipertensivo.\n3. Antecedente crítico: Alergia grave a betalactámicos.",
    plan: "1. Monitorización continua con monitor multiparamétrico y ECG de 12 derivaciones urgente (<10 min).\n2. Canalización venosa periférica y toma de perfil cardíaco: Troponina I hs, CPK-MB, electrolitos y coagulograma.\n3. Antiagregación inmediata: Ácido Acetilsalicílico 300 mg VO masticados + Clopidogrel 300 mg dosis de carga.\n4. Nitroglicerina sublingual 0.4 mg si dolor persiste y PA sistólica > 100 mmHg.\n5. O2 suplementario por cánula nasal a 2 L/min.\n6. Derivación inmediata a Cardiología / Unidad de Cuidados Intensivos Coronarios."
  },

  // Base de datos de Farmacia y alertas de interacción
  catalogoFarmacia: [
    { id: "MED-01", nombre: "Ácido Acetilsalicílico (Aspirina)", dosis: "100 mg / 500 mg", stock: 1200, familia: "Antiagregante" },
    { id: "MED-02", nombre: "Clopidogrel", dosis: "75 mg", stock: 450, familia: "Antiagregante" },
    { id: "MED-03", nombre: "Losartán Potásico", dosis: "50 mg", stock: 800, familia: "ARA-II" },
    { id: "MED-04", nombre: "Atorvastatina", dosis: "20 mg / 40 mg", stock: 650, familia: "Estatina" },
    { id: "MED-05", nombre: "Amoxicilina + Ácido Clavulánico", dosis: "875/125 mg", stock: 320, familia: "Betalactámico (Penicilina)", alertaAlergia: "Penicilina" },
    { id: "MED-06", nombre: "Ceftriaxona", dosis: "1 g inyectable", stock: 180, familia: "Cefalosporina (Reactividad cruzada 5-10% con penicilinas)", alertaAlergia: "Penicilina" },
    { id: "MED-07", nombre: "Azitromicina", dosis: "500 mg", stock: 400, familia: "Macrólido (Seguro en alérgicos a penicilina)" },
    { id: "MED-08", nombre: "Paracetamol", dosis: "500 mg / 1 g", stock: 2500, familia: "Analgésico / Antipirético" },
    { id: "MED-09", nombre: "Ibuprofeno", dosis: "400 mg / 600 mg", stock: 1400, familia: "AINE" }
  ],

  // Bitácora de Auditoría de IA
  auditoriaIA: [
    {
      id: "AUD-801",
      timestamp: "2026-09-21 14:16:32",
      modulo: "Triaje Inteligente",
      usuario: "Lic. Carmen Ortiz (Enfermería)",
      paciente: "Carlos Mendoza (PAC-1001)",
      sugerenciaIA: "Asignación Nivel 2 Manchester (Naranja) por Dolor Torácico + Taquicardia + HTA",
      accionUsuario: "ACEPTADA SIN MODIFICACIONES",
      estado: "Completado"
    },
    {
      id: "AUD-802",
      timestamp: "2026-09-21 14:25:10",
      modulo: "IA Ambiental - Nota SOAP",
      usuario: "Dra. Sofía Morales (Médico General)",
      paciente: "Carlos Mendoza (PAC-1001)",
      sugerenciaIA: "Borrador estructurado SOAP con sugerencia de Clopidogrel 300mg",
      accionUsuario: "ACEPTADA Y FIRMADA DIGITALMENTE",
      estado: "Validado por Profesional"
    },
    {
      id: "AUD-803",
      timestamp: "2026-09-21 14:28:44",
      modulo: "Motor de Seguridad Farmacológica",
      usuario: "Dra. Sofía Morales",
      paciente: "Carlos Mendoza (PAC-1001)",
      sugerenciaIA: "BLOQUEO PREVENTIVO: Intento de prescripción de antibiótico betalactámico detectado en paciente alérgico a Penicilina",
      accionUsuario: "REGLA DE SEGURIDAD ACTIVADA (Sustituido por Azitromicina)",
      estado: "Protegido"
    },
    {
      id: "AUD-804",
      timestamp: "2026-09-21 15:02:18",
      modulo: "Radiología Asistida",
      usuario: "Dr. Roberto Céspedes (Radiólogo)",
      paciente: "María Ugarte (PAC-1003)",
      sugerenciaIA: "Marcado de región de interés en Lóbulo Inferior Derecho con 94.7% de probabilidad de neumonía",
      accionUsuario: "CONCORDANCIA CLÍNICA CONFIRMADA",
      estado: "Informe Oficial Emitido"
    }
  ]
};

// ==================== js/modules/triaje.js ====================
/**
 * MedIA 360 - Módulo de Admisión y Triaje Inteligente
 * Clasificación de Urgencia según Algoritmo de Manchester + Detección de Banderas Rojas por IA
 */



class TriajeModule {
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

// ==================== js/modules/consulta_soap.js ====================
/**
 * MedIA 360 - Módulo de Consulta con IA Ambiental y Generador SOAP
 * Simulación de transcripción speech-to-text en tiempo real + extracción de entidades + borrador clínico
 */



class ConsultaSOAPModule {
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

// ==================== js/modules/especialidades.js ====================
/**
 * MedIA 360 - Módulo de Asistentes Especializados de IA
 * Cardiología (ECG + Riesgo), Dermatología (ABCD + Lesiones), Radiología (Rayos X + Heatmap) y Pediatría
 */



class EspecialidadesModule {
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

// ==================== js/modules/historia_clinica.js ====================
/**
 * MedIA 360 - Módulo de Historia Clínica Electrónica Unificada (HCE)
 * Control de versiones, antecedentes, diagnósticos y trazabilidad clínica del paciente
 */



class HistoriaClinicaModule {
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

// ==================== js/modules/farmacia_laboratorio.js ====================
/**
 * MedIA 360 - Módulo de Farmacia, Prescripción Asistida y Laboratorio
 * Motor de Detección de Interacciones, Alergias Cruzadas y Valores Críticos
 */



class FarmaciaLaboratorioModule {
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

// ==================== js/modules/auditoria.js ====================
/**
 * MedIA 360 - Módulo de Reportes, Auditoría de IA y Gestión Hospitalaria
 * Trazabilidad de decisiones médicas vs recomendaciones algorítmicas (RF11 y RF12)
 */



class AuditoriaModule {
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

// ==================== js/app.js ====================
/**
 * MedIA 360 - Aplicación Principal y Enrutador Clínico
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */









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

})();
