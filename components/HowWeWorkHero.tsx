import PageHero from "./PageHero";

const points = [
  "Fixed-fee scoping, credited to the build",
  "Senior-only pods, no bench time",
  "You own the code and runbook",
];

/**
 * How we work: the method's name as the title, what the first week gives you beside the
 * introduction.
 */
export default function HowWeWorkHero() {
  return (
    <PageHero
      title="The Thin Slice Method"
      lead={
        <>
          <p>
            Ship one workflow before you commit to a roadmap. Every engagement starts the same way: one workflow,
            measured against a number you pick, scoped in a week.
          </p>
          <p>No pyramid staffing. The people who scope it also build it.</p>
        </>
      }
      aside={
        <div className="hero-sheet">
          <h2>You leave week one with</h2>
          <ul>
            <li>A measured baseline</li>
            <li>A build plan and estimate</li>
            <li>A go or no-go, and the plan is yours either way</li>
          </ul>
        </div>
      }
    >
      <ul className="hero-checks">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </PageHero>
  );
}
