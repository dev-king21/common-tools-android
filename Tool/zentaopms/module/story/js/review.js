function switchShow(result)
{
    $('#priBox').hide();
    $('#estimateBox').hide();
    if(result == 'reject')
    {
        $('#rejectedReasonBox').show();
        $('#preVersionBox').hide();
    }
    else if(result == 'revert')
    {
        $('#preVersionBox').show();
        $('#rejectedReasonBox').hide();
        $('#duplicateStoryBox').hide();
        $('#childStoriesBox').hide();
    }
    else
    {
        if(result == 'pass')
        {
            $('#priBox').show();
            $('#estimateBox').show();
        }
        $('#preVersionBox').hide();
        $('#rejectedReasonBox').hide();
        $('#duplicateStoryBox').hide();
        $('#childStoriesBox').hide();
        $('#rejectedReasonBox').hide();
    }

    getStatus('review', "storyID=" + storyID + ",result=" + result);
}

function setStory(reason)
{
    if(reason == 'duplicate')
    {
        $('#duplicateStoryBox').show();
        $('#childStoriesBox').hide();
    }
    else if(reason == 'subdivided')
    {
        $('#duplicateStoryBox').hide();
        $('#childStoriesBox').show();
    }
    else
    {
        $('#duplicateStoryBox').hide();
        $('#childStoriesBox').hide();
    }
}

$(function()
{
    if($('.tabs .tab-content .tab-pane.active').children().length == 0) $('.tabs .nav-tabs li.active').css('border-bottom', '1px solid #ccc');
})
