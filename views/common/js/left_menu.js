// A $( document ).ready() block.
$( document ).ready(function() {

    $("#left_menu_li_main").on("click", function() {
        window.location = "/";
    });
    $("#left_menu_li_list").on("click", function() {
        window.location = "/list";
    });
    $("#left_menu_li_dashboard").on("click", function() {
        window.location = "/dashboard";
    });
    // $("#left_menu_li_4").on("click", function() {
    //     window.location = "/list";
    // });
});
