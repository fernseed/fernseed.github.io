/* Footnotes */
$.bigfoot();

$(document).ready(function(){

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
