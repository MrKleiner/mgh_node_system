// Documentation:
/*
 - Row text field:
	Shift click to edit and select all text
	Ctrl click to edit at current pos

 - Row link block
	Click to copy link
	Shift click to edit
	If valid then marked with good chain piece else marked with broken chain piece

 - Row date block
	Shift click to set today's date
	Ctrl click to edit at current position
	
 - Node Storage Space Left indicator is colored automatically
	Click Storage button at the top of the node to edit the storage value
	If "lf" is presented in the value, then a simple math operation will be executed: 15 - entered value (supposingly, space taken) = Space left
	
 - Node arrows
	Click to move the node left or right
	Shift click to add node either from left or the right
	
 - Node move To button
	Click to select current node and then click arrows on other nodes to insert the selected node from the left or right
	Alt click any To button to stop position editing
	Click on Pos edit button from the right to stop position editing
	
 - Login and Password datablocks are presented as Login - Password - Mega Backup key
	Click Copy to copy login or password. No Copy button presented for backup key.
	Click Edit to Edit the login or password datablock.

 - Node label
	Shift click to enter edit mode and select all text 
	Ctrl click to enter edit mode at current position
	Alt click to change the colour

 - Tools
	Shift E or click Hitman button from the left to enter the row deletion tool and then alt click the row to move it to trash bin
	Alt W or click Node Hitman button from the left to enter the node deletion tool and then alt click the Storage button to move to to trash bin
	Click Flush to empty the trash bin
	Alt S or click Save Rip button from the right to save the current profile and database
	Alt Q or click Quit to quit the system
	Encrypted checkbox dictates wether to encrypt the saved database or not
	Click New Password to change the password and resave with new password

*/


// Current date storage, just because I dont want to use "return"
var super_date = "nan_ERROR";





var row_template_path = "/templates/super_row_template3.mght"

var node_template_path = "/templates/super_node_template7.mght"



// Fuck js. This is needed for preset system to work correctly. Use this for storing any temp element selections when reading templates
var preset_reader_fuck_js_current_element = "nan_preset_fuck";


var current_link_edited_element = "nan_linked_elem";


var hitman_mode = false;


var node_hitman_mode = false;


var cur_session_password = "password_is_null";

var current_edited_node_col_label = "current_col_label_is_null"


// 
//
//	Super Mover var block
//
//


var current_node_to_move = "current_node_is_nan_too_bad";

var super_node_move_mode = false;



// console.log("%cThis is a green text", "font-size:50px");






// convert shit to hex. copypasta from stack overflow


var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }






function rgb2hex_v2(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}






// convert shit to hex. copypasta from stack overflow









// get password
$(document).ready(function(){
// function super_password_loader()
// {

    
	// window.preset_reader_fuck_js_current_element = $(this);
	
	var password_path = "personal_password.mghpas"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', password_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				// $(preset_reader_fuck_js_current_element).before(client.responseText);
				// event_rehandlers()
				// super_row_adder_trigger_date()
				window.cur_session_password = client.responseText;
				super_load_last_save();
				
			}
		  
		  
		}
		client.send();
	
 //   $(this.closest(".super_node_content_rows_block")).append('<p>added</p>');
    
// }

});




















// Super important shit. Retrigger all possible handlers
function event_rehandlers()
{
  // super_password_loader()
  // load last save
  // super_load_last_save()
  unbind_all()
  
  creds_edit_toggler()
  space_left_color_indicator()
  super_lawn_mover()
  super_node_indexer()
  super_date_editor()
  super_dater()
  super_date_tweaker()
  super_content_row_adder()
  
  super_row_text_editor()
  super_row_text_tweaker()
  
  super_row_content_link_editor_activator()
  super_row_content_link_editor_deactivator()
  
  content_editor_input_ux()
  
  // content_link_editor_activator()
  
  credentials_val_setter()
  storage_left_editor_activator()
  input_enters()
  // super_node_hitman()
  super_commit_self_die()
  super_node_label_editor_activator()
  
  super_node_mover()
  creds_super_copier()
  
  bind_label_col_changer_caller()
  
  console.log("rehandled_all_triggers");
  
  // fill checkboxes
  
  checkbox_activator("export_encrypted_checkbox", $("#config_storage").attr("export_encrypted"));
  
  
  
}









function dummy()
{
  // this is needed for deselection trick
  console.log("ded");
}


function super_dater()
{
  // write current date to global var for later reuse
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  
  window.super_date = today;
//  document.write(today);
  
  // guess what? This code was also copypasted
}




function unbind_all()
{
  $(".super_node *").unbind();
  
  $("#global_super_link_editor *").unbind();
  
}


function creds_edit_toggler()
{
  $(".super_node_creds_edit").click(function(){
    
    var current_container = this.closest(".super_node_creds_row");
    $(current_container).find(".super_node_creds_text").toggleClass("class_hidden");
    
  });
  
    $(".node_bkey_btn").click(function(){
    
    var current_container = this.closest(".super_node_inner_container");
    $(current_container).find(".super_node_creds_row_bkey").toggleClass("class_hidden");
    
  });
}


