/* Analytics */
if (navigator.doNotTrack == 0) {
    {% include js/analytics.js %}
    ga('send', 'pageview');
}

/* Footnotes */
$.bigfoot({
        buttonMarkup: "<span class='bigfoot-footnote__container'> <a class=\"bigfoot-footnote__button\" id=\"\{\{SUP:data-footnote-backlink-ref\}\}\" data-footnote-number=\"\{\{FOOTNOTENUM\}\}\" data-footnote-identifier=\"\{\{FOOTNOTEID\}\}\" alt=\"See Footnote \{\{FOOTNOTENUM\}\}\" rel=\"footnote\" data-bigfoot-footnote=\"\{\{FOOTNOTECONTENT\}\}\"> \{\{FOOTNOTENUM\}\} </a></span>"
});

$(document).ready(function(){

    /* Use spinner and autoloading if Javascript enabled, otherwise paginate */
    $("#infinite-spinner").toggle();

    /* Build search database */
    results = [];
    searchableItemList = [];
    getSearchableItems();

    $("#search-box").keyup(function() {
        searchString = $(this).val().toLowerCase();
        searchFor(searchString);
    });
});

/* Adjust font sizes and spacing for screen-size */
$(window).load(function() {
    adjustBehaviourForScreenSize();
    $(window).on('resize', adjustBehaviourForScreenSize);
});
