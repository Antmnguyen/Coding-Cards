# Launch plan: web port, distribution and monetisation

Goal: move Coding Cards from a Windows exe to a website with a free tier and a paid subscription, aimed at college students, new grads and anyone preparing for coding interviews.

Written 2026-10-10 against the `new_cards` branch (288 cards, Electron + React + Pyodide).

**The legal section is a checklist of known risks, not legal advice.** Before taking money, pay a lawyer for an hour to review the terms, the privacy policy and the items marked "check" below.

## 1. Summary of recommendations

| Question | Recommendation |
|---|---|
| What ships | A static website. The app already runs in a browser engine; only file storage is desktop-specific. |
| Where to host | Cloudflare Pages for the site, Supabase for accounts and synced history. About $12 a year (the domain) until there is real traffic. |
| Payments | A merchant of record (Paddle, Lemon Squeezy or Polar) and not raw Stripe, so sales tax and VAT are their problem. |
| Free tier | No sign-up. One card for every skill in every topic, history kept in the browser. |
| Paid tier | Every variant of every skill, trap-only drills, cross-device sync, full stats, future language decks. |
| Price to test first | $7 a month, $29 a year, $59 once for lifetime. |
| When to charge | Not yet. First the web version, then proof people come back, then payments. |
| Target date | Free web version live before the January 2027 internship and new-grad recruiting wave. |
| Biggest legal risks | Using other companies' names and content (LeetCode, NeetCode, Monkeytype), subscription and privacy rules, and whether you are personally allowed to run a business (visa, employer, university). |
| Realistic income (section 10) | A side income, not a salary. Most likely a few hundred to a few thousand dollars in the first year; tens of thousands only if it becomes a known tool. |
| Is the web port realistic (section 11) | Yes. A free working site is a few days of work. A paid product is four to six weeks part-time. |
| Is `future.md` realistic (section 12) | A JavaScript deck: yes, and it is easier than Python was. TypeScript type cards: possible, medium effort. React: the hard one; leave it until last. |

## 2. Audience

| Who | What they want | When they show up | Will they pay |
|---|---|---|---|
| CS students looking for internships | Stop blanking on syntax in online assessments | August to October, January to March | Low budget, pays for something cheap that works |
| New grads job hunting | Speed and no silly mistakes in live interviews | All year, peaks in autumn | Yes, for a few months |
| Career changers and bootcamp students | Confidence in Python basics | All year | Yes, most willing to pay |
| Working engineers switching to Python for interviews | Fast refresher on idioms | All year | Yes, least price-sensitive |

Two facts about this audience shape everything else:

- **Use is seasonal and short.** People prepare for two to four months and then stop. Monthly subscribers will cancel once they get an offer. That is normal for interview prep, so offer a yearly and a lifetime price alongside monthly.
- **They find tools through each other.** Reddit, Discord servers, club group chats and short videos matter more than adverts.

**Positioning:** Coding Cards is not a LeetCode replacement. It is what you do for ten minutes before LeetCode so that syntax stops being the thing that slows you down. One line: "Know the algorithm but blank on the syntax? Drill it until it is automatic."

## 3. Free and paid tiers

The free tier has to be good enough to become a habit and to be recommended. The paid tier has to be an obvious step up for someone with an interview in six weeks.

| | Free | Paid |
|---|---|---|
| Account | Not needed | Required |
| Topics and levels | All of them | All of them |
| Cards | One card per skill: about 860 when the deck is finished | Every variant of every skill: about 2,000 |
| Loops, slicing, calling functions | Every variant, as a taste of the paid tier | Every variant |
| Trap-only drill | No | Yes |
| History and weighting | Yes, saved in this browser only | Yes, synced across devices |
| Stats | Accuracy per topic | Full stats, worst cards, progress over time |
| Timed blitz | Yes | Yes |
| Other language decks (`future.md`) | One card per skill | Every variant |

### Why variants are the gate

`CARD_PLAN.md` says variants are "what stop you memorising one card instead of learning the syntax". That is the upgrade pitch: free shows you every piece of syntax once; paid makes sure you can write it on any data, not just the one example you have seen.

- **Free users see the whole range,** including heaps, graphs and trees. Nobody leaves because their topic was locked, and every topic can have a public search page.
- **The wall is met through use.** After a few sessions a free user starts recognising cards. That is the moment to show "you have seen this card 5 times; there are 9 more ways this comes up".
- **It is simple to build.** Cards already have a `skill` field and ids of the form `<skill>--<variant>`. The free deck is the first variant of each skill.