function creds_super_copier()
{
  $(".super_node_creds_copy_this_data").click(function(){
    // node_creds_email
    var current_container = this.closest(".super_node_creds_row");
    var what_to_copy = $(current_container).find(".super_node_creds_input").val();
	
	
	  // console.log(what_to_copy)
	  var $temp = $("<input>");
	  $("body").append($temp);
	  $temp.val(what_to_copy).select();
	  document.execCommand("copy");
	  $temp.remove(); 
	  
    
  });
  
  
  
  
  
  $(".super_node_super_smart_copier").click(function(){
    // node_creds_email
    // var current_container = this.closest(".super_node_creds_row");
    // var what_to_copy = $(current_container).find(".super_node_creds_input").val();
	if (event.ctrlKey)
	{
		
	var current_login = $(this).closest(".super_node_creds_block").find(".node_creds_email").val();
	var current_pswd = $(this).closest(".super_node_creds_block").find(".node_creds_pswd").val();
	
	  // console.log(what_to_copy)
	  var $temp = $("<input>");
	  $("body").append($temp);
	  $temp.val(current_login + "," + current_pswd).select();
	  document.execCommand("copy");
	  $temp.remove(); 
	  
	}
    
  });
  
  
  

  
}



function space_left_color_indicator()
{
	
	// =============================================================
	// This function refereshes all the color indicators on the page
	// =============================================================
	
  var oldmax = 15;
  var oldmin = 0;

  var newmax = 120;
  var newmin = 0;

  $('.node_space_left_ind').css('background', function(){
	  
	  // var math_tweaks = 

      var get_sibling = $(this).siblings('.node_space_left_num');
    
      var get_number = $(get_sibling).find(".node_space_left_super_num").val();
   //   var ourval = $(this).text();

      var super_math = ((( get_number - oldmin ) * newmax ) / oldmax ) + newmin;

      console.log(get_number);


      return 'hsla(' + super_math + ', 100%, 59%, 1)';


  });
}



function super_lawn_mover()
{
	
	// ===================================================================
	// This function is responsible for moving the nodes and creating them
	// ===================================================================
	
	
  
  $(".super_node_ctrl_move_r_btn").click(function(){
    
	
	
    if (event.shiftKey)
    {
		
		
		if (super_node_move_mode)
		{
			
		}else{
		
			window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
			super_node_spawner();
			clearSelection();
		}




    }else{
		
		if (super_node_move_mode)
		{
			// current_node_to_move
			
			
			var current_super_node = $(this).closest(".super_node");
			
			
			$(current_super_node).after(current_node_to_move);
			
			window.super_node_move_mode = false;
			$(".super_node_pos_edit_status").removeClass("btn_blue_active_bg");
			$(".super_node_pos_edit_status").text("Pos edit: false")
			console.log("are we even here")
			
		}else{
			
			
			var elm = $(this).closest(".super_node");
			
			elm.insertAfter(elm.next());
			
			super_node_indexer()
			
			
			
			
		}
		
		
		

	}
	
	
	
//    console.log("click");
    
//    var grab_node = $(this).closest(".super_node");
    

    
  //   $(grab_node).prev().insertAfter(grab_node);
    
    // .next()
    
  });
  
  
  
  
  
  
  console.log("move_btns_binded")
  
  
  
  
  
  
  $(".super_node_ctrl_move_l_btn").click(function(){
    
    if (event.shiftKey)
    {
		
		
		if (super_node_move_mode)
		{
			
		}else{
			
			window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
			super_node_spawner_l()
		}
		

    }else{
		
		
		
		if (super_node_move_mode)
		{
			// current_node_to_move
			
			
			var current_super_node = $(this).closest(".super_node");
			
			
			$(current_super_node).before(current_node_to_move);
			
			window.super_node_move_mode = false;
			$(".super_node_pos_edit_status").removeClass("btn_blue_active_bg");
			$(".super_node_pos_edit_status").text("Pos edit: false")
			console.log("are we even here")
			
		}else{
		
			var elm = $(this).closest(".super_node");
			
			elm.insertBefore(elm.prev());
			
			super_node_indexer()
		
		}
	}
    

    
  //   $(grab_node).prev().insertAfter(grab_node);
    
    // .next()
    
  });
  
  
}



function super_node_indexer()
{
  
	// number every node. Just for fun for now
	
	
    $(".super_node").not(".global_trash_to_flush").each(function(i) {
		
        i = (i + 1);
        // $(this).find(".super_node_label_text").text(i.substr(i.length - 4));
		 // $(this).attr('mgh_node_number', i.substr(i.length - 4));
		 $(this).attr('mgh_node_number', i);
    });
	
	$(".global_trash_to_flush").removeAttr("mgh_node_number");
  
}

