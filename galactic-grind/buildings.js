building_defs = [];

function createBuilding(id, icon, name, cost, cost_increase, base_production, production_multiplier, tab_icon, tab_icon_hover, menu_id, upgrades, tier) {
   var self = {
		id : id,
		name: name,
		icon: icon,
		cost: cost,
		shown_production: 0,
		cost_increase: cost_increase,
		base_production: base_production,
		starting_production: base_production,
		production_multiplier: production_multiplier,
		starting_multiplier: production_multiplier,
		tab_icon_hover: tab_icon_hover,
		tab_icon: tab_icon,
		menu_id: menu_id,
		upgrades: upgrades,
		tier: tier,
		available: false,
		count: 0,	
		buy: function(){
			if (window.gold >= this.cost * Math.pow(this.cost_increase, this.count) * cost_multiplier) {
			
				window.gold -= this.cost * Math.pow(this.cost_increase, this.count) * cost_multiplier;
				this.count += 1;
				
				this.unlockUpgrades();
				calculateProduction();
				updateBuildingPrice();
				updateBuildingCount();
			}
		},
		buy_multiple: function(count) {
			for (i = 0; i < count; i++) {
				this.buy();
			}
		},
		unlockUpgrades: function(){
			if (this.count >= 10 && this.upgrades[0]) {unlockUpgrade(this.upgrades[0])};
			if (this.count >= 25 && this.upgrades[1]) {unlockUpgrade(this.upgrades[1])};
			if (this.count >= 50 && this.upgrades[2]) {unlockUpgrade(this.upgrades[2])};
			if (this.count >= 75 && this.upgrades[3]) {unlockUpgrade(this.upgrades[3])};
			if (this.count >= 100 && this.upgrades[4]) {unlockUpgrade(this.upgrades[4])};
			if (this.count >= 125 && this.upgrades[5]) {unlockUpgrade(this.upgrades[5])};
		}
  };
  return self;
}

