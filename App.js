import { useState, useRef } from "react";

const QUESTIONS = [
  { id: 1,  trap: "Sunk Cost",          reverse: true,  text: "When a project I've invested heavily in starts failing, I find it hard to walk away even when the evidence says I should." },
  { id: 2,  trap: "Outcome Bias",       reverse: true,  text: "After a decision goes badly, I question whether it was a good decision — even if my reasoning was sound at the time." },
  { id: 3,  trap: "Process",            reverse: false, text: "Before making a significant decision, I can clearly articulate what I know, what I don't know, and what I'm assuming." },
  { id: 4,  trap: "Confirmation Bias",  reverse: false, text: "I actively seek out perspectives that challenge my initial view before finalizing an important decision." },
  { id: 5,  trap: "Groupthink",         reverse: true,  text: "In group settings, I find myself adjusting my opinion to match the room — even when I privately disagree." },
  { id: 6,  trap: "Options",            reverse: false, text: "I routinely consider at least three real options before committing to a course of action." },
  { id: 7,  trap: "Anchoring",          reverse: true,  text: "The first number or option I encounter in a negotiation or decision tends to heavily influence my final choice." },
  { id: 8,  trap: "Loss Aversion",      reverse: true,  text: "The fear of losing what I have influences my decisions more than the potential to gain something better." },
  { id: 9,  trap: "Recording",          reverse: false, text: "I document the reasoning behind significant decisions so I can review them later — not just what I decided, but why." },
  { id: 10, trap: "Urgency",            reverse: false, text: "I can distinguish between real urgency and manufactured urgency when making decisions under pressure." },
  { id: 11, trap: "Outcome Bias",       reverse: true,  text: "I evaluate decisions differently depending on whether they turned out well or badly." },
  { id: 12, trap: "Inaction",           reverse: false, text: "I recognize that choosing not to decide is itself a decision with consequences." },
  { id: 13, trap: "Confirmation Bias",  reverse: false, text: "I can name the strongest argument against a position I currently hold." },
  { id: 14, trap: "Sunk Cost",          reverse: false, text: "I base decisions on future potential — not on what I've already invested." },
  { id: 15, trap: "Stakes",             reverse: false, text: "I calibrate the time and energy I spend on a decision to its actual stakes — rather than treating all decisions the same." },
  { id: 16, trap: "Groupthink",         reverse: false, text: "I create space for dissent and minority opinions before reaching group consensus." },
  { id: 17, trap: "Loss Aversion",      reverse: true,  text: "I hold onto losing positions — jobs, relationships, investments — longer than rational analysis would support." },
  { id: 18, trap: "Process",            reverse: false, text: "I have a consistent process I apply to significant decisions — not just gut instinct." },
];

