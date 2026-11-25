---
layout: research-site
title: Publications
permalink: /publications/
description: "Papers and talks by Yong Feng on AI infrastructure, programmable data planes, and networking."
---
{% assign talks = site.data.research_works | where: 'type', 'talk' %}
<header class="page-head"><h1>Publications</h1><p>{{ site.data.research_works.size | minus: talks.size }} papers · <a href="#talks">Talks</a> · <a href="{{ site.author.googlescholar }}">Google Scholar</a></p></header>
<ul class="works">
{% for work in site.data.research_works %}{% unless work.type == 'talk' %}{% include research-work.html work=work %}{% endunless %}{% endfor %}
</ul>
<section class="selected" id="talks">
  <h2>Talks</h2>
  <ul class="works">
  {% for work in talks %}{% include research-work.html work=work %}{% endfor %}
  </ul>
</section>