function super_date_editor()
{
  
	// ===================================================
	// This function is responsible for the date mechanism
	// ===================================================
  
  
  $(".super_node_content_date").click(function(){
    
    if (event.shiftKey)
    {
     // $(this).text(super_date);
        $(this).val(super_date);
		$(this).attr('value', super_date);
   //   $(this).remove();
        clearSelection();
    }
    
    if (event.ctrlKey)
    {
      var zero = 0;
     // $(this).text(super_date);
     //   this.value=super_date;
    //  $(this).attr('readonly', 0);
      $(this).prop('readonly',false);
      
      $(this).attr('onselect', "dummy()");
	  
	  $(this).css('cursor', "text");

    }
    
  });
  
}



function super_date_tweaker()
{
	
	// ==================================================================================
	// This is needed for disabling the date editing when you finish manual date tweaking
	// ==================================================================================
 
  
  
  
	$( ".super_node_content_date" ) .focusout(function() {
		focus++;
		$(this).prop('readonly',true);
		 var thiser = $(this).val();
		$(this).attr('onselect', "clearSelection()");
		$(this).css('cursor', "default");
		$(this).attr('value', thiser);
	  })
  
}




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










	// ==================================================================================================
	// This is how all preset thingies will look like. Yeah, stoopid, but it works. This one spawns a row
	// ==================================================================================================




function super_content_row_adder()
{
  $(".super_node_add_content_row_btn").click(function(){
    
	window.preset_reader_fuck_js_current_element = $(this);
	
	// var row_template_path = "/templates/super_row_template3.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', row_template_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).before(client.responseText);
				event_rehandlers()
				super_row_adder_trigger_date()
			}
		  
		  
		}
		client.setRequestHeader('Expires', "Wed, 21 Oct 2015 07:28:00 GMT");
		client.setRequestHeader('Cache-Control', "max-age=0, must-revalidate");
		client.send();
	
		
		
	
 //   $(this.closest(".super_node_content_rows_block")).append('<p>added</p>');
    
    
    
    });
}

// TEMP CLASSES FOR NEWLY CREATED SHIT


// split string js google



function super_row_adder_trigger_date()
{
	$(".row_temp_date_tgt").prop('readonly',false);
	$(".row_temp_date_tgt").val(super_date);
	$(".row_temp_date_tgt").attr('value', super_date);
	$(".row_temp_date_tgt").prop('readonly',true);
	$(".row_temp_date_tgt").removeClass("row_temp_date_tgt");
	
}


















	// ===========================================================================
	// Spawn node from the right
	// ===========================================================================


function super_node_spawner()
{

	// var find_current_node = 
	
	console.log("weve got hostiles");
	// window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
	
	// var node_template_path = "/templates/super_node_template6.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', node_template_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).after(client.responseText);
				event_rehandlers();
				// window.fuckyou = client.responseText;
				super_row_adder_trigger_date();
			}
		  
		  
		}
		
		client.setRequestHeader('Expires', "Wed, 21 Oct 2015 07:28:00 GMT");
		client.setRequestHeader('Cache-Control', "max-age=0, must-revalidate");
		client.send();
	
		
		// Cache-Control: max-age=0, must-revalidate

		// client.setRequestHeader('Cache-Control', "max-age=0, must-revalidate");
		
 //   $(this.closest(".super_node_content_rows_block")).append('<p>added</p>');
    
    
    

}













	// ===========================================================================
	// Spawn node from the Left. TODO: MAKE IT 1 AUTOMATIC FUNCTION
	// ===========================================================================
	
function super_node_spawner_l()
{
	console.log("weve got hostiles");
	// window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
	
	// var node_template_path = "/templates/super_node_template6.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', node_template_path);
		client.onreadystatechange = function() {
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).before(client.responseText);
				event_rehandlers();
				super_row_adder_trigger_date();
			}
		  
		  
		}
		client.setRequestHeader('Expires', "Wed, 21 Oct 2015 07:28:00 GMT");
		client.setRequestHeader('Cache-Control', "max-age=0, must-revalidate");
		
		client.send();
	

 
 
 

}


function scale_us()
{
	$(".super_node").addClass("tscale");
}






















function super_row_text_editor()
{
  
	// ===================================================
	// This function is responsible for the file name mechanism
	// ===================================================
  
  
  $(".super_node_content_text").click(function(){
    
	
	

    if (event.shiftKey)
    {
		this.select()
        // this.value=super_date;
        // clearSelection();
		
      $(this).prop('readonly',false);
      
      $(this).attr('onselect', "dummy()");
	  
	  $(this).css('cursor', "text");
		
    }

	
	
	
    if (event.ctrlKey)
    {
		
      $(this).prop('readonly',false);
      
      $(this).attr('onselect', "dummy()");
	  
	  $(this).css('cursor', "text");

    }
	
	
    if (event.altKey)
    {
	
		if (hitman_mode)
		{
			// $(this).closest(".super_node_content_row").remove();
			$(this).closest(".super_node_content_row").addClass("global_trash_to_flush");
			$(this).closest(".super_node_content_row").addClass("class_hidden");
			
		}else{
			console.log("aint no deleting that shit");
		}
	
	
	}
	
	
	
	
	
	
    
  });
  
}



