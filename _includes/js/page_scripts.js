/* Footnotes */
$.bigfoot();

$(document).ready(function(){
    /* Adjust font sizes and spacing for screen-size */
    adjustBehaviourForScreenSize();
    $(window).on('resize', adjustBehaviourForScreenSize);

    /* Build search database */
    results = [];
    searchableItemList = [];
    getSearchableItems();

    $("#search-box").keyup(function() {
        searchString = $(this).val().toLowerCase();
        searchFor(searchString);
    });
});