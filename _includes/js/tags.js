/* Utility functions */

function getUrlParameter(parameter) {
    var pageURL = window.location.search.substring(1);
    var pageVariables = pageURL.split('&');
    for (var i = 0; i < pageVariables.length; i++)
    {
        var parameterName = pageVariables[i].split('=');
        if (parameterName[0] == parameter)
        {
            return parameterName[1];
        }
    }
}

function filterTags(selectedTag) {
    $( "#tag-subheader" ).html  ("tagged");
    $( "#tag-header" )   .html  (selectedTag);
    $( ".tag-entry" )    .filter(":contains(" + selectedTag + ")").css( "display", "block" );
    $( ".tag-entry" )    .not   (":contains(" + selectedTag + ")").css( "display", "none" );
}

/* Execute when page loads */

$(function() {

    /* Initially filter tag cloud based on any URL parameters */
    var initialTag = getUrlParameter('tag');
    if (initialTag) {
        filterTags(initialTag);
    }
});
