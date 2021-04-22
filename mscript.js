let super_new_page = '<div id="auto_login_input_container"><input type="password" id="super_auto_login_input"></input><p>Shift + q to logout. Shift + F for storage info</p></div>';

// alert("newscript");

	// For archiving purposes
	/*
	document.addEventListener ("keydown", function (zEvent) {
		if ( zEvent.ctrlKey  &&  zEvent.shiftKey  &&  zEvent.keyCode == 86) {  // case sensitive
		
		   $("#super_auto_login_input").select();
		   setTimeout(function(){ artificial_shit(); }, 20);

		}
	});
	*/
	// For archiving purposes



console.log("clickers11");



//
//
// 
// Apparently, keypress is piece of old fucking bs. Use keydown and keyup instead
//
//
//
















// ==================================================================
//
// First, lets create our own input. 3 sec delay, because fuck you
//
// ==================================================================
setTimeout(function(){

	$(".top-head").append(super_new_page);
// bodyel

	document.addEventListener('click', event => {
		console.log("alright fuck you")
	});
	// Oh, why timeout, you may ask? Because the page we're looking for doesnt exist til some filthy javascripts spawn all the required elements (the whole fking page, basically. Therefore, it takes some time)
	// 3 Seconds. Take it or leave it. If your PC is not fast enough to boot the page in 3 seconds - go fuck yourself with your crap PC from 2001. Go buy some decent shit, you peasant.
}, 3000);



// ==================================================================
//
// Now, define some useful shit
//
// ==================================================================

//
// This bs copies the link of an item
//
function super_link_c()
{
  var what_to_copy = $(".item-link input").attr("value");
  console.log(what_to_copy)
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(what_to_copy).select();
  document.execCommand("copy");
  $temp.remove(); 
  
}

//
// This piece of fucking crap splits your weak bs login info taken from our super cool password input and logs you into your pathetic account filled with reptile porn.
//
function artificial_shit()
{
	// Login Menu does not fucking exist when it's not visible, because fuck you. Click it to make it exist. Fuck
	$(".default-white-button.small.dark-border.top-login-button").click();
	
	// Split input data
	$("#login-name").val($("#super_auto_login_input").val().split(",")[0]);
	$("#login-password").val($("#super_auto_login_input").val().split(",")[1]);
	
	// Log our success and celebrate it like NASA engineers celebrate it when their shit works on Mars
	console.log("triggered");
	
	// click the login button to basically login into an account
	$(".big-red-button.height-32.top-dialog-login-button.button.right").click();
}








// ==================================================================
//
// Now, engage t0t@l h@x n0t 4 k1dz
//
// ==================================================================




// So from now on all clicks should be registered inside that document.somefuckingshit
// Create const, think of an offensive name for it n shit...
document.addEventListener('click', event => {
	console.log("click_registered");
	
  // For now, we separate name copier and a link copier, because fuck you. Ill implement a smart copier later.
 // const myElem = event.target.closest('.super_elem');
  /*
  if (myElem) {
    
    if (event.shiftKey)
    {
      console.log("bottom_gear")
    }else{
      if (event.altKey)
        {
          
          console.log("only_alt")
          
        }else{
          
          console.log("else_shifter_default")
        }
      
    }


  }
  */
  
  
  
  
	// For now, we separate name copier and a link copier, because fuck you. Ill implement a smart copier later. Hmmmmmmmm, I have dejavu
	
	const list_item = event.target.closest('.megaListContainer .file');
	if (list_item)
	{
		console.log("click_registered");
		if (event.altKey)
		{
			let what_to_copy = $(this).find(".tranfer-filetype-txt").text();
			console.log(what_to_copy)
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val(what_to_copy).select();
			document.execCommand("copy");
			$temp.remove(); 

		}
		
		
		
		// if alt + right click - copy link
		// if right click
		if (event.contextmenu)
		{
			//if alt
			if (event.altKey)
			{
				
				setTimeout(function(){

					$(".dropdown-section .getlink-item").click()
					setTimeout(function(){
					  
						super_link_c();
						$(".fm-dialog.export-links-dialog.lato.big-radius").addClass("hidden");
					  
					}, 100);


				}, 100);


			}else{
				console.log("pootis")
			}
		}

	}
	// break
	

});





