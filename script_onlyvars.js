
// Current date storage, just because I dont want to use "return"
var super_date = "nan_ERROR";



// Fuck js. This is needed for preset system to work correctly. Use this for storing any temp element selections when reading templates
var preset_reader_fuck_js_current_element = "nan";




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
	
	// =================================================
	// This function is responsible for moving the nodes
	// =================================================
	
	
  
  $(".super_node_ctrl_move_r_btn").click(function(){
    
	
	
    if (event.shiftKey)
    {
		window.preset_reader_fuck_js_current_element = $(this).closest(".super_node");
		super_node_spawner()
		

    }else{
		var elm = $(this).closest(".super_node");
		
		elm.insertAfter(elm.next());
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










	// ===========================================================================
	// This is how all preset thingies will look like. Yeah, stoopid, but it works
	// ===========================================================================




function super_content_row_adder()
{
  $(".super_node_add_content_row_btn").click(function(){
    
	window.preset_reader_fuck_js_current_element = $(this);
	
	var template_path = "/templates/super_template2.mght"
	
	
	
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
	
	var template_path = "/templates/super_node_template.mght"
	
	
	
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
	
	