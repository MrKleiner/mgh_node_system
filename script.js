// Current date storage, just because I dont want to use "return"
// redundant: return is now a thing
// var super_date = 'nan_ERROR';

// Paths to templates. Might just move this to another script you can link or whatever else you can link.
// node template
var row_template_path = '/templates/super_row_template.mght';
// row remplate
var node_template_path = '/templates/super_node_template.mght';

// Fuck js. This is needed for preset system to work correctly. 
// Use this for storing any temp element selections when reading templates.
// redundant
// var preset_reader_fuck_js_current_element = 'nil_preset_fuck';

// here we store the element we're currently editing a link for
var current_link_edited_element = 'current_link_edited_element-nil';

// whether we're deleting the rows or not
var row_hitman_mode = false;

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
// Define autonomous callable functions
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
  return today
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
	// return
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
            if ( tagName == 'textarea' || (tagName == 'input' && activeEl.type == 'text') ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}



//
// movers
//

// This will insert a node to a desired location when moving to far places
function super_node_insert(side, node)
{
	// inserts a node when node move mode
	if (side == 'r')
	{
		// also applies for the other side
		// Now actually insert the node
		$(node).after(current_node_to_move);
		// once done - set the move mode to false
		window.super_node_move_mode = false;
		// visual feedback: Make the button not glow anymore and set the text
		$('.super_node_pos_edit_status').removeClass('btn_blue_active_bg');
		$('.super_node_pos_edit_status').text('Pos edit: false');
		console.log('moved node to the Right');
	}
	if (side == 'l')
	{
		$(node).before(current_node_to_move);
		window.super_node_move_mode = false;
		$('.super_node_pos_edit_status').removeClass('btn_blue_active_bg');
		$('.super_node_pos_edit_status').text('Pos edit: false')
		console.log('moved node to the Left');
	}
}

// this will create a node either from the left or the right
function super_node_spawn(side, node)
{
	console.log('new node spawner called with the side parameter: ' + side);
	// spawns a node from the given side
	var client = new XMLHttpRequest();
	client.open('GET', node_template_path);
	client.onreadystatechange = function() {
		if(client.readyState == 4 ) {
			if (side == 'r')
			{
				cselection = node.after(client.responseText);
				console.log('tried to create a node from the Right');
				space_left_color_indicator()
			}
			if (side == 'l')
			{
				cselection = node.before(client.responseText);
				console.log('tried to create a node from the Left');
				space_left_color_indicator()
			}
			super_node_indexer()
		}
	}
	client.setRequestHeader('Expires', 'Wed, 21 Oct 2015 07:28:00 GMT');
	client.setRequestHeader('Cache-Control', 'max-age=0, must-revalidate');
	client.send();
	
}

// this will move the node either to the left or the right
function super_node_move(where, node)
{
	
	console.log('where is ' + where)
	
	if (where == 'r')
	{
		console.log('exec l');
		node.insertBefore(node.prev());	
		super_node_indexer();
	}
	
	if (where == 'l')
	{
		console.log('exec r');
		node.insertAfter(node.next());	
		super_node_indexer();
	}
	super_node_indexer()
	
}

























$(document).ready(function(){
	// kill this
    window.mrk_ect_timer = 'loaded';
	
	
});
















/*
document.addEventListener ('change', function (event) {
	
    // if ( zEvent.keyCode == 27)
    // if ( zEvent.altKey  &&  zEvent.keyCode == 87  )
	
    const rowname_input = event.target.closest('.super_node_content_text');
    if (rowname_input) { super_row_text_editor_applier(rowname_input) }
	
});
*/


document.addEventListener ('focusout', function (event) {

	// shared applicable input on focus out
    const rowname_input = event.target.closest('.applicable_input');
    if (rowname_input) { super_row_text_editor_applier(rowname_input, event, 'unfocus') }
	
});




document.addEventListener ('keypress', function (event) {
    // if ( zEvent.keyCode == 27)
    // if ( zEvent.altKey  &&  zEvent.keyCode == 87  )
	
	// shared applicable input on enter
    const rowname_input = event.target.closest('.applicable_input');
    if (rowname_input) { super_row_text_editor_applier(rowname_input, event, 'enter') }
	
});












