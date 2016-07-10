---
title: Multi App Single Focus
subtitle: Extending Applications With Applications
date: 2015-09-28 19:30:00
modified: 2016-07-10
tags: [livereload, jekyll, scrivener, hazel, osx, marked, markdown]
image: /assets/images/software-scrivener-safari.png
description:
    One of the more trivial-seeming changes to the upcoming OS X 10.11 release, but one that I've found most immediately useful, is the addition of a new split-screen mode for full-screen apps.
---

<!-- Includes -->
{% include markdown/global-references.md %}

<!-- Content -->
Not everyone makes use of the existing 'Lion-style' full-screen mode in **os x**---if you have a particularly large monitor, or just prefer having [multiple overlapping windows](https://overcast.fm/+CdRRhGxw/1:30:21) visible at the same time, then you may see it as a waste of screen real estate---yet the tech world has seen a real growth over the last few years in [applications](https://ia.net/writer/mac/) and [tools](http://selfcontrolapp.com) which are built with the goal of reducing distraction and increasing focus.

For **os x** users, dedicated Spaces for full-screen apps can be an easy, built-in solution to that same problem of keeping your attention on a single activity. The upcoming [Split View full-screen](http://www.apple.com/osx/elcapitan-preview/) mode under **os x** 10.11 'El Capitan' has the potential to be a nice expansion of the same idea.

It's possible to use the feature in a manner completely contrary to the goal of increased focus of course, maybe keeping Mail or Twitter or similar applications assigned to a small section of the screen alongside whatever it is you're actually working on, but something that's not necessarily obvious until you use it is the potential of maintaining focus on a single *task*, even when that task actually extends across multiple applications.

This is something that can already be achieved, without any need for dedicated full-screen modes, by just manually resizing and moving a few windows, but the El Capitan implementation has the very-Apple-like pro/con of keeping the set of things that you can fiddle with to an absolute minimum. There's also a probably-negligible-but-still-non-zero cognitive cost involved in processing all of that 'window chrome' and toolbar space, taking up pixels and reminding you that these are still distinct applications.

## Build Your Own Content IDE

For instance, let's say you're writing for the web in Markdown but as you get into the editing phase you'd like more immediate feedback on how your content will appear when published:

<figure><a href="/assets/images/software-scrivener-safari@3x.png"><img srcset="/assets/images/software-scrivener-safari@2x.png 2x, /assets/images/software-scrivener-safari@3x.png 3x" src="/assets/images/software-scrivener-safari.png" alt="Click to enlarge" title="Using Scrivener and Safari full-screen in El Capitan"></a></figure>

Here you can see [LiveReload with Jekyll](http://dan.doezema.com/2014/01/setting-up-livereload-with-jekyll/) running in a Safari window side-by-side with Scrivener in Split View---Safari in El Capitan is fully chromeless now when in full-screen---the top toolbar can finally be auto-hidden. I'm using Scrivener to write and organise the plain text of this site which, when compiled, is processed by Jekyll to create the necessary HTML. Safari is showing me those fully-processed changes alongside the Scrivener Markdown content as though it was a built-in previewer.

This is doubly-handy since the new version of Safari also has a [Google Chrome-like](http://blog.chromium.org/2014/09/responsive-web-design-with-devtools.html) new Responsive Design mode, so you can now show specifically phone and tablet renderings of the page, along with the usual web inspection and error consoles:

<figure><a href="/assets/images/software-scrivener-safari-responsive@3x.png"><img srcset="/assets/images/software-scrivener-safari-responsive@2x.png 2x, /assets/images/software-scrivener-safari-responsive@3x.png 3x" src="/assets/images/software-scrivener-safari-responsive.png" alt="Click to enlarge" title="Responsive Design in Safari"></a></figure>

If you're curious about the workflow: [Hazel](http://www.noodlesoft.com/index.php) is used as a bridge to take the Markdown output of Scrivener, post-process it to do things like add [responsive image markup](/technology/responsive-image-markdown/) then deliver it to the Jekyll directory.

Or do you need a fully-rendered preview of the eBook you're writing but there's no in-app ability in your editor to provide it? [Marked][#Marked] can be slotted in alongside it. In the case of Scrivener, just open the `.scriv` file in Marked and it will auto update every time your Scrivener project auto-saves. Combine it with the use of [Critic Markup](http://criticmarkup.com) syntax as revisions are made and you'll also get editing and proofing tools 'built into' your writing workflow, even if your primary writing application doesn't offer such a feature. Or keep your notes or mind maps alongside your text editor of choice but deal with them both in the same dedicated 'space'.

This approach to purposefully-limited or targeted multitasking is one of the reasons I really like the idea of the [iPad Pro](https://www.apple.com/ipad-pro/) as a potential [laptop replacement](https://www.macstories.net/stories/ios-9-review/).

