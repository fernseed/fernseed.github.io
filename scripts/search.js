function getSearchableItems() {
    $.getJSON("/search.json", function(data) {
        searchableItemList = data;
    });
}

function searchFor(searchString) {
    results = [];

    if (searchString != "") {
        $.each(searchableItemList, function(index, item) {
            title   = item['title']  .toLowerCase();
            summary = item['summary'].toLowerCase();
            tags    = item['tags']   .toLowerCase();
            excerpt = item['excerpt'].toLowerCase();
            url     = item['url'];

            if (title  .indexOf(searchString) != -1 ||
                summary.indexOf(searchString) != -1 ||
                tags   .indexOf(searchString) != -1 ||
                excerpt.indexOf(searchString) != -1) {
                    results.push([url, title]);
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
            resultBox.append('<li>no matches</li>');
        }
        else {
            $.each(results, function(index, item) {
                resultBox.append('<li><a href="' + item[0] + '">' + item[1] + '</a></li>');
            });
        }
    });
}

$(document).ready(function() {
    results = [];
    searchableItemList = [];

    getSearchableItems();

    $("#search-box").keyup(function() {
        searchString = $(this).val().toLowerCase();
        searchFor(searchString);
    });
});
