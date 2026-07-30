import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  // Location is folded in as a final row; email stays in Contact, where
  // repeating it here would just pad the page.
  const facts = [...site.facts, { label: "Location", value: site.location }];

  return (
    <Section id="about" index="01" title="About">
      {/*
        Prose left, facts flush right. Same principle as the editorial rows in
        Projects and Beyond: the width is filled with two different kinds of
        content rather than one stretched paragraph.
      */}
      <div className="md:grid md:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] md:gap-x-10">
        <div className="space-y-5">
          {site.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-pretty text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        {facts.length > 0 && (
          <Reveal delay={0.1} className="mt-12 md:mt-0 md:justify-self-end">
            {/* Right-aligned label over value, rather than the label/value
                columns used elsewhere — at this width a two-column grid would
                leave a gutter wide enough to read as a mistake. */}
            <dl className="space-y-4 md:text-right">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="edge text-faint">{fact.label}</dt>
                  <dd className="micro mt-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