function super_row_text_tweaker()
{
	
	// ==================================================================================
	// This is needed for disabling the date editing when you finish row text tweaking
	// ==================================================================================
  
	$( ".super_node_content_text" ).focusout(function() {
		focus++;
		$(this).prop('readonly',true);
		var thiser = $(this).val();
		$(this).attr('value', thiser);
		// $(this).css('cursor', "default");
	  })
  
}






function super_row_content_link_editor_activator()
{
	$(".super_node_content_copy_link").click(function(e){
		
		// $(document).height();
		var global_page_width = window.innerWidth;
		
		var global_cursor_location = e.pageX;
		
		if ((global_page_width - global_cursor_location) < 300)
		{
			var new_link_editor_x = global_cursor_location - 300;
			
			$("#global_super_link_editor")
				.css({
					left: new_link_editor_x,
					top: e.pageY,
				});
			
		}else{
		
		console.log(global_cursor_location);
		
		$("#global_super_link_editor")
			.css({
				left: e.pageX,
				top: e.pageY,
			})
		
		}
		
		if (event.shiftKey)
		{
			
			if ($(this).attr('mgh_link_btn_valid') > 0)
			{
				if ($(this).attr('mgh_link_btn_valid').length < 5)
				{
					
				
				var grab_link_for_input = $(this).attr('mgh_link_btn_data')
				
				
				$("#global_super_link_editor").find(".content_link_editor_input").val(grab_link_for_input);
				$("#global_super_link_editor").removeClass("class_hidden");
				$("#global_super_link_editor").click(false);
				$(this).removeClass("standard_btn_1");
				

				window.current_link_edited_element = $(this)
				
				$(".super_node_content_copy_link").css('pointer-events', 'none');
				}else{}
				
			}else{
				
				
				var grab_link_for_input = $(this).attr('mgh_link_btn_data')
				
				
				$("#global_super_link_editor").find(".content_link_editor_input").val(grab_link_for_input);
				$("#global_super_link_editor").removeClass("class_hidden");
				$("#global_super_link_editor").click(false);
				$("#global_super_link_editor").find(".content_link_editor_input").select();
				$(this).removeClass("standard_btn_1");
				

				window.current_link_edited_element = $(this)
				
				$(".super_node_content_copy_link").css('pointer-events', 'none');
				
				
			}
			
			
			

			
		}else{
			  
			  
			  if ($(this).attr('mgh_link_btn_valid') > 0)
			  {
				  console.log("goooood")
				  
				  var what_to_copy = $(this).attr("mgh_link_btn_data");
				  // console.log(what_to_copy)
				  var $temp = $("<input>");
				  $("body").append($temp);
				  $temp.val(what_to_copy).select();
				  document.execCommand("copy");
				  $temp.remove(); 
				  
				  
			  }else{
				  console.log("link_invalid")
			  }  
		}	
		
	});
	

	/*
	$(".super_node_content_copy_link").click(function(e){

		window.current_link_edited_element = $(this)

		$("#global_super_link_editor")
			.css({
				// position: 'absolute',
				left: e.pageX,
				top: e.pageY,
				// display: 'block'
			})
			// .hide('explode', { pieces: 150 }, 700);
	});
	*/
	
	
	

}



function super_row_content_link_editor_deactivator()
{
	
	
	$(".content_link_editor .content_link_editor_btns").click(function(){
		
		var current_container = $(this).closest(".content_link_editor");
		var grab_val = $(current_container).find(".content_link_editor_input").val();
		
		// var link_button = $(this).closest(".super_node_content_copy_link")
		
		
		// set link to datablock
		$(current_link_edited_element).attr('mgh_link_btn_data', grab_val)
		
		

		
		
		$(this).closest(".content_link_editor").addClass("class_hidden");
		$(current_link_edited_element).addClass("standard_btn_1");
		
		
		
		if (grab_val.includes("https://mega"))
		{
			$(current_link_edited_element).css('background-position', '-63px -71.5px');
			$(current_link_edited_element).attr('mgh_link_btn_valid', '1')
		}else{
			$(current_link_edited_element).css('background-position', '-93px -802.5px');
			$(current_link_edited_element).attr('mgh_link_btn_valid', '0')
		}
		
		// background-position: -93px -802.5px;
		
		
		// reset editor input 
		$(current_container).find(".content_link_editor_input").val('');
		
		$(".super_node_content_copy_link").css('pointer-events', 'auto');
		
	});
	

}







function content_editor_input_ux()
{
	
	$(".content_link_editor_input").click(function(){
		
		if (event.altKey)
		{
			this.select()
			
		}
		
		
	});
	
}










