import { projects, type Project } from "@/content/projects";
import { Row, Section } from "./Section";

/** Tags stack down the metadata rail; the year leads it on its own line. */
function Meta({ project }: { project: Project }) {
  return (
    <>
      {project.year && <p className="edge">{project.year}</p>}
      {project.tags.length > 0 && (
        <ul className="mt-2 space-y-0.5 font-mono text-[0.75rem]">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function Projects() {
  return (
    <Section id="projects" index="02" title="Projects">
      <ul className="divide-y">
        {projects.map((project, i) => {
          // The title links to the demo if there is one, else the repo. Falls
          // back to plain text so a project with neither still renders.
          const primary = project.demo ?? project.github;

          return (
            <Row
              key={project.title}
              delay={i * 0.04}
              meta={<Meta project={project} />}
              trailing={
                <>
                  {/*
                    The index leads the trailing rail so the column is never
                    empty. Only one of these three projects currently has a
                    link, and without the number the right edge collapsed on
                    the other two and the rows stopped looking aligned.
                  */}
                  <p className="edge text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  {(project.github || project.demo) && (
                    <ul className="mt-3 space-y-1">
                      {project.demo && (
                        <li>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="edge link text-muted-foreground transition-colors hover:text-foreground"
                          >
                            Demo&nbsp;&#8599;
                          </a>
                        </li>
                      )}
                      {project.github && (
                        <li>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="edge link text-muted-foreground transition-colors hover:text-foreground"
                          >
                            GitHub&nbsp;&#8599;
                          </a>
                        </li>
                      )}
                    </ul>
                  )}
                </>
              }
            >
              <div className="flex items-baseline gap-2">
                <h3 className="title">
                  {primary ? (
                    <a
                      href={primary}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link decoration-[0.5px]"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                {project.featured && (
                  <span aria-hidden className="text-[0.6875rem] text-faint">
                    ★
                  </span>
                )}
              </div>

              <p className="mt-3 text-pretty text-muted-foreground">
                {project.description}
              </p>
            </Row>
          );
        })}
      </ul>
    </Section>
  );
}
