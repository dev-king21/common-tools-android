$(function()
{
    $('#noLimit').click(function()
    {
        if($(this).attr('checked') == 'checked')
        {
            $('#WIPCount').val('');
            $('#WIPCount').attr('disabled', true);
        }
        else
        {
            $('#WIPCount').removeAttr('disabled');
        }
    })
})

/**
 * Set WIP count.
 *
 * @access public
 * @return void
 */
function setWIPLimit()
{
    var count = $('#WIPCount').val();
    if($('#noLimit').attr('checked') == 'checked') count = -1;

    $('#limit').val(count);
}

/**
 * When WIPCount value change.
 *
 * @param  int    value
 * @access public
 * @return void
 */
function wipValueChange(value)
{
    if(value == '') $('#submit').addClass('disabled');
    if(value) $('#submit').removeClass('disabled');
}