function save_rip()
{
	

	
	
	console.log("svae rrr sss")

	// var super_canvas_grab = $("#super_canvas");

	var elHtml_crypt = document.querySelector(".super_canvas").innerHTML;

	if ($("#export_encrypted_checkbox").attr("mgh_checkbox_checked") > 0)
	{
		var elHtml = CryptoJS.AES.encrypt(elHtml_crypt, cur_session_password);
	}else{
		
		var elHtml = elHtml_crypt;
	}
	
	// console.log(elHtml)
	
	let cgi_script = "cgi-bin/hello.py"
	

		var blob = new Blob([elHtml], {type: 'text/plain'});
		var cgi_request = new XMLHttpRequest();
		cgi_request.open('POST', cgi_script, true);
		cgi_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		cgi_request.responseType = 'text';
		
		cgi_request.onreadystatechange = function() {
		
		  
		  
			if(cgi_request.readyState == 4 ) {
				console.log(cgi_request.responseText)
				if (cgi_request.responseText.trim() == "saved_succesfully")
				{	
					$(".save_indicator").css('background', 'green');
					console.log("WE GOT OKK RESPONSE")
				}else{
					$(".save_indicator").css('background', 'red');
					console.log("Somethings wrong I can feel it")
				}
				
			}
		  
		  
		}
		cgi_request.send(blob);
	
	

}






$(document).ready(function(){
	 
	document.addEventListener ("keydown", function (zEvent) {
		if ( zEvent.altKey  &&  zEvent.keyCode == 81) {  // case sensitive
				
				
				console.log("quit")
	let cgi_script = "cgi-bin/exit.py"
	

		var blob = new Blob(["three_letters"], {type: 'text/plain'});
		var cgi_request = new XMLHttpRequest();
		cgi_request.open('POST', cgi_script, true);
		cgi_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		cgi_request.responseType = 'text';
		
		cgi_request.onreadystatechange = function() {
		
		  
		  
			if(cgi_request.readyState == 4 ) {
				console.log(cgi_request.responseText)
				if (cgi_request.responseText.includes("killme_no_later"))
				{
					// $(".save_indicator").css('background', 'green');
					self.close();
					// console.log("Kill the RED spy");
					// console.log(cgi_request.responseText);
					// console.log("lets close tab");
				}else{
					// $(".save_indicator").css('background', 'red');
					console.log("There was no killme response from server");
				}
				
			}
		  
		  
		}
		cgi_request.send(blob);
	
				
				
				
				
				
		}
	});
  
  
  
});











function super_commit_self_die()
{
	
  $(".super_exit_application").click(function(){
	// console.log("svae rrr sss")
	// super_tab_closer()
	// var super_canvas_grab = $("#super_canvas");

	// var elHtml = document.querySelector(".content_link_editor").innerHTML;
	
	// console.log(elHtml)
	
	let cgi_script = "cgi-bin/exit.py"
	

		var blob = new Blob(["three_letters"], {type: 'text/plain'});
		var cgi_request = new XMLHttpRequest();
		cgi_request.open('POST', cgi_script, true);
		cgi_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		cgi_request.responseType = 'text';
		
		cgi_request.onreadystatechange = function() {
		
		  
		  
			if(cgi_request.readyState == 4 ) {
				console.log(cgi_request.responseText)
				if (cgi_request.responseText.includes("killme_no_later"))
				{
					// $(".save_indicator").css('background', 'green');
					self.close();
					// console.log("Kill the RED spy");
					// console.log(cgi_request.responseText);
					// console.log("lets close tab");
				}else{
					// $(".save_indicator").css('background', 'red');
					console.log("There was no killme response from server");
				}
				
			}
		  
		  
		}
		cgi_request.send(blob);
	
	
	
	  });
	  
	  // Window.close()
	  // self.close()
	
}














$(document).ready(function(){
  $(".super_util_del_rows").click(function(){

		window.hitman_mode ^= true;
		
		$(".super_util_del_rows").toggleClass("btn_blue_active_bg");
		
  });
});



document.addEventListener ("keydown", function (zEvent) {
    if ( zEvent.shiftKey  &&  zEvent.keyCode == 69) {  // case sensitive
        // DO YOUR STUFF HERE
		window.hitman_mode ^= true;
		$(".super_util_del_rows").toggleClass("btn_blue_active_bg");
    }
} );



$(document).ready(function(){
  $(".flush_trash_bin").click(function(){
	  
	  $(".global_trash_to_flush").remove();
	  
  });
});





document.addEventListener ("keydown", function (zEvent) {
    if ( /* zEvent.shiftKey && */ zEvent.altKey &&  zEvent.keyCode == 83) {

		 save_rip()
		 
		 $(".save_indicator").css('background', 'cyan');
    }
} );









	// ==================================================================================
	// Load last save on page load
	// ==================================================================================


// $(document).ready(function(){
	
