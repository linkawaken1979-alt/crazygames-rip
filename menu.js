function closeMenu() {
	$('.menu').each(function(){
		$(this).hide();
	});
	
	menu_type = 0;
}
function closeBuildingMenu() {
	$('.building_menu').each(function(){
		$(this).hide();
	});
	menu_type = 0;
}

function toggleBuildingMenu(e, id) {
	e.stopPropagation();
	
	if (!$("#" + id).is(":visible")) {
		closeBuildingMenu();
		$("#" + id).show();
		menu_type = -1;
	}
	else {
		closeBuildingMenu();
	}
}

function openMenu(menu, menu_id) {
	$(menu).show();
	
	menu_type = menu_id;

		for (var i = 0; i < building_defs.length; i++) {
			if (building_defs[i].available) {
				var name = building_defs[i].name.toLowerCase();
				$("#option_"+name).hide();
			}
		}
	/*
	if (menu_id == 1) {
		for (var i = 0; i < 7; i++) {
			if (building_defs[i].available) {
				var name = building_defs[i].name.toLowerCase();
				$("#option_"+name).hide();
			}
		}
	}
	if (menu_id == 2) {
		for (var i = 7; i < building_defs.length; i++) {
			if (building_defs[i].available) {
				var name = building_defs[i].name.toLowerCase();
				$("#option_"+name).hide();
			}
		}
	}
	*/
}

function drawUpdateClicks(dt) {
	$("#click_value_container").empty();

	for (var i = 0; i < click_array.length; i++) {
			click_array[i][5] -= dt/4;
			click_array[i][0] += click_array[i][2] * dt;
			click_array[i][1] += click_array[i][3] * dt;
			
			var click_element = $("<div></div>");
			click_element.html(fancyNumber(click_array[i][4]));
			click_element.attr('style', 'text-align:center;position:absolute;left:'+(click_array[i][0])+'px;top:'+click_array[i][1]+'px;opacity:'+click_array[i][5]+';');
			
			$('#click_value_container').append(click_element);
			
			if (click_array[i][5] <= 0) {click_array.splice(i, 1);}
	}
}