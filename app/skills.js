// Skillbar catalog. Edit this file to add your own skills, then run ./build.sh again.
// Each item: id, cat, pkg, name, cmd, what, when, and optionally ex, how[], note, rel[], list[], checklist[], steps[], link.

const CATS = [
  { id: 'plan', name: 'Before you start', desc: 'Get clear on what you want and plan it' },
  { id: 'code', name: 'Code and bugs', desc: 'Write, test, debug, review' },
  { id: 'learn', name: 'Learning', desc: 'When you are picking up a new language or topic' },
  { id: 'context', name: 'Project memory', desc: 'Understand a project, remember where you left off' },
  { id: 'ui', name: 'UI and motion', desc: 'Websites and app screens' },
  { id: 'seo', name: 'Search visibility', desc: 'Google and AI search like ChatGPT' },
  { id: 'mkt', name: 'Marketing and launch', desc: 'Copy, store pages, pricing, pitch' },
  { id: 'sec', name: 'Security', desc: 'Find holes before you ship' },
  { id: 'acad', name: 'Academic writing', desc: 'Papers, reports, theses, literature' },
  { id: 'notes', name: 'Notes (Obsidian)', desc: 'Working inside a notes vault' },
  { id: 'tools', name: 'Terminal tools', desc: 'Separate programs, not skills' }
];

const MP = 'Matt Pocock', EK = 'Emil Kowalski', CS = 'Claude SEO', GEO = 'GEO SEO', MK = 'Marketing Skills',
      SX = 'Strix', AR = 'Academic Research', OB = 'Obsidian', CM = 'Claude-Mem', RH = 'Guide';

const SOURCES = {
  [MP]: 'https://github.com/mattpocock/skills',
  [EK]: 'https://github.com/emilkowalski/skills',
  [CS]: 'https://github.com/AgriciDaniel/claude-seo',
  [GEO]: 'https://github.com/zubair-trabzada/geo-seo-claude',
  [MK]: 'https://github.com/coreyhaines31/marketingskills',
  [SX]: 'https://github.com/usestrix/strix',
  [AR]: 'https://github.com/Imbad0202/academic-research-skills',
  [OB]: 'https://github.com/kepano/obsidian-skills',
  [CM]: 'https://github.com/thedotmack/claude-mem',
  'vibe-wise': 'https://github.com/nykooi1/vibe-wise',
  'Graphify': 'https://github.com/Graphify-Labs/graphify',
  'Claude Code Setup': 'https://github.com/anthropics/claude-plugins-official',
  'Task Observer': 'https://github.com/rebelytics/one-skill-to-rule-them-all',
  'Video2Prompt': 'https://github.com/Zulelee/Video2Prompt'
};

