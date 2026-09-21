/**
 * MedIA 360 - Mock Database & Clinical Knowledge Base
 * Grupo 9 - Ingeniería de Software II (UAGRM)
 */

export const CLINICAL_DATA = {
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
