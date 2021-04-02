
// Current date storage, just because I dont want to use "return"
var super_date = "nan_ERROR";



// Fuck js. This is needed for preset system to work correctly. Use this for storing any temp element selections when reading templates
var preset_reader_fuck_js_current_element = "nan";



var current_link_edited_element = "nan";









// Super important shit. Retrigger all possible handlers
function event_rehandlers()
{
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
  
  content_link_editor_activator()
  
  
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




function space_left_color_indicator()
{
	
	// =============================================================
	// This function refereshes all the color indicators on the page
	// =============================================================
	
  var oldmax = 16;
  var oldmin = 0;

  var newmax = 120;
  var newmin = 0;

  $('.node_space_left_ind').css('background', function(){

      var get_sibling = $(this).siblings('.node_space_left_num');
    
      var get_number = $(get_sibling).find(".node_space_left_super_num").text();
   //   var ourval = $(this).text();

      var super_math = ((( get_number - oldmin ) * newmax ) / oldmax ) + 0;

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
		
		window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
		super_node_spawner()
		clearSelection()
		

    }else{
		var elm = $(this).closest(".super_node");
		
		elm.insertAfter(elm.next());
		
		super_node_indexer()
	}
	
	
	
//    console.log("click");
    
//    var grab_node = $(this).closest(".super_node");
    

    
  //   $(grab_node).prev().insertAfter(grab_node);
    
    // .next()
    
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  $(".super_node_ctrl_move_l_btn").click(function(){
    
    if (event.shiftKey)
    {
		window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
		super_node_spawner_l()
		

    }else{
		var elm = $(this).closest(".super_node");
		
		elm.insertBefore(elm.prev());
		
		super_node_indexer()
	}
    

    
  //   $(grab_node).prev().insertAfter(grab_node);
    
    // .next()
    
  });
  
  
}



function super_node_indexer()
{
  
	// number every node. Just for fun for now
	
	
    $(".super_node").each(function(i) {
        i = '0000' + (i + 1);
        $(this).find(".super_node_label_text").text(i.substr(i.length - 4));
    });
  
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
        this.value=super_date;
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
		$(this).attr('onselect', "clearSelection()");
		$(this).css('cursor', "default");
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
	
	let template_path = "/templates/super_row_template.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', template_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).before(client.responseText);
				event_rehandlers()
				super_row_adder_trigger_date()
			}
		  
		  
		}
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
	
	let template_path = "/templates/super_node_template.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', template_path);
		client.onreadystatechange = function() {
		  // window.temp_template_storage = client.responseText
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).after(client.responseText);
				event_rehandlers();
				// window.fuckyou = client.responseText;
				super_row_adder_trigger_date();
			}
		  
		  
		}
		client.send();
	
		
		
	
 //   $(this.closest(".super_node_content_rows_block")).append('<p>added</p>');
    
    
    

}













	// ===========================================================================
	// Spawn node from the Left. TODO: MAKE IT 1 AUTOMATIC FUNCTION
	// ===========================================================================
	
	function super_node_spawner_l()
{
	console.log("weve got hostiles");
	// window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
	
	let template_path = "/templates/super_node_template.mght"
	
	
	
		var client = new XMLHttpRequest();
		client.open('GET', template_path);
		client.onreadystatechange = function() {
		  
			if(client.readyState == 4 ) {
				$(preset_reader_fuck_js_current_element).before(client.responseText);
				event_rehandlers();
				super_row_adder_trigger_date();
			}
		  
		  
		}
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
    
	
	

    if (event.altKey)
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
    
  });
  
}



function super_row_text_tweaker()
{
	
	// ==================================================================================
	// This is needed for disabling the date editing when you finish manual date tweaking
	// ==================================================================================
  
	$( ".super_node_content_text" ).focusout(function() {
		focus++;
		$(this).prop('readonly',true);
		// $(this).css('cursor', "default");
	  })
  
}






function super_row_content_link_editor_activator()
{
	$(".super_node_content_copy_link").click(function(){
		
		
		if (event.shiftKey)
		{
			$(this).find(".content_link_editor").removeClass("class_hidden");
			$(this).find(".content_link_editor").click(false);
			$(this).removeClass("standard_btn_1");

		}else{
			  
			  
			  if ($(this).attr('mgh_link_btn_valid') > 0)
			  {
				  console.log("goooood")
				  var what_to_copy = $(this).find(".content_link_editor_input");
				  // console.log(what_to_copy.text())
				  var $temp = $("<input>");
				  $("body").append($temp);
				  $temp.val($(what_to_copy).val()).select();
				  document.execCommand("copy");
				  $temp.remove(); 
				  
			  }else{
				  console.log("link_invalid")
			  }
			 
			  

			  
		}
		
		
		
		
		
		
	});

}



function super_row_content_link_editor_deactivator()
{
	
	
	$(".content_link_editor .content_link_editor_btns").click(function(){
		
		var current_container = $(this).closest(".content_link_editor");
		var grab_val = $(current_container).find(".content_link_editor_input").val();
		
		var link_button = $(this).closest(".super_node_content_copy_link")
		
		$(this).closest(".content_link_editor").addClass("class_hidden");
		$(this).closest(".super_node_content_copy_link").addClass("standard_btn_1");
		
		
		if (grab_val.includes("https://mega"))
		{
			$(link_button).css('background-position', '-63px -71.5px');
			$(link_button).attr('mgh_link_btn_valid', '1')
		}else{
			$(link_button).css('background-position', '-93px -802.5px');
			$(link_button).attr('mgh_link_btn_valid', '0')
		}
		
		// background-position: -93px -802.5px;
		
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



/*

function content_link_editor_activator()
{
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
	
}


*/