const ITEMS = [
  // ---------- plan
  { id: 'grill-me', cat: 'plan', pkg: MP, name: 'grill-me', cmd: '/mattpocock-skills:grill-me',
    what: 'Before you start anything, Claude grills you with questions and does not stop until it is clear what you actually want. Works for plans, applications and decisions too, not only code.',
    when: 'Before a new feature, project or important decision. When you do not want a half-understood result from a vague "just build it".',
    ex: 'I need to pick a SLAM method for mapping caves with a drone. Grill me.',
    rel: ['grill-with-docs', 'prototype-mp', 'tdd'] },
  { id: 'grill-with-docs', cat: 'plan', pkg: MP, name: 'grill-with-docs', cmd: '/mattpocock-skills:grill-with-docs',
    what: 'Same grilling as grill-me, but it writes the project glossary (GLOSSARY.md) and decision records (ADRs) as you talk.',
    when: 'Long-running projects with lots of jargon, where the team and Claude need to speak the same language.',
    ex: 'Let us work out how the two vehicles in the search-and-rescue sim split tasks. Record the terms and decisions.',
    note: 'Writes files into the repo, so run it inside a project folder.', rel: ['grill-me', 'domain'] },
  { id: 'prototype-mp', cat: 'plan', pkg: MP, name: 'prototype', cmd: '/mattpocock-skills:prototype',
    what: 'Writes a throwaway prototype to answer a design question: does this state model hold up, what should this screen be.',
    when: 'When you want to see whether an idea works before touching the real code.',
    note: 'Emil Kowalski also ships a /prototype skill that builds several versions of a UI piece with a switcher. This one is Matt\'s, so type the full name.',
    rel: ['prototype-ek', 'grill-me'] },
  { id: 'ask-matt', cat: 'plan', pkg: MP, name: 'ask-matt', cmd: '/mattpocock-skills:ask-matt',
    what: 'Describe your situation and it tells you which skill or flow from the Matt Pocock pack to use.',
    when: 'When you cannot decide which one from this pack fits.', ex: 'I have a half-finished feature I want to wrap up. Which flow should I follow?' },
  { id: 'spec', cat: 'plan', pkg: MP, name: 'to-spec → to-tickets → implement', cmd: '/mattpocock-skills:to-spec',
    what: 'Turns a conversation into a spec, splits it into small ordered tickets, then implements them one by one.',
    when: 'For a big feature that spans several sessions and needs to be broken down.',
    how: [
      { lbl: 'Once per repo, before first use', code: '/mattpocock-skills:setup-matt-pocock-skills' },
      { lbl: 'Turn the conversation into a spec', code: '/mattpocock-skills:to-spec' },
      { lbl: 'Split the spec into tickets', code: '/mattpocock-skills:to-tickets' },
      { lbl: 'Implement the tickets', code: '/mattpocock-skills:implement' }
    ],
    note: 'Setup asks for an issue tracker. If the project is not on GitHub, pick "local markdown": tickets live as files in .scratch/.' },
  { id: 'to-questionnaire', cat: 'plan', pkg: MP, name: 'to-questionnaire', cmd: '/mattpocock-skills:to-questionnaire',
    what: 'Turns a decision you cannot make alone into a list of questions someone else can fill in.',
    when: 'When you need input from an advisor, teammate or client.',
    ex: 'I need my advisor to weigh in on the method choice for my research report. Draft the questions.' },
  { id: 'wait-what', cat: 'plan', pkg: MP, name: 'wait-what', cmd: '/mattpocock-skills:wait-what',
    what: 'If Claude\'s last answer did not land, type this and it explains the same thing again, more clearly.',
    when: 'When an answer is too technical, too long or all over the place.' },
  { id: 'handoff', cat: 'plan', pkg: MP, name: 'handoff', cmd: '/mattpocock-skills:handoff',
    what: 'Turns a long conversation into a short handoff note so a fresh session can pick up where you left off.',
    when: 'When the chat gets long, or you will continue tomorrow in a new session.' },
  { id: 'make-plan', cat: 'plan', pkg: CM, name: 'make-plan', cmd: '/claude-mem:make-plan',
    what: 'Builds a detailed, phased implementation plan for a feature or multi-step task, reading the relevant docs along the way.',
    when: 'Before a big piece of work, when you want a roadmap.', ex: 'I am adding an event sign-up form to the site. Give me a phased plan.' },

  // ---------- code
  { id: 'diagnosing-bugs', cat: 'code', pkg: MP, name: 'diagnosing-bugs', cmd: '/mattpocock-skills:diagnosing-bugs',
    what: 'Diagnoses hard bugs and slowdowns step by step instead of by trial and error. It does not move on until each phase is done.',
    when: 'When something breaks, throws, fails a test or gets slow.',
    ex: 'My ROS 2 node is not receiving messages from the second vehicle. Diagnose it.', rel: ['tdd', 'code-review'] },
  { id: 'tdd', cat: 'code', pkg: MP, name: 'tdd', cmd: '/mattpocock-skills:tdd',
    what: 'Writes a failing test first, then the code that passes it, then cleans up (red, green, refactor), with examples of good and bad tests.',
    when: 'When adding a feature or fixing a bug for good. A good habit for Java and backend work.',
    ex: 'Build the application approval flow test-first.' },
  { id: 'code-review', cat: 'code', pkg: MP, name: 'code-review', cmd: '/mattpocock-skills:code-review',
    what: 'Reviews changes since a point (commit, branch) on two axes: does it follow the project rules, and does it do what was asked. Runs both in parallel and reports side by side.',
    when: 'After finishing a piece of work, before shipping or merging.', ex: 'Review everything I changed since main.' },
  { id: 'research', cat: 'code', pkg: MP, name: 'research', cmd: '/mattpocock-skills:research',
    what: 'Researches a question from trusted primary sources (official docs, API references) and saves the findings to the repo as Markdown.',
    when: 'When you need to know how a library, API or standard really works.',
    ex: 'How does MAVLink 2 message signing work between a Pixhawk and a Raspberry Pi? Research it.' },
  { id: 'improve-arch', cat: 'code', pkg: MP, name: 'improve-codebase-architecture', cmd: '/mattpocock-skills:improve-codebase-architecture',
    what: 'Scans the codebase for places to simplify or deepen modules and presents them as a visual HTML report, then digs into the one you pick with you.',
    when: 'When the project has grown messy and changes are getting hard.' },
  { id: 'domain', cat: 'code', pkg: MP, name: 'domain-modeling', cmd: '/mattpocock-skills:domain-modeling',
    what: 'Creates or edits the project glossary (GLOSSARY.md) and architecture decision records (ADRs).',
    when: 'When the same thing has three names in the code, or you want to record an important decision.' },
  { id: 'writing-for-agents', cat: 'code', pkg: MP, name: 'writing-for-agents', cmd: '/mattpocock-skills:writing-for-agents',
    what: 'Gets text meant for Claude right: new skills, CLAUDE.md or AGENTS.md.',
    when: 'When writing your own skill or adding rules to CLAUDE.md.' },
  { id: 'wizard', cat: 'code', pkg: MP, name: 'wizard', cmd: '/mattpocock-skills:wizard',
    what: 'Writes an interactive terminal wizard that walks you through steps only you can do, like grabbing a key from a dashboard or adding a secret.',
    when: 'Adding env vars on Vercel, connecting a new service and similar chores.' },
  { id: 'pr', cat: 'code', pkg: MP, name: 'pr', cmd: '/mattpocock-skills:pr',
    what: 'Writes the pull request description.', when: 'Before opening a PR on GitHub.' },
  { id: 'retro', cat: 'code', pkg: MP, name: 'retro', cmd: '/mattpocock-skills:retro',
    what: 'After a coding session, works out what went well, what did not, and what to change next time.',
    when: 'At the end of a long or painful session.' },

  // ---------- learn
  { id: 'vibe-learn', cat: 'learn', pkg: 'vibe-wise', name: 'vibe-wise:learn', cmd: '/vibe-wise:learn',
    what: 'Turns on learning mode. Before writing code Claude asks how you would approach it, you weigh trade-offs together, it writes once you agree and explains what it did. The first run asks about your level and preferences.',
    when: 'When you are learning something new (Java, ROS 2) or really want to understand the code.',
    how: [
      { lbl: 'Turn learning mode on', code: '/vibe-wise:learn' },
      { lbl: 'Pause it for a moment', code: 'Pause learning' },
      { lbl: 'Do one task without questions', code: 'Just implement this one' },
      { lbl: 'Reset your learning notes', code: '/vibe-wise:reset' }
    ],
    note: 'It slows down quick fixes, so pause it then. Notes go to .vibe-wise/ in the project; add it to .gitignore if you want.', rel: ['teach'] },
  { id: 'teach', cat: 'learn', pkg: MP, name: 'teach', cmd: '/mattpocock-skills:teach',
    what: 'Teaches a new concept or skill using the project you have open.',
    when: 'When you want to learn a topic through your own code instead of a textbook.',
    ex: 'Teach me ExecutorService and thread pools using this project.', rel: ['vibe-learn', 'research'] },

  // ---------- context
  { id: 'graphify', cat: 'context', pkg: 'Graphify', name: 'graphify', cmd: '/graphify .',
    what: 'Turns a project (code, docs, PDFs, images) into a clickable knowledge graph. Claude then queries the graph instead of reading file by file, which uses fewer tokens.',
    when: 'When entering a project you do not know or have not touched in a while. Also great for mapping a big notes folder.',
    how: [
      { lbl: 'Inside Claude Code, in the project folder', code: '/graphify .' },
      { lbl: 'Ask from the terminal', code: 'graphify query "who writes to the database?"' },
      { lbl: 'See how two things connect', code: 'graphify path "LoginForm" "supabase"' },
      { lbl: 'Make Claude check the graph first (once per project)', code: 'graphify claude install' }
    ],
    note: 'Code is parsed locally and never leaves your machine. Docs and images go through Claude, so they use quota. Output lives in graphify-out/; open graph.html in a browser.' },
  { id: 'claude-mem', cat: 'context', pkg: CM, plain: true, name: 'Claude-Mem', cmd: '/claude-mem:mem-search',
    what: 'Runs in the background: records what you do in each session and carries a summary into the next one. You can also search your history yourself.',
    when: 'When you ask "did we already solve this?" or want the story of a project.',
    how: [
      { lbl: 'Search your history', code: '/claude-mem:mem-search' },
      { lbl: 'The project\'s story from start to finish', code: '/claude-mem:timeline-report' },
      { lbl: 'Explore code by structure without reading files', code: '/claude-mem:smart-explore' },
      { lbl: 'See the memory in your browser (default address)', code: 'http://localhost:37777' }
    ],
    note: 'It summarises each tool call with Haiku, so it uses a little subscription quota. Turn off its usage telemetry with: npx claude-mem telemetry disable' },
  { id: 'cc-setup', cat: 'context', pkg: 'Claude Code Setup', name: 'claude-automation-recommender', cmd: '/claude-code-setup:claude-automation-recommender',
    what: 'Anthropic\'s official plugin. Scans the open project and recommends which hooks, skills, subagents and MCP servers would help here.',
    when: 'When starting a new project, or reviewing everything you have installed.',
    ex: 'Which automations make sense for this project? Also tell me which installed ones are useless here.' },
  { id: 'task-observer', cat: 'context', pkg: 'Task Observer', name: 'task-observer', cmd: '/task-observer:task-observer',
    what: 'Notes the corrections you make and the work you repeat, and proposes small improvements to your skills. Changes nothing without your approval.',
    when: 'When you notice you keep correcting Claude the same way.',
    note: 'To run continuously it needs an activation block in CLAUDE.md; every session then starts with a 7-item checklist.' },

  // ---------- ui
  { id: 'designmd', cat: 'ui', pkg: RH, guide: true, name: 'Set up DESIGN.md', cmd: 'DESIGN.md',
    what: 'A single file at the project root with your colors, fonts, spacing, radii and component rules. Claude follows it on every new page instead of inventing its own colors and spacing.',
    when: 'When you want a consistent look across a site. The format comes from Google Stitch.',
    how: [{ lbl: 'Extract it from an existing site (paste into Claude Code)', code: 'Create a DESIGN.md in Google\'s DESIGN.md format at the project root from the project\'s existing styles (CSS, Tailwind config, components). Take colors, fonts, spacing, radii, shadows and component rules from values the code actually uses; do not invent any. If values are used inconsistently, list them and ask me which one to keep. Then add the rule "follow DESIGN.md for UI changes" to CLAUDE.md (create it if missing).' }],
    note: 'Want a new look instead? Download a ready-made file from designmd.ai and drop it in the project root.', link: { href: 'https://designmd.ai', text: 'designmd.ai' },
    rel: ['emil-design-eng', 'break-ui'] },
  { id: 'emil-design-eng', cat: 'ui', pkg: EK, name: 'emil-design-eng', cmd: '/emil-design-eng',
    what: 'The main skill. Mostly animation, some general design advice: the right easing, the right duration, soft shadows instead of hard borders, and the other small things agents tend to get wrong.',
    when: 'When you are building UI or motion and do not want it to look AI-made.', rel: ['animate', 'review-animations'] },
  { id: 'animate', cat: 'ui', pkg: EK, name: 'animate', cmd: '/animate',
    what: 'Builds one animation from scratch, choosing the curve, duration and which property to animate.',
    when: 'Adding a single motion: a menu opening, a card transition, a button response.', ex: 'Make the project cards lift slightly on hover.' },
  { id: 'review-animations', cat: 'ui', pkg: EK, name: 'review-animations', cmd: '/review-animations',
    what: 'Strictly reviews existing animations against Emil\'s rules.', when: 'When motion feels off, or before you ship.' },
  { id: 'improve-animations', cat: 'ui', pkg: EK, name: 'improve-animations', cmd: '/improve-animations',
    what: 'Scans every animation in the codebase and produces prioritised, independently shippable improvement plans.',
    when: 'When you want to overhaul all the motion on a site at once.' },
  { id: 'find-animation-opportunities', cat: 'ui', pkg: EK, name: 'find-animation-opportunities', cmd: '/find-animation-opportunities',
    what: 'Finds the places in a UI that really need motion, and says where motion should not go.', when: 'When the site feels static and flat.' },
  { id: 'remove-animations', cat: 'ui', pkg: EK, name: 'remove-animations', cmd: '/remove-animations',
    what: 'Strips needless motion: fade-ins on every section, animated shortcuts, delayed tooltips.', when: 'When the site feels busy and tiring.' },
  { id: 'choreograph', cat: 'ui', pkg: EK, name: 'choreograph', cmd: '/choreograph',
    what: 'Orchestrates several elements moving together: what goes first, what follows, what moves at once and what should not move.', when: 'Page loads, modals and other multi-part transitions.' },
  { id: 'animation-performance', cat: 'ui', pkg: EK, name: 'animation-performance', cmd: '/animation-performance',
    what: 'Fixes janky, frame-dropping animations, including subtle issues most agents miss.', when: 'When motion stutters, especially on phones.' },
  { id: 'animation-vocabulary', cat: 'ui', pkg: EK, name: 'animation-vocabulary', cmd: '/animation-vocabulary',
    what: 'Gives you the right words to describe the motion you want, so Claude builds exactly that.', when: 'When you struggle to describe the animation in your head.' },
  { id: 'gestures', cat: 'ui', pkg: EK, name: 'gestures', cmd: '/gestures',
    what: 'Builds drag, swipe and sheet interactions that track the finger exactly and carry release velocity.', when: 'Swipeable cards or bottom sheets on mobile.' },
  { id: 'mobile-native', cat: 'ui', pkg: EK, name: 'mobile-native', cmd: '/mobile-native',
    what: 'Small fixes that make a website feel like an app on phones: the 100vh bug, zooming inputs, tap delay, safe areas.', when: 'When your site feels like "a website" on a phone.' },
  { id: 'break-ui', cat: 'ui', pkg: EK, name: 'break-ui', cmd: '/break-ui',
    what: 'Stress-tests your UI with the worst data: very long names, one-letter names, weird emails, huge numbers, empty lists.', when: 'Before shipping a form or a list.' },
  { id: 'pick-ui-library', cat: 'ui', pkg: EK, name: 'pick-ui-library', cmd: '/pick-ui-library',
    what: 'Picks the right, actively maintained library for the job, so Claude does not hand-roll a toast or install an abandoned package.', when: 'When you need a new component (date picker, modal, notifications).' },
  { id: 'prototype-ek', cat: 'ui', pkg: EK, name: 'prototype', cmd: '/prototype',
    what: 'Builds several versions of a UI piece you describe and adds a switcher to flip between them.', when: 'When you cannot decide how a section should look.', rel: ['prototype-mp'] },
  { id: 'apple-design', cat: 'ui', pkg: EK, name: 'apple-design', cmd: '/apple-design',
    what: 'Brings the interface and fluid-motion principles from Apple\'s WWDC design talks to the web.', when: 'When you want a calm, fluid, Apple-like interface.' },
  { id: 'ask-sonner', cat: 'ui', pkg: EK, name: 'ask-sonner', cmd: '/ask-sonner',
    what: 'Setup, styling and fixes for Sonner, Emil\'s toast library.', when: 'When you show small "Saved" style notifications.' },

  // ---------- seo
  { id: 'seo-page', cat: 'seo', pkg: CS, name: 'seo page', cmd: '/claude-seo:seo page https://example.com',
    what: 'Deep-dives a single page: headings, content, speed, schema, images.',
    when: 'When you wonder why a page does not rank. The best command to start with.',
    how: [
      { lbl: 'Once, before first use', code: '/claude-seo:seo setup' },
      { lbl: 'Single page analysis', code: '/claude-seo:seo page https://example.com' },
      { lbl: 'Is the setup healthy?', code: '/claude-seo:seo doctor' }
    ], rel: ['seo-audit', 'geo-quick'] },
  { id: 'seo-audit', cat: 'seo', pkg: CS, name: 'seo audit', cmd: '/claude-seo:seo audit https://example.com',
    what: 'Crawls the whole site with 19 agents in parallel and returns a scored, prioritised report.',
    when: 'When you want a full overhaul, say once a month.',
    note: 'Runs many agents, so it burns quota fast. Start with seo page.' },
  { id: 'seo-tech', cat: 'seo', pkg: CS, plain: true, name: 'SEO subcommands', cmd: '/claude-seo:seo technical https://example.com',
    what: 'Subcommands that focus on one area.',
    when: 'When you know where the problem is and do not need a full audit.',
    how: [
      { lbl: 'Technical SEO (crawlability, speed, indexing)', code: '/claude-seo:seo technical https://example.com' },
      { lbl: 'Structured data (Schema.org)', code: '/claude-seo:seo schema https://example.com' },
      { lbl: 'Analyse or generate a sitemap', code: '/claude-seo:seo sitemap https://example.com' },
      { lbl: 'Image optimisation', code: '/claude-seo:seo images https://example.com' },
      { lbl: 'Content quality (E-E-A-T)', code: '/claude-seo:seo content https://example.com' },
      { lbl: 'Strategy plan (saas, local, ecommerce, publisher)', code: '/claude-seo:seo plan saas' },
      { lbl: 'Keywords and outline for an article', code: '/claude-seo:seo content-brief "autonomous drone cave mapping"' }
    ] },
  { id: 'geo-quick', cat: 'seo', pkg: GEO, name: 'geo quick', cmd: '/geo quick https://example.com',
    what: 'A 60-second look at how visible your site is in AI search (ChatGPT, Perplexity, Gemini).',
    when: 'When you want a quick read on whether ChatGPT would recommend you.', rel: ['geo-audit', 'geo-crawlers'] },
  { id: 'geo-audit', cat: 'seo', pkg: GEO, name: 'geo audit', cmd: '/geo audit https://example.com',
    what: 'Full AI-visibility and SEO audit with parallel subagents and a score out of 100.',
    when: 'Before a serious round of improvements.', note: 'Runs many agents, so it uses quota.' },
  { id: 'geo-crawlers', cat: 'seo', pkg: GEO, name: 'geo crawlers', cmd: '/geo crawlers https://example.com',
    what: 'Reads robots.txt, meta tags and headers to show which AI bots can reach your site.',
    when: 'Right after launch, to make sure you are not blocking ChatGPT or Claude by accident.' },
  { id: 'geo-llmstxt', cat: 'seo', pkg: GEO, name: 'geo llmstxt', cmd: '/geo llmstxt https://example.com',
    what: 'Reviews or generates an llms.txt file, which describes your site\'s structure to AI systems.', when: 'When you want to add llms.txt to a site.' },
  { id: 'geo-more', cat: 'seo', pkg: GEO, plain: true, name: 'GEO subcommands', cmd: '/geo citability https://example.com',
    what: 'GEO commands that focus on one area.', when: 'After an audit, to dig into a single area.',
    how: [
      { lbl: 'How quotable your content is for AI', code: '/geo citability https://example.com' },
      { lbl: 'Is your name mentioned on Reddit, YouTube and so on', code: '/geo brands https://example.com' },
      { lbl: 'Per platform (AI Overviews, ChatGPT, Perplexity)', code: '/geo platforms https://example.com' },
      { lbl: 'Review and generate schema (JSON-LD)', code: '/geo schema https://example.com' },
      { lbl: 'Turn everything into a report', code: '/geo report https://example.com' },
      { lbl: 'Update the skills', code: '/geo-update' }
    ] },

  // ---------- marketing
  { id: 'product-marketing', cat: 'mkt', pkg: MK, name: 'product-marketing', cmd: '/marketing-skills:product-marketing',
    what: 'Creates your product\'s marketing context file: what it does, who it is for, competitors, voice. The other skills in the pack read it and work from it.',
    when: 'First thing, before you start promoting an app.', ex: 'Create the product marketing context file for my app.', rel: ['launch', 'copywriting'] },
  { id: 'launch', cat: 'mkt', pkg: MK, name: 'launch', cmd: '/marketing-skills:launch',
    what: 'Plans a product launch, feature announcement or Product Hunt launch.', when: 'Before you ship and announce something.' },
  { id: 'copywriting', cat: 'mkt', pkg: MK, name: 'copywriting', cmd: '/marketing-skills:copywriting',
    what: 'Writes or rewrites marketing copy for home, landing, pricing and about pages.', when: 'When your site copy falls flat.', rel: ['copy-editing'] },
  { id: 'copy-editing', cat: 'mkt', pkg: MK, name: 'copy-editing', cmd: '/marketing-skills:copy-editing',
    what: 'Edits and reviews existing copy and refreshes outdated content.', when: 'When the copy is there but could be better.' },
  { id: 'aso', cat: 'mkt', pkg: MK, name: 'aso', cmd: '/marketing-skills:aso',
    what: 'Audits and improves App Store and Google Play listings: title, keywords, description, screenshots.', when: 'When you put a mobile app in a store.' },
  { id: 'sales-enablement', cat: 'mkt', pkg: MK, name: 'sales-enablement', cmd: '/marketing-skills:sales-enablement',
    what: 'Prepares a pitch deck, a one-pager, objection handling and a demo script.', when: 'When you pitch a project to a jury or investors.' },
  { id: 'social', cat: 'mkt', pkg: MK, name: 'social', cmd: '/marketing-skills:social',
    what: 'Creates, schedules and improves content for LinkedIn, X, Instagram and TikTok.', when: 'When you share a project or a win.' },
  { id: 'content-strategy', cat: 'mkt', pkg: MK, name: 'content-strategy', cmd: '/marketing-skills:content-strategy',
    what: 'Plans which topics you should create content about.', when: 'When setting up a blog or a content calendar.' },
  { id: 'pricing', cat: 'mkt', pkg: MK, name: 'pricing', cmd: '/marketing-skills:pricing',
    what: 'Helps with pricing, packaging and free vs paid tier decisions.', when: 'When you put a price on an app.' },
  { id: 'directory-submissions', cat: 'mkt', pkg: MK, name: 'directory-submissions', cmd: '/marketing-skills:directory-submissions',
    what: 'Plans submissions to startup, SaaS and AI directories, for discovery and backlinks.', when: 'After launch, to get more visibility.' },
  { id: 'competitor-profiling', cat: 'mkt', pkg: MK, name: 'competitor-profiling', cmd: '/marketing-skills:competitor-profiling',
    what: 'Profiles competitors from their sites: what they offer and how they position themselves.', when: 'When you want to see where an idea sits in the market.' },
  { id: 'marketing-ideas', cat: 'mkt', pkg: MK, name: 'marketing-ideas', cmd: '/marketing-skills:marketing-ideas',
    what: 'Marketing and growth ideas for your product.', when: 'When you do not know what to do next and want to brainstorm.' },
  { id: 'cro', cat: 'mkt', pkg: MK, name: 'cro', cmd: '/marketing-skills:cro',
    what: 'Improves conversion on a page or form: more sign-ups, more clicks.', when: 'When visitors come but nobody signs up.' },
  { id: 'mkt-rest', cat: 'mkt', pkg: MK, guide: true, name: 'The rest of the pack', cmd: '/marketing-skills:…',
    what: 'The Marketing Skills pack has 53 skills. A short list of the ones not covered above:',
    list: [
      ['ab-testing', 'design an A/B test'], ['ad-creative', 'ad headlines and copy'], ['ads', 'Google, Meta, LinkedIn campaigns'],
      ['ai-seo', 'get cited in AI search'], ['analytics', 'set up GA4 and events'], ['attribution', 'which channel drives sales'],
      ['churn-prevention', 'reduce churn'], ['co-marketing', 'find a co-marketing partner'], ['cold-email', 'cold email and follow-ups'],
      ['community-marketing', 'grow a Discord or Slack community'], ['competitors', 'comparison pages'], ['conversion-tracking', 'form and purchase tracking'],
      ['customer-research', 'interviews and analysis'], ['emails', 'email sequences'], ['events', 'webinars and events'],
      ['free-tools', 'free tool ideas for marketing'], ['image', 'marketing visuals'], ['influencer-marketing', 'creator partnerships'],
      ['lead-magnets', 'content that collects emails'], ['link-building', 'earn backlinks'], ['marketing-council', 'a virtual advisory board of legendary marketers'],
      ['marketing-loops', 'recurring marketing routines'], ['marketing-plan', 'a full marketing plan'], ['marketing-psychology', 'behavioural science principles'],
      ['offers', 'offer design'], ['onboarding', 'post-signup experience'], ['paywalls', 'in-app paywalls'],
      ['popups', 'popups'], ['programmatic-seo', 'many pages from templates'], ['prospecting', 'lead lists'],
      ['public-relations', 'press and journalists'], ['referrals', 'referral and affiliate programs'], ['reverse-engineer-marketing', 'how a company grew'],
      ['revops', 'sales and marketing ops'], ['schema', 'structured data'], ['seo-audit', 'SEO audit'],
      ['signup', 'improve the signup flow'], ['site-architecture', 'page hierarchy and navigation'], ['sms', 'SMS and WhatsApp marketing'], ['video', 'AI video production']
    ] },

  // ---------- security
  { id: 'sec-list', cat: 'sec', pkg: RH, guide: true, name: '5 checks before you ship', cmd: 'checklist',
    what: 'Your app built with Claude works. Is it safe? Check these five before going live. Your ticks are saved on this device.',
    checklist: [
      'No API keys in front-end code or on GitHub. Secrets stay on the server in .env (and .env is in .gitignore).',
      'Using Supabase? Make sure RLS is on for every table.',
      'Check pages that need login on the server, not only in the front end.',
      'Never take the payment amount from the browser. Calculate it on the server and verify the Stripe webhook signature.',
      'Rate-limit login and sign-up requests.'
    ],
    note: 'In Vite projects every variable starting with VITE_ is baked into the code sent to the browser. Even if .env is gitignored, anyone who opens the site can read it. Only keys that are safe to be public (like the Supabase anon key) belong under VITE_.',
    rel: ['strix-code', 'strix-web'] },
  { id: 'strix-code', cat: 'sec', pkg: SX, name: 'find-security-vulnerabilities-in-code', cmd: '/find-security-vulnerabilities-in-code',
    what: 'Reads the source, follows data flow and the auth model, then tries to really exploit what it finds in an isolated sandbox. Every finding in the report comes with a working proof.',
    when: 'Before shipping, to look for holes in the code.', note: 'Needs the Strix program, Docker running and an LLM API key (see Terminal tools → Strix).', rel: ['strix-fix', 'strix-setup'] },
  { id: 'strix-web', cat: 'sec', pkg: SX, name: 'web-app-penetration-testing', cmd: '/web-app-penetration-testing',
    what: 'Tests a live site or local dev server from the outside, like an attacker: auth bypass, access control, injection, XSS, SSRF.',
    when: 'When the site is live or on a staging server.', note: 'Only scan your own sites or systems you have permission to test.' },
  { id: 'strix-pentest', cat: 'sec', pkg: SX, name: 'penetration-testing-with-strix', cmd: '/penetration-testing-with-strix',
    what: 'General pentest of web apps, APIs, repos and URLs. Proves vulnerabilities instead of just flagging them; exports Markdown, JSON, CSV or SARIF.', when: 'When you want a thorough security test.' },
  { id: 'strix-owasp', cat: 'sec', pkg: SX, name: 'owasp-top-10-testing', cmd: '/owasp-top-10-testing',
    what: 'Tests the app against each OWASP Top 10:2025 category and reports only what it can prove. Covers the OWASP API Top 10 too.', when: 'When a course, report or client asks for an OWASP assessment.' },
  { id: 'strix-api', cat: 'sec', pkg: SX, name: 'api-security-testing', cmd: '/api-security-testing',
    what: 'Security-tests backend APIs.', when: 'When you have written a REST or GraphQL API.' },
  { id: 'strix-fix', cat: 'sec', pkg: SX, name: 'fix-security-vulnerabilities-with-strix', cmd: '/fix-security-vulnerabilities-with-strix',
    what: 'Takes Strix findings by severity, fixes the root cause rather than the symptom, and reruns Strix to prove the hole is closed.', when: 'When a Strix scan comes back with findings.' },
  { id: 'strix-ci', cat: 'sec', pkg: SX, name: 'ci-security-scanning-with-strix', cmd: '/ci-security-scanning-with-strix',
    what: 'Adds a Strix scan to CI like GitHub Actions so every pull request is checked.', when: 'When you want continuous security checks on a project.' },
  { id: 'strix-managed', cat: 'sec', pkg: SX, name: 'managed-pentesting-with-strix', cmd: '/managed-pentesting-with-strix',
    what: 'Runs the scan on Strix\'s cloud platform (app.strix.ai) instead of your machine. No Docker or API key needed.', when: 'When you do not want to deal with local setup.', note: 'The cloud side runs on credits and may cost money.' },

  // ---------- academic
  { id: 'ars-plan', cat: 'acad', pkg: AR, name: 'ars-plan', cmd: '/academic-research-skills:ars-plan',
    what: 'Builds the structure of a paper or report with you, section by section, through questions.', when: 'Before you start writing, to get a skeleton.',
    ex: 'Let us plan my final project report: autonomous exploration drone, method, results.', rel: ['ars-outline', 'ars-lit-review'] },
  { id: 'ars-lit-review', cat: 'acad', pkg: AR, name: 'ars-lit-review', cmd: '/academic-research-skills:ars-lit-review "topic"',
    what: 'Runs a literature review on a topic and produces an annotated bibliography. Verifies sources against Crossref, OpenAlex and Semantic Scholar, which cuts the risk of made-up references.',
    when: 'When writing the literature section of a thesis or project.', ex: '/academic-research-skills:ars-lit-review "LiDAR-based SLAM in subterranean environments"' },
  { id: 'ars-outline', cat: 'acad', pkg: AR, name: 'ars-outline', cmd: '/academic-research-skills:ars-outline',
    what: 'Produces a detailed outline and an evidence map showing which claim rests on which source.', when: 'Once the plan is ready, before drafting.' },
  { id: 'ars-citation-check', cat: 'acad', pkg: AR, name: 'ars-citation-check', cmd: '/academic-research-skills:ars-citation-check',
    what: 'Checks the bibliography and reports wrong or non-existent citations.', when: 'Before submitting. Always.' },
  { id: 'ars-reviewer', cat: 'acad', pkg: AR, name: 'ars-reviewer', cmd: '/academic-research-skills:ars-reviewer',
    what: 'Reads your text like a virtual review panel and lists weak spots and major criticisms.', when: 'Before sending to an advisor or a journal.', rel: ['ars-revision'] },
  { id: 'ars-revision', cat: 'acad', pkg: AR, name: 'ars-revision / revision-coach', cmd: '/academic-research-skills:ars-revision',
    what: 'Revises the text based on reviewer comments and drafts the response letter. revision-coach makes a roadmap first.',
    when: 'When reviewer or advisor comments come in.',
    how: [{ lbl: 'Revise and write responses', code: '/academic-research-skills:ars-revision' }, { lbl: 'Roadmap first', code: '/academic-research-skills:ars-revision-coach' }] },
  { id: 'ars-abstract', cat: 'acad', pkg: AR, name: 'ars-abstract', cmd: '/academic-research-skills:ars-abstract',
    what: 'Writes a bilingual abstract and keywords.', when: 'For reports that need abstracts in two languages.' },
  { id: 'ars-format', cat: 'acad', pkg: AR, name: 'ars-format-convert', cmd: '/academic-research-skills:ars-format-convert',
    what: 'Converts the text to LaTeX, DOCX, PDF or Markdown.', when: 'When the submission format is fixed.', note: 'DOCX and PDF need Pandoc installed.' },
  { id: 'ars-3w', cat: 'acad', pkg: AR, name: 'ars-3w', cmd: '/academic-research-skills:ars-3w',
    what: 'Compares several papers side by side on why, how and what.', when: 'When writing a comparison table or section of related work.' },
  { id: 'ars-full', cat: 'acad', pkg: AR, name: 'ars-full', cmd: '/academic-research-skills:ars-full',
    what: 'The whole pipeline in one go: research, write, review like a referee, revise, finalise.', when: 'When you want a full paper draft end to end.', note: 'Takes a while and uses quota.' },

  // ---------- notes
  { id: 'obs-setup', cat: 'notes', pkg: RH, guide: true, name: 'Obsidian with Claude', cmd: 'setup',
    what: 'Obsidian keeps your notes as plain Markdown files on your machine. A vault is just a folder, so Claude Code can read and write it directly.',
    steps: [
      'Download the app from obsidian.md and create a new vault, for example ~/Documents/Notes.',
      'Add folders like Courses, Thesis, Research, Work.',
      'In VS Code, open the vault folder with File → Open Folder and start a new Claude chat.',
      'Ask questions about your notes, request summaries or tables. Use /graphify . to map a big vault.'
    ],
    how: [{ lbl: 'Install the Obsidian skills', code: 'claude plugin marketplace add kepano/obsidian-skills\nclaude plugin install obsidian@obsidian-skills' }],
    ex: 'From the notes in my Thesis folder, build a table comparing SLAM methods.', rel: ['obs-md', 'defuddle', 'graphify'] },
  { id: 'obs-md', cat: 'notes', pkg: OB, name: 'obsidian-markdown', cmd: '/obsidian:obsidian-markdown',
    what: 'Writes Obsidian-flavoured Markdown correctly: [[links]], embeds, callouts, properties.', when: 'When Claude writes notes into your vault; usually kicks in on its own.' },
  { id: 'obs-bases', cat: 'notes', pkg: OB, name: 'obsidian-bases', cmd: '/obsidian:obsidian-bases',
    what: 'Builds database-like views (.base files) from your notes: filters, formulas, summaries.', when: 'When you want to track papers or assignments in a table.' },
  { id: 'obs-canvas', cat: 'notes', pkg: OB, name: 'json-canvas', cmd: '/obsidian:json-canvas',
    what: 'Creates .canvas files: mind maps, flowcharts, boxes and arrows.', when: 'When you want to map a topic visually.' },
  { id: 'defuddle', cat: 'notes', pkg: OB, name: 'defuddle', cmd: '/obsidian:defuddle',
    what: 'Turns a web page into a clean, ad-free Markdown note.', when: 'When collecting articles, blog posts or docs.', ex: 'Save this page as a clean note in Thesis/Sources: <url>' },
  { id: 'obs-cli', cat: 'notes', pkg: OB, name: 'obsidian-cli', cmd: '/obsidian:obsidian-cli',
    what: 'Uses Obsidian\'s command-line tool to search, create notes and manage tasks and properties in your vault.', when: 'When you want bulk operations in the vault while Obsidian is open.', note: 'The CLI must be enabled in Obsidian settings.' },

  // ---------- tools
  { id: 'video2prompt', cat: 'tools', pkg: 'Video2Prompt', name: 'Video2Prompt', cmd: 'video2prompt analyze',
    what: 'Transcribes a screen recording, reads what is on screen together with what is said, and produces an implementation prompt to paste into Claude Code.',
    when: 'When someone sends you a screen recording saying "let us change this". Its extract mode pulls the structure out of any video.',
    how: [
      { lbl: 'Every time, first', code: 'cd ~/Video2Prompt && source .venv/bin/activate' },
      { lbl: 'Drop the video into the input folder', code: 'open input' },
      { lbl: 'Run it (change the file name)', code: 'video2prompt analyze "input/recording.mov" --provider claude --transcription local' },
      { lbl: 'Map feedback to files in a project', code: '--project ~/path/to/project' }
    ],
    note: 'Output lands in output/ as ...-implementation-prompt.md. Needs FFmpeg. With --project, Claude runs in that folder without asking for permission; do not use it on videos from strangers, and commit to git first.' },
  { id: 'strix-setup', cat: 'tools', pkg: SX, name: 'Strix program', cmd: 'strix --target',
    what: 'The program behind the security skills. Runs tests in an isolated Docker sandbox.',
    when: 'Install it before using the Strix skills for the first time.',
    how: [
      { lbl: 'Install (Docker Desktop must be running)', code: 'curl -sSL https://strix.ai/install | bash' },
      { lbl: 'Model and API key', code: 'export STRIX_LLM="openrouter/z-ai/glm-5.3"\nexport LLM_API_KEY="your-key"' },
      { lbl: 'Scan a project', code: 'strix --target ~/path/to/project' }
    ],
    note: 'Does not use a Claude subscription; it needs its own API key and each scan costs money. Results go to strix_runs/.' },
  { id: 'manage', cat: 'tools', pkg: RH, guide: true, name: 'Managing plugins', cmd: 'claude plugin',
    what: 'See what is installed, turn things on and off, update.',
    how: [
      { lbl: 'Installed plugins', code: 'claude plugin list' },
      { lbl: 'Standalone skills', code: 'ls ~/.claude/skills' },
      { lbl: 'Disable without deleting / enable again', code: 'claude plugin disable <name>@<marketplace>\nclaude plugin enable <name>@<marketplace>' },
      { lbl: 'Tools installed with uv', code: 'uv tool list' }
    ],
    note: 'After installing or disabling something, open a new Claude chat; an old chat does not see the change.' }
];

