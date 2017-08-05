// A $( document ).ready() block.
$( document ).ready(function() {
    console.log('leftmenu.html is ready!');

    $("#left_menu_li_main").on("click", function() {
        window.location = "/";
    });
    $("#left_menu_li_list").on("click", function() {
        window.location = "/list";
    });
    $("#left_menu_li_dashboard").on("click", function() {
        window.location = "/dashboard";
    });
});
