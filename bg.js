//bg.js

// implement and translate the commands 

//switch highlighted tabs commands (on branch switch)

//move highlighted group right or left commands (on branch move)


/* query helper function- reduce clutter */
var qwery = function(query_info, callback) {
	chrome.tabs.query(query_info, callback);
};

var number_of_tabs_per_window = [];
var update_windows = function(number_of_tabs_per_window, index_of_modified_window) {

}; // TODO: implement / decide if this is neccesary 

// functions
/* MOVE, SWTICH, HIGHLIGHT */
function tab_switch(direction) {
	var window_size;
	chrome.tabs.query( 
		{
			currentWindow:true
		},
		function(all_tabs) {
			window_size = all_tabs.length;
			chrome.tabs.query(
				{
					highlighted:true
				},
				function (tabs) {
					// initialize indices
					var index = tabs[0].index;
					var next_index = index;
					
					// initialize bounds
					var leftbound = 0;
					var rightbound = window_size-1;

					// pick new index
					if (direction > 0) {			// right
						if (index + direction > rightbound)	
							next_index = leftbound;
						else 
							next_index = index + direction;

					} else if (direction < 0) {		// left
						if (index + direction < leftbound)
							next_index = rightbound;
						else
							next_index = index + direction;
					}
					
					// highlight new tab
					try {
						chrome.tabs.highlight({tabs:next_index}, function(window) {});
					} catch (e) {
						console.log(e);
					}
				}
			);
		}
	);
}


function close_tab() {
	chrome.tabs.query(
		{
			highlighted:true
		},
		function (tabs) {
			
		}
}

chrome.commands.onCommand.addListener( function(command) {
  console.log('onCommand event received for message: ', command);
  switch(command) {
  	case "switch_right":
  		tab_switch(1);
  		break;

  	case "switch_left":
  		tab_switch(-1);
  		break;

  	case "close_tab":
  		close_tab();
  		break;

  }
});


/** Disappointment 
/*
		"move_tabs_right": {
			"suggested_key": { "default": "Ctrl+Shift+Right" },
      		"description": "Move highlighted tabs to the right"
		},
		"move_tabs_left": {
			"suggested_key": { "default": "Ctrl+Shift+Left" },
      		"description": "Move highlighted tabs to the left"
		},
		"highlight_right": {
			"suggested_key": { "default": "Alt+Shift+Left" },
      		"description": "Increase range of highlighted tabs to the right"
		},
		"highlight_left": {
			"suggested_key": { "default": "Alt+Shift+Left" },
      		"description": "Increase range of highlighted tabs to the left"
		},
*/
/*
  	case "move_tabs_right":

		break;
  	case "move_tabs_left":

  		break;
  	case "highlight_right":

  		break;
  	case "highlight_left":

  		break;
*/