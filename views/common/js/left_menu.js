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
    var originalDisplay;
    $(".left_menu_li").mouseenter(function() {
        originalDisplay = $(this).find(".circle_inside").css("display");
        $(this).find(".circle").css("background", "#545454");
        $(this).find(".circle_inside").css("background", "#FFFFFF");
        if($(this).find(".circle_inside").css("display") == 'none') {
            $(this).find(".circle_inside").css("display", "block");
        }
        $(this).css("background", "#FFFFFF");
        $(this).css("color", "#545454");
    });
    $(".left_menu_li").mouseleave(function() {
        $(this).find(".circle").css("background", "#FFFFFF");
        $(this).find(".circle_inside").css("background", "#545454");
        $(this).find(".circle_inside").css("display", originalDisplay);
        $(this).css("background", "#545454");
        $(this).css("color", "#FFFFFF");
    });
});