The cost: a free user drilling one topic will see repeats sooner, so free sessions are less varied. Watch the return rate (section 9). If free users leave before they hit the wall, give free two variants per skill and keep the rest paid.

Rules for the split:

- **No daily card limit on free.** A limit stops the habit that leads to paying. Gate by content, not by use.
- **No sign-up wall before the first card.** A visitor should be typing an answer within ten seconds of landing.
- **The free variant is fixed.** It is always the first variant of the skill, never a rotating one. Rotating would hand out the whole paid deck over time and would force the paid cards into the public bundle.
- **What is already public stays free.** The current cards are in a public GitHub repo and its history, so they cannot be made exclusive later. Loops, slicing and calling functions already have their variants written in public, which is why they are the free taste. From now on, write the first variant of each new skill in the public repo and the rest somewhere private (section 6).

### Pricing

Starting prices to test, not final ones:

- **$7 a month.**
- **$29 a year.** This should be the highlighted option.
- **$59 lifetime.** Suits people who dislike subscriptions, and brings in cash early.

For comparison (prices found in October 2026, see section 10): LeetCode Premium is $35 a month or $159 a year; NeetCode Pro is $119 a year or $297 lifetime, and is often on sale for about $50 a year; Codewars Red is $5 a month. Coding Cards does one narrower job, so it should sit well below the first two and be an easy add-on purchase.

Do not add a student discount: nearly every customer is a student, so it would just be a lower price. If a discount is wanted, tie it to a `.edu` email or a referral.

**Do not start charging until the paid tier has content.** Today only three sections have variants, and they are the free taste, so there is nothing behind the paywall yet. Charge once most sections have their variants written, which is when paid holds well over twice what free does.

## 4. Porting to a website

### What is already portable

Almost everything. The UI, the queue, history weighting, answer matching and the Pyodide worker are plain browser code. Only three files touch Electron:

| File | What it does | Web replacement |
|---|---|---|
| `src/main/main.ts` | Opens the window, serves files over `app://`, reads and writes `history.json` and `settings.json` | Not needed. A web host serves the files. |
| `src/main/preload.ts` | Exposes `window.api.read` and `window.api.write` | Not needed. |
| `src/renderer/store.ts` | Calls `window.api` to load and save history and settings | Call a storage interface instead (step 1). |

### Steps

1. **Put storage behind an interface.** Define `Store { read(name), write(name, data) }`. Give it two implementations: the existing Electron one, and a browser one that uses `localStorage` (history is a small JSON object, so this is enough). `store.ts` uses whichever is present. The desktop app keeps working.
2. **Add a web build to `build.mjs`.** It is the existing renderer and worker builds without `main.ts` and `preload.ts`, written to `dist/web`. Add content hashes to file names so browsers can cache them for a long time.
3. **Check Pyodide loads from a normal web origin.** The worker already resolves its files relative to its own URL, so this should work unchanged. The whole payload is about 14 MB, of which `pyodide.asm.wasm` is 9.6 MB. The app's own code is 316 KB. Keep the current behaviour where the first card appears straight away and run-checking switches on when Python is ready. Set long cache headers on the `pyodide/` folder so it downloads once.
4. **Deploy to Cloudflare Pages** from the GitHub repo. Every push to `main` goes live; every branch gets a preview URL. This replaces the manual exe release in `UPDATE.md`.
5. **Add a landing page** at `/` and move the app to `/app` (or keep the app at `/` with a short explanation above the first card). The landing page needs: the one-line pitch, a card you can answer immediately, and a "start" button.
6. **Add privacy-friendly analytics** (Plausible, or Cloudflare Web Analytics which is free). Track: visited, answered a first card, finished a session, came back another day. Nothing else is needed yet.
7. **Add accounts and sync** with Supabase. Sign-in by Google, GitHub and email link (students already have these; no passwords to store). Sync history as one JSON document per user to begin with; if two devices disagree, keep the entry with the later `lastSeen` for each card. On first sign-in, upload whatever is in `localStorage`.
8. **Add an "import from desktop app" button** that accepts the `history.json` file from the app-data folder, so current users keep their progress.
9. **Add the paywall** (section 6 explains how to make it real).
10. **Decide the exe's future.** Recommendation: stop promoting it. It is 100 MB, Windows-only, and shows a "Windows protected your PC" warning because it is unsigned. Keep the Electron build working as an offline option for paying users if anyone asks.

