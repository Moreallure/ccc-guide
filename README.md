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
  resources={[
    { label: 'Python input/output basics', href: 'https://...' },
    { label: 'C++ I/O and types', href: 'https://...' },
  ]}
/>
```

`items` render as a heading + description text when there is one, and as a bullet list when there are several. `resources` are optional and always render one link per line, opened in a new tab. Place the card right after the page `#` title, before any other content.

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