const GUIDES = [
  { id: 'g-start', title: 'How do I use the commands?', body: `
    <p>Most of the time you do not need a command. Describe what you want in plain words and Claude picks the matching skill from its description.</p>
    <p>To be sure, type <span class="k">/</span> in the message box, then part of the name (for example <span class="k">/grill</span>) and pick from the list. Picking from the list is safer than typing the full name.</p>
    <p>Plugin skills start with the pack name: <span class="k">/mattpocock-skills:tdd</span>. Standalone skills use the short name: <span class="k">/animate</span>, <span class="k">/geo</span>, <span class="k">/graphify</span>.</p>` },
  { id: 'g-workflow', title: 'A good first week', body: `
    <p>Do not try to learn everything. For one week, use only these four on purpose:</p>
    <ol>
      <li><span class="k">/grill-me</span> before you start anything.</li>
      <li><span class="k">/diagnosing-bugs</span> when something breaks.</li>
      <li><span class="k">/vibe-wise:learn</span> when you are learning a language or framework.</li>
      <li><span class="k">/handoff</span> when a chat gets long.</li>
    </ol>
    <p>The rest shows up when you need it: open Skillbar and search "ship", "seo" or "paper". Start a new chat for each new task; long chats get slow and eat quota.</p>` },
  { ref: 'sec-list' }, { ref: 'designmd' }, { ref: 'obs-setup' }, { ref: 'manage' },
  { id: 'g-skip', title: 'What I chose not to install', body: `
    <ul>
      <li><b>OmniRoute</b>: the "free tokens" are the sum of third-party free tiers. Some providers log requests or train on them, and it spoofs TLS fingerprints to get around limits, which risks account bans.</li>
      <li><b>Ruflo</b>: hooks that pull and run the latest npm version on every command, and a very heavy setup. Too much for solo projects.</li>
      <li><b>Headroom</b>: only works in sessions started with <span class="k">headroom wrap claude</span> from a terminal; the VS Code extension is unaffected.</li>
    </ul>` },
  { id: 'g-dock', title: 'Using this window', body: `
    <ul>
      <li>Drag it by the top strip and resize from the edges. It remembers where you put it.</li>
      <li>It sits on the desktop like a widget, behind other windows, and stays put when you show the desktop.</li>
      <li>Click anywhere else and it shrinks to a single search bar; click it to expand. <span class="k">Esc</span> and the green button shrink it too.</li>
      <li>The red button or <span class="k">⌘W</span> closes it. Bring it back with <span class="k">⌥ ⇧ Space</span> or the menu bar icon.</li>
      <li>Right-click the menu bar icon for: Keep above other windows, Reset position, Quit.</li>
      <li>To start at login: <b>System Settings → General → Login Items</b>, press +, choose <b>Applications → Skillbar</b> in your home folder.</li>
    </ul>` }
];