function initBuildings() {
	building_defs.push(createBuilding('ele_gambler', 'images/building_icon_gambler.png', 'Gambler', 100, 1.2, 2, 1, 'images/tab_icon_gambler.png', 'images/tab_icon_gambler_hover.png', 'gambler_menu', [1, 2, 3, 4, 5, 6], 1));
	building_defs.push(createBuilding('ele_cultist', 'images/building_icon_cultist.png', 'Cultist', 100, 1.22, 1.5, 1, 'images/tab_icon_cultist.png', 'images/tab_icon_cultist_hover.png', 'cultist_menu', [11,12,13,14,15,16], 1));
	building_defs.push(createBuilding('ele_research_center', 'images/building_icon_research.png', 'Research', 100, 1.3, 1.5, 1, 'images/tab_icon_research.png', 'images/tab_icon_research_hover.png', 'research_menu', [], 1));
	building_defs.push(createBuilding('ele_stock_exchange', 'images/building_icon_bank.png', 'Stock', 100, 1.2, 4, 1, 'images/tab_icon_bank.png', 'images/tab_icon_bank_hover.png', 'stock_menu', [21,22,23,24,25,26], 1));
	building_defs.push(createBuilding('ele_mine', 'images/building_icon_mine.png', 'Mine', 100, 1.25, 3, 1, 'images/tab_icon_mine.png', 'images/tab_icon_mine_hover.png', 'mine_menu', [31,32,33,34,35,36], 1));
	building_defs.push(createBuilding('ele_factory', 'images/building_icon_factory.png', 'Factory', 100, 1.2, 2, 1, 'images/tab_icon_factory.png', 'images/tab_icon_factory_hover.png', 'factory_menu', [41,42,43,44,45,46], 1));
	building_defs.push(createBuilding('ele_temple', 'images/building_icon_temple.png', 'Temple', 100, 1.2, 2, 1, 'images/tab_icon_temple.png', 'images/tab_icon_temple_hover.png', 'temple_menu', [51,52,53,54,55,56], 1));
	building_defs.push(createBuilding('ele_power_plant', 'images/building_icon_power.png', 'Power', 1e15, 1.2, 15000, 1, 'images/tab_icon_power.png', 'images/tab_icon_power_hover.png', 'power_menu', [155,156,157,158,159,160], 2));
	building_defs.push(createBuilding('ele_sacrifical_shrine', 'images/building_icon_shrine.png', 'Shrine', 1e15, 1.2, 15000, 1, 'images/tab_icon_shrine.png', 'images/tab_icon_shrine_hover.png', 'shrine_menu', [], 2));
	building_defs.push(createBuilding('ele_frozen_wasteland', 'images/building_icon_wasteland.png', 'Wasteland', 1e15, 1.2, 15000, 1, 'images/tab_icon_wasteland.png', 'images/tab_icon_wasteland_hover.png', 'wasteland_menu', [165,166,167,168,169,170], 2));
	building_defs.push(createBuilding('ele_bank', 'images/building_icon_banks.png', 'Bank', 1e15, 1.2, 20000, 1, 'images/tab_icon_banks.png', 'images/tab_icon_banks_hover.png', 'banks_menu', [185,186,187,188,189,190], 2));
	building_defs.push(createBuilding('ele_alien', 'images/building_icon_alien.png', 'Alien', 1e15, 1.2, 12500, 1, 'images/tab_icon_alien.png', 'images/tab_icon_alien_hover.png', 'alien_menu', [191,192,193,194,195,196], 2));
	building_defs.push(createBuilding('ele_propaganda', 'images/building_icon_propaganda.png', 'Propaganda', 1e15, 1.2, 20000, 1, 'images/tab_icon_propaganda.png', 'images/tab_icon_propaganda_hover.png', 'propaganda_menu', [271,272,273,274,275,276], 2));
	building_defs.push(createBuilding('ele_asteroid', 'images/building_icon_asteroid.png', 'Asteroid', 1e29, 1.2, 500000000, 1, 'images/tab_icon_asteroid.png', 'images/tab_icon_asteroid_hover.png', 'asteroid_menu', [277,278,279,280,281,282], 3));
	building_defs.push(createBuilding('ele_click', 'images/building_icon_click.png', 'Click', 1e29, 1.2, 450000000, 1, 'images/tab_icon_click.png', 'images/tab_icon_click_hover.png', 'click_menu', [283,284,285,286,287,288], 3));
	building_defs.push(createBuilding('ele_merchant', 'images/building_icon_merchant.png', 'Merchant', 1e29, 1.2, 450000000, 1, 'images/tab_icon_merchant.png', 'images/tab_icon_merchant_hover.png', 'merchant_menu', [289,290,291,292,293,294], 3));
}
function unlockBuilding(id) {
	if (id <= 6) {
		if (window.gold >= blueprint_cost) {
			building_defs[id].available = true;
			building_defs[id].count += 1;
			htmlBuilding(id);
			closeMenu();
			window.gold -= blueprint_cost;
			hideTooltip();
		}
	}
	else if (id <= 12) {
		if (window.gold >= blueprint_cost_tier_2) {
			building_defs[id].available = true;
			building_defs[id].count += 1;
			htmlBuilding(id);
			closeMenu();
			window.gold -= blueprint_cost_tier_2;
			hideTooltip();
		}	
	}
	else {
		if (window.gold >= blueprint_cost_tier_3) {
			building_defs[id].available = true;
			building_defs[id].count += 1;
			htmlBuilding(id);
			closeMenu();
			window.gold -= blueprint_cost_tier_3;
			hideTooltip();
		}	
	}
}

