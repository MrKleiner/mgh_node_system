// Current date storage, just because I dont want to use "return"
var super_date = 'nan_ERROR';

// Paths to templates. Might just move this to another script you can link or whatever else you can link.
// node template
var row_template_path = '/templates/super_row_template.mght';
// row remplate
var node_template_path = '/templates/super_node_template.mght';

// Fuck js. This is needed for preset system to work correctly. 
// Use this for storing any temp element selections when reading templates.
var preset_reader_fuck_js_current_element = 'nil_preset_fuck';

// here we store the element we're currently editing a link for
var current_link_edited_element = 'nil_linked_elem';

// whether we're deleting rows or not
var hitman_mode = false;

// whether we're deleting nodes or not
var node_hitman_mode = false;

// store session password here just so we dont have to request it over and over again
// maybe link it as .js file as well ??
var cur_session_password = 'password_is_null';

// store a node we're moving in this var
var current_node_to_move = 'current_node_is_nil_too_bad';

// whether we're moving something or not
var super_node_move_mode = false;




//
// Define some functions
//


// rgb to hex
function rgb2hex_v2(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


// checkbox activator
function checkbox_activator(cbid, cstate)
{
	var current_cbox = $('#' + cbid).closest('.disaster_checkbox_row');

	if (cstate > 0)
	{
		$(current_cbox).find('.disaster_checkbox_checkmark').attr('mgh_checkbox_checked', '1');
		$(current_cbox).find('.disaster_checkbox').addClass('disaster_checkbox_checked_bg');
		$(current_cbox).find('.disaster_checkbox_checkmark').removeClass('class_hidden');
	}
	
	if (cstate == 0)
	{	
		$(current_cbox).find('.disaster_checkbox_checkmark').attr('mgh_checkbox_checked', '0');
		$(current_cbox).find('.disaster_checkbox').removeClass('disaster_checkbox_checked_bg');
		$(current_cbox).find('.disaster_checkbox_checkmark').addClass('class_hidden');
	}
	
}


// get current date
function super_dater()
{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  window.super_date = today;
}


// refresh color indicators
function space_left_color_indicator()
{
	// =============================================================
	// This function refereshes all the color indicators on the page
	// =============================================================
	
	console.log('called space left color indicators');
	
	var oldmax = 20;
	var oldmin = 0;

	var newmax = 120;
	var newmin = 0;

	$('.node_space_left_ind').css('background', function(){
		var get_sibling = $(this).siblings('.node_space_left_num');
		var get_number = $(get_sibling).find('.node_space_left_super_num').val();
		var super_math = ((( get_number - oldmin ) * newmax ) / oldmax ) + newmin;
		console.log('Color indicators: node number ' + $(this).closest('.super_node').attr('mgh_node_number') + ', with a label "' + $(this).closest('.super_node').find('.super_node_label_text').val() + '" has a value of "' + get_number + '". Calculated hsla: ' + 'hsla(' + super_math + ', 100%, 59%, 1)');
		
		return 'hsla(' + super_math + ', 100%, 59%, 1)';
	});
}


// index every node
function super_node_indexer()
{
    $('.super_node').not('.global_trash_to_flush').each(function(i) {
		i = (i + 1);
		// $(this).find('.super_node_label_text').text(i.substr(i.length - 4));
		// $(this).attr('mgh_node_number', i.substr(i.length - 4));
		$(this).attr('mgh_node_number', i);
	});
	
	$('.global_trash_to_flush').removeAttr('mgh_node_number');
}


// clear selection
function clearSelection() {
	// ==================================================================================
	// Copypasted from stackoverflow. Call this to remove any selection on the whole page
	// ==================================================================================
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" || (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}