document.addEventListener('click', event => {
    console.log('click_registered');


    // open edit login/password credentials
    const loginpswd_edit = event.target.closest('.super_node_creds_edit');
    if (loginpswd_edit) { creds_edit_toggler(loginpswd_edit) }
	
	// open edit backup key
    const backup_key_edit = event.target.closest('.node_bkey_btn');
    if (backup_key_edit) { creds_bkey_edit_toggle(backup_key_edit) }
	
	// copy login/pswd
    const copy_logpswd = event.target.closest('.super_node_creds_copy_this_data');
    if (copy_logpswd) { copy_this_creds(copy_logpswd) }
	
	// create nodes
    const mknode_btn = event.target.closest('.super_node_ctrl_move');
    if (mknode_btn) { mknodes(mknode_btn, event) }
	
	// create node rows
    const mknoderow_btn = event.target.closest('.super_node_add_content_row_btn');
    if (mknoderow_btn) { mknode_row(mknoderow_btn) }
	
	// file name edit mechanism
    const rowname_input = event.target.closest('.super_node_content_text');
    if (rowname_input) { super_row_text_editor(rowname_input, event) }
	
	// link editor button
    const link_edit_btn = event.target.closest('.super_node_content_copy_link');
    if (link_edit_btn) { node_row_mlink_activator(link_edit_btn, event) }
	
	// apply link btn
    const apply_link = event.target.closest('.content_link_editor_btns');
    if (apply_link) { rowlink_editor_apply_link(apply_link) }
	
	// date block mechanism. More events handled through "onselect"
    const date_block = event.target.closest('.super_node_content_date');
    if (date_block) { node_row_date_block(date_block, event) }
});



// turn on/off credits
function creds_edit_toggler(etgt)
{
	$(etgt).closest('.super_node_creds_row').find('.super_node_creds_text').toggleClass('class_hidden');
}
function creds_bkey_edit_toggle(etgt)
{
	$(etgt).closest('.super_node_creds_block').find('.super_node_creds_row_bkey').toggleClass('class_hidden');
}

// copy credits to clipboard
function copy_this_creds(etgt)
{
	liz3_copytext($(etgt).closest('.super_node_creds_row').find('.super_node_creds_input').val());
}

// create, move or insert node from the left or the right
function mknodes(etgt, evee)
{
	// define side
	if ($(etgt).hasClass('super_node_ctrl_move_l_btn'))
	{
		var btn_side = 'l';
	}
	if ($(etgt).hasClass('super_node_ctrl_move_r_btn'))
	{
		var btn_side = 'r';
	}
	var cnode = $(etgt).closest('.super_node');
	
	// insert, create or move
	if (super_node_move_mode)
	{
		console.log('nil')
		
	}else{
		// decide whether we're moving or creating a node
		if (evee.shiftKey)
		{
			// create node, else - move
			super_node_spawn(btn_side, cnode)
		}else{
			// move node
			super_node_move(btn_side, cnode)
		}
	}
	
}


// this will create a row
function mknode_row(etgt)
{
	var client = new XMLHttpRequest();
	client.open('GET', row_template_path);
	client.onreadystatechange = function() {
		if(client.readyState == 4 ) {
			// todo: dont create "next to the button", locate row container with .closest and append there
			cselection = $(etgt).before(client.responseText);
			rowmaker_set_date(cselection.prev())
		}
	}
	client.setRequestHeader('Expires', 'Wed, 21 Oct 2015 07:28:00 GMT');
	client.setRequestHeader('Cache-Control', 'max-age=0, must-revalidate');
	client.send();
}

// set newly created row date to current date
function rowmaker_set_date(etgt)
{
	console.log('set date to current on a row')
	date_tgt = etgt.find('.super_node_content_date');
	date_tgt.prop('readonly',false);
	date_tgt.val(super_dater());
	date_tgt.attr('value', super_dater());
	date_tgt.prop('readonly',true);
	date_tgt.removeClass('row_temp_date_tgt');
}


