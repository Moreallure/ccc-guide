## Writing Content

### Embedding a problem (ProblemSections)

```mdx
import ConcertTickets, { frontmatter as problemMeta } from '../../problems/2026/J1.mdx'
import { ProblemSections } from '@/components/problem-sections'

<ProblemSections component={ConcertTickets} meta={problemMeta}>

## J1 Walkthrough: Concert Tickets

</ProblemSections>
```

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

### Math

MDX processes backslashes before the math plugin does, so LaTeX needs **double backslashes** in the source. If you only use one, it may compile but show up as raw text on the page.

* Inline math: `\\(x \\leq 10\\)`
* Display math: put `\\[` and `\\]` on separate lines, with a blank line before and after the formula.
* LaTeX commands also need double backslashes: `\\leq`, `\\times`, `\\max`, `\\bmod`.
* Be careful with `{}`, `<`, `*`, and `~` inside math spans because MDX can treat them as JSX or formatting. Escape them when needed, for example `10^\\{-6\\}`, `\\<`, and `\\*`. `^` and `_` don't need escaping.
* Run `npm run build` after adding math. It checks all the content files and will catch broken math or KaTeX errors.