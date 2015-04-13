---
title: Acknowledgements
tags: [introduction, thanks]
modified: 2015-03-02
sticky: true
summary:
    The tools, projects and people which have contributed in some fashion to the construction of fernseed.org.
sidebar:
    There have undoubtedly been tips and tricks picked up from other random sources over time that I've forgotten to mention here. If I'm using something of yours without due credit, let me know (@dmcgk).
---

Many thanks to the following people and projects for creating the tools which have helped create [fernseed.org](/):

{% for project in site.data.dependencies %}[*{{ project.name }}*]({{ project.url }}) by {% if project.contact-url %}[{{ project.contact }}]({{ project.contact-url }}){% else %}{{ project.contact }}{% endif %} <span class="project-type">{{ project.type }}</span>
: > {{ project.quote }}

{% endfor %}


