import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Printer,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { glossary, portfolioSources, projects, type CodeFile, type Flow, type ProjectChapter, type StudyRow } from "./studyData";
import "./study.css";

type Props = {
  mode?: "site" | "print";
};

const sections = [
  ["overview", "Visao geral"],
  ["stack", "Stack"],
  ["architecture", "Arquitetura"],
  ["folders", "Pastas"],
  ["frontend", "Frontend"],
  ["backend", "Backend/APIs"],
  ["database", "Banco"],
  ["security", "Seguranca"],
  ["flows", "Fluxos"],
  ["code", "Codigo"],
  ["interview", "Entrevista"],
] as const;

const statusLabel = {
  documented: "Documentado pelo codigo",
  partial: "Parcial",
  pending: "Pendente",
};

function printPage() {
  window.print();
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Table({ rows, headers = ["Item", "Tecnologia / arquivo", "Funcao"], empty = "Nao foi possivel confirmar no codigo analisado." }: { rows: StudyRow[]; headers?: string[]; empty?: string }) {
  if (!rows.length) return <p className="study-empty">{empty}</p>;
  return (
    <div className="study-table-wrap">
      <table className="study-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.left}-${index}`}>
              <td>{row.left}</td>
              <td>{row.middle}</td>
              <td>
                <span>{row.right}</span>
                {row.note && <small>{row.note}</small>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ title, children, tone = "default" }: { title: string; children: ReactNode; tone?: "default" | "simple" | "technical" | "warning" }) {
  return (
    <aside className={`study-callout study-callout-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

function ArchitectureDiagram({ project }: { project: ProjectChapter }) {
  const backend = project.endpoints.length ? "API / Backend" : "BaaS / Integracoes";
  return (
    <div className="architecture-diagram" aria-label={`Diagrama de arquitetura do ${project.name}`}>
      {["Usuario", "Frontend", backend, "Banco / Storage", "Servicos externos"].map((item, index) => (
        <div className="diagram-step" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < 4 && <i aria-hidden="true">{"->"}</i>}
        </div>
      ))}
    </div>
  );
}

function FlowCard({ flow }: { flow: Flow }) {
  return (
    <article className="flow-card">
      <div>
        <span className="mini-label">Fluxo</span>
        <h4>{flow.name}</h4>
        <p>{flow.goal}</p>
      </div>
      <ol>
        {flow.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="flow-meta">
        <strong>Arquivos:</strong> {flow.files.join(", ")}
      </div>
      <div className="flow-meta">
        <strong>APIs:</strong> {flow.apis.join(", ")}
      </div>
      <Callout title="Como explicar em entrevista" tone="technical">
        <p>{flow.interview}</p>
      </Callout>
    </article>
  );
}

function CodeExplainer({ file }: { file: CodeFile }) {
  return (
    <article className="code-explainer">
      <div className="code-title">
        <Code2 size={18} />
        <h4>{file.path}</h4>
      </div>
      <p>{file.purpose}</p>
      <div className="pseudo-code">
        {file.parts.map((part, index) => (
          <span key={part}>
            <em>{index + 1}</em>
            {part}
          </span>
        ))}
      </div>
      <div className="two-callouts">
        <Callout title="Em termos simples" tone="simple">
          <p>{file.beginner}</p>
        </Callout>
        <Callout title="Como falar em entrevista" tone="technical">
          <p>{file.interview}</p>
        </Callout>
      </div>
    </article>
  );
}

function ProjectChapterView({ project }: { project: ProjectChapter }) {
  return (
    <article className="project-chapter" id={project.id}>
      <header className="chapter-hero">
        <div>
          <span className={`status-pill status-${project.status}`}>{statusLabel[project.status]}</span>
          <h2>{project.name}</h2>
          <p>{project.oneLine}</p>
        </div>
        <a className="chapter-link no-print" href={project.url.startsWith("http") ? project.url : "#pendencias"} target={project.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          Abrir projeto <ArrowUpRight size={16} />
        </a>
      </header>

      <section id={`${project.id}-overview`} className="chapter-section">
        <h3><BookOpen size={20} /> 1. Visao geral</h3>
        <div className="summary-grid">
          <div><span>Problema</span><p>{project.problem}</p></div>
          <div><span>Publico</span><p>{project.audience}</p></div>
          <div><span>Valor</span><p>{project.value}</p></div>
          <div><span>Fluxo principal</span><p>{project.mainFlow}</p></div>
        </div>
        <div className="three-callouts">
          <Callout title="Resumo de 30 segundos" tone="technical"><p>{project.interview30}</p></Callout>
          <Callout title="Resumo tecnico"><p>{project.technicalSummary}</p></Callout>
          <Callout title="Resumo para iniciante" tone="simple"><p>{project.beginnerSummary}</p></Callout>
        </div>
      </section>

      <section id={`${project.id}-stack`} className="chapter-section">
        <h3><Layers3 size={20} /> 2. Stack utilizada</h3>
        <Table rows={project.stack} headers={["Categoria", "Tecnologia", "Onde e usada / por que"]} />
      </section>

      <section id={`${project.id}-architecture`} className="chapter-section">
        <h3><Network size={20} /> 3. Arquitetura geral</h3>
        <ArchitectureDiagram project={project} />
        <p className="section-note">{project.technicalDiff}</p>
      </section>

      <section id={`${project.id}-folders`} className="chapter-section">
        <h3><Route size={20} /> 4. Estrutura de pastas</h3>
        <Table rows={project.folders} headers={["Pasta/arquivo", "Funcao", "Explicacao simples"]} />
      </section>

      <section id={`${project.id}-frontend`} className="chapter-section">
        <h3><Sparkles size={20} /> 5. Frontend</h3>
        <Table rows={project.pages} headers={["Pagina/Rota", "Arquivo", "Fluxo"]} />
        <Table rows={project.components} headers={["Componente", "Arquivo", "Responsabilidade"]} />
        <Callout title="Explicacao para iniciante" tone="simple">
          <p>O frontend e a parte que o usuario enxerga. Ele monta telas, botoes, formularios, cards, feedback de loading/erro e chama APIs quando precisa salvar ou buscar dados.</p>
        </Callout>
      </section>

      <section id={`${project.id}-backend`} className="chapter-section">
        <h3><GitBranch size={20} /> 6. Backend, APIs e integracoes</h3>
        <Table rows={project.endpoints} headers={["Endpoint/API", "Metodo", "O que faz"]} />
        <Table rows={project.integrations} headers={["Integracao", "Onde aparece", "Papel no produto"]} />
      </section>

      <section id={`${project.id}-database`} className="chapter-section">
        <h3><Database size={20} /> 7. Banco de dados</h3>
        <Table rows={project.database} headers={["Tabela/Entidade", "Campos principais", "Funcao / relacionamento"]} />
      </section>

      <section id={`${project.id}-security`} className="chapter-section">
        <h3><ShieldCheck size={20} /> 8. Autenticacao e seguranca</h3>
        <ul className="check-list study-check-list">
          {project.security.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <Table rows={project.env} headers={["Variavel", "Funcao", "Onde e usada"]} empty="Nao foram confirmadas variaveis especificas no codigo analisado." />
      </section>

      <section id={`${project.id}-flows`} className="chapter-section">
        <h3><GitBranch size={20} /> 10. Fluxos principais do produto</h3>
        <div className="flow-grid">
          {project.flows.length ? project.flows.map((flow) => <FlowCard key={flow.name} flow={flow} />) : <p className="study-empty">Conteudo pendente de validacao manual.</p>}
        </div>
      </section>

      <section id={`${project.id}-code`} className="chapter-section">
        <h3><Code2 size={20} /> 11. Explicacao parte a parte do codigo</h3>
        <div className="code-grid">
          {project.codeFiles.length ? project.codeFiles.map((file) => <CodeExplainer key={file.path} file={file} />) : <p className="study-empty">Nenhum arquivo principal confirmado para este capitulo.</p>}
        </div>
      </section>

      <section className="chapter-section">
        <h3><Layers3 size={20} /> 12. Bibliotecas e ferramentas</h3>
        <Table rows={project.libraries} headers={["Biblioteca", "Onde aparece", "Para que serve"]} />
      </section>

      <section className="chapter-section">
        <h3><LockKeyhole size={20} /> 13-16. Operacao, erros, performance e UX</h3>
        <div className="ops-grid">
          <Callout title="Tratamento de erros" tone="warning"><ul>{project.errors.map((item) => <li key={item}>{item}</li>)}</ul></Callout>
          <Callout title="Performance"><ul>{project.performance.map((item) => <li key={item}>{item}</li>)}</ul></Callout>
          <Callout title="Acessibilidade e UX" tone="simple"><ul>{project.ux.map((item) => <li key={item}>{item}</li>)}</ul></Callout>
          <Callout title="Pendencias confirmadas" tone="warning"><ul>{project.pending.map((item) => <li key={item}>{item}</li>)}</ul></Callout>
        </div>
      </section>

      <section id={`${project.id}-interview`} className="chapter-section">
        <h3><FileText size={20} /> 17-19. Entrevista e checklist</h3>
        <div className="interview-grid">
          {project.interview.map((group) => (
            <details key={group.category} open>
              <summary>{group.category}</summary>
              {group.questions.map((item) => (
                <div className="qa-item" key={item.q}>
                  <strong>{item.q}</strong>
                  <p>{item.a}</p>
                </div>
              ))}
            </details>
          ))}
        </div>
        <div className="script-grid">
          <Callout title="Versao curta - 30 segundos"><p>{project.interview30}</p></Callout>
          <Callout title="Versao tecnica - 5 minutos"><p>{project.technicalSummary} Depois eu abriria os fluxos principais e mostraria os arquivos que conectam UI, API e dados.</p></Callout>
          <Callout title="Versao para pessoa nao tecnica" tone="simple"><p>{project.beginnerSummary}</p></Callout>
        </div>
        <ul className="study-todo">
          {project.checklist.map((item) => (
            <li key={item}><CheckCircle2 size={16} /> {item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default function StudyGuide({ mode = "site" }: Props) {
  const projectCount = projects.length;
  const documented = projects.filter((project) => project.status === "documented").length;
  const pending = projects.filter((project) => project.status !== "documented").length;
  const totalEndpoints = projects.reduce((sum, project) => sum + project.endpoints.length, 0);
  const totalFlows = projects.reduce((sum, project) => sum + project.flows.length, 0);
  const isPrint = mode === "print";

  return (
    <div className={`study-app ${isPrint ? "study-print-view" : ""}`}>
      <aside className="study-sidebar no-print">
        <a className="study-brand" href="/">
          <span>FP</span>
          <strong>Portfolio Study</strong>
        </a>
        <nav aria-label="Sumario do material">
          <a href="#sumario">Sumario geral</a>
          {projects.map((project) => (
            <a key={project.id} href={`#${project.id}`}>{project.name}</a>
          ))}
          <a href="#glossario">Glossario</a>
          <a href="#fontes">Fontes analisadas</a>
        </nav>
      </aside>

      <main className="study-main">
        <header className="study-topbar no-print">
          <a href="/" className="study-back">Voltar ao portfolio</a>
          <div>
            <a href="/print" className="study-ghost-button">Abrir /print</a>
            <button type="button" onClick={printPage} className="study-print-button"><Printer size={16} /> Exportar PDF</button>
          </div>
        </header>

        <section className="study-cover" id="sumario">
          <div className="cover-copy">
            <span className="study-eyebrow">Material de estudo e entrevista</span>
            <h1>Livro interativo dos projetos do portfolio</h1>
            <p>
              Guia tecnico e didatico para estudar, apresentar e explicar os projetos FelpaMusic, Billie Brain, Vitrinno, Helena Video, Verdant CRM, Oli Drive Rent e projetos pendentes encontrados no portfolio.
            </p>
            <div className="cover-actions no-print">
              <button type="button" onClick={printPage} className="study-print-button"><Printer size={16} /> Exportar PDF</button>
              <a href="#felpamusic" className="study-ghost-button">Comecar estudo</a>
            </div>
          </div>
          <div className="cover-panel">
            <div><strong>{projectCount}</strong><span>capitulos</span></div>
            <div><strong>{documented}</strong><span>com codigo local</span></div>
            <div><strong>{totalEndpoints}</strong><span>APIs mapeadas</span></div>
            <div><strong>{totalFlows}</strong><span>fluxos explicados</span></div>
            <div><strong>{pending}</strong><span>pendencias declaradas</span></div>
          </div>
        </section>

        <section className="study-overview-grid">
          {projects.map((project, index) => (
            <a key={project.id} href={`#${project.id}`} className="study-project-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{project.name}</h2>
              <p>{project.oneLine}</p>
              <i>{statusLabel[project.status]}</i>
            </a>
          ))}
        </section>

        <section className="chapter-section study-method">
          <h2>Como usar este material</h2>
          <div className="method-grid">
            <Callout title="Para estudar" tone="simple">
              <p>Leia primeiro o resumo de 30 segundos, depois stack, arquitetura e fluxos. Use o checklist no fim de cada capitulo.</p>
            </Callout>
            <Callout title="Para entrevista" tone="technical">
              <p>Use os scripts de 30 segundos, 2 minutos e tecnico. Responda sempre com problema, decisao tecnica, sua responsabilidade e resultado.</p>
            </Callout>
            <Callout title="Para PDF" tone="warning">
              <p>Abra /print ou clique em Exportar PDF. O CSS de impressao remove sidebar e organiza quebras por capitulo.</p>
            </Callout>
          </div>
        </section>

        {projects.map((project) => (
          <ProjectChapterView key={project.id} project={project} />
        ))}

        <section className="project-chapter" id="glossario">
          <header className="chapter-hero">
            <div>
              <span className="status-pill status-documented">20. Glossario tecnico</span>
              <h2>Glossario</h2>
              <p>Termos recorrentes explicados de forma simples, tecnica e com exemplo nos seus projetos.</p>
            </div>
          </header>
          <div className="glossary-grid">
            {glossary.map((item) => (
              <article key={item.term} className="glossary-card">
                <h3>{item.term}</h3>
                <p><strong>Simples:</strong> {item.simple}</p>
                <p><strong>Tecnico:</strong> {item.technical}</p>
                <p><strong>Exemplo:</strong> {item.example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project-chapter" id="fontes">
          <header className="chapter-hero">
            <div>
              <span className="status-pill status-partial">Transparencia</span>
              <h2>Fontes analisadas e limites</h2>
              <p>Este material foi criado a partir de arquivos locais e package/config/source encontrados. Secrets reais nao foram exibidos.</p>
            </div>
          </header>
          <ul className="source-list">
            {portfolioSources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
          <Callout title="Regra de confiabilidade" tone="warning">
            <p>Quando algo nao foi confirmado no codigo analisado, o material marca como pendente ou como validacao manual. Isso evita explicar funcao inexistente em entrevista.</p>
          </Callout>
        </section>
      </main>

      <nav className="study-mini-toc no-print" aria-label="Subcapitulos">
        <strong>Subcapitulos</strong>
        {sections.map(([key, label]) => (
          <a key={key} href={`#${projects[0]?.id}-${key}`}>{label}</a>
        ))}
        <a href="#glossario">Glossario</a>
      </nav>
    </div>
  );
}
