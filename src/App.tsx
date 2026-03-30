import { useEffect, useState } from "react";
import { Section } from "./components/Section";
import {
  contact,
  education,
  experience,
  lifeSection,
  links,
  skillGroups,
  travelTimelineImages
} from "./data/site-content";

const navItems = [
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9h4v12H3zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.8-2.05 4.07 0 4.82 2.68 4.82 6.16V21h-4v-5.52c0-1.32-.02-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.93V21h-4z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.36 22.92c.58.1.79-.25.79-.56l-.01-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.19 1.17a11.13 11.13 0 0 1 5.8 0c2.22-1.48 3.19-1.17 3.19-1.17.62 1.58.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.08.78 2.18l-.01 3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75Zm2.41-.75L12 9.44l6.59-4.94ZM19.5 6 12.45 11.3a.75.75 0 0 1-.9 0L4.5 6v12.75c0 .41.34.75.75.75h13.5c.41 0 .75-.34.75-.75Z" />
    </svg>
  );
}

const skillIconMap: Record<string, string> = {
  Java: "/icons/skills/openjdk.svg",
  Scala: "/icons/skills/scala.svg",
  Python: "/icons/skills/python.svg",
  JavaScript: "/icons/skills/javascript.svg",
  TypeScript: "/icons/skills/typescript.svg",
  Bash: "/icons/skills/gnubash.svg",
  Lua: "/icons/skills/lua.svg",
  SQL: "/icons/skills/postgresql.svg",
  MongoDB: "/icons/skills/mongodb.svg",
  React: "/icons/skills/react.svg",
  Redux: "/icons/skills/redux.svg",
  "Vue.js": "/icons/skills/vuedotjs.svg",
  Spring: "/icons/skills/spring.svg",
  Kafka: "/icons/skills/apachekafka.svg",
  Redis: "/icons/skills/redis.svg",
  AWS: "/icons/skills/amazonwebservices.svg",
  GCP: "/icons/skills/googlecloud.svg",
  Azure: "/icons/skills/microsoftazure.svg",
  Terraform: "/icons/skills/terraform.svg",
  Docker: "/icons/skills/docker.svg",
  Kubernetes: "/icons/skills/kubernetes.svg",
  OpenShift: "/icons/skills/redhatopenshift.svg",
  JUnit: "/icons/skills/junit5.svg",
  "CI/CD": "/icons/skills/githubactions.svg",
  Jenkins: "/icons/skills/jenkins.svg",
  Gradle: "/icons/skills/gradle.svg",
  Maven: "/icons/skills/apachemaven.svg",
  Postman: "/icons/skills/postman.svg",
  JMeter: "/icons/skills/apachejmeter.svg",
  Splunk: "/icons/skills/splunk.svg",
  Elasticsearch: "/icons/skills/elasticsearch.svg",
  "Apache Spark": "/icons/skills/apachespark.svg",
  Git: "/icons/skills/git.svg",
  GitLab: "/icons/skills/gitlab.svg",
  IAM: "/icons/skills/auth0.svg",
  "Claude Code": "/icons/skills/claude-ai-icon.svg"
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
};