const ARCHETYPES = [
  {
    min: 85, max: 100,
    name: "The Strategist", symbol: "♠", color: "#C8A96E",
    tagline: "Deliberate. Process-driven. Bias-aware.",
    summary: "You operate with a level of decision discipline that most professionals never develop. You separate process from outcome, manage cognitive traps actively, and bring structured thinking to high-stakes situations. Your decisions aren't always right — but they're defensible, and you learn from both outcomes.",
    strengths: ["Strong process discipline under pressure", "Actively seeks contrary evidence before deciding", "Evaluates decisions on reasoning, not results"],
    watchouts: ["Overthinking low-stakes decisions", "Frustration when others don't apply the same rigour", "Analysis paralysis on genuinely uncertain calls"],
    next: "You're operating at a high level. The next frontier is speed — making sharp decisions faster without sacrificing quality. Consider how you can compress your process for time-sensitive situations.",
  },
  {
    min: 68, max: 84,
    name: "The Analyst", symbol: "♦", color: "#A8C5DA",
    tagline: "Thorough. Thoughtful. Occasionally slow.",
    summary: "You think carefully before deciding and generally avoid the most obvious cognitive traps. Your strength is in gathering and weighing information. Your vulnerability is speed — you can get caught in analysis loops, and under pressure your process sometimes collapses into gut instinct.",
    strengths: ["Strong information-gathering before deciding", "Generally aware of your own biases", "Comfortable with complexity and nuance"],
    watchouts: ["Slow to decide when speed matters", "Process weakens significantly under time pressure", "Tendency to over-research rather than act on good-enough information"],
    next: "Focus on building a faster trap-check habit — a 60-second mental audit you can run even under pressure. The goal isn't perfection, it's defensibility.",
  },
  {
    min: 50, max: 67,
    name: "The Reactor", symbol: "♣", color: "#C8A96E",
    tagline: "Fast. Confident. Inconsistently right.",
    summary: "You decide quickly and often confidently — which is a genuine asset in fast-moving situations. But your consistency is your gap. On good days your instincts serve you well. On bad days, cognitive traps run unchecked and you mistake confidence for competence. Your results are higher-variance than they need to be.",
    strengths: ["Decisive under pressure", "Comfortable with ambiguity", "High action bias — you move when others freeze"],
    watchouts: ["Sunk cost and loss aversion operating unchecked", "Outcome bias — judging past decisions by results, not process", "Resistance to slowing down even when stakes are high"],
    next: "The highest-leverage change you can make: before any significant decision, write down your reasoning in one paragraph. This single habit will catch more errors than any other change.",
  },
  {
    min: 33, max: 49,
    name: "The Drifter", symbol: "♥", color: "#DA8A8A",
    tagline: "Cautious. Reactive. Conflict-averse.",
    summary: "You tend to avoid decisions — especially difficult, high-stakes, or socially uncomfortable ones. This often looks like patience or humility, but it's frequently a form of loss aversion: the pain of making a wrong call feels worse than the cost of not deciding. Others often make decisions for you by default.",
    strengths: ["Low impulsivity — you rarely make rash calls", "Sensitive to group dynamics and interpersonal impact", "Often the voice of caution in overconfident teams"],
    watchouts: ["Inaction treated as a neutral choice when it isn't", "Over-reliance on consensus to avoid ownership", "Sunk cost and status quo bias keeping you stuck"],
    next: "Start small. Pick one low-stakes decision you've been avoiding and make it this week — with a written rationale. Decision-making is a skill, and it atrophies without practice.",
  },
  {
    min: 0, max: 32,
    name: "The Passenger", symbol: "✦", color: "#888888",
    tagline: "Reactive. Unaware. High potential.",
    summary: "Right now, decisions are largely happening to you rather than by you. This isn't a character flaw — it's a skill gap. Most people are never taught to think deliberately about how they decide. The fact that you're here, taking this assessment, already puts you ahead of most.",
    strengths: ["High upside — awareness is the starting point for everything", "Openness to learning (you're here)", "Less anchored to existing habits than high-scorers"],
    watchouts: ["Cognitive traps operating completely unchecked", "Decisions driven by emotion, social pressure, or avoidance", "Outcomes being attributed to luck rather than process"],
    next: "Start with one concept from this assessment — pick the trap that resonated most — and spend one week noticing when it shows up. Awareness before action. That's the whole game at this stage.",
  },
];

const LABELS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

function getArchetype(score) {
  return ARCHETYPES.find((a) => score >= a.min && score <= a.max) || ARCHETYPES[4];
}

function calcScore(answers) {
  let total = 0;
  QUESTIONS.forEach((q) => {
    const raw = answers[q.id] ?? 3;
    const val = q.reverse ? 6 - raw : raw;
    total += val;
  });
  return Math.round((total / (QUESTIONS.length * 5)) * 100);
}

// ── SHARED STYLES ──
const bg = {
  minHeight: "100vh",
  background: "#0A0A0A",
  color: "#E8D5B7",
  fontFamily: "'Georgia', 'Times New Roman', serif",
  position: "relative",
};
const btn = (extra = {}) => ({
  border: "none", borderRadius: 12, padding: "16px 40px",
  fontSize: 15, fontWeight: "bold", cursor: "pointer",
  letterSpacing: "0.05em", fontFamily: "inherit",
  transition: "opacity 0.15s", ...extra,
});
const card = (extra = {}) => ({
  background: "#111", border: "1px solid #222",
  borderRadius: 16, padding: 24, ...extra,
});

// ════════════════════════════════════════════
// SCREENS
// ════════════════════════════════════════════

