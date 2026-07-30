import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SocialIcon } from "./SocialIcon";

export function Contact() {
  // Mail socials are skipped: email already has its own row below, and a
  // mailto: href has no sensible URL to display.
  const socials = site.socials.filter((social) => social.icon !== "mail");

  return (
    <Section id="contact" index="04" title="Contact">
      <div className="md:grid md:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] md:gap-x-10">
        <Reveal>
          <p className="title max-w-xl text-pretty">
            I&apos;m always happy to hear about interesting projects,
            opportunities, or just to talk about something I&apos;ve built.
          </p>
          <p className="mt-4 text-muted-foreground">
            The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 md:mt-0 md:justify-self-end">
          <dl className="space-y-4 md:text-right">
            <div>
              <dt className="edge text-faint">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </dd>
            </div>

            {socials.map((social) => (
              <div key={social.href}>
                <dt className="edge text-faint">{social.label}</dt>
                <dd className="mt-1">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center gap-1.5"
                  >
                    <SocialIcon icon={social.icon} className="size-3.5" />
                    {social.href.replace(/^https?:\/\/(www\.)?|\/$/g, "")}
                  </a>
                </dd>
              </div>
            ))}

            {site.resume && (
              <div>
                <dt className="edge text-faint">Resume</dt>
                <dd className="mt-1">
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Download PDF&nbsp;&#8599;
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
