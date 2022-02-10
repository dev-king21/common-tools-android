$(function() 
{
    if(canCreate)
    {
        link = createLink('story', 'create', 'productID=' + productID + "&branch=" + branch + '&moduleID=' + moduleID);
        $('#modulemenu ul.nav li.right:first').before("<li class='right'><a href='" + link + "'><i class='icon-story-create icon-plus'></i> " + createStory + "</a></li>");
    }

    /* Add for task #5385. */
    if(config.onlybody == 'yes') $('.main-actions').css('width', '100%')

    $('#unlinkStory').click(function()
    {
        if($('.removeButton').hasClass('hide'))
        {
            $('.removeButton').removeClass('hide');
            $(this).text(cancel);
        }
        else
        {
            $('.removeButton').addClass('hide');
            $(this).text(unlink);
        }
    })
});
