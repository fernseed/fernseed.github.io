---
sitemap: false
title: Current Projects
permalink: /now/
author: dmcgk
---

Below will be an updated list of the items that I'm currently (claiming to be) working on. It will live here as a shaming reminder for future-me to actually complete them, or at least keep them moving.

{% assign current_category = "None" %}
{% assign sorted_projects = site.data.projects | sort: 'category' %}
{% for project in sorted_projects %}
{% if project.category != current_category %}
{% assign current_category = project.category %}
## {{ current_category }}
{% endif %}
- {{ project.description }}
{% endfor %}