function super_row_text_editor(etgt, evee)
{
	// ==========================================================
	// This function is responsible for the file name mechanism
	// ==========================================================

	if (evee.shiftKey && !(evee.ctrlKey) && !(evee.altKey))
	{
		$(etgt).prop('readonly',false);
		// $(this).attr('onselect', 'dummy()');
		// $(etgt).css('cursor', 'text');
		$(etgt).select();
	}

	if (evee.ctrlKey && !(evee.shiftKey) && !(evee.altKey))
	{
		$(etgt).prop('readonly',false);
		// $(this).attr('onselect', 'dummy()');
		// $(this).css('cursor', 'text');
	}
	
	if (row_hitman_mode)
	{
		if (evee.altKey)
		{
			$(etgt).closest('.super_node_content_row').addClass('global_trash_to_flush class_hidden');
		}
	}
}

function super_row_text_editor_applier(etgt, eevee, action)
{
	if ( !($(etgt).prop('readonly')) && action == 'unfocus' )
	{
		$(etgt).prop('readonly', true);
	}
	
	if (eevee.keyCode == 13 && action == 'enter')
	{
		$(etgt).prop('readonly', true);
	}
}


// make link button work:
// if shift click - open link editor box, if too close to the right - clamp position
// if left click - copy link to buffer
function node_row_mlink_activator(etgt, eevee)
{
	var global_page_width = window.innerWidth;
	var global_cursor_location = eevee.pageX;
	
	if ((global_page_width - global_cursor_location) < 300)
	{
		var new_link_editor_x = global_cursor_location - 300;
		$('#global_super_link_editor')
		.css({
			left: new_link_editor_x,
			top: eevee.pageY
		});
		
	}else{
		
		console.log(global_cursor_location);
		$("#global_super_link_editor")
		.css({
			left: eevee.pageX,
			top: eevee.pageY,
		})
	}
	
	
	if (eevee.shiftKey)
	{
		console.log('editor link call')

		var grab_link_for_input = $(etgt).attr('mgh_link_btn_data');
		$('#global_super_link_editor').find('.content_link_editor_input').val(grab_link_for_input);
		$('#global_super_link_editor').removeClass('class_hidden');
		// mute all link buttons once shift+click
		$(etgt).removeClass('standard_btn_1');
		$('.super_node_content_copy_link').css('pointer-events', 'none');
		
		// store which link button we're editing rn
		window.current_link_edited_element = $(etgt)
		
		
		// $('#global_super_link_editor').click(false);
		
		if ($(etgt).attr('mgh_link_btn_valid') <= 0)
		{
			$('#global_super_link_editor').find('.content_link_editor_input').select();
			
		}
	}
	
	if ($(etgt).attr('mgh_link_btn_valid') > 0 && !(eevee.shiftKey))
	{
		liz3_copytext($(etgt).attr('mgh_link_btn_data'))	
	}
}



function rowlink_editor_apply_link(etgt)
{
	var current_container = $(etgt).closest('.content_link_editor');
	var grab_val = $(current_container).find('.content_link_editor_input').val();
	
	// set link to datablock
	$(current_link_edited_element).attr('mgh_link_btn_data', grab_val)
	
	$(etgt).closest('.content_link_editor').addClass('class_hidden');
	$(current_link_edited_element).addClass("standard_btn_1");
	
	if (grab_val.includes('https://mega'))
	{
		$(current_link_edited_element).css('background-position', '-63px -71.5px');
		$(current_link_edited_element).attr('mgh_link_btn_valid', '1');
	}else{
		$(current_link_edited_element).css('background-position', '-93px -802.5px');
		$(current_link_edited_element).attr('mgh_link_btn_valid', '0');
	}
	
	// reset editor input 
	$(current_container).find('.content_link_editor_input').val('');
	
	// bring back pointer events for link buttons
	$('.super_node_content_copy_link').css('pointer-events', 'auto');
}


function node_row_date_block(etgt, eevee)
{
	if (eevee.ctrlKey)
	{
		$(etgt).prop('readonly', false);
	}
	if (eevee.shiftKey)
	{
		$(etgt).val(super_dater());
	}
}































































