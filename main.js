function init() {
	gold = 0;
	click_array = [];
	buy_count = 1;
	production = 0;
	game_speed = 1;
	clock_ticks = 0;
	total_production_multiplier = 1; 
	buffless_multiplier = 1;
	blueprint_multiplier = 100;
	blueprints_bought = 0;
	blueprints_bought_tier_2 = 0;
	blueprints_bought_tier_3 = 0;
	click_production_base = 1;
	click_production_multiplier = 0;
	total_building_production = 0;
	click_multiplier = 1;
	cost_multiplier = 1;
	autoclicks = 0;
	autoclick_time = 0;
	real_autoclick_time = 0;
	real_autoclicks = 2;
	menu_type = 0;
	graph_time = 60;
	star_count = 0;
	save_time = 0;
	save_max_time = 30;
	world_time = 0;
	background_color = 0;
	bloody_count = 0;
	powersaver = false;
	upgrade_category = 0;
	bloody_timing_count = 0;
	shown_tier = 1;
	tutorial_progress = 0;
	wipe_save = false;
	confirm_wipe = false;
	autoclick_on = false;
	monospace = false;
	place_autoclick = false;
	drop_in_progress = false;
	
	buff_tooltip_show = false;
	buff_tooltip = "";
	
	stats = {
		total_clicks:0,
		total_real_clicks: 0,
		total_gambles:0,
		total_buildings:0,
		total_time:0,
		total_real_time:0,
	}
	initBuildings();
	initUpgrades();
	initBuffs();
	initSpecials();

	load();
	if (tutorial_progress<=50) {$('#shader').show();}

	shrineResetUpdate()	
	//shows or hides automation menu / temporal menu.
	if (special.automation.unlocked) {
		$("#automation_upgrade").hide();
		$("#automation_menu").show();
	}
	else {
		$("#automation_upgrade").hide();
		$("#automation_menu").hide();	
	}
	if (special.temporal.unlocked) {
		$("#temporal_upgrade").hide();
		$("#temporal_menu").show();
	}
	else {
		$("#temporal_upgrade").hide();
		$("#temporal_menu").hide();	
	}
	if (special.trade.unlocked) {
		$("#trade_upgrade").hide();
		$("#trade_menu").show();
		$(".building_trade").show();
	}
	else {
		$("#trade_upgrade").hide();
		$("#trade_menu").hide();
		$(".building_trade").hide();
	}
	
	if (blueprints_bought >= 7) {
		$("#ele_new").hide();
		$("#blueprint_upgrade").hide();
	}
	if (blueprints_bought_tier_2 >= 6) {
		$("#ele_new_tier_2").hide();
	}
	
	if (special.shrine.reset_count < 1) {
		$("#sacrifice_reset_menu").hide();
	}
	
	if (tutorial_progress >= 100) {
		$("#shader").hide();
		$("#tutorial_menu").hide();
	}
	
	fastTick();
	slowTick();
	updateUpgradeTick();
}