### Things to watch

- **Phones.** Typing code on a phone keyboard is poor, and the app is keyboard-driven. Make the site readable and usable on a phone, but design for laptops. Say so on the landing page if someone arrives on mobile.
- **Running user code is safe as built.** Answers run in the visitor's own browser inside Pyodide, never on a server. Keep it that way. Running users' code on your own server would add real security and cost problems.
- **Card ids must never change** (already a rule in `CARD_RULES.md`). Once history is synced for thousands of users, renaming an id loses their progress on that card.
- **Search engines cannot see cards inside the app.** See the SEO point in section 7.

## 5. Hosting

The site is static files plus a small database for accounts. That is cheap.

| Part | Recommendation | Cost to start | Why |
|---|---|---|---|
| Site and CDN | Cloudflare Pages | Free | Unlimited bandwidth on the free plan, which matters with a 10 MB wasm file. Commercial use is allowed. |
| Domain | Any registrar (Cloudflare sells at cost) | About $12 a year | |
| Accounts and database | Supabase | Free, then $25 a month | Sign-in, Postgres and row-level security in one service. |
| Payments | Paddle, Lemon Squeezy or Polar | About 5% plus 50¢ per sale | They are the seller on record and handle sales tax and VAT in every country. |
| Email (receipts, sign-in links) | Resend or Postmark | Free at low volume | |
| Analytics | Cloudflare Web Analytics or Plausible | Free or about $9 a month | No cookies, so no cookie banner. |

Avoid:

- **Vercel's free plan.** Its terms do not allow commercial use, so the site would need the $20 a month plan from the day it takes money.
- **GitHub Pages.** Its terms say it is not for running an online business.
- **Stripe on its own, at first.** The fees are lower (about 2.9% plus 30¢), but you become responsible for registering and filing sales tax and VAT wherever customers are. Move to Stripe later if the fee difference becomes worth an accountant.

One Supabase catch: free projects are paused after a week with no activity. That will not happen once there are users, but it can during development.

## 6. Making the paywall real

Today every card is compiled into one JavaScript file. If paid cards are in that file, anyone can read them in the browser's developer tools without paying.

1. **Split the deck in two.** The first variant of each skill (and every variant in the three taste sections) stays in the public bundle. All other variants are built into a separate file that is not part of the public site.
2. **Serve the paid file only to subscribers.** A small server function (Supabase Edge Function or Cloudflare Worker) checks the user's subscription and returns the file.
3. **Record subscriptions from payment webhooks.** The payment provider calls your function when someone subscribes, renews or cancels; the function updates a `subscriptions` table. Never trust the browser to say who has paid.
4. **Keep paid cards out of the public repo.** Put them in a private repo or a private package that the build pulls in.
5. **Accept that a paying user can copy the cards.** That cannot be prevented. The terms of service forbid it, and the product people pay for is the drilling, the weighting and the sync, not a text list.

### The public repo

`Antmnguyen/Coding-Cards` is public and has no licence file. With no licence, others have no legal right to reuse the code, but they can read all of it. Pick one before launch:

- **Open core (recommended).** Keep the engine and the free deck public and add a licence. Keep paid decks private. A public repo is useful with this audience: it earns trust, GitHub stars and contributions.
- **Fully private.** Simpler, and nobody can run a copy of the site. Loses the above.

If the engine stays public, choose the licence on purpose. MIT lets anyone, including a competitor, host a copy. AGPL requires anyone who hosts a modified copy to publish their changes, which discourages that.

## 7. Distribution

Free channels first, in rough order of expected return:

1. **Reddit:** r/leetcode, r/cscareerquestions, r/csMajors, r/learnpython. Read each subreddit's self-promotion rules first. Post once, as the person who built it, with a short video of a drill. Answer every comment.
2. **University CS clubs and Discord servers.** Start with your own. Offer club officers free paid accounts for members. One recommendation in a club chat is worth more than an advert.
3. **Short videos** (TikTok, Reels, YouTube Shorts): "Python traps that fail interviews". Each trap card (`sort()` returns `None`, `[[0] * c] * r`, `{}` is not a set) is a ready-made 20-second video ending on the site.
4. **Search pages.** Generate one static page per topic from the free card data ("Python heapq cheat sheet", "Python slicing cheat sheet"), each with a "drill these" button. People search for these phrases all year.
5. **Launch posts:** Show HN and Product Hunt. One-off spikes; do them once the site is solid.
6. **Referrals:** give a free month to both sides when a friend signs up.
7. **Later, selling to groups:** bootcamps, career centres and clubs buying seats in bulk. Only worth it once individuals are paying.

