// A $( document ).ready() block.
$( document ).ready(function() {
    console.log('list.html is ready!');

    // Keep border + height is always equal 201
    $(".sub_content").mouseenter(function() {
        $(this).find('.sub_content_caption').css('font-weight','bold');
        $(this).find('.sub_content_img').css('border','3px solid #492500');
        // $(this).find('.sub_content_caption').css('text-decoration','underline');
        $(this).find('.sub_content_caption').css('text-align','center');
    });
    // Keep border + height is always equal 201
    $(".sub_content").mouseleave(function() {
        $(this).find('.sub_content_caption').css('font-weight','normal');
        $(this).find('.sub_content_img').css('border','1px solid #492500');
        // $(this).find('.sub_content_caption').css('text-decoration','none');
        $(this).find('.sub_content_caption').css('text-align','left');
    });
});
