function calculateProduction() {

	for (var i = 0; i < building_defs.length; i++) {
		var building = building_defs[i];
		building.base_production = building.starting_production;
		building.production_multiplier = building.starting_multiplier;
	}
	
	click_production_base = 1;
	click_production_multiplier = 0;
	click_multiplier = 1;
	total_production_multiplier = 1; 
	cost_multiplier = 1;
	buffless_multiplier = 1;
	
	autoclicks = 0;
	
	autoclicks += special.automation.autoclicks;
	autoclicks += trade.machine_click;
	
	if (special.temporal.fast_forward) {total_production_multiplier *= 1.25}
	if (special.temporal.blind_speed) {total_production_multiplier *= 1.1}
	if (special.temporal.profits) {total_production_multiplier *= 1.5}
	if (special.temporal.drain) {total_production_multiplier *= 1.5;special.cultist.blood = 0;if (upgrade_defs[144].bought) {special.cultist.blood -= 30};if (upgrade_defs[210].bought) {special.cultist.blood -= 40}}
	
	total_production_multiplier *= special.gambler.gambling_bonus + 1;
	total_production_multiplier *= special.cultist.blood_bonus + 1;
	total_production_multiplier *= special.power.power_bonus + 1;
	total_production_multiplier *= special.stock.market_value + 1;
	total_production_multiplier *= special.factory.production_level/100 + 1;
	total_production_multiplier *= special.temple.production_bonus;
	total_production_multiplier *= special.research.research_bonus/100 + 1;
	
	total_production_multiplier *= special.merchant.merchant_bonus + 1;
	
	total_production_multiplier *= 1 + special.black_hole.karma_points * 0.01
	
	total_production_multiplier *= special.wasteland.permafrost/100 + 1;
	total_production_multiplier *= special.bank.bank_bonus/100 + 1;
	buffless_multiplier *= special.wasteland.permafrost/100 + 1;

	total_production_multiplier *= trade.blood_bonus/100 + 1;
	total_production_multiplier *= trade.luck_bonus/100 + 1;
	total_production_multiplier *= trade.gold_bonus/100 + 1;
	total_production_multiplier *= trade.machine_bonus/100 + 1;
	
	if (special.shrine.reset_count >= 1) {total_production_multiplier *= 1.05 +special.shrine.reset_count * 0.01}
	if (special.shrine.reset_count >= 4) {cost_multiplier /= 1 + special.shrine.reset_count * 0.02}
	
	click_production_multiplier += special.factory.click_level/500;
	if (special.shrine.reset_count >= 6) {click_production_multiplier += special.shrine.reset_count * 0.01;}
	
	if (special.temple.current_worship == 0 && building_defs[6].count != 0) {click_multiplier *= 1 + special.temple.clicking_favor * 0.01}
	else if (special.temple.current_worship == 2) {total_production_multiplier *= 1 + special.temple.production_favor * 0.001}
	else if (special.temple.current_worship == 1) {cost_multiplier /= 1 + special.temple.construction_favor * 0.001}
	

	
	for (var i = 0; i < upgrade_defs.length; i++) {
		var upgrade = upgrade_defs[i];
		if (upgrade.bought) {
		upgrade.formula();
		}
	}
	for (var i = 0; i < buff_defs.length; i++) {
		if (buff_defs[i].active && !buff_defs[i].stack) {
			buff_defs[i].formula();
		}
		else if (buff_defs[i].active) {
			for (var j = 0; j < buff_defs[i].stack_count; j++) {
				buff_defs[i].formula();
			}
		}
	}
	
	var buffless = true;
	for (var i = 0; i < buff_defs.length; i++) {
		if (buff_defs[i].active) {
			buffless = false;
		}
	}
	if (buffless) {total_production_multiplier *= buffless_multiplier}
	
	
	//Base production boost
	
	building_defs[1].base_production += special.cultist.cultist_bonus;
	
	building_defs[0].base_production += Math.floor(special.gambler.time_bonus);
	building_defs[1].base_production += Math.floor(special.cultist.time_bonus);
	building_defs[3].base_production += Math.floor(special.stock.time_bonus);
	building_defs[4].base_production += Math.floor(special.mine.time_bonus);
	building_defs[2].base_production += Math.floor(special.research.time_bonus);
	building_defs[5].base_production += Math.floor(special.factory.time_bonus);
	building_defs[6].base_production += Math.floor(special.temple.time_bonus);
	
	building_defs[7].base_production += Math.floor(special.power.plant_bonus);
	building_defs[13].base_production += Math.floor(special.asteroid.asteroid_bonus);
	
	for (var i = 0; i < building_defs.length; i++) {
		var building = building_defs[i];
		if (building_defs[12].count >= 1) {
			if (building.tier == 1) {building.base_production += 1500 * Math.ceil(building_defs[12].count/10)}
			else if (building.tier == 2) {building.base_production += 8000 * Math.ceil(building_defs[12].count/10)}
		}
	}
	if (upgrade_defs[223].bought) {building_defs[0].base_production *= 2}
	if (upgrade_defs[224].bought) {building_defs[1].base_production *= 2}
	if (upgrade_defs[225].bought) {building_defs[3].base_production *= 2}
	if (upgrade_defs[226].bought) {building_defs[4].base_production *= 2}
	if (upgrade_defs[227].bought) {building_defs[5].base_production *= 2}
	if (upgrade_defs[228].bought) {building_defs[2].base_production *= 2}
	if (upgrade_defs[229].bought) {building_defs[6].base_production *= 2}
	
	var building_production = 0;
	for (var i = 0; i < building_defs.length; i++) {
		var building = building_defs[i];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		
		
		building.shown_production = base_production * production_multiplier * building_count;
		building_production += base_production * production_multiplier * building_count;
		
	}
	total_building_production = building_production
	production = building_production * total_production_multiplier;
	
	updateProductionDisplay();
}