function htmlBuilding(id) {
	var building = building_defs[id];
	
	var building_element = $("<div></div>");
	building_element.attr("id", building.id);
	building_element.attr("class", "building");
	building_element.attr("style", "background-image: url('images/misc_building_button.png');cursor:pointer;");
	building_element.attr("onclick", "building_defs["+id+"].buy_multiple(buy_count)");
	
	var building_icon = $("<img></img>");
	building_icon.attr("class", "building_icon");
	building_icon.attr("src", building.icon);
	
	var building_title = $("<div></div>");
	building_title.attr("class", "building_title");
	building_title.html(building.name);
	
	var building_price = $("<div></div>");
	building_price.attr("class", "building_price");
	building_price.html(building.cost);
	
	var building_count = $("<div></div>");
	building_count.attr("class", "building_count");
	building_count.html(building.count);
	
	building_element.append(building_icon);
	building_element.append(building_title);
	building_element.append(building_price);
	building_element.append(building_count);
	
	var tab_element = $("<div></div>");
	tab_element.attr("class", "tab_icon");
	tab_element.attr("id", "tab_"+building.name);
	tab_element.attr("style", "top:4px;");
	tab_element.attr("onclick", "toggleBuildingMenu(event, '"+building.menu_id+"');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$(this).addClass('selected_tab');}");
	
	var tab_icon = $("<img></img>");
	tab_icon.attr("src", building.tab_icon);
	tab_icon.attr("height", "60px");
	tab_icon.attr("width", "60px");
	tab_icon.attr("onmousedown", "this.src='"+building.tab_icon_hover+"'")
	tab_icon.attr("onmouseup", "this.src='"+building.tab_icon+"';")
	tab_icon.attr("onmouseout", "this.src='"+building.tab_icon+"'")

	
	tab_element.append(tab_icon);
	$(building_element).append(tab_element);
	
	if (building.tier == 1) {$("#tier_1").append(building_element);}
	if (building.tier == 2) {$("#tier_2").append(building_element);}
	if (building.tier == 3) {$("#tier_3").append(building_element);}

	
	if (building.tier == 1) {blueprints_bought++;}
	else if (building.tier == 2){blueprints_bought_tier_2++;}
	else if (building.tier == 3){blueprints_bought_tier_3++;}
	
	if (blueprints_bought >= 7) {
		$("#ele_new").hide();
		$("#blueprint_upgrade").hide();
	}	
	if (blueprints_bought_tier_2 >= 6) {
		$("#ele_new_tier_2").hide();
	}
}
function updateBuildingCount() {
	for (var i = 0; i < building_defs.length; i++) {
		building = building_defs[i];
		
		$("#"+building.id).find(".building_count").html(building.count);
	}
}
function updateBuildingPrice() {

	for (var i = 0; i < building_defs.length; i++) {
		building = building_defs[i];
		//$("#"+building.id).find(".building_price").html(fancyNumber(cost_multiplier * building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)));
		
		if (building.tier == 1) {
			var total_cost = 100 * ((Math.pow(building.cost_increase, building.count)*(Math.pow(building.cost_increase, window.buy_count)-1))/(building.cost_increase-1));
			$("#"+building.id).find(".building_price").html(fancyNumber(cost_multiplier * total_cost));
			
			if (window.gold < total_cost * cost_multiplier) {
				$("#"+building.id).find(".building_price").css('color', '#e02900');
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #ff451c');
			}
			else {
				$("#"+building.id).find(".building_price").css('color', '#085415');	
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #32b54a');	
			}
		} else if (building.tier == 2) {
			var total_cost = 1e15 * ((Math.pow(building.cost_increase, building.count)*(Math.pow(building.cost_increase, window.buy_count)-1))/(building.cost_increase-1));
			$("#"+building.id).find(".building_price").html(fancyNumber(cost_multiplier * total_cost));
			
			if (window.gold < total_cost * cost_multiplier) {
				$("#"+building.id).find(".building_price").css('color', '#e02900');
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #ff451c');
			}
			else {
				$("#"+building.id).find(".building_price").css('color', '#085415');	
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #32b54a');	
			}
		} else if (building.tier == 3) {
			var total_cost = 1e29 * ((Math.pow(building.cost_increase, building.count)*(Math.pow(building.cost_increase, window.buy_count)-1))/(building.cost_increase-1));
			$("#"+building.id).find(".building_price").html(fancyNumber(cost_multiplier * total_cost));
			
			if (window.gold < total_cost * cost_multiplier) {
				$("#"+building.id).find(".building_price").css('color', '#e02900');
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #ff451c');
			}
			else {
				$("#"+building.id).find(".building_price").css('color', '#085415');	
				$("#"+building.id).find(".building_price").css('text-shadow', '0px 0px 8px #32b54a');	
			}
		}
	}	
}


