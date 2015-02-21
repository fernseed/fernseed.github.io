---
layout: index
permalink: /meta/stats/
sticky: true
tags: [writing, data-visualisation, quantified-self]
summary: 
    Some charts and figures on my writing progress and consistency. This is inspired by <a href='http://twitter.com/jamietr'>@jamietr</a>'s quantified-self project&hellip; and his <a href='http://open.jamierubin.net/v7/writing.php'> 500+ day writing streak</a>!
sidebar: 
    See <a href='/technology/jekyll-and-data-visualisation/'>this post</a> for more details.
---

{% assign entryCount = site.data.progress | size %}

<h6 id="tag-subheader" class="post-subtitle"><span class="selector" id="7Selector" onclick='setPeriod(7)'>7 days</span> &middot; <span class="selector" id="30Selector"  onclick='setPeriod(30)'>30 days</span>{% if entryCount > 365 %} &middot; <span class="selector" id="365Selector" onclick='setPeriod(365)'>1 year</span>{% endif %} &middot; <span class="selector" id="0Selector" onclick='setPeriod(0)'>All</span></h6>
<h1 id="tag-header" class="post-title">{{ page.title }}</h1>

<article itemscope itemtype="http://schema.org/Article">
    <meta itemprop="name" content="{{ page.title }}" />
    <meta itemprop="datePublished" content="{{ page.date | date_to_xmlschema }}" />

    <div id="365-day-progress-chart" class="progress-chart"><h5>Loading chart&hellip;</h5></div>

    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>

    <script type="text/javascript">

        google.load('visualization', '1', {packages: ['corechart']});
        google.setOnLoadCallback(drawChart);

        {% assign most_recent = site.data.progress | last %}
        {% assign earliest = site.data.progress | first %}

        reportPeriod = 7;
        var mostRecentEntry = "{{ most_recent.date }}".split("-");;
        var earliestEntry = "{{ earliest.date }}".split("-");;
        var reportView = new Date(mostRecentEntry[0], mostRecentEntry[1]-1, mostRecentEntry[2]);
        var earliestDate = new Date(earliestEntry[0], earliestEntry[1]-1, earliestEntry[2]);

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Fiction');
        data.addColumn('number', 'Non-Fiction');
        data.addColumn('number', 'Target');
        data.addColumn('number', 'Weekly Average');

        {% assign total = 0 %}
        {% assign 7dayTotal = 0 %}
        {% assign counter = 1 %}

        data.addRows([
            {% for entry in site.data.progress offset:period %}{% assign total = total | plus:entry.fiction | plus:entry.non-fiction %}{% assign 7dayTotal = 7dayTotal | plus:entry.fiction | plus:entry.non-fiction %}{% if counter > 7 %}{% assign 7dayMarker = forloop.index0 | plus:period | minus:7 %}{% assign 7dayTotal = 7dayTotal | minus:site.data.progress[7dayMarker].fiction | minus:site.data.progress[7dayMarker].non-fiction %}{% endif %}[ new Date({{ entry.date | date: "%Y" }}, {{ entry.date | date: "%m" | minus:1 }}, {{ entry.date | date: "%d" }}), {{ entry.fiction }}, {{ entry.non-fiction }}, {{ total | divided_by:forloop.index }}, {% if counter > 7 %}{{ 7dayTotal | divided_by:7 }}{% else %}0 {% endif %}],{% assign counter = counter | plus:1 %}{% endfor %}
        ]);

        var options = {
            height: 400,
            hAxis: { title: 'Date' },
            vAxis: { title: 'Word Count' },
            isStacked: true,
            seriesType: "bars",
            series: {2: {type: "line"}, 3: {type: "line"}},
        };

        var view = new google.visualization.DataView(data);
        var chart = new google.visualization.ComboChart( document.getElementById('365-day-progress-chart'));

        function drawChart() {

            $( ".selector").css('font-weight', 'normal');
            $( "#" + reportPeriod + "Selector" ).css('font-weight', 'bold');

            var viewFilter = new Date();
            if (reportPeriod > 0) {
                viewFilter.setDate(reportView.getDate()-reportPeriod);
            } else {
                viewFilter = earliestDate;
            }

            view.setRows(data.getFilteredRows( [{column: 0, minValue: viewFilter}] ));
            chart.draw(view, options);
        }

    </script>

    <hr />

    {% assign streak = 0 %}
    {% assign break = false %}

    {% for entry in site.data.progress reversed %}{% unless break %}{% assign daily_total = entry.fiction | plus:entry.non-fiction %}{% if daily_total > 0 %}{% assign streak = streak | plus:1 %}{% else %}{% assign break = true%}{% endif %}{% endunless %}{% endfor %}

    <span class="post-date offset">{{ streak }} consecutive days of writing<br/><small>as of {{ most_recent.date | date: "%A" }}, {% assign d = most_recent.date | date: "%-d" %}{% case d %}{% when "1" or "21" or "31" %}{{ d }}st{% when "2" or "22" %}{{ d }}nd{% when "3" or "23" %}{{ d }}rd{% else %}{{ d }}th{% endcase %} {{ most_recent.date | date: "%B" }}, {{ most_recent.date | date: "%Y" }}</small></span>

</article>