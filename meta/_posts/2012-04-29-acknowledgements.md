---
title: Acknowledgements
date: 2012-04-29
modified: 20/09/2015
sticky: true
description:
    The tools, projects and people which have contributed in some fashion to the construction of fernseed.org.
---

<!-- Includes -->
{% include markdown/global-references.md %}

<!-- Content -->
Many thanks to the following people and projects for creating the tools which I'm using in the creation of [fernseed.org][fernseed].

----

{% assign sorted_dependencies = site.data.dependencies | sort: 'name' %}
{% for project in sorted_dependencies %}
<a name="{{ project.name }}"></a>
[*{{ project.name }}*]({{ project.url }}) by {% if project.contact-url %}[{{ project.contact }}]({{ project.contact-url }}){% else %}{{ project.contact }}{% endif %}
: > &hellip; {{ project.quote }} &hellip;
{% endfor %}
