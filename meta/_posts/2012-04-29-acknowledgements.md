---
title: Acknowledgements
subtitle: 
tagline: 
permalink: 
date: 2012-04-29 
modified: 20/09/2015
sticky: true
tags: [introduction, thanks]
gists: 
files: 
redirect_from: 
summary:
    The tools, projects and people which have contributed in some fashion to the construction of fernseed.org.
sidebar:
    There have undoubtedly been tips and tricks picked up from other random sources over time that I've forgotten to mention here. If I'm using something of yours without due credit, let me know (@dmcgk).
---

<!-- Includes -->

{% include markdown/global-references.md %}

<!-- Content -->

Many thanks to the following people and projects for creating the tools which have helped create [fernseed.org][fernseed]:

{% assign sorted_dependencies = site.data.dependencies | sort: 'name' %}
{% for project in sorted_dependencies %}
<a name="{{ project.name }}"></a>
[*{{ project.name }}*]({{ project.url }}) by {% if project.contact-url %}[{{ project.contact }}]({{ project.contact-url }}){% else %}{{ project.contact }}{% endif %} <span class="project-type">{{ project.type }}</span>
: > {{ project.quote }} 
{% endfor %}


