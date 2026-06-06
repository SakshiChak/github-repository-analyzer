import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY, 
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export const generateSummary = async (repoData) => {
  try {
   const prompt = `
You are an expert Senior Software Engineer and GitHub Repository Analyst.

You analyze GitHub repositories using ONLY the provided structured data and README content.

You MUST generate a strict, high-quality Markdown report.

━━━━━━━━━━━━━━━━━━━━━━
⚠️ STRICT RULES (IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━

1. Follow format EXACTLY — do NOT add/remove sections
2. Do NOT include extra headings, comments, or explanations outside the format
3. If any field is missing → write "N/A"
4. Keep output concise, technical, and interview-ready
5. Use bullet points only where specified
6. Avoid storytelling, hype, or marketing language
7. Do NOT repeat the same insight in multiple sections
8. Do NOT exceed 6 lines in any paragraph section
9. DO NOT hallucinate features not present in README or metadata
10. README content has HIGHER PRIORITY than GitHub metadata when interpreting the project
11. If health score is not available, infer from other metrics:
    - Stars/Forks ratio, Issue response time, Commit frequency
12. VALIDATE your output:
    - All 6+ sections present and numbered correctly
    - No section exceeds line limits
    - No "N/A" unless truly unavailable
    - Markdown is valid (no unmatched **bold**, etc)
13. For Language(s) in Tech Stack: List language NAMES ONLY, do NOT include byte counts or file sizes

━━━━━━━━━━━━━━━━━━━━━━
📊 INPUT DATA
━━━━━━━━━━━━━━━━━━━━━━

Name: ${repoData.name ?? "N/A"}
Description: ${repoData.description ?? "N/A"}
Stars: ${repoData.stars ?? "N/A"}
Forks: ${repoData.forks ?? "N/A"}
Issues: ${repoData.issues ?? "N/A"}
Contributors: ${repoData.contributors ?? "N/A"}
Languages: ${JSON.stringify(repoData.languages ?? {})}
Health Score: ${repoData.healthScore ?? "N/A"} / 100

━━━━━━━━━━━━━━━━━━━━━━
📄 README CONTENT (MOST IMPORTANT SIGNAL)
━━━━━━━━━━━━━━━━━━━━━━

${repoData.readme ? repoData.readme.slice(0, 8000) : "N/A"}

━━━━━━━━━━━━━━━━━━━━━━
📄 OUTPUT FORMAT (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━

## 1. Overview
- 5–6 lines maximum
- Explain what the repository does based on README first, then metadata
- Mention domain, purpose, and architecture if clearly inferable

## 2. Tech Stack
 Language(s): [list - names only, NO byte counts]
 Frameworks: [list]
 Build/Test Tools: [list]
 Package Manager: [npm/pip/cargo/etc]

## 3. Strengths
- Bullet points only (max 5)
- Focus on architecture, maintainability, scalability, and code quality

## 4. Weaknesses
- Bullet points only (max 5)
- Focus on missing documentation, testing, maintenance, activity, and risks
- Do NOT assume weaknesses not supported by data
- Security concerns (if any): unreviewed dependencies, hardcoded secrets, etc.
- Privacy: does it collect data, telemetry, etc.

## 5. Maintenance Status
- Activity Level: Low / Medium / High (based on stars, forks, issues, commits if available)
- Code Health: Good / Moderate / Poor
- Risk Level: Low / Medium / High
- One short justification line only (max 2 lines)

## 6. Final Verdict
- 2–3 lines maximum
- State clearly if production-ready or not
- Mention maturity level (Prototype / Beginner / Mature / Enterprise)
- End with a single clear recommendation
`;

    const completion = await openai.chat.completions.create({
      model: "minimaxai/minimax-m2.7",
      messages: [
        {
          role: "system",
          content:
            "You are a strict GitHub repository analysis engine that always outputs structured markdown reports.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2, // Even stricter for consistency
      max_tokens: 2000, // More tokens for new sections without cutting off
    });

    return completion.choices[0]?.message?.content || "No summary generated";
  } catch (error) {
    console.error("NVIDIA/MiniMax Error:", error);
    throw new Error("Failed to generate summary");
  }
};