var lastUpdate = Date.now();
function fastTick() {
	var now = Date.now();
    var dt = (now - lastUpdate)/1000 * game_speed;
	var rt = (now - lastUpdate)/1000;
	if (building_defs[8].count >= 1) {updateShrine(dt/game_speed)};
	if (special.temple.current_worship == 3) {dt *= 1 + special.temple.time_favor * 0.001}
	if (buff_defs[11].active) {dt /= 150}
	if (upgrade_defs[203].bought) {dt *= 1.05}
	if (upgrade_defs[230].bought) {dt *= 1.05}
	if (upgrade_defs[298].bought) {dt *= 1.04}
	if (special.shrine.reset_count >= 3) {dt *= 1 + special.shrine.reset_count * 0.01}
	if (special.temporal.bottle && buff_defs[26].active) {buff_defs[26].time -= 0.75 *dt}
	//Time Modifiers
	if (special.temporal.bottle) {clock_ticks += (now - lastUpdate)/750;dt = 0;}
	if (special.temporal.endless) {clock_ticks += dt/game_speed * 0.2}
	if (special.temporal.profits) {dt /= 1.1}

	
	//Ticks the clock ticks
	clockTicks(dt);
	
	autoclickTicks(dt, rt);
	drawUpdateClicks(dt);
	tickGraph(dt);
	
	tickSave(rt);
	
	
	if (tutorial_progress < 100) {updateTutorial();}
	updateBuffTooltip();
	updateTrade(dt);
	rotateWorld(dt);
	//Ticks all the special building stuff
	gamblerTick(dt);
	cultistTick(dt);
	if (building_defs[4].count >= 1) {mineTick(dt)};
	if (building_defs[3].count >= 1) {stockTick(dt)};
	if (building_defs[5].count >= 1) {factoryTick(dt)};
	if (building_defs[6].count >= 1) {templeTick(dt)};
	if (building_defs[2].count >= 1) {researchTick(dt)};
	if (building_defs[7].count >= 1) {powerTick(dt)};
	if (building_defs[8].count >= 1) {shrineTick(dt);};
	if (building_defs[9].count >= 1) {wastelandTick(dt, rt);};
	if (building_defs[10].count >= 1) {bankTick(dt);};
	if (building_defs[11].count >= 1) {alienTick(dt, rt);};
	if (building_defs[12].count >= 1) {propagandaTick(dt);};
	if (building_defs[13].count >= 1) {asteroidTick(dt);};
	if (building_defs[14].count >= 1) {clickTick(dt);};
	if (building_defs[15].count >= 1) {merchantTick(dt, rt);};
	blackholeTick();
	
	//Fades out text
	var opac = $("#popup_text").css("opacity")
	$("#popup_text").css("opacity", opac-0.35*dt/game_speed);  
	
	if (opac <= 0) {$("#popup_text").hide();}
	
	var opac = $("#click_value").css("opacity")
	$("#click_value").css("opacity", opac-0.35*dt/game_speed - 0.006);  
	
	if (opac <= 0) {$("#click_value").hide();}
	//Ticks all the buffs
	for (var i = 0; i < buff_defs.length; i++) {
			buff_defs[i].update(dt);
	}
	//Calculates Blueprint Cost
	blueprint_cost = Math.pow(blueprint_multiplier, blueprints_bought * 1.18);
	blueprint_cost_tier_2 = Math.pow(blueprint_multiplier, blueprints_bought_tier_2 * 1.15) * 1e15;
	blueprint_cost_tier_3 = Math.pow(blueprint_multiplier, blueprints_bought_tier_3 * 1.15) * 1e29;
	//Updates gold
	updateGold();
	//Collects all the money based on production
	collect(dt);
	//Continues the Loop
	if (!powersaver) {setTimeout(function(){fastTick();}, 0);}
	else {setTimeout(function(){fastTick();}, 300);}

	$(".gold_count").html("Gold "+special.mine.gold+" ");
	
	stats.total_time += dt;
	stats.total_real_time += (now - lastUpdate)/1000;

    lastUpdate = now;	
}

function slowTick() {

	updateBuildingCount();
	updateBuildingPrice();
	calculateProduction();
	updateBoughtUpgrades();
	updateAutoclicks();
	//updateUpgrades();
	unlockUpgrades();
	updateBuffs();
	updateRawStats();
	updateStars();
	updateAugments();
	autobuy();
	autoUpgrade();
	$("#blueprint_building_price").html(fancyNumber(blueprint_cost));
	$("#blueprint_building_price_tier_2").html(fancyNumber(blueprint_cost_tier_2));
	$("#blueprint_building_price_tier_3").html(fancyNumber(blueprint_cost_tier_3));
	if (gold <= blueprint_cost) {
		$("#blueprint_building_price").css('color', '#e02900');
		$("#blueprint_building_price").css('text-shadow', '0px 0px 8px #ff451c');
	} else {
		$("#blueprint_building_price").css('color', '#085415');	
		$("#blueprint_building_price").css('text-shadow', '0px 0px 8px #32b54a');		
	}
	if (gold <= blueprint_cost_tier_2) {
		$("#blueprint_building_price_tier_2").css('color', '#e02900');
		$("#blueprint_building_price_tier_2").css('text-shadow', '0px 0px 8px #ff451c');
	} else {
		$("#blueprint_building_price_tier_2").css('color', '#085415');	
		$("#blueprint_building_price_tier_2").css('text-shadow', '0px 0px 8px #32b54a');		
	}
	if (gold <= blueprint_cost_tier_3) {
		$("#blueprint_building_price_tier_3").css('color', '#e02900');
		$("#blueprint_building_price_tier_3").css('text-shadow', '0px 0px 8px #ff451c');
	} else {
		$("#blueprint_building_price_tier_3").css('color', '#085415');	
		$("#blueprint_building_price_tier_3").css('text-shadow', '0px 0px 8px #32b54a');		
	}
	
	if (building_defs[14].count >= 1) {
		$("#button_click_farm").show();
	} else {
		$("#button_click_farm").hide();
	}
	//save();
	
	
	if (gold >= 5000000000 * Math.pow(1000, special.automation.max_tasks)) {
		special.automation.max_tasks += 1;
		special.automation.tasks += 1;
		$('#automation_count').html(special.automation.tasks);
	}
	
	if (gold >= 1000000 && !special.automation.unlocked) {
		$("#automation_upgrade").show();
	}
	if (gold >= 5000000 && !special.temporal.unlocked) {
		$("#temporal_upgrade").show();
	}
	if (gold >= 15000000 && !special.trade.unlocked) {
		$("#trade_upgrade").show();
	}	
	
	if (buff_defs[0].time >= 300) {buff_defs[0].time = 300}
	if (buff_defs[1].time >= 300) {buff_defs[1].time = 300}
	
	setTimeout(function(){slowTick();}, 500);
}
function updateUpgradeTick() {
	updateUpgrades();
	setTimeout(function(){updateUpgradeTick();}, 1500);	
}
function rotateWorld(dt) {
	if (!powersaver) {
		world_time += dt / (game_speed)	* 10 * (1 + (game_speed / 3));
		$("#world_continents").attr("style", "border-radius:64px;position:absolute;height:128px;width:128px;background:url(images/world_continents.png) "+world_time+"px 0px;transform: rotate(-10deg);transform-origin: center;")
		$("#world_atmosphere").attr("style", "border-radius:64px;position:absolute;height:128px;width:128px;background:url(images/world_atmosphere.png) "+world_time/1.4+"px 0px;transform: rotate(-10deg);transform-origin: center;")
	}
}

