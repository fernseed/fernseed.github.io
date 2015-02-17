function getSearchableItems() {
    $.getJSON('/data/search-content.json', function(searchData) {
        searchableItemList = searchData;
    });
}

function searchFor(searchString) {
    results = [];

    if (searchString != "") {
        $.each(searchableItemList, function(index, item) {
            title   = item['title']  .toLowerCase();
            summary = item['summary'].toLowerCase();
            tags    = item['tags']   .toLowerCase();
            date    = item['date']   .toLowerCase();
            excerpt = item['excerpt'].toLowerCase();
            tagline = item['tagline'].toLowerCase();
            url     = item['url'];

            if (tagline != "") title = tagline;

            if (title  .indexOf(searchString) != -1 ||
                summary.indexOf(searchString) != -1 ||
                tags   .indexOf(searchString) != -1 ||
                date   .indexOf(searchString) != -1 ||
                excerpt.indexOf(searchString) != -1) {
                    results.push([url, date, title]);
            }
        });
    }

    showSearchResults();
}

function showSearchResults() {

    resultHeader = $("#search-header");
    resultHeader.html("Search Results:");

    resultBox = $("#search-results");
    resultBox.html("");
    resultBox.html(function() {
        if (results.length == 0) {
            resultBox.html("No Matches");
        }
        else {
            $.each(results, function(index, item) {
                resultBox.append('<li><a href="' + item[0] + '">' + item[1] + ': ' + item[2] + '</a></li>');
            });
        }
    });
}
