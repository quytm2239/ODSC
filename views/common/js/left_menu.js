// A $( document ).ready() block.
$( document ).ready(function() {
    console.log('leftmenu.html is ready!');

    setSelectedMenu();

    $("#left_menu_li_main").on("click", function() {
        window.location = "/";
    });
    $("#left_menu_li_list").on("click", function() {
        window.location = "/list";
    });
    $("#left_menu_li_dashboard").on("click", function() {
        window.location = "/dashboard";
    });

    // Visual effect for hover
    var originalDisplay;
    $(".left_menu_li").mouseenter(function() {
        originalDisplay = $(this).find(".circle_inside").css("display");
        $(this).find(".circle").css("background", "#7b3f00");
        $(this).find(".circle_inside").css("background", "#FEFCFF");
        if($(this).find(".circle_inside").css("display") == 'none') {
            $(this).find(".circle_inside").css("display", "block");
        }
        $(this).css("background", "#FEFCFF");
        $(this).css("color", "#7b3f00");
    });
    $(".left_menu_li").mouseleave(function() {
        $(this).find(".circle").css("background", "#FEFCFF");
        $(this).find(".circle_inside").css("background", "#7b3f00");
        $(this).find(".circle_inside").css("display", originalDisplay);
        $(this).css("background", "#7b3f00");
        $(this).css("color", "#FEFCFF");
    });
});

function setSelectedMenu() {
    switch (location.pathname) {
        case '/':
            $('#left_menu_li_main').addClass('gradient');
            $('#circle_inside_main').css('display','block');
            break;
        case '/list':
            $('#left_menu_li_list').addClass('gradient');
            $('#circle_inside_list').css('display','block');
            break;
        case '/dashboard':
            $('#left_menu_li_dashboard').addClass('gradient');
            $('#circle_inside_dashboard').css('display','block');
            break;
        default:
            break;
    }
}
