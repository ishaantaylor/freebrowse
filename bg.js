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
function swah(r_o_l) {
	var window_size = chrome.windows.getCurrent( function(window) {
		return window.tabs.length;
	});

	if (r_o_l == "right") {
		var next_index = chrome.tabs.getCurrent( function(tab) {
			if ((tab.index + 1) == window_size)	return 0;
			else return tab.index + 1;
		});
	} else { 	// r_o_l == "left"
		var next_index = chrome.tabs.getCurrent( function(tab) {
			if ((tab.index - 1) == 0)	return window_size-1;
			else return tab.index - 1;
		});		
	}
	
	var next_tab = chrome.tabs.query({
		currentWindow:true,
		index:next_index
	}, function(query_result){
		return query_result;
	});
	
	chrome.tabs.update(next_tab.tabid, {active:true});
}

chrome.commands.onCommand.addListener( function(command) {
  console.log('onCommand event received for message: ', command);
  switch(command) {
  	case "switch_right":
  		swah("right");
  		break;
  	case "switch_left":
  		swah("left");
  		break;

  	case "close_tab":

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