function collect(dt) {
	gold += production * dt;
	
	if (buff_defs[23].active) {
		gold /= (1 + (0.01 * dt));
	}
}

function handleClick(real) {
	gold += click_production_base * click_multiplier + click_production_multiplier * production;
	stats.total_clicks ++;
	var click_value = click_production_base * click_multiplier + click_production_multiplier * production;
	if (!real) {
		$("#click_value").html(fancyNumber(click_production_base * click_multiplier + click_production_multiplier * production));	
		$("#click_value").show();
		$("#click_value").css('opacity', '0.8');
	}
	if (upgrade_defs[87].bought && real) {clock_ticks += 0.1} 
	if (upgrade_defs[199].bought && real) {clock_ticks += 0.1} 
	if (upgrade_defs[205].bought && real) {buff_defs[26].activate(45)} 
	if (upgrade_defs[211].bought && real && Math.random() <= 0.1) {handleClick(true);}
	if (upgrade_defs[270].bought && real) {special.research.time -= 0.5;}
	if (upgrade_defs[267].bought && real && special.mine.click_amount >= 0) {special.mine.gold_time -= 1;special.mine.click_amount -= 1;}
	if (upgrade_defs[264].bought && real && special.gambler.available_rolls < special.gambler.max_rolls) {special.gambler.time += 0.2;}
	if (real) {stats.total_real_clicks ++}
	if (real && special.temporal.fast_clicking) {
		var iter = Math.floor(game_speed - 1)/2;
		for (var i = 0; i < iter; i++) {
			handleClick(false);
		}
	}
	
	if (real && !powersaver && click_array.length < 35) {
		click_array.push([-20,0, Math.round(Math.random() * (40 - (-40)) + (-40)), Math.round(Math.random() * 30) + 10, click_value,1]) //[x,y,xspeed,yspeed,value,opac]
		if (tutorial_progress == 6) {tutorial_progress = 8}
	}
}