---
title: Static Generation, Dynamic Content
subtitle: Jekyll, Scrivener and Data Visualisation
tags: [data-visualisation, quantified-self, jekyll, scrivener]
permalink: /technology/static-generation/
modified: 2015-04-13
gists: [dmcgk/bc743a73ae4640ced973]
summary:
    You can do some interesting things with a 'static' website. Plugging data into JavaScript visualisation libraries, for starters.
---

This is a [static](http://en.wikipedia.org/wiki/Static_web_page) website. That really just means that the content you're reading now is generated at one time only and for all users, unlike a dynamic website---the internet norm---which can generate content as it's requested, possibly on a targeted per-user basis and probably using a database or some server-side business logic[^fn1].

 Today, both static and dynamic websites generally use some kind of [CMS](http://en.wikipedia.org/wiki/Content_management_system) to create and organise content. The content of a page on a static website is *complete*[^fn2] and *universal* at the moment it is turned into HTML for publication---that particular set of generated code is all that any client browser ever sees[^fn3].
This doesn't mean that a static site can't be interactive, it just means that any interactivity needs to be handled on the client-side, normally using some flavour of JavaScript[^fn4]. The 'static' element of a static website therefore refers purely to the server-side, the *generation* side[^fn5]. Even then, when using a generation tool such as [Jekyll](http://jekyllrb.com), that eventually-static content will be built dynamically from a set of templates and page-specific logic[^fn6]. In other words, the content that is actually served to your browser can still be different from that which I originally write.

What on earth am I talking about? Let's take an example...

1. Table of Contents
{:toc}

## The Experiment
[Jamie Rubin](http://jamierubin.net) is a sci-fi author and programmer who, as part of a more wide-ranging personal project involving self-quantification, has spent some time gathering data about his writing habits and providing visualisations of that data for the benefit of his readers. He uses Google Docs for his writing and has created a set of scripts which will take metadata from those docs and use them as the basis for his visualisations---you can read about his process [here](http://www.jamierubin.net/2014/08/08/how-i-use-google-docs-for-writing/).

What would it take to do something similar, without relying on Google Docs, but making use of only static-website technologies such as Jekyll[^fn7]? Well, our flow might look something like this:

![](/assets/images/2015-02-23-flat-file-to-jekyll.png)

We could generate some writing statistics offline which we would store and keep updated in a suitable flat data file on the server; use Jekyll templates to interpolate any additional data required; then plug the output into a JavaScript visualisation library so that we can get some pretty and interactive charts.

For the writing-stats experiment the data we'll gather should be expressable in just a couple of simple columns in a CSV text file[^fn8]. We should then be able to use Jekyll's [Liquid-derived](http://jekyllrb.com/docs/templates/) template engine to work out any additional calculated data and relationships we need, such as full-period and floating 7-day averages to mimic Jamie's setup. [Google Charts](https://developers.google.com/chart/) should give us everything required to allow some basic interaction by the end user through JavaScript.


### Structuring the Data
We'll keep this as trivial as possible with a CSV structure of the following kind:

    date, fiction, non-fiction
    2015-02-20, 32073, 5700

The `fiction` and `non-fiction` columns will be a raw word count and we'll work out intervals such as daily increase in words written and our averages using Jekyll tag and filter logic.

### Parsing the Data
With Jekyll we'll need to:

1. Cycle through each element in the CSV
2. Turn the raw daily total into a daily increment
3. Generate an overall average based on each entry to date
4. Generate a floating weekly average to that point
5. Work out what period of time we're going to report on
6. Put all of this into a `DataTable` structure for use in the Visualisation API

Whereas with JavaScript we'll only need to:

7. Draw the chart

This keeps the division of labour biased pretty heavily toward the one-time generation step.

## Aside: Collecting the Data
Since I use [Scrivener](http://www.literatureandlatte.com/scrivener.php) for any long-form writing I could just go to it directly for the statistics I'm looking for---it tracks those details in the Project Target metadata. Unlike Google Docs it does not expose that data in any API, but that doesn't stop us extracting it from the `.scriv` package ourselves using a script---note that the data we care about is held within the interior `.scrivx` file and relates only to the current session[^fn9], which means that it will be valid for a period from the last session reset up until the point that you've called your script.

So with a session that we know was last updated yesterday, we could write:

{% gist dmcgk/bc743a73ae4640ced973 scrivener-wordcount.sh %}

For the `PreviousSession` stats to be useful, the Project Target option to automatically reset the session count must be something sane---exactly what that means for you will depend on how often and how regularly you intend to run your script[^fn10], eg.:

* Set Scrivener to reset the session target at midnight each day
* Run your script daily *before* your current day's writing begins

<img src="/assets/images/2015-02-23-scrivener-project-targets@2x.png" width="457" />

    #!/bin/bash
    yesterday=`date -v-1d "+%Y-%m-%d"`
    total=`path_to_your/word_counting.script`
    printf "$yesterday,$total\n" >> path_to_my.csv

There are a number of ways in which you could automate the running of your script, the simplest probably being an entry in your `cron`. On OS X the standard approach would be to use `launchd`, however I prefer to use `/etc/periodic/daily/`[^fn11] in an attempt to guarantee[^fn12] that the script should run once and once only, daily, when my MacBook is awake.

### Beyond Scrivener
I prefixed all of that with a *we could*, but let's talk briefly about my own psychological tics...

Scrivener, like most OS X applications[^fn13], will automatically save changes after a few seconds anyway. The Snapshots feature allows you to roll back to earlier drafts even though the app [doesn't support](http://www.literatureandlatte.com/forum/viewtopic.php?f=4&t=78&p=123475&hilit=lion+autosave#p123475) the built-in [OS X system-level versioning/reverting](http://support.apple.com/kb/PH14378) mechanism for files, since your `.scriv` document isn't really a single file at all. This means that my multi-decade muscle memory to spam Command-S to save every once in a while is entirely redundant. So let's repurpose that muscle memory and re-bind the shortcut to 'Sync with External Folder Now'[^fn14]:

<img src="/assets/images/2015-02-23-scrivener-sync-now@2x.png" width="275" />

Then we can pick up any plain text files stored in the 'Drafts' folder(s) in the sync target location and run them through `wc`[^fn15]:

    #!/bin/bash
    fiction=`find path_to_my_fiction_folder -type f -path '*/Draft/*.md' -print0 2>/dev/null | xargs -0 cat | wc -w | bc`
    nonfiction=`find path_to_my_nonfiction_folder -type f -path '*/Draft/*.md' -print0 2>/dev/null | xargs -0 cat | wc -w | bc`
    echo "$fiction,$nonfiction"

This has the side benefit of also accounting for words added to those files outside of Scrivener itself[^fn16].

### Making use of the Data
Now that we have our source statistics, we need to set up the Jekyll-side to make use of them.

You can read more detail about the setup process for Jekyll data files [here](http://jekyllrb.com/docs/datafiles/). Jekyll markup isn't always the cleanest in the world, although the lack of any particularly complex syntax does mean that the logic reads much like pseudocode:

{% gist dmcgk/bc743a73ae4640ced973 for-loop-simple.js %}

It does end up looking fairly convoluted when we're working with specific reporting periods, loop offsets, and integer-to-float hackery though:

{% gist dmcgk/bc743a73ae4640ced973 for-loop.js %}

You can read more about the Google Visualisation API [here](https://developers.google.com/chart/interactive/docs/reference), but we'll really just need to set up some chart options and make sure the drawing function is called.

Here's one example of what the code for a complete transformation from simple date/count pairing into a more featureful graph with a calculated period average and floating 7 day average could look like:

{% gist dmcgk/bc743a73ae4640ced973 complete.js %}

## Limitations
The only real limitation to this approach[^fn17] is that it relies on data captured locally being pushed to GitHub so that Jekyll can update the HTML which forms the data-set. This isn't really a limitation of static websites in this case though, since even a dynamic site would need its back-end database fed with the same data and for the same reason.

## Putting it Together
If you follow all of the above, the final interactive and dynamically updating chart will end up looking like this while tracking the last 30 days of writing data:

<div id="progress-chart" class="progress-chart offset">Loading chart...</div>

<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>

<script type="text/javascript">

google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(drawChart);

{% assign most_recent = site.data.progress | last %}
{% assign earliest = site.data.progress | first %}

reportPeriod = 30;
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
{% assign priorTotal = 0 %}
{% assign 7dayTotal = 0 %}
{% assign prior7dayTotal = 0 %}
{% assign counter = 1 %}

data.addRows([
{% for entry in site.data.progress offset:period %}
{% assign total = total | plus:entry.fiction | plus:entry.non-fiction | minus:priorTotal %}
{% if counter > 7 %}
{% assign 7dayMarker = forloop.index0 | plus:period | minus:7 %}
{% assign 7dayTotal = 7dayTotal | plus:entry.fiction | plus:entry.non-fiction | minus:site.data.progress[7dayMarker].fiction | minus:site.data.progress[7dayMarker].non-fiction | minus:prior7dayTotal %}
{% endif %}
[

new Date({{ entry.date | date: "%Y" }}, {{ entry.date | date: "%m" | minus:1 }}, {{ entry.date | date: "%d" }}),

{% assign priorEntry = forloop.index0 | plus:period | minus:1 %}
{% if counter > 1 %}
{{ entry.fiction | minus: site.data.progress[priorEntry].fiction }}
{% else %}
{{ entry.fiction }}
{% endif %},

{% if counter > 1 %}
{{ entry.non-fiction | minus: site.data.progress[priorEntry].non-fiction }}
{% else %}
{{ entry.non-fiction }}
{% endif %},

{{ total | append: '.0' | divided_by:forloop.index }},

{% if counter > 7 %}
{{ 7dayTotal | append: '.0' | divided_by:7 }}
{% assign prior7dayTotal = 7dayTotal %}
{% else %}
0

{% endif %}
],
{% assign counter = counter | plus:1 %}
{% assign priorTotal = total %}
{% endfor %}
]);

var options = {
height: 400,
hAxis: { title: 'Date' },
vAxis: { title: 'Word Count' },
isStacked: true,
seriesType: "bars",
series: {2: {type: "line"}, 3: {type: "line"}},
};

var formatter = new google.visualization.NumberFormat( {fractionDigits:1 });
formatter.format(data, 3);
formatter.format(data, 4);

var view = new google.visualization.DataView(data);
var chart = new google.visualization.ComboChart( document.getElementById('progress-chart'));

function drawChart() {
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

 And here's its [permanent home](/meta/stats/) for future reference. Feel free to browse/borrow/tweak the finished source code for your own purposes, it's available from the sidebar of that page.

[^fn1]: Static sites can be quicker for a browser to retrieve compared to dynamic since they're more easily cacheable by [CDN](http://en.wikipedia.org/wiki/Content_delivery_network)s by default. They also tend to have lower processing overhead for the servers which host them.

[^fn2]: Except... not necessarily. Read on.

[^fn3]: To complicate the distinction, there are a variety of [caching plugins](https://wordpress.org/plugins/wp-super-cache/) for dynamic websites that basically do the same thing.

[^fn4]: This may actually lead to additional server round-trips as further data is requested via [AJAX](http://en.wikipedia.org/wiki/Ajax_(programming)) or similar techniques.

[^fn5]: 'Static' isn't a great description.

[^fn6]: 'Static' *really* isn't a great description.

[^fn7]: There's also no reason you couldn't plug those Google Doc derived stats into a static website, but we'll do something different here, for science and giggles.

[^fn8]: You could use JSON if you prefer---I'm using a flat CSV since it's trivial to add additional lines to it using a shell script.

[^fn9]: It's held under an element called `PreviousSession`, which actually refers to the session in progress.

[^fn10]: If we have a session reset happening at midnight and just target 'today' at the point that the script is run then we'll have an incomplete wordcount if any additional writing is done afterwards.

[^fn11]: Which will still use launchd behind the scenes.

[^fn12]: There is [no real guarantee](http://www.thexlab.com/faqs/maintscripts.html#Anchor-How-35882)...

[^fn13]: Although Scrivener got there first.

[^fn14]: If you're not on OS X, or just prefer having that keymap unchanged, you can choose a different keybinding of your choice. This is all about reducing friction for me, so I won't be trying to memorise a new keybinding when an old one is semantically correct for what I want to achieve anyway.

[^fn15]: I'm also running them through `bc` in the below to ensure that we have only numbers in the output.

[^fn16]: Since the reason I sync to an external folder in the first place is to make use of cloud storage and have those files available on any of my devices.

[^fn17]: Leaving aside your thoughts on how robust all that Jekyll tags logic and shell scripting might be...
