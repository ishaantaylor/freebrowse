var activated = true;

/* query helper function */
var query = function(query_info, callback) {
	chrome.tabs.query(query_info, callback);
};


// main functions
function tab_switch(direction) {
	var window_size;
	query( 
		{
			currentWindow:true
		},
		function (all_tabs) {
			window_size = all_tabs.length;
			query(
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
	query(
		{
			highlighted:true
		},
		function (highlighted_tabs) {
			var tabs_to_remove = [];
			for (var i = 0; i < highlighted_tabs.length; i++) {
				tabs_to_remove.push(highlighted_tabs[i].id);
			}
			chrome.tabs.remove(tabs_to_remove);		// TODO: implement for all tabs (create array of tab ids, or just pass array of tabs)
		}
	)
}


function toggle_activation() {
	activated = !activated;
}


chrome.commands.onCommand.addListener( function(command) {
  switch(command) {
  	case "switch_right":
  		if (activated) tab_switch(1);
  		break;

  	case "switch_left":
  		if (activated) tab_switch(-1);
  		break;

  	case "close_tab":
  		if (activated) close_tab();
  		break;

  	case "toggle_activation":
  		toggle_activation();
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