Timing: recruiting peaks from August to October and from January to March. The autumn peak is happening now and cannot be caught. Have the free site live by early January 2027 and payments ready before August 2027.

## 8. How to avoid getting sued

Ordered by how likely each is to cause real trouble.

### Other companies' names and content

- **LeetCode.** Do not put "LeetCode" in the product name, the domain, the logo or advert headlines. Saying "practise the Python syntax that comes up in LeetCode-style problems" in body text is describing, which is generally fine. Never copy problem statements, problem numbers, editorial text or other users' solutions. `CARD_PLAN.md` lists "accepted solutions, scanned line by line" as a source: use those only to learn which syntax exists, and write every card, prompt and example from scratch (which is already the rule there).
- **NeetCode, Blind 75, cheat sheets.** Same rule. Do not copy their lists, wording or structure, and do not use their names to sell the product.
- **Monkeytype.** The README says the look is "inspired by Monkeytype". A similar clean look is fine. Do not copy its code, CSS, themes or logo (its code is under GPL, which would force this project's code open), and take the name out of marketing copy.
- **Company names.** Do not claim cards are "real Google interview questions" or use company logos.
- **Python.** "Python" may be used to describe what the cards teach. The Python logo and the word in a product name are covered by the Python Software Foundation's trademark policy. Check it before using either.
- **Product name.** Before buying a domain, search the USPTO trademark database and the web for "Coding Cards" and any alternative. A descriptive name like this is hard to protect and may already be used by someone else. Check.
- **Open-source dependencies.** Pyodide (MPL-2.0), React and Electron (MIT) and JetBrains Mono (OFL) all allow commercial use. Keep their licence notices and add a "licences" page. Re-check whenever a dependency is added.

### Whether you may run this business at all

These are the items people in this audience overlook. Check each that applies.

- **Student visa.** If you are in the US on an F-1 visa, earning money from your own business can break the terms of the visa. Talk to your international student office before taking a payment.
- **Employer.** If you have or accept a job, read the offer letter for clauses on side projects and on who owns what you build. Do not work on this with company equipment or on company time.
- **University.** If any of this was built for a class, with research funding or with significant university resources, read the university's intellectual property policy.

### Taking money

- **Form an LLC before the first sale.** It separates business liability from personal assets. Open a separate bank account for it.
- **Subscriptions.** US federal law and state laws (California's is the strictest) require: the price and renewal terms shown clearly before purchase, explicit consent, a confirmation email, and cancelling online as easily as signing up. EU and UK buyers generally get a 14-day right to withdraw. Build a one-click cancel button from the start.
- **Refunds.** Publish a simple policy (for example, a full refund within 14 days) and honour it. Chargebacks cost more than refunds.
- **Sales tax and VAT.** Handled by the merchant of record. This is the main reason to use one.
- **Income tax.** Revenue is taxable from the first dollar. Keep records.

### Marketing claims

- **Promise nothing about jobs.** No "get hired", no "pass your interview", no success rates that were not measured. Describe what the product does.
- **Testimonials must be real**, from real users, used with permission.
- **Email.** Marketing emails need an unsubscribe link and a postal address (CAN-SPAM). Only email people who signed up.

### User data

- **Publish a privacy policy and terms of service** before collecting an email address. State what is stored (email, answer history, payment status), who processes it (Supabase, the payment provider, the email service) and how to delete an account.
- **Collect as little as possible.** No names, no universities, no résumés. Less data means less risk.
- **Offer account deletion and data export.** GDPR (EU, UK) and CCPA (California) require them, and visitors can come from anywhere.
- **Set a minimum age of 16** in the terms (13 is the legal floor in the US under COPPA; 16 avoids the consent rules in parts of the EU).
- **Never store card numbers.** The payment provider does that.
- **Terms of service should include:** no warranty, a limit on liability, no scraping or redistribution of cards, and the right to end accounts that share logins.

### The cards themselves

- **Copyright in the deck may be weak.** In the US, content written mostly by an AI tool with little human authorship may not be protected by copyright. If cards are produced that way, rely on keeping paid cards private and on the terms of service, not on copyright alone.
- **Wrong cards are a reputation risk, not a legal one,** but add a "report this card" button. The existing tests, which run every solution against its own check, are a real selling point: "every answer is machine-checked".

## 9. Phases

Each phase has a gate. Do not start the next until the gate is met.

| Phase | Work | Gate to move on |
|---|---|---|
| 0. Groundwork (now) | Choose the name and domain after a trademark search. Decide open core or private. Check visa, employer and university items. Keep writing cards per `CARD_PLAN.md`. | Name chosen; personal checks done. |
| 1. Free web version | Port steps 1 to 6. Landing page. Analytics. Post in two or three communities. | About 20% of people who finish a session come back within a week. If far fewer, fix the product before going further. |
| 2. Accounts | Port steps 7 and 8. Privacy policy and terms. Collect emails. | A few hundred accounts, and people using more than one device. |
| 3. Payments | LLC, bank account, lawyer review. Split the deck, paywall, payment provider, cancel and refund flows. Paid sections written privately. | First 20 paying customers who are not friends. |
| 4. Growth | Search pages, videos, referrals, club partnerships. A JavaScript deck (section 12). | Revenue covers costs with margin. |
| 5. Groups | Bulk seats for bootcamps and clubs. | Only if individuals are paying steadily. |

### Numbers to watch

- **Activation:** share of visitors who answer a first card. This measures the landing page.
- **Return rate:** share who come back within a week. This measures the product, and is the number that decides whether charging is worth attempting.
- **Free to paid:** freemium products usually convert a low single-digit percentage of active free users. Plan on 2 to 5% (section 10), so 1,000 paying users needs tens of thousands of active free ones.
- **Churn:** expect monthly subscribers to leave after two to four months. Judge the business on revenue per customer over their whole stay, and push yearly and lifetime plans.

## 10. How big is this, realistically

Researched on 2026-10-10 by web search. Figures marked "estimate" come from third-party trackers or secondary write-ups, not from the companies themselves. The scenarios at the end are my own arithmetic, not a forecast anyone published. Sources are listed at the end of the section.

### The short answer

This is realistic as a side income and a strong portfolio project. It is not realistic as a salary unless it finds an audience on the scale of a known tool, and the market it serves is shrinking and changing. Running costs are close to zero, so the only real risk is time.

### What the research found

**The audience is large but under pressure.**

- About 122,000 computer science bachelor's degrees were awarded in the US in 2024, up from about 56,000 in 2014 (NSF figures as reported).
- That pipeline has started to shrink. The National Student Clearinghouse reported undergraduate CS enrolment at four-year colleges down 8.1% in autumn 2025, the first fall in about twenty years.
- Junior hiring has contracted. A Stanford study found employment of software developers aged 22 to 25 down nearly 20% from its 2022 peak by July 2025. New York Fed data (as cited) puts unemployment for recent CS graduates at about 7%, against about 4% for recent graduates overall.
- What this means: fewer people entering, but those who are in it are preparing harder for fewer seats, with less money to spend.

**The category leader earns little per visitor.**

- LeetCode gets roughly 25 million visits a month (Semrush estimate, October 2025). Its 2024 revenue is listed as about $8 million (Wikipedia, single source, unverified).
- If both are roughly right, that is under 3 cents per visit, for the best-known brand in the field charging $35 a month. Interview prep attracts huge traffic and converts very little of it to money.

**Nobody appears to sell exactly this.**

- I found typed-answer code drilling as a paid product in one place: Execute Program ($39 a month or $235 a year), which teaches languages with spaced repetition and is not aimed at interviews.
- I found Python syntax flashcards (Brainscape decks, a printed deck, an iOS app) that are recall-only, with nothing typed or run.
- I did not find a typed, run-checked syntax drill aimed at interview prep. This was a short search, so treat it as "none found", not "none exist". An empty niche can mean an opportunity or can mean people do not pay for this. Only launching will tell.

**A one-person drill site can get very large, but that is rare.**

- Monkeytype, built by one person, gets about 15 million visits a month (Semrush estimate), with about 72% of traffic arriving directly, which means habit. It is paid for by adverts, not subscriptions, and typing is something everyone does. It shows the format can stick; it does not show that people pay for it.

**Reach is available for free.**

- r/cscareerquestions has about 2.3 million members, r/csMajors about 400,000 and r/leetcode about 230,000 (third-party trackers; these lag).

**AI is changing interviews, in both directions.**

- Against: Meta began piloting a coding round with an AI assistant built in from October 2025, replacing one of its two onsite coding rounds. One recruiting blog claims most recently founded AI startups have reduced or dropped LeetCode-style questions (no method given).
- For: the same write-ups say large companies still run algorithm rounds with AI switched off, and that in-person final rounds are returning because remote ones are easy to cheat. An AI-off, in-person round is exactly where remembering syntax matters, because there is no autocomplete and nothing to look up.
- Net: helpful for the next year or two, uncertain after that. If AI-assisted rounds become the norm, the need for memorised syntax falls.

**The honest weakness.** Syntax is a real annoyance but a small one. Most people fix it as a side effect of doing LeetCode problems, or by asking an AI chatbot. This product is an add-on to interview prep, not the main event, which limits both how many people want it and what they will pay.

### Three scenarios for the first year after the web launch

Assumptions, all mine: 40% of visitors answer a first card; 8 to 10% of those become regular users; 4 to 5% of regular users pay (published freemium benchmarks for education sit around 2.6 to 3.1%, so this is slightly generous); a paying user is worth about $30 a year across monthly, yearly and lifetime plans.

| Scenario | What happens | Visitors in the year | Regular users | Paying users | Revenue |
|---|---|---|---|---|---|
| Low (most likely for a new project with no audience) | A few posts, modest interest | 10,000 | 400 | 20 | About $600 |
| Middle | A post or video does well, search pages bring steady traffic | 100,000 | 4,000 | 200 | About $6,000 |
| High | It becomes a tool people name in r/leetcode, or a known creator recommends it | 1,000,000 | 32,000 | 1,300 | About $39,000 |

Cross-check: LeetCode's implied rate of under 3 cents per visit, applied to a million visits, gives about $27,000. That is the same order as the high scenario, so the high scenario is roughly "convert as well as LeetCode does", which is a ceiling and not an expectation.

### What it is worth even if the money is small

- **A shipped product with real users** is worth more on a new-grad résumé than most side projects, and you are the target audience for your own hiring pitch.
- **An audience** (email list, search traffic) can be pointed at whatever comes next.

### The cheapest way to find out

1. Ship the free web version and watch the return rate (section 9). If people do not come back for free, they will not pay.
2. Before building payments, add a "get the full deck" button that takes an email, or pre-sell lifetime access at a low price through a payment link. Twenty real pre-orders say more than any estimate here.
3. Only then build the paywall.

### Sources

- Enrolment and degrees: [College Transitions](https://www.collegetransitions.com/?p=28487), [The Next Web](https://thenextweb.com/news/computer-science-enrollment-falls-ai-first-time), [IT Brew](https://www.itbrew.com/stories/2026/02/23/computer-science-degrees-may-be-losing-their-charm-but-tech-leaders-aren-t-worried)
- Junior hiring: [University at Buffalo career blog](https://careerdesignstudio.buffalo.edu/blog/2026/06/29/the-computer-science-degree-isnt-dead/), [RezScore](https://blog.rezscore.com/software-engineering-job-market-2026/), [Implicator](https://www.implicator.ai/software-engineering-openings-jump-30-even-as-52-000-tech-workers-lose-jobs/)
- LeetCode: [Wikipedia](https://en.wikipedia.org/wiki/LeetCode), [Semrush](https://www.semrush.com/website/leetcode.com/overview/), [LeetCode pricing](https://leetcode.com/subscribe/)
- NeetCode pricing: [techinterview.org directory](https://www.techinterview.org/bootcamp_directory/p/neetcode-pro/)
- Execute Program: [FAQ](https://www.executeprogram.com/faq). Codewars and Exercism pricing: [Toolradar](https://toolradar.com/tools/exercism/pricing)
- Monkeytype: [Semrush](https://www.semrush.com/website/monkeytype.com/overview/), [The Boring Goldmine](https://boring.beehiiv.com/p/monkeytype), [Keyboard Builders' Digest interview](https://kbd.news/Interview-3-years-of-Monkeytype-2019.html)
- Subreddit sizes: [GummySearch](https://gummysearch.com/r/leetcode), [The Hive Index](https://thehiveindex.com/communities/r-cscareerquestions/)
- AI in interviews: [interviewing.io](https://interviewing.io/blog/how-to-use-ai-in-meta-s-ai-assisted-coding-interview-with-real-prompts-and-examples), [techinterview.org](https://www.techinterview.org/post/3233475417/what-changed-tech-interviews-2026/), [LeetCode discussion post](https://leetcode.com/discuss/post/8446005/), [Recruiting from Scratch](https://www.recruitingfromscratch.com/blog/is-leetcode-dead-how-ai-startups-are-changing-technical-interviews)
- Freemium conversion: [Userpilot](https://userpilot.com/blog/freemium-to-premium), [Adapty](https://adapty.io/blog/markdown/freemium-to-premium-conversion-techniques.md)
- Existing syntax flashcards: [Brainscape](https://www.brainscape.com/packs/python-syntax-18605281), [Red-Green-Code on learning syntax for LeetCode](https://www.redgreencode.com/leetcode-tip-20-learning-language-syntax/)

## 11. How realistic is the web port

Very. This is the least risky part of the whole plan. The time estimates are mine, for one person working part-time who knows this codebase.

| Piece | Effort | Risk | Why |
|---|---|---|---|
| Free site with browser storage (section 4, steps 1 to 4) | 2 to 4 days | Low | Three files touch Electron. The rest is already browser code. |
| Landing page and analytics | 2 to 3 days | Low | |
| Usable on small screens | 2 to 3 days | Low | `styles.css` has no `@media` rules today, so the layout is fixed at desktop width. |
| Accounts and synced history | About 1 week | Medium | First server-side piece. Merging history from two devices needs care. |
| Deck split, paywall, payment webhooks | 1 to 2 weeks | Medium | Money and access control have to be right the first time. |
| Privacy policy, terms, LLC, lawyer review | Calendar time, not coding | Low | Start early; it waits on other people. |

So a free public site is about a week or two of part-time work, and a product that takes money is four to six weeks.

### Problems found in the code that the port has to fix

1. **Right answers get marked wrong while Python is loading.** In `Drill.tsx`, `submit()` only runs the check when `pyReady` is true. Before that, an answer that is correct but worded differently from `solution` is recorded as a miss. In the exe Python loads from disk in a few seconds, so this is rare. On the web a first-time visitor on a slow connection is downloading about 12 MB before Python is ready, and their first cards are the ones that decide whether they stay. Fix: if a card has a `check` and Python is not ready, show "checking…" and wait, and do not record a miss.
2. **The download is large for a first visit.** `pyodide.asm.wasm` is 9.6 MB and `python_stdlib.zip` is 2.5 MB. A host that compresses the wasm will send noticeably less, and after the first visit it is cached. Start the download the moment the landing page opens, not when the drill starts.
3. **The content security policy is locked to the site itself.** `index.html` allows scripts, styles and fonts from `'self'` only. That is good, and it works unchanged for the plain site. Analytics, Supabase and the payment provider each need their address added.
4. **A runaway answer restarts Python.** `runner.ts` kills the worker after one second and starts a new one. That is the right design, and on the web the restart reads from the browser cache, but check it stays fast.

### What makes it easy

- The worker already finds its files relative to its own address, so it does not care whether it is served by Electron or a web host.
- History is one small JSON object, which fits `localStorage` and syncs as a single document.
- The queue, weighting and matching are pure functions with tests. None of them change.
- Nothing runs on a server, so there is nothing to scale and no user code to sandbox.

### What is hard, and it is not the port

- **Content.** 288 of about 2,000 planned cards are written. That is most of the remaining work in this whole plan.
- **Getting people to the site.** See sections 7 and 10.

## 12. How realistic is `future.md`

`future.md` proposes TypeScript and React decks. The three parts of it differ a lot in difficulty, so they are taken separately.

| Part of `future.md` | Realistic? | Engine effort | Fit with "one line of syntax, typed from memory" |
|---|---|---|---|
| Phase 1: language field, runner interface, language switcher | Yes | A few days | n/a |
| JavaScript-level cards (arrays, strings, `Map`, `Set`, destructuring, sorting) | Yes, easier than Python was | About a week | Excellent |
| TypeScript type-level cards (generics, utility types, narrowing) | Yes, with a new kind of check | 1 to 2 weeks | Fair |
| React cards (hooks, effects, JSX) | Only with a new card format | Several weeks | Poor |
| Phase 4: per-language stats, mixed blitz | Yes | A day or two | n/a |

### Phase 1: preparation

Straightforward. `Language` in `types.ts` is currently the single value `"python"`, and `topic()` sets it. The work is:

- Widen the type and add a language switcher above the topic chips on Home.
- Turn `runner.ts` into an interface with one implementation per language. Loading Pyodide only for Python sessions, as `future.md` says, is the right call and saves a 12 MB download for everyone else.
- Give `match.ts` a normaliser per language. The current one is built around Python (indentation depth, quote style). JavaScript needs optional semicolons and backtick strings handled.

### JavaScript-level cards: do this first

This is the part worth doing, and `future.md` undersells it by filing it under TypeScript.

- **It is easier than Python.** The browser already runs JavaScript. There is no 10 MB runtime to download: the answer runs in a Web Worker, with the same kill-on-timeout design.
- **Two things to build.** A JavaScript version of `harness.ts` (run the given code, run the answer, evaluate the check). And a safe place to run it: the current content security policy forbids evaluating strings as code, so it needs either a sandboxed iframe or a relaxed policy for the worker only.
- **It serves the same audience.** JavaScript is one of the common languages for LeetCode-style interviews, and the whole of `CARD_PLAN.md` (38 sections of skills) can be reused as the list of what to cover. Same skills, different syntax.

Recommendation: rename this deck "JavaScript for interviews" and build it as a mirror of the Python deck.

### TypeScript type-level cards: possible, lower priority

- **They cannot be checked by running them,** because types disappear when the code runs. A card asking for `Partial<User>` needs the TypeScript compiler to say whether the answer type-checks.
- **That means shipping a compiler to the browser.** It is several megabytes. Note that this repo uses TypeScript 7, the native compiler; a browser needs the JavaScript-based compiler package or a WebAssembly build. Check what is available before committing to this.
- **The check becomes "does this compile with no errors"** against an assertion such as "this type equals that type". That is a known technique (it is how type-challenge sites work), but it is a second checking system to build and test.
- **`future.md` suggests "a lightweight AST parser" instead.** That would only compare the shape of the text, and there are too many correct ways to write a type for that to be fair.
- **The audience is narrower.** Utility types and conditional types come up in front-end interviews, not in the algorithm rounds this product is built around.

### React cards: the hard one

- **Answers are not one line.** A hook with an effect and a cleanup is five to ten lines. `CARD_RULES.md` caps answers at three lines and the tests enforce it.
- **There are too many right answers for text matching.** `future.md` proposes "strict pattern matching and smart-normalization for JSX". JSX can be laid out and named in endless correct ways, so right answers would be marked wrong often, and that is the fastest way to lose a user.
- **Checking by behaviour needs a small test rig in the browser:** something to turn JSX into JavaScript, React itself, a fake page to render into, and assertions about what was rendered. It can be built, but it is weeks of work and the largest thing in `future.md`.
- **Much of the React list is not typing at all.** Stale closures, dependency arrays and conditional hooks are about understanding, and are better tested as "what does this print" or "which line is wrong". The app has no card type for that.
- **There is established competition** in front-end interview prep, which there is not for Python syntax drills.

If React is wanted anyway, the realistic version is narrow: single hook lines placed into a `template` (the mechanism that already exists for loop headers), such as the `useState` updater form or a dependency array, plus a new "predict the output" card type for the conceptual traps.

### The real cost is cards, not code

The Python deck is at 288 of about 2,000. Every new language is another several hundred to a thousand cards, each needing a runnable solution and a check. Three languages at once means three half-finished decks.

Recommended order:

1. Finish Python to the point where the paid tier is worth paying for.
2. Web port (section 11).
3. JavaScript deck, mirroring the Python sections.
4. TypeScript type cards, only if users ask.
5. React, last, and only in the narrow form above.

"Full Stack Blitz" across languages is a day of work once two decks exist, and is a nice touch, not a reason to build them.

## 13. Open decisions

For discussion. My recommendation is given where I have one.

1. **Is the realistic income worth it?** Section 10 says a few hundred to a few thousand dollars in year one is the likely range. If the goal is portfolio and learning, carry on. If the goal is income, validate with pre-orders before building payments.
2. **Variants as the free/paid gate** (section 3): one free variant per skill, or two? Recommendation: one, and raise it to two if free users stop coming back.
3. **Name.** Keep "Coding Cards" or pick something that can be trademarked.
4. **Open core or private repo** (section 6). Recommendation: open core.
5. **Lifetime price or not.** It brings in cash early but those customers never pay again.
6. **Keep the desktop app** as a paid extra, or retire it. Recommendation: stop promoting it.
7. **Second language.** `future.md` says TypeScript then React. Recommendation: a JavaScript deck instead, and React last or never (section 12).
8. **Python only at launch,** or wait for a second deck. Recommendation: Python only.
9. **How much to bet on AI-off interviews lasting** (section 10). This decides whether to invest in 2,000 cards or stop at a smaller, sharper deck.
