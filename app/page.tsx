import { getContent } from "@/lib/content";

const toggleScript = `(function(){var b=document.getElementById('theme-toggle');if(!b)return;var d=document.documentElement;function label(){var dark=d.dataset.theme==='dark';b.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');b.setAttribute('aria-pressed',dark?'true':'false')}label();b.addEventListener('click',function(){d.dataset.theme=d.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',d.dataset.theme)}catch(e){}label()})})()`;

const sections = [
  { id: "now", label: "Now" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Home() {
  const site = getContent();
  const { profile } = site;
  const [first, ...rest] = profile.name.split(" ");
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Detroit",
  });

  const contact = (
    <ul className="contact">
      <li>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </li>
      {profile.links.map((l) => (
        <li key={l.href}>
          <External href={l.href}>{l.label}</External>
        </li>
      ))}
      {profile.resume && (
        <li>
          <a href={profile.resume}>Resume (PDF)</a>
        </li>
      )}
    </ul>
  );

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="top wrap">
        <nav aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button id="theme-toggle" className="toggle" type="button" aria-label="Switch theme">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
          </svg>
        </button>
        <script dangerouslySetInnerHTML={{ __html: toggleScript }} />
      </header>

      <main id="main" className="wrap">
        <section className="hero" aria-labelledby="name">
          <h1 id="name">
            <span>{first}</span> <span>{rest.join(" ")}</span>
          </h1>
          <div className="grid">
            <div className="col">
              <p className="headline">{profile.headline}</p>
              {contact}
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="now" className="sec" aria-labelledby="now-h">
          <div className="grid">
            <div className="col sec-head">
              <h2 id="now-h">Now</h2>
              <p className="stamp">
                Updated <time>{updated}</time>
              </p>
            </div>
          </div>
          <ol className="log">
            {site.now.map((n, i) => (
              <li key={i} className="grid">
                <p className="when">{n.when}</p>
                <p className="col">
                  {i === 0 ? <mark>{n.text}</mark> : n.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="sec" aria-labelledby="work-h">
          <div className="grid">
            <h2 id="work-h" className="col">
              Work
            </h2>
          </div>
          {site.work.map((w) => (
            <article key={w.title} className="grid project">
              <div className="when">
                <p>{w.when}</p>
                <p className={`status status-${w.status.toLowerCase().replace(" ", "-")}`}>
                  <span className="dot" aria-hidden="true" />
                  {w.status}
                </p>
              </div>
              <div className="col">
                <h3>{w.link ? <External href={w.link}>{w.title}</External> : w.title}</h3>
                {w.image && <img src={w.image} alt="" className="shot" />}
                {w.summary.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {w.builtWith.length > 0 && <p className="built">Built with {w.builtWith.join(", ")}</p>}
              </div>
            </article>
          ))}
        </section>

        <section id="experience" className="sec" aria-labelledby="exp-h">
          <div className="grid">
            <h2 id="exp-h" className="col">
              Experience
            </h2>
          </div>
          {site.experience.map((e) => (
            <article key={e.org} className="grid entry">
              <p className="when">{e.when}</p>
              <div className="col">
                <h3>{e.org}</h3>
                <p className="role">
                  {e.role}, {e.location}
                </p>
                <ul className="bullets">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section id="education" className="sec" aria-labelledby="edu-h">
          <div className="grid">
            <h2 id="edu-h" className="col">
              Education
            </h2>
          </div>
          {site.education.map((e) => (
            <article key={e.school} className="grid entry">
              <p className="when">{e.when}</p>
              <div className="col">
                <h3>{e.school}</h3>
                <p className="role">
                  {e.degree}, {e.location}
                </p>
                {e.details.map((d, i) => (
                  <p key={i} className="detail">
                    {d}
                  </p>
                ))}
              </div>
            </article>
          ))}
          <dl className="skills">
            {site.skills.map((s) => (
              <div key={s.label} className="grid">
                <dt className="when">{s.label}</dt>
                <dd className="col">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="foot wrap">
        <div className="grid">
          <div className="col">
            {contact}
            <p className="fine">
              {profile.location}. Updated {updated}. Set in Archivo.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
