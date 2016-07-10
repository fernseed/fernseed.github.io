/* Utility functions */

function getSearchableItems() {
    $.getJSON('/api/search', function(searchData) {
        posts = searchData.posts;
    });
}

function searchFor(searchString) {
    results = [];

    if (searchString != "") {
        $.each(posts, function(index, item) {
            title    = item['title']    .toLowerCase();
            summary  = item['summary']  .toLowerCase();
            tags     = item['tags']     .toLowerCase();
            category = item['category'] .toLowerCase();
            date     = item['date']     .toLowerCase();
            excerpt  = item['excerpt']  .toLowerCase();
            tagline  = item['tagline']  .toLowerCase();
            url      = item['url'];

            if (tagline != "") title = tagline;

            if (title   .indexOf(searchString) != -1 ||
                summary .indexOf(searchString) != -1 ||
                tags    .indexOf(searchString) != -1 ||
                category.indexOf(searchString) != -1 ||
                date    .indexOf(searchString) != -1 ||
                excerpt .indexOf(searchString) != -1) {
                    results.push([url, date, title, category]);
            }
        });
    }

    showSearchResults();
}

function showSearchResults() {

    resultBox = $("#search-results");
    resultBox.html("");
    resultBox.html(function() {
        if (results.length == 0) {
            resultBox.html("");
        }
        else {
            $.each(results, function(index, item) {
                resultBox.append('<span class="' + item[3] + '"><a target="_parent" href="' + item[0] + '">' + item[1] + ' ' + item[2] + '</a></span>');
                if (index < results.length-1) {
                    resultBox.append("&nbsp;&middot;&nbsp;");
                }
            });
        }
    });
}

/* Execute when page loads */

$(function() {

    /* Build search database */
    results = [];
    searchableItemList = [];
    getSearchableItems();

    $("#search-input").keyup(function() {
        searchString = $(this).val().toLowerCase();
        searchFor(searchString);
        window.scrollTo(0,document.body.scrollHeight);
    });
});
