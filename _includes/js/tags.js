function filterTags(selectedTag) {
    $( "#tag-subheader" ).html("tagged");
    $( "#tag-header" )   .html  (selectedTag);
    $( ".tag-entry" )    .filter(":contains(" + selectedTag + ")").css( "display", "block" );
    $( ".tag-entry" )    .not   (":contains(" + selectedTag + ")").css( "display", "none" );
}
