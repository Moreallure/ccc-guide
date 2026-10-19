## Writing Content

### Embedding a problem (ProblemSections)

```mdx
import ConcertTickets, { frontmatter as problemMeta } from '../../problems/2026/J1.mdx'
import { ProblemSections } from '@/components/problem-sections'

<ProblemSections component={ConcertTickets} meta={problemMeta}>

## J1 Walkthrough: Concert Tickets

</ProblemSections>
```

Pass `imageSize="6rem"` (any CSS length) to cap the problem's images; the default is 12rem.

### Code implementations (LangTabs)

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

### Math

MDX processes backslashes before the math plugin does, so LaTeX needs **double backslashes** in the source. If you only use one, it may compile but show up as raw text on the page.

* Inline math: `\\(x \\leq 10\\)`
* Display math: put `\\[` and `\\]` on separate lines, with a blank line before and after the formula.
* LaTeX commands also need double backslashes: `\\leq`, `\\times`, `\\max`, `\\bmod`.
* Be careful with `{}`, `<`, `*`, and `~` inside math spans because MDX can treat them as JSX or formatting. Escape them when needed, for example `10^\\{-6\\}`, `\\<`, and `\\*`. `^` and `_` don't need escaping.
* Run `npm run build` after adding math. It checks all the content files and will catch broken math or KaTeX errors.