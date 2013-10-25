function testPlaceholderSupport() {
    var i = document.createElement('input');
    return 'placeholder' in i;
}

$(function () {
    // The search form uses the new placeholder attribute
    if (!testPlaceholderSupport()) {
        $('input[type="text"][placeholder]').each(function () {
            var input = $(this);
            var placeholder = input.attr('placeholder');
            if (placeholder && !input.val()) {
                input.val(placeholder)
                    .focus(function () {
                        if (input.val() == placeholder) {
                            input.val('');
                        }
                    }).blur(function () {
                        if (!input.val()) {
                            input.val(placeholder);
                        }
                    });
            }
        });
    }

    $('.datepicker').datepicker($($.datepicker.regional['fr']).extend({dateFormat: 'dd/mm/yy'}));

    $('select.autocomplete').each(function() {
        var select = $(this),
            input = $('<input>').attr('type', 'text');
        var selected = select.children('option:selected');
        input.val(selected.attr('value')? selected.text() : "");
        select.hide().after(input);
        input.autocomplete({
            'delay': 0,
            'source': select.children('option').filter(function(){
                return $(this).attr('value');
            }).map(function(){
                var text = $(this).text();
                return {
                    'value': text,
                    'label': text,
                    'option': this
                };
            }).toArray(),
            'select': function(event, ui){
                ui.item.option.selected = true;
            }
        });
    });

    // Forms that auto-submit when a select menu inside them is changed
    $('select.autosubmit').each(function () {
        var select = $(this);
        var form = select.parents('form');

        $('input[type="submit"],button[type="submit"]', form).hide();
        select.change(function () {form.submit(); });
    });

    // Navigation menu
    $('#header_navigation>li').each(function () {
        var li = $(this);
        li.hover(function () {
            $('#header_navigation>li').removeClass('active');
            li.addClass('active');
        });
    });

    // Auto Label Width: sets the width of all labels in a container to be
    // the width of the largest one.
    $('.ui-autoLabelWidth').each(function () {
        var labels = $('label, .label', this).not('.ui-aLW-ignore, .ui-aLW-ignore label, .ui-aLW-ignore .label');
        var width = Math.max.apply(Math, labels.map(function () {
            return $(this).width();
        }).get());
        labels.width(width);
    });

    // Make messages disappear when a button is clicked
    $('#messages li').each(function () {
        var msg = $(this);
        $('.ui-close-message', msg).click(function () {
            msg.slideUp('fast', function () {
                if (!$('#messages li:visible').length) {
                    $('#messages').hide();
                }
            });
        });
    });

    if ($("#multifilter-form").length) {
	var form = $("#multifilter-form");
	var title = $("h2", form);
	var content = $(".fold-content", form);

	title.click(function () {
	    content.toggle();
	    form.toggleClass("folded");
	}).click();
    }

});