function toggleRealAutoclicks() {
	autoclick_on = !autoclick_on;
	
	if (autoclick_on) {$('#button_autoclick').attr('src', 'images/button_autoclick_2.png')}
	else {$('#button_autoclick').attr('src', 'images/button_autoclick_1.png')}
}
function autoclickTicks(dt, rt) {
	//real_autoclicks += 2*rt;
	autoclick_time += dt;
	if (autoclick_on) {real_autoclick_time +=rt;}
	if (autoclicks != 0 && autoclick_time >= 1/autoclicks) {
		autoclick_time -= 1/autoclicks;
		handleClick();
	}
	else if (autoclicks == 0) {
		autoclick_time = 0;
	}

	if (real_autoclicks != 0 && real_autoclick_time >= 1/real_autoclicks) {
		real_autoclick_time -= 1/real_autoclicks;
		handleClick(true);
	}
	else if (real_autoclicks == 0) {
		real_autoclick_time = 0;
	}
}


function clockTicks(dt) {
	clock_ticks -= dt - (dt/game_speed);
	$("#tick_count").html(Math.floor(clock_ticks));
	$("#speed_count").html(game_speed + "x");
	//$();
	
	if (clock_ticks <= 0) {game_speed = 1; clock_ticks = 0;}
}
function changeSpeed() {
	if (game_speed == 1) {game_speed = 2}
	else if (game_speed == 2) {game_speed = 5}
	else if (game_speed == 5) {game_speed = 10}
	else if (game_speed == 10 && special.factory.time_level == 0 && !upgrade_defs[60].bought && !special.shrine.reset_count>=2) {game_speed = 1}
	else if (game_speed == 10) {game_speed = 10 + special.factory.time_level + upgrade_defs[60].bought + Math.max(special.shrine.reset_count - 1, 0); if (game_speed == 10) {game_speed = 1}}
	else {game_speed = 1}
	
	if (clock_ticks <= 0) {game_speed = 1;}
}


function updateGold() {
	$("#gold_display").html(fancyNumber(window.gold))
}
function updateProductionDisplay() {
	$("#production_display").html(fancyNumber(window.production)+ " p/s")
}

//$(document).ready(setTimeout(function(){init()}, 500));

function updateAutoclicks() {
	$("#autoclick_container").empty();
	
	for (var i = 0; i<special.click.current_autoclicks.length; i++) {
		var autoclick_element = $('<img>');
		var left = special.click.current_autoclicks[i][0];
		var top = special.click.current_autoclicks[i][1];
		
		if (document.createElement("detect").style.zoom === "" && ($( window ).width() <= 1000 || $( window ).height() <= 550)) {
			left *= 1.34;
			top *= 1.34;
		}
		
		
		autoclick_element.attr('style', 'left:'+left+'px;top:'+top+'px;position:absolute');
		autoclick_element.attr('src', 'images/button_autoclick_1.png');
		
		$('#autoclick_container').append(autoclick_element);
	}
}
function removeAutoclicks(event) {
	special.click.current_autoclicks = [];updateAutoclicks();event.preventDefault();
}
function placeAutoclicks() {
	if (special.click.current_autoclicks.length < special.click.max_autoclicks) {
		place_autoclick = true;
	}
}
window.addEventListener('load', function() {
	setTimeout(function(){init()}, 500)
}, false);
$(window).blur(function() {
	if (autoclick_on) {toggleRealAutoclicks();}
});
$(window).contextmenu(function(event){
	if (place_autoclick == true) {
		event.preventDefault();
		special.click.current_autoclicks.push([event.pageX, event.pageY, 0])
		place_autoclick = false;
		updateAutoclicks();
	}
});