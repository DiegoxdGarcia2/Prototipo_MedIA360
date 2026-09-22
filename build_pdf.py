import os
import sys
import subprocess
import shutil
import fitz

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MD_PATH = os.path.join(BASE_DIR, "DOCUMENTACION_TECNICA.md")
HTML_OUT = os.path.join(BASE_DIR, "docs", "documento_imprimible.html")
PDF_OUT_MED = os.path.join(BASE_DIR, "MedIA360_Documentacion_Tecnica.pdf")
PDF_OUT_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "MedIA360_Documentacion_Tecnica.pdf"))
PDF_OUT_DOCS = os.path.join(BASE_DIR, "docs", "MedIA360_Documentacion_Tecnica.pdf")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print("[1/4] Leyendo archivo markdown DOCUMENTACION_TECNICA.md...")
with open(MD_PATH, "r", encoding="utf-8") as f:
    md_content = f.read()

# Escapar comillas invertidas y signos de dolar para template literal JS
escaped_md = md_content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MedIA360 - Documentación Técnica y Especificación de Sistema</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<style>
  @page {{
    size: A4 portrait;
    margin: 22mm 18mm 22mm 18mm;
    @top-right {{
      content: "MedIA360 — Especificación Técnica UAGRM";
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      color: #64748b;
    }}
    @bottom-center {{
      content: counter(page);
      font-family: 'Inter', sans-serif;
      font-size: 9pt;
      color: #475569;
    }}
  }}

  @page :first {{
    margin: 0;
    @top-right {{ content: normal; }}
    @bottom-center {{ content: normal; }}
  }}

  * {{
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}

  body {{
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.65;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }}

  /* PORTADA FORMAL ACADÉMICA */
  .cover-page {{
    width: 210mm;
    height: 297mm;
    padding: 28mm 24mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border-bottom: 6px solid #0284c7;
    box-sizing: border-box;
  }}

  .cover-header {{
    text-align: center;
    border-bottom: 2px solid #cbd5e1;
    padding-bottom: 20px;
  }}

  .cover-header .inst {{
    font-size: 15pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin: 0;
  }}

  .cover-header .fac {{
    font-size: 11pt;
    font-weight: 600;
    color: #0369a1;
    margin-top: 6px;
    text-transform: uppercase;
  }}

  .cover-header .carr {{
    font-size: 9.5pt;
    color: #475569;
    margin-top: 4px;
  }}

  .cover-body {{
    text-align: center;
    margin: auto 0;
  }}

  .cover-tag {{
    display: inline-block;
    background: #e0f2fe;
    color: #0284c7;
    font-size: 9pt;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 16px;
    border: 1px solid #bae6fd;
  }}

  .cover-title {{
    font-size: 30pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 12px 0;
  }}

  .cover-subtitle {{
    font-size: 13pt;
    font-weight: 500;
    color: #475569;
    line-height: 1.4;
    max-width: 580px;
    margin: 0 auto;
  }}

  .cover-meta-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 18px 24px;
    text-align: left;
    margin-top: 28px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }}

  .meta-col h4 {{
    margin: 0 0 6px 0;
    font-size: 8.5pt;
    text-transform: uppercase;
    color: #0284c7;
    letter-spacing: 0.5px;
  }}

  .meta-col p {{
    margin: 0;
    font-size: 9.5pt;
    color: #1e293b;
    font-weight: 500;
  }}

  .meta-col ul {{
    margin: 0;
    padding-left: 14px;
    font-size: 9pt;
    color: #334155;
  }}

  .meta-col li {{
    margin-bottom: 2px;
  }}

  .cover-footer {{
    text-align: center;
    font-size: 9pt;
    color: #64748b;
    border-top: 1px solid #e2e8f0;
    padding-top: 14px;
  }}

  /* ÍNDICE FORMAL */
  .toc-page {{
    page-break-after: always;
    padding-top: 10px;
  }}

  .toc-title {{
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 6px;
    margin-bottom: 18px;
    text-transform: uppercase;
  }}

  .toc-list {{
    list-style: none;
    padding: 0;
    margin: 0;
  }}

  .toc-item {{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px dotted #cbd5e1;
    font-size: 9.5pt;
  }}

  .toc-item.level-1 {{
    font-weight: 700;
    color: #0f172a;
    margin-top: 8px;
    border-bottom: 1px solid #cbd5e1;
  }}

  .toc-item.level-2 {{
    padding-left: 14px;
    color: #334155;
  }}

  .toc-item.level-3 {{
    padding-left: 28px;
    font-size: 8.5pt;
    color: #64748b;
  }}

  /* CONTENIDO PRINCIPAL */
  .document-container {{
    max-width: 100%;
    margin: 0 auto;
  }}

  h1, h2, h3, h4, h5 {{
    font-family: 'Inter', sans-serif;
    color: #0f172a;
    font-weight: 700;
    page-break-after: avoid;
    break-after: avoid;
  }}

  h1 {{
    font-size: 19pt;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 8px;
    margin-top: 28px;
    margin-bottom: 16px;
  }}

  h2 {{
    font-size: 14pt;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 5px;
    margin-top: 22px;
    margin-bottom: 12px;
    color: #0369a1;
  }}

  h3 {{
    font-size: 12pt;
    margin-top: 18px;
    margin-bottom: 10px;
    color: #0f172a;
  }}

  h4 {{
    font-size: 10.5pt;
    margin-top: 14px;
    margin-bottom: 6px;
    color: #1e293b;
  }}

  p {{
    margin-top: 0;
    margin-bottom: 11px;
    text-align: justify;
  }}

  ul, ol {{
    margin-top: 0;
    margin-bottom: 12px;
    padding-left: 20px;
  }}

  li {{
    margin-bottom: 3px;
  }}

  /* TABLAS FORMALES */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0 18px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  th {{
    background-color: #0f172a;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #0f172a;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }}

  td {{
    padding: 6px 10px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }}

  tr:nth-child(even) {{
    background-color: #f8fafc;
  }}

  /* DIAGRAMAS MERMAID */
  .mermaid-wrapper {{
    page-break-inside: avoid;
    break-inside: avoid;
    margin: 16px 0 20px 0;
    text-align: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }}

  .mermaid {{
    display: flex;
    justify-content: center;
    overflow: hidden;
  }}

  .mermaid svg {{
    max-width: 100% !important;
    height: auto !important;
  }}

  .diagram-caption {{
    font-size: 8.5pt;
    color: #475569;
    font-weight: 600;
    margin-top: 8px;
    text-align: center;
  }}

  /* BLOQUES DE CÓDIGO Y LLAMADAS */
  pre {{
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    overflow-x: auto;
    page-break-inside: avoid;
  }}

  blockquote {{
    border-left: 4px solid #0284c7;
    background-color: #f0f9ff;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 0 6px 6px 0;
    font-size: 9pt;
    color: #0c4a6e;
    page-break-inside: avoid;
  }}

  hr {{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 20px 0;
  }}
</style>
</head>
<body>

<!-- PORTADA OFICIAL -->
<div class="cover-page">
  <div class="cover-header">
    <div class="inst">Universidad Autónoma Gabriel René Moreno</div>
    <div class="fac">Facultad de Ciencias de la Computación y Telecomunicaciones</div>
    <div class="carr">Carrera de Ingeniería en Sistemas / Informática</div>
  </div>

  <div class="cover-body">
    <div class="cover-tag">Documento de Especificación Formal</div>
    <div class="cover-title">MedIA360</div>
    <div class="cover-subtitle">
      Plataforma Web Asistida por Inteligencia Artificial para el Diagnóstico y Gestión Clínica Integral
    </div>

    <div class="cover-meta-grid">
      <div class="meta-col">
        <h4>Asignatura y Cátedra</h4>
        <p><strong>Materia:</strong> Ingeniería de Software II (INF412)</p>
        <p><strong>Grupo:</strong> SB</p>
        <p><strong>Docente:</strong> Ing. Rolando Antonio Martínez Canedo</p>
        <p><strong>Metodología:</strong> RUP / Modelado Estructurado UML</p>
      </div>
      <div class="meta-col">
        <h4>Equipo de Desarrollo (Grupo Nº 9)</h4>
        <ul>
          <li>David García Caballero</li>
          <li>José Diego García Caballero</li>
          <li>Carlos Gabriel Lobo Gutiérrez</li>
          <li>Leonardo Serrate Basma</li>
          <li>Brandon Líder Vásquez Ardaya</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    Santa Cruz de la Sierra — Bolivia | Gestión 2026
  </div>
</div>

<!-- ÍNDICE DE CONTENIDO -->
<div class="toc-page">
  <div class="toc-title">Índice General de Contenidos</div>
  <ul class="toc-list">
    <li class="toc-item level-1"><span>3.1. MedIA360</span><span>Pág. 3</span></li>
    <li class="toc-item level-2"><span>3.1.1. Introducción</span><span>Pág. 3</span></li>
    <li class="toc-item level-2"><span>3.1.2. Ámbito de la Empresa</span><span>Pág. 3</span></li>
    <li class="toc-item level-2"><span>3.1.3. Objetivos</span><span>Pág. 4</span></li>
    <li class="toc-item level-3"><span>3.1.3.1. Objetivo General</span><span>Pág. 4</span></li>
    <li class="toc-item level-3"><span>3.1.3.2. Objetivos Específicos</span><span>Pág. 4</span></li>
    <li class="toc-item level-2"><span>3.1.4. Alcance del Sistema</span><span>Pág. 4</span></li>
    <li class="toc-item level-2"><span>3.1.5. Recursos Humanos y Tecnológicos</span><span>Pág. 5</span></li>
    <li class="toc-item level-2"><span>3.1.6. Presupuesto y Costos por Recurso</span><span>Pág. 6</span></li>
    <li class="toc-item level-2"><span>3.1.7. Beneficios de la IA Aplicada a Visión Artificial</span><span>Pág. 6</span></li>
    <li class="toc-item level-2"><span>3.1.8. Infraestructura Hospitalaria y Segmentación de Red</span><span>Pág. 7</span></li>
    <li class="toc-item level-1"><span>3.1.8.1. Captura de Requisitos</span><span>Pág. 8</span></li>
    <li class="toc-item level-2"><span>3.1.8.1.1. Actores del Sistema</span><span>Pág. 8</span></li>
    <li class="toc-item level-2"><span>3.1.8.1.2. Lista de Casos de Uso (CU-01 a CU-10)</span><span>Pág. 9</span></li>
    <li class="toc-item level-2"><span>3.1.8.1.3. Detalle de Casos de Uso (Plantillas RUP)</span><span>Pág. 10</span></li>
    <li class="toc-item level-3"><span>CU-01: Triaje Clínico Manchester y Priorización</span><span>Pág. 10</span></li>
    <li class="toc-item level-3"><span>CU-02: Consulta Médica Estructurada SOAP con IA</span><span>Pág. 11</span></li>
    <li class="toc-item level-3"><span>CU-03: Análisis Radiológico de Tórax Grad-CAM</span><span>Pág. 12</span></li>
    <li class="toc-item level-3"><span>CU-04: Evaluación Dermatológica con Criterios ABCD</span><span>Pág. 13</span></li>
    <li class="toc-item level-3"><span>CU-05: Dispensación con Bloqueo de Alergias Cruzadas</span><span>Pág. 14</span></li>
    <li class="toc-item level-2"><span>3.1.8.1.4. Estructura de Casos de Uso (Diagrama UML)</span><span>Pág. 14</span></li>
    <li class="toc-item level-1"><span>3.1.8.2. Análisis del Sistema</span><span>Pág. 15</span></li>
    <li class="toc-item level-2"><span>3.1.8.2.1. Identificación de Paquetes</span><span>Pág. 15</span></li>
    <li class="toc-item level-2"><span>3.1.8.2.2. Vista de Paquetes (Diagrama UML)</span><span>Pág. 15</span></li>
    <li class="toc-item level-1"><span>3.1.8.3. Diseño del Sistema</span><span>Pág. 16</span></li>
    <li class="toc-item level-2"><span>3.1.8.3.1. Diseño de la Arquitectura (Despliegue y Red)</span><span>Pág. 16</span></li>
    <li class="toc-item level-2"><span>3.1.8.3.2. Diseño de la Lógica de Negocio (Diagramas de Secuencia UML)</span><span>Pág. 17</span></li>
    <li class="toc-item level-3"><span>Secuencia 1: Flujo de Triaje Clínico Manchester</span><span>Pág. 17</span></li>
    <li class="toc-item level-3"><span>Secuencia 2: Flujo de Consulta SOAP con IA Ambiental</span><span>Pág. 17</span></li>
    <li class="toc-item level-3"><span>Secuencia 3: Flujo de Diagnóstico Radiológico Grad-CAM</span><span>Pág. 18</span></li>
    <li class="toc-item level-3"><span>Secuencia 4: Flujo de Cribado Dermatológico ABCD</span><span>Pág. 18</span></li>
    <li class="toc-item level-3"><span>Secuencia 5: Flujo de Farmacia con Bloqueo Activo</span><span>Pág. 19</span></li>
  </ul>
</div>

<!-- CONTENIDO RENDERIZADO DESDE MARKDOWN -->
<div class="document-container" id="doc-root"></div>

<script>
  const rawMarkdown = `{escaped_md}`;

  marked.setOptions({{
    gfm: true,
    breaks: false
  }});

  let processedMd = rawMarkdown;
  if (processedMd.startsWith('# Documento de Especificación')) {{
    const firstSectionIdx = processedMd.indexOf('## 3.1. MedIA360');
    if (firstSectionIdx !== -1) {{
      processedMd = processedMd.substring(firstSectionIdx);
    }}
  }}

  document.getElementById('doc-root').innerHTML = marked.parse(processedMd);

  // Títulos específicos para cada diagrama
  const diagramTitles = [
    "Figura 1: Diagrama Estructurado de Casos de Uso del Sistema MedIA360 (con relaciones include y extend)",
    "Figura 2: Diagrama de Vista de Paquetes Arquitectónicos (CapaPresentacion, CapaLogicaClinica, CapaMotoresIA, CapaDatosModelos)",
    "Figura 3: Diagrama de Despliegue Físico y Lógico de la Infraestructura de Red Hospitalaria (Salas 1, 2, 3, Admin y Cluster de Servidores)",
    "Figura 4: Diagrama de Secuencia UML — Flujo de Triaje Clínico Manchester y Priorización",
    "Figura 5: Diagrama de Secuencia UML — Flujo de Consulta Médica Estructurada SOAP con Asistencia IA Ambiental",
    "Figura 6: Diagrama de Secuencia UML — Flujo de Diagnóstico Radiológico de Tórax con Explicabilidad Grad-CAM",
    "Figura 7: Diagrama de Secuencia UML — Flujo de Cribado Dermatológico con Criterios Paramétricos ABCD",
    "Figura 8: Diagrama de Secuencia UML — Flujo de Farmacia con Bloqueo Activo por Alergias Cruzadas"
  ];

  let diagramCount = 0;
  document.querySelectorAll('pre code.language-mermaid').forEach((codeBlock) => {{
    const pre = codeBlock.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid-wrapper';

    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = codeBlock.textContent.trim();

    const caption = document.createElement('div');
    caption.className = 'diagram-caption';
    caption.textContent = diagramTitles[diagramCount] || `Figura ${{diagramCount + 1}}: Diagrama UML de MedIA360`;
    diagramCount++;

    wrapper.appendChild(div);
    wrapper.appendChild(caption);
    pre.replaceWith(wrapper);
  }});

  mermaid.initialize({{
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
    flowchart: {{
      htmlLabels: true,
      curve: 'basis'
    }},
    sequence: {{
      showSequenceNumbers: true,
      actorFontSize: 12,
      noteFontSize: 11
    }}
  }});

  mermaid.run().then(() => {{
    console.log('Todos los diagramas Mermaid fueron renderizados exitosamente.');
    document.body.setAttribute('data-rendered', 'true');
  }}).catch(err => {{
    console.error('Error renderizando diagramas:', err);
    document.body.setAttribute('data-rendered', 'error');
  }});
</script>

</body>
</html>
"""

print("[2/4] Generando archivo HTML imprimible...")
os.makedirs(os.path.dirname(HTML_OUT), exist_ok=True)
with open(HTML_OUT, "w", encoding="utf-8") as f:
    f.write(html_template)
print(f"  -> Archivo guardado en: {HTML_OUT}")

print("[3/4] Compilando PDF de alta fidelidad mediante Microsoft Edge Chromium headless...")
args = [
    EDGE_PATH,
    "--headless=new",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=12000",
    "--no-pdf-header-footer",
    f"--print-to-pdf={PDF_OUT_MED}",
    "http://localhost:8080/Medicina/docs/documento_imprimible.html"
]

res = subprocess.run(args, capture_output=True, text=True)
if res.returncode != 0:
    print("Error ejecutando Edge:", res.stderr)
    sys.exit(1)

if not os.path.exists(PDF_OUT_MED):
    print("Error: El PDF no fue generado.")
    sys.exit(1)

print("[4/4] Distribuyendo copias del PDF...")
shutil.copyfile(PDF_OUT_MED, PDF_OUT_ROOT)
shutil.copyfile(PDF_OUT_MED, PDF_OUT_DOCS)

size_mb = os.path.getsize(PDF_OUT_MED) / (1024 * 1024)
doc = fitz.open(PDF_OUT_MED)
print(f"EXITO: PDF generado correctamente!")
print(f"  -> Tamaño: {size_mb:.2f} MB")
print(f"  -> Total Páginas: {len(doc)}")
print(f"  -> Ruta Principal: {PDF_OUT_MED}")
print(f"  -> Ruta Raíz: {PDF_OUT_ROOT}")