function IntroScreen({ onStart }) {
  return (
    <div style={bg}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#C8A96E" }} />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#C8A96E", marginBottom: 16, textTransform: "uppercase" }}>
          BlueChip People Strategies
        </div>
        <h1 style={{ fontSize: 52, fontWeight: "bold", lineHeight: 1.1, marginBottom: 8, color: "#E8D5B7" }}>
          Decision<br /><span style={{ color: "#C8A96E" }}>Quality</span><br />Index
        </h1>
        <div style={{ width: 60, height: 2, background: "#C8A96E", margin: "20px 0" }} />
        <p style={{ fontSize: 15, color: "#888", lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
          18 questions. 5 minutes. A precise read on how you actually make decisions — and where your thinking breaks down under pressure.
        </p>
        <div style={card({ marginBottom: 32 })}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#C8A96E", marginBottom: 16, textTransform: "uppercase" }}>
            You'll discover
          </div>
          {[
            "Your Decision Quality Score out of 100",
            "Your decision-maker archetype",
            "The specific traps most likely to derail you",
            "Personalized next steps to sharpen your thinking",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <div style={{ color: "#C8A96E", fontSize: 12, marginTop: 2, flexShrink: 0 }}>◆</div>
              <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#555", marginBottom: 24, lineHeight: 1.7 }}>
          Answer based on how you <em style={{ color: "#888" }}>actually</em> behave — not how you wish you did.
        </p>
        <button onClick={onStart} style={btn({ background: "#C8A96E", color: "#0A0A0A", width: "100%" })}>
          Begin Assessment →
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#444" }}>
          5 archetypes · 18 questions · Free
        </div>
      </div>
    </div>
  );
}

function AssessmentScreen({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animIn, setAnimIn] = useState(true);

  const q = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);

  const choose = (val) => {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = { ...answers, [q.id]: val };
      setAnswers(newAnswers);
      if (current < QUESTIONS.length - 1) {
        setAnimIn(false);
        setTimeout(() => { setCurrent(c => c + 1); setSelected(null); setAnimIn(true); }, 220);
      } else {
        onComplete(calcScore(newAnswers));
      }
    }, 300);
  };

  return (
    <div style={bg}>
      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#1A1A1A" }}>
        <div style={{ height: 4, background: "#C8A96E", width: `${progress}%`, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#C8A96E", textTransform: "uppercase" }}>
            Decision Quality Index
          </div>
          <div style={{ fontSize: 12, color: "#555" }}>
            {current + 1} <span style={{ color: "#333" }}>/ {QUESTIONS.length}</span>
          </div>
        </div>
        <div style={{
          display: "inline-block", fontSize: 9, letterSpacing: "0.3em",
          color: "#555", background: "#111", border: "1px solid #222",
          borderRadius: 6, padding: "4px 10px", marginBottom: 20, textTransform: "uppercase",
        }}>
          {q.trap}
        </div>
        <div style={{
          fontSize: 20, fontWeight: "bold", lineHeight: 1.5, color: "#E8D5B7", marginBottom: 48,
          opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}>
          {q.text}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {LABELS.map((label, i) => {
            const val = i + 1;
            const isSel = selected === val;
            return (
              <button key={val} onClick={() => choose(val)} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 20px", borderRadius: 12, cursor: "pointer",
                border: isSel ? "1px solid #C8A96E" : "1px solid #1E1E1E",
                background: isSel ? "rgba(200,169,110,0.12)" : "#111",
                color: isSel ? "#C8A96E" : "#888",
                fontFamily: "inherit", fontSize: 14,
                transition: "all 0.15s ease", textAlign: "left",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  border: isSel ? "2px solid #C8A96E" : "2px solid #2A2A2A",
                  background: isSel ? "#C8A96E" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s ease",
                }}>
                  {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0A0A0A" }} />}
                </div>
                <span style={{ fontWeight: isSel ? "bold" : "normal" }}>{label}</span>
              </button>
            );
          })}
        </div>
        {current > 0 && (
          <button onClick={() => { setCurrent(c => c - 1); setSelected(null); }}
            style={{ background: "transparent", border: "none", color: "#444", fontSize: 12, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            ← Previous
          </button>
        )}
      </div>
    </div>
  );
}

function EmailGateScreen({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");

    // ── REPLACE THIS URL with your own form endpoint ──
    // Options:
    // 1. Tally: https://tally.so/r/YOUR_FORM_ID (set up a hidden form, post via fetch)
    // 2. Formspree: https://formspree.io/f/YOUR_ID
    // 3. Kit (ConvertKit): use their API
    // For now we just pass through — swap in your endpoint below
    const ENDPOINT = process.env.REACT_APP_EMAIL_ENDPOINT || "";

    if (ENDPOINT) {
      try {
        await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name }),
        });
      } catch (e) {
        // Fail silently — don't block the user from their results
        console.error("Email submit error:", e);
      }
    }

    setLoading(false);
    onSubmit({ email, name });
  };

  return (
    <div style={bg}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#C8A96E" }} />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "80px 24px" }}>
        {/* Progress complete indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(200,169,110,0.15)", border: "1px solid #C8A96E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#C8A96E", fontSize: 16 }}>✓</span>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#C8A96E", fontWeight: "bold" }}>Assessment complete</div>
            <div style={{ fontSize: 11, color: "#555" }}>Your results are ready</div>
          </div>
        </div>

        <h2 style={{ fontSize: 30, fontWeight: "bold", color: "#E8D5B7", lineHeight: 1.3, marginBottom: 12 }}>
          Where should we<br />send your results?
        </h2>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 36 }}>
          Enter your details below to see your Decision Quality Score, your archetype, and your personalized next steps.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              background: "#111", border: "1px solid #222", borderRadius: 10,
              padding: "14px 18px", color: "#E8D5B7", fontSize: 15,
              fontFamily: "inherit", outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#C8A96E"}
            onBlur={e => e.target.style.borderColor = "#222"}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              background: "#111", border: `1px solid ${error ? "#DA8A8A" : "#222"}`, borderRadius: 10,
              padding: "14px 18px", color: "#E8D5B7", fontSize: 15,
              fontFamily: "inherit", outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#C8A96E"}
            onBlur={e => e.target.style.borderColor = error ? "#DA8A8A" : "#222"}
          />
          {error && <div style={{ fontSize: 12, color: "#DA8A8A", marginTop: -6 }}>{error}</div>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={btn({
            background: "#C8A96E", color: "#0A0A0A", width: "100%",
            opacity: loading ? 0.7 : 1,
          })}
        >
          {loading ? "One moment..." : "See My Results →"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#333" }}>🔒</div>
          <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5 }}>
            No spam. No selling your data. Just your results and occasional insights from BlueChip.
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ score, name, onRestart }) {
  const archetype = getArchetype(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const firstName = name ? name.split(" ")[0] : null;

  return (
    <div style={bg}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: archetype.color }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 70% 20%, ${archetype.color}12 0%, transparent 50%)`,
      }} />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#555", marginBottom: 32, textTransform: "uppercase" }}>
          BlueChip People Strategies · Decision Quality Index
        </div>

        {firstName && (
          <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Here are your results, {firstName}.
          </div>
        )}

        {/* Score ring + archetype */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 32 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <svg width={128} height={128} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={64} cy={64} r={54} fill="none" stroke="#1A1A1A" strokeWidth={8} />
              <circle cx={64} cy={64} r={54} fill="none" stroke={archetype.color} strokeWidth={8}
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: archetype.color, lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.1em" }}>/ 100</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Your archetype</div>
            <div style={{ fontSize: 32, color: archetype.color, marginBottom: 2 }}>{archetype.symbol}</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "#E8D5B7", lineHeight: 1.2 }}>{archetype.name}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4, fontStyle: "italic" }}>{archetype.tagline}</div>
          </div>
        </div>

        <div style={{ height: 1, background: "#1E1E1E", marginBottom: 28 }} />
        <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.8, marginBottom: 28 }}>{archetype.summary}</div>

        {/* Strengths + Watchouts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Strengths", items: archetype.strengths, col: "#C8A96E" },
            { label: "Watch outs", items: archetype.watchouts, col: "#DA8A8A" },
          ].map(({ label, items, col }) => (
            <div key={label} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.3em", color: col, textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                  <div style={{ color: col, fontSize: 8, marginTop: 4, flexShrink: 0 }}>◆</div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{item}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Next step */}
        <div style={{ background: "#111", borderLeft: `3px solid ${archetype.color}`, borderRadius: "0 12px 12px 0", padding: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", color: archetype.color, textTransform: "uppercase", marginBottom: 10 }}>Your next move</div>
          <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.7 }}>{archetype.next}</div>
        </div>

        {/* CTA */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 24, marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#E8D5B7", marginBottom: 8 }}>
            Go deeper on your decision quality
          </div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 20, lineHeight: 1.6 }}>
            The Think Better. Decide Faster. playbook covers all 6 traps in depth — with real examples, self-checks, and the full Decision Quality Framework.
          </div>
          <a
            href="https://bluechip-people-strategies.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block", background: "#C8A96E", color: "#0A0A0A",
              borderRadius: 10, padding: "12px 28px", fontSize: 13,
              fontWeight: "bold", letterSpacing: "0.04em", textDecoration: "none",
            }}
          >
            Get the Playbook — $19
          </a>
          <div style={{ fontSize: 11, color: "#444", marginTop: 12 }}>bluechip-people-strategies.com</div>
        </div>

        <button onClick={onRestart} style={btn({
          width: "100%", background: "transparent", border: "1px solid #222",
          borderRadius: 10, padding: "12px", fontSize: 12, color: "#555",
        })}>
          Retake the assessment
        </button>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: "#333" }}>
          © BlueChip People Strategies
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════
export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | assessment | gate | result
  const [score, setScore] = useState(null);
  const [userName, setUserName] = useState("");

  const handleAssessmentComplete = (s) => {
    setScore(s);
    setPhase("gate");
  };

  const handleEmailSubmit = ({ name }) => {
    setUserName(name);
    setPhase("result");
  };

  const handleRestart = () => {
    setPhase("intro");
    setScore(null);
    setUserName("");
  };

  if (phase === "intro")      return <IntroScreen onStart={() => setPhase("assessment")} />;
  if (phase === "assessment") return <AssessmentScreen onComplete={handleAssessmentComplete} />;
  if (phase === "gate")       return <EmailGateScreen onSubmit={handleEmailSubmit} />;
  if (phase === "result")     return <ResultScreen score={score} name={userName} onRestart={handleRestart} />;
  return null;
}