function super_load_last_save()
{
	

	// super_password_loader()
	
	var save_path = "database_last_save.mghdbase"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', save_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				// $(preset_reader_fuck_js_current_element).before(client.responseText);
				// event_rehandlers()
				// super_row_adder_trigger_date()
				if (client.responseText.includes("shit_is_not_encrypted"))
				{

					document.querySelector(".super_canvas").innerHTML = client.responseText;
					
				}else{
					
					var decrypted_shit = CryptoJS.AES.decrypt(client.responseText, cur_session_password);
					document.querySelector(".super_canvas").innerHTML = decrypted_shit.toString(CryptoJS.enc.Utf8);
					
				}
				
				unbind_all();
				
				// setTimeout(function(){ event_rehandlers(); }, 100);
				event_rehandlers();
				
			}
		  
		  
		}
		client.send();
		
}
		
	
// });



function credentials_val_setter()
{
	
	
	$( ".super_node input" ).focusout(function() {
		focus++;
		// $(this).prop('readonly',true);
		var thiser = $(this).val();
		$(this).attr('value', thiser);
		// $(this).css('cursor', "default");
	  })
	
	
	
	
}



function storage_left_editor_activator()
{
  $(".super_node_storage_btn").click(function(){
	  // $(this).select();
	  
	  
		if (node_hitman_mode)
		{
			if (event.altKey)
			{
				$(this).closest(".super_node").addClass("global_trash_to_flush");
				$(this).closest(".super_node").addClass("class_hidden");
			}
		}
	  
	  
	  
	  
	  let current_node = $(this).closest(".super_node");
	  
	  let current_node_storage_status = $(current_node).find(".node_space_left_super_num");
	  
	  $(current_node_storage_status).css('pointer-events', 'auto');
	  $(current_node_storage_status).css('user-select', 'auto');
	  
	  $(current_node_storage_status).prop('readonly',false);
	  
	  $(current_node_storage_status).select();
	  
  });
  
  
  
  
	$( ".node_space_left_super_num" ).focusout(function() {
		focus++;
		$(this).prop('readonly',true);
		var thiser = $(this).val();
		$(this).attr('value',thiser);
		$(this).val(thiser);
		$(this).css('pointer-events', 'none');
		$(this).css('user-select', 'none');
		space_left_color_indicator()
	  })
  
  
  
  
  
}




function input_enters()
{
	
	
    $(".super_node").on("keypress", "input", function(e){
        if(e.which == 13){
            // var inputVal = $(this).val();
            // alert("You've entered: " + inputVal);
			var thiser = $(this).val();
			$(this).attr('value', thiser);
			$(this).blur();
			clearSelection()
        }
    });
	
	
	
	
	$(".node_space_left_super_num").unbind();
	
	
	
	
    $(".node_space_left_num").on("keypress", "input", function(e){
        if(e.which == 13){
            // var inputVal = $(this).val();
            // alert("You've entered: " + inputVal);
			
			
			var thiser = $(this).val();
			// console.log("if checked")
			
			if (thiser.includes("lf"))
			{
				console.log("if checked");
				var roundnum1 = parseFloat(15 - parseFloat(thiser.replace("lf", "")));
				var roundnum_result = Math.round((roundnum1 + Number.EPSILON) * 100) / 100;
				
				$(this).attr('value', roundnum_result);
				$(this).val(roundnum_result);
				$(this).blur();
				space_left_color_indicator()
				$(this).css('pointer-events', 'none');
				$(this).css('user-select', 'none');
				clearSelection();
				
			}else{

				$(this).attr('value', thiser);
				// $(this).val(thiser.replace("lf", ""));
				$(this).blur();
				space_left_color_indicator();
				$(this).css('pointer-events', 'none');
				$(this).css('user-select', 'none');
				clearSelection();

			}
			
			
			

        }
    });
	
	
	
	$( ".node_space_left_super_num" ).focusout(function() {
		
			var thiser = $(this).val();
			// console.log("if checked")
			
			if (thiser.includes("lf"))
			{
				console.log("if checked");
				var roundnum1 = parseFloat(15 - parseFloat(thiser.replace("lf", "")));
				var roundnum_result = Math.round((roundnum1 + Number.EPSILON) * 100) / 100;
				
				$(this).attr('value', roundnum_result);
				$(this).val(roundnum_result);
				$(this).blur();
				space_left_color_indicator();
				$(this).css('pointer-events', 'none');
				$(this).css('user-select', 'none');
				clearSelection();
				
			}else{
				
				$(this).attr('value', thiser);
				// $(this).blur();
				$(this).css('pointer-events', 'none');
				$(this).css('user-select', 'none');
				// setTimeout(function(){ clearSelection(); space_left_color_indicator(); }, 10);
				space_left_color_indicator();
				// console.log("oncepls");
				clearSelection();

			}
			
			// console.log("pls no stack shit")
			
			
	  });
	
	
	
	
	
	
}


/*
function super_node_hitman()
{
	
	$(".super_node_storage_btn").click(function(){
		
		if (node_hitman_mode)
		{
			
			$(this).closest(".super_node").addClass("global_trash_to_flush");
			$(this).closest(".super_node").addClass("class_hidden");

		}
		  
	});
	
}
*/