function updateAugments() {
	var automation_string = "";
	
	automation_string += "<span style=\\'text-shadow:none;\\'>Unlocks the ability to automate simple tasks.<br>Requires:<br><span style=\\'color:green\\'>5 Billion </span>"
	if (gold < 5000000000) {automation_string += "<span style=\\'color:red\\'>X</span>"} else {automation_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	automation_string += "<br><span style=\\'color:purple\\'>10 Research Points </span>"
	if (special.research.research_points < 10) {automation_string += "<span style=\\'color:red\\'>X</span>"} else {automation_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	automation_string += "<br><span style=\\'color:gold\\'>10 Gold </span>"
	if (special.mine.gold < 10) {automation_string += "<span style=\\'color:red\\'>X</span>"} else {automation_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	automation_string += "<br><span style=\\'color:grey\\'>95 Factories </span>"
	if (building_defs[5].count < 95) {automation_string += "<span style=\\'color:red\\'>X</span>"} else {automation_string += "<span style=\\'color:green\\'>&#10004;</span></span>"}	
	
	$("#automation_upgrade").attr('onmouseover', "showTooltip(this.id, 'url(\\'images/upgrade_sheet.png\\') -288px 0', 'Automation', '"+automation_string+"')");
	
	
	var temporal_string = "";
	
	temporal_string += "<span style=\\'text-shadow:none;\\'>Unlocks the ability to change the passage of time.<br>Requires:<br><span style=\\'color:green\\'>10 Billion </span>"
	if (gold < 10000000000) {temporal_string += "<span style=\\'color:red\\'>X</span>"} else {temporal_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	temporal_string += "<br><span style=\\'color:purple\\'>10 Research Points </span>"
	if (special.research.research_points < 10) {temporal_string += "<span style=\\'color:red\\'>X</span>"} else {temporal_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	temporal_string += "<br><span style=\\'color:red\\'>90 Cultists </span>"
	if (building_defs[1].count < 90) {temporal_string += "<span style=\\'color:red\\'>X</span>"} else {temporal_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	temporal_string += "<br><span style=\\'color:#5b432c\\'>95 Temples </span>"
	if (building_defs[6].count < 95) {temporal_string += "<span style=\\'color:red\\'>X</span>"} else {temporal_string += "<span style=\\'color:green\\'>&#10004;</span></span>"}	
	
	$("#temporal_upgrade").attr('onmouseover', "showTooltip(this.id, 'url(\\'images/upgrade_sheet.png\\') -336px 0', 'Temporal Mastery', '"+temporal_string+"')");
	
	var trade_string = "";
	
	trade_string += "<span style=\\'text-shadow:none;\\'>Allows you to exchange building currencies for different goods.<br>Requires:<br><span style=\\'color:green\\'>15 Billion </span>"
	if (gold < 15000000000) {trade_string += "<span style=\\'color:red\\'>X</span>"} else {trade_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	trade_string += "<br><span style=\\'color:red\\'>90 Cultists </span>"
	if (building_defs[1].count < 90) {trade_string += "<span style=\\'color:red\\'>X</span>"} else {trade_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	trade_string += "<br><span style=\\'color:brown\\'>95 Gamblers </span>"
	if (building_defs[0].count < 95) {trade_string += "<span style=\\'color:red\\'>X</span>"} else {trade_string += "<span style=\\'color:green\\'>&#10004;</span>"}
	trade_string += "<br><span style=\\'color:green\\'>95 Stock Exchanges </span>"
	if (building_defs[3].count < 95) {trade_string += "<span style=\\'color:red\\'>X</span>"} else {trade_string += "<span style=\\'color:green\\'>&#10004;</span></span>"}	
	
	$("#trade_upgrade").attr('onmouseover', "showTooltip(this.id, 'url(\\'images/upgrade_sheet.png\\') -384px 0', 'Trading Post', '"+trade_string+"')");

}
function unlockAutomation() {
	if (gold >= 5000000000 && special.research.research_points >= 10 && special.mine.gold >= 10 && building_defs[5].count >= 95) {
		special.automation.unlocked = true;
		gold -= 5000000000;
		special.research.research_points -= 10;
		special.mine.gold -= 10;
		$("#automation_upgrade").hide();
		$("#automation_menu").show();
	}
}
function unlockTemporal() {
	if (gold >= 10000000000 && special.research.research_points >= 10 && building_defs[1].count >= 90 && building_defs[6].count >= 95) {
		special.temporal.unlocked = true;	
		gold -= 10000000000;
		special.research.research_points -= 10;		
		$("#temporal_upgrade").hide();
		$("#temporal_menu").show();
	}
}
function unlockTrade() {
	if (gold >= 15000000000 && building_defs[1].count >= 90 && building_defs[0].count >= 95 && building_defs[3].count >= 95) {
		special.trade.unlocked = true;	
		gold -= 15000000000;
		$("#trade_upgrade").hide();
		$("#trade_menu").show();
		$(".building_trade").show();
	}
}


/*
if (special.temporal.tasks >= 1 && !special.temporal.bottle) {
	special.temporal.bottle = true;
	special.temporal.tasks -= 1;
	$(this).attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');
	updateTemporal();
}
else if (pecial.temporal.bottle) {
	special.temporal.bottle = false;
	special.temporal.tasks += 1;
	$(this).attr('style', 'box-shadow: 0px 0px 20px rgb(255, 0, 0);');
	updateTemporal();
}
*/
function setAutoclick(direction) {

	if (special.automation.tasks - direction >= 0 && special.automation.autoclicks + direction >= 0) {
		special.automation.autoclicks += direction;
		special.automation.tasks -= direction;
	}
	
	$('#autoclick_count').html(special.automation.autoclicks);
	$('#automation_count').html(special.automation.tasks);
}
function toggleAutobuy(id, building) {
	if (special.automation[building] == true) {
		special.automation[building] = false;
		special.automation.tasks += 1;
		var new_src = $("#"+id).attr('data-off')
		$("#"+id).attr('src', new_src)
	}
	else if (special.automation[building] == false && special.automation.tasks >= 1) {
		special.automation[building] = true;
		special.automation.tasks -= 1;
		var new_src = $("#"+id).attr('data-on')
		$("#"+id).attr('src', new_src)
	}	
	$('#automation_count').html(special.automation.tasks);	
	//$("#"+id).attr('src')

}
function autobuy() {
	var automation = special.automation; 
	if (building_defs[0].available && automation.gambler && window.gold >= building_defs[0].cost * Math.pow(building_defs[0].cost_increase, building_defs[0].count) * cost_multiplier) {
		building_defs[0].buy();
	}
	if (building_defs[1].available && automation.cultist && window.gold >= building_defs[1].cost * Math.pow(building_defs[1].cost_increase, building_defs[1].count) * cost_multiplier) {
		building_defs[1].buy();
	}
	if (building_defs[2].available && automation.research && window.gold >= building_defs[2].cost * Math.pow(building_defs[2].cost_increase, building_defs[2].count) *cost_multiplier) {
		building_defs[2].buy();
	}
	if (building_defs[3].available && automation.stock && window.gold >= building_defs[3].cost * Math.pow(building_defs[3].cost_increase, building_defs[3].count) * cost_multiplier) {
		building_defs[3].buy();
	}
	if (building_defs[4].available && automation.mine && window.gold >= building_defs[4].cost * Math.pow(building_defs[4].cost_increase, building_defs[4].count) * cost_multiplier) {
		building_defs[4].buy();
	}
	if (building_defs[5].available && automation.factory && window.gold >= building_defs[5].cost * Math.pow(building_defs[5].cost_increase, building_defs[5].count) * cost_multiplier) {
		building_defs[5].buy();
	}
	if (building_defs[6].available && automation.temple && window.gold >= building_defs[6].cost * Math.pow(building_defs[6].cost_increase, building_defs[6].count) * cost_multiplier) {
		building_defs[6].buy();
	}
}
function toggleAutoupgrade(direction) {
	if (direction == 1 && special.automation.tasks >= 1) {
		$("#autoupgrade_on").attr('style', 'color:green');
		$("#autoupgrade_off").attr('style', 'color:white');
		if (!special.automation.autoupgrade) {special.automation.tasks -= 1;}
		special.automation.autoupgrade = true;
		$('#automation_count').html(special.automation.tasks);	
	}
	else if (direction == 0 && special.automation.autoupgrade == true) {
		special.automation.tasks += 1;
		special.automation.autoupgrade = false;
		$("#autoupgrade_off").attr('style', 'color:green');
		$("#autoupgrade_on").attr('style', 'color:white');
		$('#automation_count').html(special.automation.tasks);	
	}
}
function updateTemporal() {
	$("#temporal_count").html(special.temporal.tasks);
}