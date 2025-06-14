---
layout: _base.njk
---

# What is SPAish?

SPAish is a [progressive enhancement](https://www.quirksmode.org/blog/archives/2021/02/progressive_enh_1.html) toolkit,
made of a few small functionalities to make a site more interactive and modern without the need to
use a full SPA framework. It is not a framework, it is a set of tools to enhance your MPA.

## Why does SPAish exist?

SPAs grow for the sake of SPA frameworks it seems.
React.js was created to solve a facebook problem, how many of us have this scale of problems?

SPAish is a reset. Write a fast rendering MPA website and enhance
the places that benefit from it with SPAish functionality, instead of 
using an SPA for everything.  
This allows:
- you to focus on a speedy backend, you fully control it (not the client it runs on)
- optimize queries, loading times and page size (on the backend)
- take advantage of the amazing speed a browser rendering engines offer (streaming rendering, etc.)
- sprinkle interactivity and UI niceties into the page where useful/fun/needed
- ship less JS over the wire 
- be SEO inclusive, accessible and fast from the start
- be flexible to use SPA frameworks for pages or parts of a page where they are right

In the end SPAish just encourages MPAs and tries to provide the glitter of SPAs
without the heavy load and the steep learning curve by leveraging the amazingly
fast browser engines of today's world. If that is not enough, MPAs are way more
accessible and scale to many more devices due to the lower memory and bandwidth footprint.

Read the [various posts by Alex Russell](https://infrequently.org/), 
a person who shaped the web and the browser
substantially, his posts underline the above stated.

> In short, nobody should start a new project in the 2020s based on React. Full stop.

– [Alex Russell, 2024 on infrequently.org](https://infrequently.org/2024/11/if-not-react-then-what/)


## 