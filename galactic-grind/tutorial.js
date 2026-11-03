function updateTutorial() {
		switch (tutorial_progress) {
			case 0: 
				$("#clicker").addClass('highlight');
				$("#tutorial_text").html('To begin click on the globe to obtain cash (5 times).');
				if (gold >= 100) {tutorial_progress = 6;}
				if (gold >= 5) {tutorial_progress = 1}
				break;
			case 1:
				$("#clicker").removeClass('highlight');
				$("#rightContent").addClass('highlight');
				$("#tutorial_text").html('Click build new to choose a building to unlock, which will slowly produce cash.');
				if ($("#blueprint_menu").is(":visible")) {tutorial_progress = 2}				
				break;
			case 2:
				$("#rightContent").removeClass('highlight');
				$("#blueprint_menu").addClass('highlight');
				$("#tutorial_text").html('Select one');
				if (stats.building_count >= 1) {tutorial_progress = 3;menu_type = 0}
				break;
			case 3:
				$("#tutorial_menu").show();
				$("#blueprint_menu").removeClass('highlight');
				$("#rightContent").addClass('highlight');
				$("#tutorial_text").html('Each building has a unique aspect which can be accessed through the black and white icon beside the building. Open it.');
				if ($(".building_menu").is(":visible")) {tutorial_progress = 4};
				break;
			case 4:
				$("#centerContent").addClass('highlight');
				$("#tutorial_text").html("Inside each building's menu is a description of the building, statistics for that building, and for most buildings some form of interactivity. Close the menu by clicking the black and white icon again.");
				if (!$(".building_menu").is(":visible")) {tutorial_progress = 5};
				break;
			case 5:
				$("#centerContent").removeClass('highlight');
				$("#rightContent").removeClass('highlight');
				$("#ele_mouse_1").addClass('highlight');
				$("#tutorial_text").html("Countless upgrades that improve various aspects of production can be found in the upgrades menu. Buy the upgrade Improved Clicking.");
				if (upgrade_defs[0].bought) {tutorial_progress = 6}
				break;
			case 6:
				$("#tutorial_text").html("The goal of Galactic Grind is to get your production to the largest highest possible. This tutorial is now over, click the X button or the globe to begin exploring.")
				$("#ele_mouse_1").removeClass('highlight');
				$("#clicker").addClass('highlight');				
				//$("#shader").hide();
				//$("#tutorial_menu").hide();
				break;
			case 8:
				$("#clicker").removeClass('highlight');
				$("#rightContent").removeClass('highlight');
				$("#centerContent").removeClass('highlight');
				$("#ele_mouse_1").removeClass('highlight');
				$("#blueprint_menu").removeClass('highlight');
				$("#shader").hide();
				$("#tutorial_menu").hide();
				tutorial_progress = 101;
				break;
		}
}