$(document).ready(function(){
	
  $(".super_util_del_nodes").click(function(){

		window.node_hitman_mode ^= true;
		$(".super_util_del_nodes").toggleClass("btn_blue_active_bg");
  });
  
  
  
	document.addEventListener ("keydown", function (zEvent) {
		if ( zEvent.altKey  &&  zEvent.keyCode == 87) {  // case sensitive
			// DO YOUR STUFF HERE
			window.node_hitman_mode ^= true;
			$(".super_util_del_nodes").toggleClass("btn_blue_active_bg");
		}
	});
  
  
  
});



function super_node_label_editor_activator()
{
	
	
	
  $(".super_node_label_text").click(function(){
    
    if (event.shiftKey)
    {
		this.select()
      $(this).prop('readonly',false);
      $(this).attr('onselect', "dummy()");
	  $(this).css('cursor', "text");
    }
	
    if (event.ctrlKey)
    {
      $(this).prop('readonly',false);
      $(this).attr('onselect', "dummy()");
	  $(this).css('cursor', "text");
    }
  });
	
	
	
	
	$( ".super_node_label_text" ).focusout(function() {
		focus++;
		$(this).prop('readonly',true);
		// var thiser = $(this).val();
		// $(this).attr('value', thiser);
		$(this).css('cursor', "default");
	  })
	
	
	
}









function super_node_mover()
{
	
	$(".super_node .super_node_ctrl_move_to").click(function(){

		
		 if (event.altKey)
		 {
			window.super_node_move_mode = false;
			$(".super_node_pos_edit_status").text("Pos edit: false")
			$(".super_node_pos_edit_status").removeClass("btn_blue_active_bg");
			
			
		 }else{
				 
			window.super_node_move_mode = true;
			$(".super_node_pos_edit_status").text("Pos edit: true")
			window.current_node_to_move = $(this).closest(".super_node");
			$(".super_node_pos_edit_status").addClass("btn_blue_active_bg");
			 
		 }


		

	});
	
	
	$(".super_node_pos_edit_status").click(function(){
		
		window.super_node_move_mode = false;
		$(".super_node_pos_edit_status").removeClass("btn_blue_active_bg");
		
	
	});
	
}






// function standard_checkbox_1_activate()
// {
$(document).ready(function(){
	// standard_checkbox_1
	$(".standard_checkbox_1").click(function(){
	// .disaster_checkbox_checked_bg
	// $(".super_util_del_nodes").toggleClass("btn_blue_active_bg");
		var attr_check = $(this).find(".disaster_checkbox_checkmark").attr("mgh_checkbox_checked");
		attr_check ^= true;
		// v = 1 - v;
		$(this).find(".disaster_checkbox_checkmark").toggleClass("class_hidden");
		$(this).find(".disaster_checkbox").toggleClass("disaster_checkbox_checked_bg");
		$(this).find(".disaster_checkbox_checkmark").attr("mgh_checkbox_checked", attr_check);
	
	});
	
	$(".export_encrypted_checkbox_row").click(function(){
		$("#config_storage").attr("export_encrypted", 1 - $("#config_storage").attr("export_encrypted"));
	});
});
// }


function checkbox_activator(cbid, cstate)
{
	var current_cbox = $("#" + cbid).closest(".disaster_checkbox_row");
	// var current_cbox_state = $(current_cbox).find(".disaster_checkbox_checkmark").attr("mgh_checkbox_checked");
	if (cstate > 0)
	{
		$(current_cbox).find(".disaster_checkbox_checkmark").attr("mgh_checkbox_checked", "1");
		$(current_cbox).find(".disaster_checkbox").addClass("disaster_checkbox_checked_bg");
		$(current_cbox).find(".disaster_checkbox_checkmark").removeClass("class_hidden");
	}
	
	if (cstate == 0)
	{	
		$(current_cbox).find(".disaster_checkbox_checkmark").attr("mgh_checkbox_checked", "0");
		$(current_cbox).find(".disaster_checkbox").removeClass("disaster_checkbox_checked_bg");
		$(current_cbox).find(".disaster_checkbox_checkmark").addClass("class_hidden");
	}
	
	
	
	
	
}





function pswd_changer()
{
	
	console.log("new_pswd_write");

	// var super_canvas_grab = $("#super_canvas");

	// var elHtml_crypt = document.querySelector(".super_canvas").innerHTML;

	// var elHtml = CryptoJS.AES.encrypt(elHtml_crypt, cur_session_password);
	
	var new_pswd = $(".pswd_editor_input").val();

	// console.log(elHtml)
	
	var cgi_script = "cgi-bin/pswd_change.py"


		var blob = new Blob([new_pswd], {type: 'text/plain'});
		var cgi_request = new XMLHttpRequest();
		cgi_request.open('POST', cgi_script, true);
		cgi_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		cgi_request.responseType = 'text';
		
		cgi_request.onreadystatechange = function() {
		
		  
		  
			if(cgi_request.readyState == 4 ) {
				console.log(cgi_request.responseText)
				if (cgi_request.responseText.trim() == "saved_succesfully")
				{	
					// $(".save_indicator").css('background', 'green');
					window.cur_session_password = $(".pswd_editor_input").val();
					save_rip();
					$(".pswd_editor_input").val("");
					console.log("pswd_change_confirm");
					
				}else{
					// $(".save_indicator").css('background', 'red');
					console.log("pswd_change nein");
				}
				
			}
		  
		  
		}
		cgi_request.send(blob);
	
	

}