function App() {
  const timelineTravelImage = travelTimelineImages[0] ?? lifeSection.image.src;
  const [travelSelections] = useState(() => {
    const pool = [...travelTimelineImages];
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    return pool.slice(0, 3);
  });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposState, setReposState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/braymond-dev/repos?sort=updated&per_page=100"
        );

        if (!response.ok) {
          throw new Error(`GitHub request failed: ${response.status}`);
        }

        const data = (await response.json()) as GitHubRepo[];
        const filtered = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((left, right) => {
            return new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime();
          })
          .slice(0, 6);

        const enriched = await Promise.all(
          filtered.map(async (repo) => {
            try {
              const topicsResponse = await fetch(
                `https://api.github.com/repos/braymond-dev/${repo.name}/topics`,
                {
                  headers: {
                    Accept: "application/vnd.github+json"
                  }
                }
              );

              if (!topicsResponse.ok) {
                return repo;
              }

              const topicsData = (await topicsResponse.json()) as { names?: string[] };
              return {
                ...repo,
                topics: topicsData.names ?? []
              };
            } catch {
              return repo;
            }
          })
        );

        if (!cancelled) {
          setRepos(enriched);
          setReposState("ready");
        }
      } catch {
        if (!cancelled) {
          setReposState("error");
        }
      }
    }

    void loadRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f5fffe_0%,#d8f7ff_28%,#ebfff5_62%,#ffffff_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[6%] top-20 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[8%] top-40 h-72 w-72 animate-float rounded-full bg-aurora/40 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-60 w-60 animate-drift rounded-full bg-lagoon/20 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-4 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/50 bg-white/45 px-6 py-4 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <a href="#" className="font-display text-lg font-semibold tracking-wide text-slate-900">
              Benjamin Raymond
            </a>
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-ocean hover:text-ocean"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-ocean hover:text-ocean"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-700 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-ocean">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-10 pt-28 md:pb-14 md:pt-32">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-hero-radial p-8 shadow-soft backdrop-blur-xl md:p-12">
          <div className="max-w-4xl space-y-6 animate-reveal">
            <p className="text-sm uppercase tracking-[0.34em] text-ocean">Software Engineer Portfolio</p>
            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-none text-slate-950 md:text-7xl">
                Full stack engineer with a bias for action and attention to detail
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                I am a passionate software engineer who's been in the profession for over 6 years. I'm most concerned
                with getting the job done and doing it well. I appreciate good tooling, clear communication, and great
                working relationships. Scroll down to learn more!
              </p>
            </div>
          </div>
        </section>

        <Section
          id="skills"
          eyebrow="Skills"
          title="Skills"
          intro=""
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(223,248,255,0.68))] p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-slate-900">{group.title}</h3>
                  <div className="h-10 w-10 rounded-full bg-white/80 shadow-inner" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-2 text-xs font-semibold tracking-[0.08em] text-slate-700 shadow-[0_8px_22px_rgba(12,127,166,0.08)]"
                    >
                      {skillIconMap[item] ? (
                        <img
                          src={skillIconMap[item]}
                          alt=""
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0"
                          loading="lazy"
                        />
                      ) : null}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="resume"
          eyebrow="Resume"
          title=""
          intro=""
        >
          <div className="space-y-4">
            <div className="rounded-[1.9rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(223,248,255,0.54))] p-6 md:p-8">
              <div className="relative pl-8 md:pl-12">
                <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-white via-lagoon/60 to-aurora md:left-5" />
                <div className="space-y-8">
                  {experience.map((role, index) => (
                    <article key={`${role.company}-${role.title}`} className="relative">
                      <div className="absolute left-[-2.15rem] top-7 h-4 w-4 rounded-full border-4 border-white bg-ocean shadow-glow md:left-[-2.7rem]" />
                      <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl transition hover:-translate-y-1">
                        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                          <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                            <div className="overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/60">
                              <img
                                src={role.image.src}
                                alt={role.image.alt}
                                loading="lazy"
                                className="h-64 w-full object-cover"
                              />
                              <div className="px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                                <span>{role.image.caption}</span>
                              </div>
                            </div>
                          </div>
                          <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-ocean">
                                  {index === 0 ? "Current Role" : "Previous Role"}
                                </p>
                                <h4 className="mt-2 font-display text-2xl text-slate-900">{role.title}</h4>
                                <p className="mt-1 text-base font-semibold text-slate-700">
                                  {role.company} · {role.location}
                                </p>
                              </div>
                              <p className="rounded-full border border-lagoon/30 bg-cloud/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                                {role.date}
                              </p>
                            </div>
                            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                              {role.bullets.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5">
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Tech Stack</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {role.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full border border-lagoon/25 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                  <article className="relative">
                    <div className="absolute left-[-2.15rem] top-7 h-4 w-4 rounded-full border-4 border-white bg-pine shadow-glow md:left-[-2.7rem]" />
                    <div className="rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(223,255,232,0.72),rgba(255,255,255,0.84))] p-6 shadow-soft backdrop-blur-xl">
                      <div className="mb-5 overflow-x-auto rounded-[1.35rem] border border-white/70 bg-white/60 p-3">
                        <div className="flex w-max gap-3">
                          {(travelSelections.length > 0 ? travelSelections : [timelineTravelImage]).map((imagePath, index) => (
                            <img
                              key={imagePath}
                              src={imagePath}
                              alt={`Travel highlight ${index + 1}`}
                              loading="lazy"
                              className="h-56 w-auto max-w-none rounded-[1rem] bg-white/70 object-contain"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-pine">Intermission</p>
                          <h4 className="mt-2 font-display text-2xl text-slate-900">{lifeSection.title}</h4>
                        </div>
                        <p className="rounded-full border border-aurora/40 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                          {lifeSection.date}
                        </p>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-slate-700">{lifeSection.body}</p>
                    </div>
                  </article>

                  {education.map((item) => (
                    <article key={item.title} className="relative">
                      <div className="absolute left-[-2.15rem] top-7 h-4 w-4 rounded-full border-4 border-white bg-lagoon shadow-glow md:left-[-2.7rem]" />
                      <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl">
                        <div className="mb-5 overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/60">
                          <img
                            src={item.image.src}
                            alt={item.image.alt}
                            loading="lazy"
                            className="h-48 w-full object-cover object-[78%_center] md:object-[88%_center]"
                          />
                          <div className="px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                            <span>{item.image.caption}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-ocean">Foundation</p>
                            <h4 className="mt-2 font-display text-2xl text-slate-900">Education</h4>
                            <p className="mt-2 text-base font-semibold text-slate-800">{item.title}</p>
                            <p className="mt-1 text-sm text-slate-600">
                              {item.org} · {item.location}
                            </p>
                          </div>
                          <p className="rounded-full border border-lagoon/30 bg-cloud/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Section>

        <Section
          id="projects"
          eyebrow="Projects"
          title="Github Projects"
          intro=""
          aside={
            <div className="rounded-[1.75rem] border border-white/70 bg-white/60 p-6">
              <p className="font-display text-xl text-slate-900">Full GitHub</p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Browse the complete profile for all repositories, contribution history, and project details beyond the
                featured cards here.
              </p>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-ocean hover:text-ocean"
              >
                <GitHubIcon />
                Review Code on GitHub
              </a>
            </div>
          }
        >
          {reposState === "loading" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={index}
                  className="rounded-[1.75rem] border border-white/70 bg-white/70 p-6 shadow-soft"
                >
                  <div className="h-3 w-24 rounded-full bg-lagoon/20" />
                  <div className="mt-4 h-7 w-2/3 rounded-full bg-slate-200/80" />
                  <div className="mt-4 h-20 rounded-[1rem] bg-slate-100/90" />
                </article>
              ))}
            </div>
          ) : null}

          {reposState === "error" ? (
            <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-6 text-sm leading-7 text-slate-700">
              GitHub projects could not be loaded right now.
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="ml-2 font-semibold text-ocean"
              >
                View the full profile on GitHub.
              </a>
            </div>
          ) : null}

          {reposState === "ready" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.75rem] border border-lagoon/30 bg-white/70 p-6 shadow-[inset_0_0_0_1px_rgba(55,181,214,0.12)] transition hover:-translate-y-1 hover:border-lagoon/40 hover:shadow-soft"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-ocean">
                      {repo.language ?? "Repository"}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {repo.stargazers_count} stars
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-slate-900">{repo.name}</h3>
                  <p className="mt-4 min-h-24 text-sm leading-7 text-slate-700">
                    {repo.description ?? "Open the repository to view project details, code, and recent activity."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[repo.language, ...(repo.topics ?? [])].filter(Boolean).slice(0, 6).map((tag) => (
                      <span
                        key={`${repo.id}-${tag}`}
                        className="rounded-full border border-lagoon/25 bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                    <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    <span className="font-semibold text-ocean transition group-hover:text-pine">Open Repo</span>
                  </div>
                </a>
              ))}
            </div>
          ) : null}
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title=""
          intro=""
        >
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-white/70 bg-white/60 p-6 text-sm text-slate-700">
              <p>{contact.email}</p>
              <p className="mt-2">{contact.location}</p>
            </div>
            <div className="flex flex-wrap gap-4">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine"
            >
              <LinkedInIcon />
              Connect on LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-ocean hover:text-ocean"
            >
              <GitHubIcon />
              Review Code on GitHub
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-ocean hover:text-ocean"
            >
              <MailIcon />
              Email Ben
            </a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