// Apparently, cbt and bdsm exist as separate things, so
document.addEventListener('keypress', event => {
	console.log("yes the key was pressed");
	// For now, we separate name copier and a link copier, because fuck you. Ill implement a smart copier later. Hmmmmmmmm, I have dejavu
	// Define const of an element you want to track (just like FBI tracks you watching porn). Example command below.
	// So yeah, this will detect an Enter keypress on our own input and do the required job.
	// Yes, this is for super manual input (without ctrl + shift + v).
	// No full auto in the building !!!!!!!!!!!!!
	// Oh that's not full auto ???!!!!
	const autologin_input = event.target.closest('#super_auto_login_input');
	// if the keypress or watever event happened on required element, defined in const, then...
	if (autologin_input)
	{
		// Bro, I sure do hope that you've input a properly formed string into our input.
		// Check if the key pressed is Enter
		if(event.which == 13){
			
			// call a sysadmin because he sure knows how to fix a scratch on your finger
			// I mean basically try to login you into your account, using the string from the input. (calls a function defined in the very beginning)
			artificial_shit()
		}

	}
	// break
	
	
	//
	// Alright, now make shit fully automatic: Press ctrl shift v anywhere --> automatically paste this into our input --> split --> fill the login form --> login
	//
	
	// Yes, it's not. THIS is full auto
	// Daymn bro
	if ( event.ctrlKey  &&  event.shiftKey  &&  event.keyCode == 86) {  // case sensitive
		console.log("pls press alt")
		// Make our super input active and magically, shit is being pasted automatically. Noice
		$("#super_auto_login_input").select();
		
		// Now that we have required data in our input - use this data
		setTimeout(function(){ artificial_shit(); }, 30);

	}
	// break


	
	
	// This person wants to coverup the tracks of him uploading 2 petabytes of reptile porn to his account from public PC by pressing Shift + q to log out.
	// Trust me, this won't save yo ass. The fucking malicious lizard from FBI will track you no fucking matter what, stick your Linux laptop right in your ugly ass and make you suck his dick and swallow.

	if ( event.shiftKey  &&  event.keyCode == 81) {  // case sensitive

		// click the logout button, because fuck you, I'm too lazy to open up a menu and click a button by myself
		$(".top-menu-item.top-white-button.logout").click();

	}
	// break
	
	
	
	
	
	
	//
	// This will execute a very hard process of parsing the amount of storage taken by your reptile porn
	//
	
	// listen for shift + f keypress
	if ( event.shiftKey  &&  event.keyCode == 70) {
		
		// just like everything else on this bs website - it does not exist till you click it.
		// click the cloud icon
		$(".bottom-icons .account").click()
		
		// Therefore, this shit takes some time to load as well. So we wait for a bit for it to load.
		// I sure hope that you remember the answer to the question like "but what if low-end PC"...
		setTimeout(function(){
			
			// Congratulations
			console.log("goooood")
			  
			  
				// 4k 360 pornography obviously takes lots of space, so you'll be creating accounts one after another
				// When you create an account and upload something what is less than 1GB - the "storage field" shows you virgin megabytes instead of chad gigabytes. Too bad
				// So, if we detect "MB" in the text field - fix it to GB
				if ($(".dashboard-container .storage .size-txt").text().includes("MB"))
				{
					
					// Grab the "storage taken" value and make it pure number
					var what_to_copy_step1 = $(".dashboard-container .storage .size-txt").text().replace(' MB', '');
					// console.log(what_to_copy_step1)
					
					// now convert MB to GB
					// Yes, this returns some bs with numbers in preiod. 0 fucks given - shit will be rounded when pasted.
					var what_to_copy = (parseFloat(what_to_copy_step1) / 10);
					var $temp = $("<input>");
					$("body").append($temp);
					// Dont forget to add "lf" as it's an api requrement
					$temp.val(what_to_copy + "lf").select();
					document.execCommand("copy");
					$temp.remove(); 
				
				
				// If there's no MB, then there's GB. Simple
				}else{

				  var what_to_copy = $(".dashboard-container .storage .size-txt").text().replace(' GB', 'lf');
				  // console.log(what_to_copy)
				  var $temp = $("<input>");
				  $("body").append($temp);
				  $temp.val(what_to_copy).select();
				  document.execCommand("copy");
				  $temp.remove(); 

				}
			  
		}, 1000);

		// Try to uhhhhhhhhhhh
		// get back to drive ???
		// But this shit doesnt work ??? Fuck
		setTimeout(function(){
		  
		  $(".nw-fm-left-icons-panel .cloud-dirve").click();
		  
		}, 3100);

	}

});





/*
	document.addEventListener ("keydown", function (zEvent) {
		if ( zEvent.ctrlKey  &&  zEvent.shiftKey  &&  zEvent.keyCode == 86) {  // case sensitive
				
		   $("#super_auto_login_input").select();
		   setTimeout(function(){ artificial_shit(); }, 20);
       
				
		}
	});
	
	*/