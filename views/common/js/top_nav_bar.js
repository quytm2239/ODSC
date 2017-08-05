// A $( document ).ready() block.
$( document ).ready(function() {
    console.log('topnavbar.html is ready!');
    setNavbarName();
});

function setNavbarName() {
    switch (location.pathname) {
        case '/':
            $('#top_nav_bar_content').text('MAIN');
            break;
        case '/list':
            $('#top_nav_bar_content').text('LIST');
            break;
        case '/dashboard':
            $('#top_nav_bar_content').text('DASHBOARD');
            break;
        default:
            $('#top_nav_bar_content').text('UNNAMED');
    }
}
