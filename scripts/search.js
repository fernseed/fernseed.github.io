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
    setResults();
}

function setResults() {
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

function showResults() {
    if ($('#search-box').val() != '') {
        $('#search-results').show();
    }
    else {
        $('#search-results').hide();
    }
}

$(document).mouseup(function (inputField) {
    container = $("#search-results");
    if (!container.is(inputField.target) && container.has(inputField.target).length === 0) {
        container.hide();
    }
});

$(document).ready(function() {
    getSearchableItems();
    $("#search-box").keyup(function() {
        searchString = $(this).val().toLowerCase();
        searchFor(searchString);
    });
});
