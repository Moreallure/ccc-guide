# Contributing to CCC Guide

Thanks for your interest in contributing to CCC Guide! There are several ways you can help:

- **Work on an issue**: See [Issues](https://github.com/Moreallure/ccc-guide/issues) to find areas that need improvement.
- **Open an issue**: Report a problem, share an idea, or suggest a feature, we welcome all kinds.
- **Improve content**: Add solutions in languages that aren't already covered, improve existing solutions or explanations, fix errors, or add further reading and resources that adds value.
- **Write content**: Help us create more modules, solutions, and resources.

## Content Writing

### Before You Start

We care about content quality, so content PRs may be held to a higher standard and aren't guaranteed to be merged, and we will provide feedback to help you improve. Please also keep in mind that content may also be revised or replaced in the future.

In general, a good module in Junior, Senior Core, or Senior Advanced should teach the concept, include a few past CCC problems with walkthroughs, and end with a summary of the main ideas.

- **Teach the concept**: Explain the ideas students need to understand. You can also link to other resources where they can learn more.
- **Include examples**: Use past CCC problems via `ProblemSections` to show how the concepts are applied, with walkthroughs that explain the reasoning behind the solution.
- **End with a summary**: Recap the main ideas or observations students should take away from the module.
- **Link further reading**: Optionally include useful external resources where they add value.

Avoid duplicating generic content that is already widely covered online or in other resources. For general algorithm explanations or programming language basics, link to existing resources instead of writing another full tutorial. Use the Prerequisites and Resources components where appropriate.

A few useful resources to reference:

- [Competitive Programmer's Handbook (Antti Laaksonen)](https://cses.fi/book/book.pdf)
- [CCCSolutions](https://cccsolutions.ca/)

Nonetheless, modules can be structured differently depending on the topic, as long as the content is accurate, useful, and educational. If you are unsure about any aspect of content writing, refer to existing written modules as examples, or open an issue to ask or discuss.

### Technical Details

All content is written in MDX and lives under `content/`

```
content/
├── meta.json                     # Root: section ordering
├── essentials/
│   └── introduction/             # Getting-started pages
├── junior/                       # Junior modules, grouped by topic folder
│   ├── warm-ups/
│   ├── simulation-adhoc/
│   ├── strings/
│   ├── sorting-greedy/
│   ├── counting-casework/
│   ├── graphs-search/
│   └── prefix-sums-dp/
├── senior-core/                  # Senior Core modules
│   ├── math-geometry/
│   ├── sorting-greedy/
│   ├── brute-force-ds/
│   ├── strings-graphs/
├── senior-advanced/              # Senior Advanced modules
│   ├── dp/
│   ├── graph-algorithms/
│   ├── trees/
│   ├── data-structures-ii/
│   ├── geometry-ii/
│   └── number-theory-combinatorics/
└── problems/
    └── <year>/                   # 2012–2026
        ├── J1.mdx … J5.mdx
        ├── S1.mdx … S5.mdx
        └── assets/               # Images referenced by that year's problems
```

A module's URL mirrors its folder path, e.g. `content/junior/warm-ups/first-30-marks.mdx` is served at `/junior/warm-ups/first-30-marks`.

## MDX Components and Conventions

### Embedding a problem (ProblemSections)

```mdx
import ConcertTickets, { frontmatter as problemMeta } from '../../problems/2026/J1.mdx'
import { ProblemSections } from '@/components/problem-sections'

<ProblemSections component={ConcertTickets} meta={problemMeta}>

## J1 Walkthrough: Concert Tickets

</ProblemSections>
```

Pass `imageSize="6rem"` (any CSS length) to cap the problem's images; the default is 12rem.

### Code Tabs (LangTabs)

````mdx
import { LangTabs, Tab } from '@/components/lang-tabs'

<LangTabs items={['Python', 'C++']}>

  <Tab value="Python">

```python
B = int(input())
```

  </Tab>

  <Tab value="C++">

```cpp
#include <bits/stdc++.h>
```

  </Tab>

</LangTabs>
````

### Prerequisites card

```mdx
import { Prerequisites } from '@/components/prerequisites'

<Prerequisites
  items={[
    {
      name: 'Programming concepts',
      body: 'Input & output, variables & arithmetic, conditionals, lists & loops',
    },
  ]}
/>
```

`items` render as a heading + description text when there is one, and as a bullet list when there are several. Place the card right after the page `#` title, before any other content.

### Resources card

```mdx
import { Resources } from '@/components/resources'

<Resources
  items={[
    { label: 'USACO Guide — Ad-hoc', href: 'https://usaco.guide/bronze/ad-hoc', description: 'Further ad-hoc problems and observations.' },
  ]}
/>
```

`items` are `{ label, href, description? }`; each renders as a link (new tab) with the site's favicon fetched automatically from the href's domain. `description` is optional. Typically placed at the end of a module, after the practice problems.

### Work in progress modules

Modules that are scaffolding get `wip: true` in their frontmatter. The "Work in progress" banner renders automatically under the page title, and the module is dimmed in the sidebar.

```mdx
---
title: "Module title"
wip: true
---
```

### Contributors

If you wrote an original, substantial portion of a module's content, you may add your name to the `contributors` frontmatter field. Names render under "Contributors" at the bottom of the page's "On this page" column.

```mdx
---
title: "Module title"
contributors: ["Moreallure"]
---
```

You can also add yourself to `src/lib/contributors.js` to make your name link to your profile wherever it appears. This is optional, names without an entry will show as plain text.

### Math

MDX processes backslashes before the math plugin does, so LaTeX needs **double backslashes** in the source. If you only use one, it may compile but show up as raw text on the page.

* Inline math: `\\(x \\leq 10\\)`
* Display math: put `\\[` and `\\]` on separate lines, with a blank line before and after the formula.
* LaTeX commands also need double backslashes: `\\leq`, `\\times`, `\\max`, `\\bmod`.
* Be careful with `{}`, `<`, `*`, and `~` inside math spans because MDX can treat them as JSX or formatting. Escape them when needed, for example `10^\\{-6\\}`, `\\<`, and `\\*`. `^` and `_` don't need escaping.
* Run `npm run build` after adding math. It checks all the content files and will catch broken math or KaTeX errors.
