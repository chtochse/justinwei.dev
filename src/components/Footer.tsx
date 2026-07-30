import { site } from "@/content/site";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t py-8"
      style={{
        marginLeft: "var(--gutter)",
        marginRight: "var(--gutter)",
      }}
    >
      <div className="edge flex flex-col gap-2 text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Next.js · Tailwind CSS</p>
      </div>
    </footer>
  );
}
