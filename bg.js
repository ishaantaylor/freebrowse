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
function switch(r_o_l) {
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
	var next_tab = qwery({
		currentWindow:true,
		index:next_index
	});
	next_tab.active = true;
}

chrome.commands.onCommand.addListener( function(command) {
  console.log('onCommand event received for message: ', command);
  switch(command) {
  	case "switch_right":
  		switch("right");
  		break;
  	case "switch_left":
  		switch("left");
  		break;
  	case "move_tabs_right":

		break;
  	case "move_tabs_left":

  		break;
  	case "highlight_right":

  		break;
  	case "highlight_left":

  		break;
  	case "close_tab":

  		break;

  }
});