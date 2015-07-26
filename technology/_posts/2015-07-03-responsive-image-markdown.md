---
title: Responsive Image Markdown
subtitle: Using Advanced kramdown Features via Scrivener
tagline: 
permalink: 
date: 2015-07-03 16:00:00
modified: 26/07/2015
sticky: 
tags: [scrivener, jekyll, markdown, kramdown, responsive design, images]
gists: 
files: 
redirect_from: 
summary:
    Turning the short 'inline link' Markdown syntax into something which can support HTML5 srcset output, without changing the content markup.
sidebar:
    
---
{% include markdown/global-references.md %}

One of the main reasons to use [Markdown][#markdown] is so that issues of layout and rendering can be easily ignored until long after the actual content is written. Unfortunately, when writing for the web, you do occasionally have to think about issues such as how the content will display on different categories of devices. Markdown does allow the specification of those attributes, but the more those features are used, the more the complexity of the plain text is increased, the less readable it becomes, and the more issues of layout need to be focused on after all.

## An Example

Markdown has a short 'inline link' syntax which can be used to specify images, my preferred method when working in Markdown in Scrivener, but I to also want to provide a set of alternative assets for different screen DPI if the post in question contains images[^fn1].

There are ways to deal with this using scripting if your approach to each asset is broadly similar. For instance, when I deal with images I will always be dealing with a set of three variations on the same base image, with consistently named extensions (in this case, 2x and 3x for the higher DPI versions). 

Using [kramdown][#kramdown]'s IAL [extensions for blocks](http://kramdown.gettalong.org/syntax.html#block-ials) and a Scrivener regex lets us produce arbitrarily verbose output from a relatively clean input. Note that this particular inline extension markup is only currently available in the kramdown Markdown flavour; other Markdown compilers do offer extended image attributes, but I don't believe any currently offer srcset directly, although some do support arbitrary attributes in similar ways to kramdown.

Say I'm writing a thing in Markdown, and I want to keep the plain text version of a file reasonably clean, but I want to specify more than one dpi-version of an image...

Normal Markdown would use a syntax like this for the image:

	[my-image]: http://my-image-location "My Image Title"

But I can specify additional html block-level attributes with this kind of notation:

	[my-image]: http://my-image-location "My Image Title"
	{: srcset="http://my-image-location-with-2x-suffix 2x"}

`srcset` is an HTML5 proposal for dealing with image sets and seems to have broad support.

Rather than my having to type all that boilerplate in each time, I would want to write the smaller initial syntax and have it replaced with the second block above with the additional block level attribute. Optionally I would also like to link to the largest asset available from the image so that visitors can choose to 'embiggen' it on their device.

I'd need to capture the value of `http://my-image-location` so I can use it in two places in the replacement, the second time with a 2x suffix.

Matching regex:

	^!(\[.+\])\((.+)\.(.+)\)

Substitution regex[^fn2]:

	![$1][]
	[$1]: /assets/images/$2.$3 "$1"
	{: srcset="/assets/images/$2@2x.$3 2x"}

You can test these visually at the really exceptionally useful http://regexr.com 

So now I have a 'clean' set of Markdown which will also happily display images correctly when previewed in something like [Marked][#Marked][^fn3].

If you're using GitHub Pages to host, kramdown 1.5 is still in use, with the IAL block level support only appearing in 1.6. 1.7 with support for block-level IALs for images currently has an open pull request. As soon as it is merged you'll get this behaviour 'out of the box' for standard GitHub Pages hosted sites.

## Examples

The below image will be picked from [one](/assets/images/logo.png) of [these](/assets/images/logo@2x.png) [assets](/assets/images/logo@3x.png) depending on whether your display is running at 1x 2x or 3x DPI.

[![A lovely fleuron][]](/assets/images/logo@3x.png)

[A lovely fleuron]: /assets/images/logo.png "A lovely fleuron"
{: srcset="/assets/images/logo@2x.png 2x, /assets/images/logo@3x.png 3x"}

This is its initial markup as entered by me in Scrivener:

	![A lovely fleuron](logo.png)

This is the Markdown in the file created by the Scrivener compilation step:

	[![A lovely fleuron][]](/assets/images/logo@3x.png)
	[A lovely fleuron]: /assets/images/logo.png "A lovely fleuron"
	{: srcset="/assets/images/logo@2x.png 2x, /assets/images/logo@3x.png 3x"}

And this is its final HTML after the Jekyll conversion step[^fn4]:

	<a href="/assets/images/logo@3x.png"><img srcset="/assets/images/logo@2x.png 2x, /assets/images/logo@3x.png 3x" src="/assets/images/logo.png" alt="A lovely fleuron" title="A lovely fleuron"></a>

With this change in place, [prior articles on the site](/technology/static-generation/) will also now correctly render their images at the appropriate resolution for your device.

[^fn1]: Assuming we're working with bitmaps, since not every type of image will be available as a vector.

[^fn2]: Note that for some reason the Scrivener regex does not accept `\n` as a new line character, so you'll need to option-enter any line breaks.

[^fn3]: Assuming the image assets are in the same folder as the Scrivener project.

[^fn4]: Ironically enough, the raw HTML is *less* verbose than the fully-specified Markdown version...
