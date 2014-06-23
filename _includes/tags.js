function filterTags(selectedTag) {
    $( "#tag-header").html("tagged: " + selectedTag);
    $( ".tag-entry" ).filter(":contains(" + selectedTag + ")").css( "display", "block" );
    $( ".tag-entry" ).not(":contains(" + selectedTag + ")").css( "display", "none" );
}