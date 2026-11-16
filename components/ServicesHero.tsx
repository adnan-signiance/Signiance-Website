import PageHero from "./PageHero";
import { services } from "@/lib/data";

/**
 * Services: the promise as the title, the five practices beside the introduction as a plain
 * index that jumps to each one further down the page.
 */
export default function ServicesHero() {
  return (
    <PageHero
      title="AI that runs in production"
      lead={
        <p>
          Five practices, one goal: agents, RAG, MVPs, copilots and the cloud foundation underneath them. Every
          engagement is scoped in a week, built by the people you meet on the first call, and shipped with everything
          it needs to survive real users.
        </p>
      }
      aside={
        <ul className="hero-index">
          {services.map((sv) => (
            <li key={sv.id}>
              <a href={`#${sv.id}`}>
                <span>{sv.short}</span>
                <span aria-hidden="true">&darr;</span>
              </a>
            </li>
          ))}
        </ul>
      }
    >
      <ul className="hero-checks">
        <li>Fixed-fee scoping, credited to the build</li>
        <li>Production-ready, not demo-ready</li>
      </ul>
    </PageHero>
  );
}