const SITS = [
  { t: 'I am starting a new feature or project', d: 'Do not let Claude write code before it is clear.',
    s: [['grill-me', 'get grilled first'], ['grill-with-docs', 'if the project is long and full of jargon'], ['prototype-mp', 'quick throwaway test if unsure'], ['tdd', 'then build test-first']] },
  { t: 'Something broke', d: 'Diagnose in order instead of guessing.',
    s: [['diagnosing-bugs', 'step-by-step diagnosis'], ['tdd', 'add a test that catches it'], ['code-review', 'review the fix']] },
  { t: 'I am learning a new language or topic', d: 'Move forward while understanding the code.',
    s: [['vibe-learn', 'turn on learning mode'], ['teach', 'learn the concept through your project'], ['research', 'research from official sources']] },
  { t: 'I am coming back to a project after a while', d: 'Remember where you were and how it is built.',
    s: [['claude-mem', 'what you did in past sessions'], ['graphify', 'a map of the project'], ['cc-setup', 'automations that fit this project']] },
  { t: 'I am adding UI or motion to a site', d: 'Pages, components, animations.',
    s: [['designmd', 'lock the design rules first'], ['emil-design-eng', 'the main design skill'], ['animate', 'one motion at a time'], ['break-ui', 'stress-test with edge data'], ['mobile-native', 'check it on a phone']] },
  { t: 'I am about to ship a site', d: 'Security and visibility checks.',
    s: [['sec-list', 'the 5-point checklist'], ['strix-code', 'look for holes in the code'], ['seo-page', 'SEO of the home page'], ['geo-crawlers', 'can AI bots get in']] },
  { t: 'I want to show up on Google and ChatGPT', d: 'Start small; big audits burn quota.',
    s: [['seo-page', 'one page'], ['geo-quick', 'AI visibility'], ['geo-llmstxt', 'add llms.txt'], ['seo-audit', 'full audit if needed']] },
  { t: 'I am promoting an app', d: 'From positioning to the store page.',
    s: [['product-marketing', 'context file first'], ['copywriting', 'page copy'], ['aso', 'store listing'], ['launch', 'launch plan'], ['social', 'posts']] },
  { t: 'I am pitching to a jury or investors', d: 'Demo days, competitions, project fairs.',
    s: [['grill-me', 'sharpen what you will say'], ['sales-enablement', 'deck and one-pager'], ['competitor-profiling', 'find what sets you apart']] },
  { t: 'I am writing a paper, report or thesis', d: 'Plan, sources, structure, review.',
    s: [['ars-plan', 'section structure'], ['ars-lit-review', 'literature'], ['ars-outline', 'outline and evidence map'], ['ars-reviewer', 'read it like a referee'], ['ars-citation-check', 'verify the bibliography']] },
  { t: 'Someone sent feedback as a screen recording', d: 'Turn the video into a prompt you can act on.',
    s: [['video2prompt', 'video to prompt'], ['grill-me', 'clear up anything vague'], ['code-review', 'review the change']] },
  { t: 'I am collecting notes or sources', d: 'In an Obsidian vault.',
    s: [['obs-setup', 'set up the vault'], ['defuddle', 'web page to note'], ['obs-bases', 'track sources in a table'], ['graphify', 'map your notes']] },
  { t: 'The chat got long, I will continue tomorrow', d: 'Move to a new session without losing context.',
    s: [['handoff', 'handoff note'], ['claude-mem', 'already saving in the background']] },
  { t: 'I do not know which skill to use', d: 'Ask and it will tell you.',
    s: [['ask-matt', 'for the Matt Pocock pack'], ['cc-setup', 'recommendations for this project']] }
];