// bind all clicks for password changer

$(document).ready(function(){

		$(".save_new_pswd").click(function(e){
			
			// get width of the sidebar
			var sidebar_width = document.querySelector('.natural_disasters').offsetWidth;
			console.log(sidebar_width);
			
			$("#global_password_changer").removeClass("class_hidden");
			
			var global_page_width = window.innerWidth;
			
			var global_cursor_location = e.pageX;
			
			if (global_cursor_location < sidebar_width)
			{
				var new_offset = sidebar_width - global_cursor_location;
				
				$("#global_password_changer")
					.css({
						left: new_offset + global_cursor_location,
						top: e.pageY,
					})
				
			}else{
			
			console.log(global_cursor_location);
			
			$("#global_password_changer")
				.css({
					left: e.pageX,
					top: e.pageY,
				})
			
			}
			
		
		});
		
		
		
		
		
		
		// actually apply new password
		$(".pswd_editor_btn_apply").click(function(){
			
			pswd_changer();
			
			// hude menu 
			$("#global_password_changer").addClass("class_hidden");
			
			
			
		});
		
		
		$(".pswd_editor_btn_cancel").click(function(){
			
			// pswd_changer();
			
			// hude menu 
			$("#global_password_changer").addClass("class_hidden");
			$(".pswd_editor_input").val("");
			
			
		});
		
		
});






// bind color changer
function bind_label_col_changer_caller()
{
	// super_node_label
	$(".super_node_label").click(function(e){
		
		
		if (event.altKey)
		{
			
			var global_page_width = window.innerWidth;
			
			var global_cursor_location = e.pageX;
			
			window.current_edited_node_col_label = $(this);
			
			
			$(".global_color_editor_editor_input").val(rgb2hex_v2($(this).css("background-color")));
			$("#global_color_label_changer").removeClass("class_hidden");
			

			
			// console.log("global_page_width" + global_page_width);
			// console.log("global_cursor_location" + global_cursor_location);
			// console.log("fucking difference" + (global_page_width - global_cursor_location));
			
			if ((global_page_width - global_cursor_location) < 300)
			{
				var new_link_editor_x = global_cursor_location - 300;
				$("#global_color_label_changer")
				.css({
					left: new_link_editor_x,
					top: e.pageY,
				});
				
			}else{
				
				
				// console.log("SOUP CAN PYRO");
				
				$("#global_color_label_changer")
				.css({
					left: e.pageX,
					top: e.pageY,
				});
				
			}
			
			
		}else{
			// console.log("else color trigger initial");
		}

	});
	
	
}



// bind label color changer
$(document).ready(function(){

		$(".global_color_editor_btn_apply").click(function(){
			
			
			// $(this).closest(".global_color_editor").find(".")
			// global_color_editor_editor_input
			$(current_edited_node_col_label).css('background', $(".global_color_editor_editor_input").val());
			$("#global_color_label_changer").addClass("class_hidden");
			
		});
		
		$(".global_color_editor_btn_cancel").click(function(){
			
			
			// $(this).closest(".global_color_editor").find(".")
			// global_color_editor_editor_input
			// $(current_edited_node_col_label).css('background', $(".global_color_editor_editor_input").val());
			
			$("#global_color_label_changer").addClass("class_hidden");
			
		});
		
		
		// .global_color_editor_set_default_col
		
		
		$(".global_color_editor_set_default_col").click(function(){
			
			
			// $(this).closest(".global_color_editor").find(".")
			// global_color_editor_editor_input
			// $(current_edited_node_col_label).css('background', $(".global_color_editor_editor_input").val());
			
			$(".global_color_editor_editor_input").val('#478847');
			
		});
		
		
		
		
		
});




// console.log("%cThis is a green text", "font-size:50px");









function super_node_spawner_fuck()
{

	console.log("fuck you");

	var client = new XMLHttpRequest();
	client.open('GET', node_template_path);
	client.onreadystatechange = function() {

		if(client.readyState == 4 ) {
			$(".nodes_main_container").append(client.responseText);
			event_rehandlers();
			super_row_adder_trigger_date();
		}
	  
	  
	}
	
	client.setRequestHeader('Expires', "Wed, 21 Oct 2015 07:28:00 GMT");
	client.setRequestHeader('Cache-Control', "max-age=0, must-revalidate");
	client.send();
}