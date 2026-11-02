//			<div class="upgrade" onmouseover="showTooltip(this.id, 'url(\'images/upgrade_sheet.png\') 0 0', 'Blueprint', 'Allows you to choose another building to construct.<br>Price: '+fancyNumber(blueprint_cost))" onmouseleave="hideTooltip()" id="blueprint_upgrade" style="float:left;height:48px;width:48px;background:url(images/upgrade_sheet.png) 0 0;" onclick="openMenu('#blueprint_menu', 1)"></div>

function initSpecials() {
	special = {};
	special.gambler = {
		available_rolls : 4,
		last_roll : 0,
		current_roll : 0,
		max_rolls: 4,
		time: 0,
		roll_time: 150,
		gambling_bonus: 0,
		total_rolls: 0,
		time_bonus: 0,
	}
	special.cultist = {
		blood : 100,
		max_blood : 100,
		blood_bonus : 0,
		total_rituals : 0,
		cultist_bonus : 0,
		time_bonus: 0,
	}
	special.stock = {
		market_value: 0,
		max_market_value: 0.1,
		market_direction: 1,
		time_bonus: 0,
	}
	special.mine = {
		gold_mined: 0,
		gold_time: 3600,
		gold: 0,
		time_bonus: 0,
		click_amount: 60,
	}
	special.factory = {
		gears: 0,
		production_level: 0,
		click_level: 0,
		time_level: 0,
		total_upgrades: 0,
		gear_time: 60,
		gears_obtained: 0,
		time_bonus: 0,
	}
	special.temple = {
		clicking_favor: 0,
		construction_favor: 0,
		production_favor: 0,
		time_favor: 0,
		current_worship: 0,
		favor_time: 480,
		displeasure_time: 720,
		production_bonus: 1,
		time_bonus: 0,
	}
	special.research = {
		time: 3600,
		research_points: 0,
		research_bonus:0,
		path_0: 0,
		path_0_cost: [1,1,1,1,2,2,2,2,3,3,"Max Upgrades Reached"],
		path_0_upgrades: [61,62,63,64,65,66,67,68,69,70],
		path_1: 0,
		path_1_cost: [2,2,2,2,2,2,4,4,4,5,"Max Upgrades Reached"],
		path_1_upgrades: [71,72,73,74,75,76,77,78,79,80],
		path_2: 0,
		path_2_cost: [1,1,1,1,2,3,3,3,3,3,"Max Upgrades Reached"],
		path_2_upgrades: [81,82,83,84,85,86,87,88,89,90],
		time_bonus: 0,
	}
	special.power = {
		power : 100,
		max_power : 100,
		power_bonus : 0,
		total_activations : 0,
		time_bonus: 0,
		plant_bonus: 0,
	}
	special.wasteland = {
		snowballs: 0,
		permafrost: 0,
		snowball_time: 45,
		snowballs_obtained: 0,
		time_bonus: 0,
	}
	special.shrine = {
		update_time: 0,
		worshipper: 0,
		worshipper_price: 20,
		farm: 0,
		farm_price: 150,
		temple: 0,
		temple_price: 1800,
		sacrifice: 0,
		sacrifice_price: 15000,
		bank: 0,
		bank_price: 125000,
		prison: 0,
		prison_price: 1500000,
		hospital: 0,
		hospital_price: 25000000,
		hq: 0,
		hq_price: 300000000,
		production: 0,
		favor: 0,
		upgrades: [],
		reset_count: 0,
		sacrifice_string: "",
		click_bonus: 1,
	}
	special.automation = {
		autoupgrade: false,
		unlocked: false,
		autoclicks: 0,
		max_tasks: 1,
		tasks: 1,
		gambler: false,
		cultist: false,
		mine: false,
		temple: false,
		factory: false,
		research: false,
		stock: false,
	}
	special.bank = {
		bank_bonus: 0,
	}
	special.asteroid =  {
		asteroid_bonus: 0,
	}
	special.click = {
		max_autoclicks: 2,
		current_autoclicks: [], //x,y,time
	}
	special.merchant = {
		drop_time: 360,
		upgrades: [295,296,297,298,299,300,301,302,303,304,305,306],
		upgrade_unlocked: 0,
		packages_obtained: 0,
		package_y: 0,
		merchant_bonus: 0,
	}
	special.alien = {
		research_time: 3600,
		upgrade_unlocked: 0,
		upgrades: [197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221],
		upgrades_unlocked: 0,
	}
	special.temporal = {
		unlocked: false,
		tasks: 2,
		max_tasks: 2,
		bottle: false,
		fast_forward: false,
		fast_clicking: false,
		tortoise: false,
		endless: false,
		blind_speed: false,
		profits: false,
		drain: false,
	}
	special.trade = {
		unlocked: false,
	}
	special.black_hole = {
		karma_points: 0,
		total_karma_points: 0,
	}
}
function softReset() {
	var temp = special.black_hole;
	var karma_points = karmaPoints();
	initSpecials();
	special.black_hole = temp;
	
	upgrade_defs = [];
	initUpgrades();
	building_defs = [];
	initBuildings();
	buff_defs = [];
	initBuffs();
	gold = 0;
	save_time = 0;
	clock_ticks = 180;
	blueprints_bought = 0;
	blueprints_bought_tier_2 = 0;
	blueprints_bought_tier_3 = 0;
	click_array = [];
	autoclicks = 0;
	world_time = 0;
	bloody_timing_count = 0;
	bloody_count = 0;
	autoclick_time = 0;
	real_autoclick_time = 0;
	production = 0;
	
	$(".building").hide();
	$("#ele_gambler").remove();
	$("#ele_cultist").remove();
	$("#ele_research").remove();
	$("#ele_stock").remove();
	$("#ele_mine").remove();
	$("#ele_factory").remove();
	$("#ele_temple").remove();
	$("#ele_power_plant").remove();
	$("#ele_sacrifical_shrine").remove();
	$("#ele_frozen_wasteland").remove();
	$("#ele_bank").remove();
	$("#ele_alien").remove();
	$("#ele_propaganda").remove();
	$("#ele_asteroid").remove();
	$("#ele_click").remove();
	$("#ele_merchant").remove();
	
	$(".buy_a_building").show();
	
	//$(".tier").show();
	$("#ele_black_hole").show();
	$("#ele_new").show();
	$("#ele_new_tier_2").show();
	$("#ele_new_tier_3").show();
	
	
	trade = {
		blood_container: 0,
		blood_bonus: 0,
		clover: 0,
		luck_bonus: 0,
		gold_bonus: 0,
		machine: 0,
		machine_click: 0,
		machine_bonus: 1,
		hour_time: 3600,
		blood_upgrade_count: 0,
		blood_upgrades: [140,141,142,143,144],
		luck_upgrade_count: 0,
		luck_upgrades: [145,146,147,148,149],
		gold_upgrade_count: 0,
		gold_upgrades: [150,151,152,153,154]
	}
	stats = {
		total_clicks:0,
		total_real_clicks: 0,
		total_gambles:0,
		total_buildings:0,
		total_time:0,
		total_real_time:0,
	}
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
	
	special.black_hole.karma_points += karma_points;
	special.black_hole.total_karma_points += karma_points;
	
}
function karmaPoints() {
	return Math.max(Math.floor(Math.pow(gold/1e33,0.3)) - special.black_hole.total_karma_points, 0);
}
function blackholeTick() {
	$("#black_hole_price").html(fancyNumber(karmaPoints()) + " Karma Points");
	$("#karma_count").html(fancyNumber(special.black_hole.karma_points));
	$("#real_reset_points").html(fancyNumber(karmaPoints()) + "");
}
function merchantTick(dt, rt) {
	var merchant = special.merchant;
	
	if ($("#merchant_menu").is(":visible")) {
		
		var building = building_defs[15];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#merchant_production").html(fancyNumber(base_production * production_multiplier * building_count) + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#merchant_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_package_time").html("Time until next package: "+Math.floor(merchant.drop_time)+" s");
	}
	
	merchant.drop_time -= rt;
	
	if (merchant.drop_time <= 0) {
		merchant.drop_time = 360;drop_in_progress = true;merchant.package_y = 0
		if (upgrade_defs[295].bought) {merchant.drop_time -= 30;}
		if (upgrade_defs[299].bought) {merchant.drop_time -= 30;}
	}
	
	if (drop_in_progress) {
		var top_pos = $(window).height()+64 - merchant.package_y;
		var left_pos = $("#centerContent").width()/2 + 145;
		$("#drop_ship").show();
		$("#drop_ship").css({top: top_pos, left: left_pos});
		//$("#drop_package").css({top: top_pos+48, left: left_pos-10}); 2880
		if (merchant.package_y >= $(window).height()/2+64) {
			$("#drop_package").show();
			$("#drop_package").css({top: $(window).height()/2, left: left_pos+30});
		}
		
		if (merchant.package_y>= 2880) {
			merchant.package_y = 0;
			drop_in_progress = false;
			$("#drop_package").hide();
		}
		
		merchant.package_y += rt * 240;
	}
}
function collectPackage() {
var rand = Math.random();

	if (rand<=0.15) {
		if (special.merchant.upgrades[special.merchant.upgrade_unlocked]) {upgrade_defs[special.merchant.upgrades[special.merchant.upgrade_unlocked]].available = true;special.merchant.upgrade_unlocked ++}
		showMessage("drop_package", "Research Unlocked");
	} else if (rand<=0.6) {
		showMessage("drop_package", "Gained 100 ticks");
		clock_ticks += 100;
	} else {
		showMessage("drop_package", "+2% production permanently");
		special.merchant.merchant_bonus += 0.02
	}

	$("#drop_package").hide();
	$("#drop_ship").hide();
	drop_in_progress = false;
	
	if (upgrade_defs[301].bought) {gold += production*30;}
}
function clickTick(dt) {
	var click = special.click
	
	click.max_autoclicks = 2 + Math.floor(building_defs[14].count/50);
	
	
	if ($("#click_menu").is(":visible")) {
		
		var building = building_defs[14];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#click_production").html(fancyNumber(base_production * production_multiplier * building_count) + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#click_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_available_clicks").html("Maximum Autoclickers: "+click.max_autoclicks);
		//$("#stats_propaganda_tier_2").html("Tier 2 bonus " + 8000 * Math.ceil(building_defs[12].count/10));
	}
	
	
	for (var i = 0; i<special.click.current_autoclicks.length; i++) {
		var click_left = special.click.current_autoclicks[i][0];
		var click_top = special.click.current_autoclicks[i][1];
		special.click.current_autoclicks[i][2] += dt;
		var click_time = special.click.current_autoclicks[i][2];
		
		
		
		if (click_time >= 3) {
			special.click.current_autoclicks[i][2] -= 3;
			document.elementFromPoint(click_left, click_top).click();
		}
	}
}
function asteroidTick(dt) {
	var asteroid = special.asteroid;
	
	if ($("#asteroid_menu").is(":visible")) {
		
		var building = building_defs[13];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#asteroid_production").html(fancyNumber(base_production * production_multiplier * building_count) + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#asteroid_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_asteroid_bonus").html("Asteroid Bonus: "+fancyNumber(asteroid.asteroid_bonus));
		//$("#stats_propaganda_tier_2").html("Tier 2 bonus " + 8000 * Math.ceil(building_defs[12].count/10));
	}
	
	asteroid.asteroid_bonus += dt * 347222/5 * Math.ceil(building_defs[13].count/10);
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function propagandaTick(dt) {
	//var bank = special.bank;
	
	if ($("#propaganda_menu").is(":visible")) {
		
		var building = building_defs[12];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#propaganda_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#propaganda_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_propaganda_tier_1").html("Tier 1 bonus " + 1500 * Math.ceil(building_defs[12].count/10));
		$("#stats_propaganda_tier_2").html("Tier 2 bonus " + 8000 * Math.ceil(building_defs[12].count/10));
	}
	
	//bank.bank_bonus += dt * 0.00088;
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function alienTick(dt, rt) {
	var alien = special.alien;
	
	if ($("#alien_menu").is(":visible")) {
		
		var building = building_defs[11];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#alien_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#alien_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_alien_unlocked").html("Upgrades Unlocked: " + alien.upgrades_unlocked);
		if (alien.upgrades_unlocked >= 25) {
			$("#stats_unlock_time").html("All upgrades unlocked");
		}
		else {
			$("#stats_unlock_time").html("Next Upgrade: " + Math.floor(alien.research_time) + "s");
		}
		
		//$("#stats_bank_bonus").html("Bank Bonus " + Math.floor(bank.bank_bonus) + "%");
	}
	
	alien.research_time -= rt;
	
	if (alien.research_time <= 0) {
		alien.research_time = 3600;
		var unlock = Math.floor(Math.random()* alien.upgrades.length);
		console.log(unlock)
		
		if (alien.upgrades[unlock]) {
			upgrade_defs[alien.upgrades[unlock]].available = true;;
			alien.upgrades.splice(unlock, 1);
			alien.upgrades_unlocked += 1;
		}
	}
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function wastelandTick(dt, rt) {
	var wasteland = special.wasteland;
	
	if ($("#wasteland_menu").is(":visible")) {
		
		var building = building_defs[9];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#wasteland_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#wasteland_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_total_snowflakes").html("Snowballs Obtained: "+Math.round(wasteland.snowballs_obtained));
		$("#stats_ice_bonus").html("Permafrost Bonus: " + Math.round(wasteland.permafrost) + "%");
		//$("#stats_gear_time").html("Max Time Bonus +" + Math.round(factory.time_level) + "x");
		//$("#stats_gear_click").html("Click Bonus +" + Math.round(factory.click_level)/5 + "%");
		$("#snowflake_seconds").html(Math.round(wasteland.snowball_time) + "s");
		$("#snowflake_count").html(Math.round(wasteland.snowballs) + " Snowballs");
		
	}
	wasteland.snowball_time -= 1 * rt;
	
	if (wasteland.snowball_time <= 0) {
		wasteland.snowball_time = 45;
		if (upgrade_defs[171].bought) {wasteland.snowball_time -= 5;}
		wasteland.snowballs_obtained += 1;
		wasteland.snowballs += 1;
	
		if (wasteland.snowballs_obtained >= 60) {upgrade_defs[171].available = true}
		if (wasteland.snowballs_obtained >= 120) {upgrade_defs[172].available = true}
		if (wasteland.snowballs_obtained >= 240) {upgrade_defs[173].available = true}
		if (wasteland.snowballs_obtained >= 480) {upgrade_defs[174].available = true}
	}
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function bankTick(dt) {
	var bank = special.bank;
	
	if ($("#banks_menu").is(":visible")) {
		
		var building = building_defs[10];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#bank_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#bank_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_bank_bonus").html("Bank Bonus " + Math.floor(bank.bank_bonus) + "%");
	}
	
	bank.bank_bonus += dt * 0.00088;
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function activateSnow(type) {
	var wasteland = special.wasteland;
		switch (type) {
			case 0:
				if (wasteland.snowballs >= 10) {
					for (i = 0; i < buff_defs.length; i++) {
						buff_defs[i].time = 0;
					}
					buff_defs[21].activate(60);
					wasteland.snowballs -= 10;
				}
			break;
			case 1:
				if (wasteland.snowballs >= 15) {
					buff_defs[22].activate(120);
					wasteland.snowballs -= 15;
				}
			break;
			case 2:
				if (wasteland.snowballs >= 18) {
					wasteland.permafrost += 1;
					wasteland.snowballs -= 18;
				}
		}
}
function shrineTick(dt) {
	var shrine = special.shrine;
	
	if ($("#shrine_menu").is(":visible")) {
		
		var building = building_defs[8];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#shrine_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#shrine_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
	}
	
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function updateShrine(dt) {
	var shrine = special.shrine;
	shrine.update_time += dt;
	
	if ($("#shrine_menu").is(":visible")) {	
		updateShrineProduction();
	}
}
function updateShrineProduction() {
	var shrine = special.shrine;

	shrine.production = 0;
	shrine.production += shrine.worshipper;
	shrine.production += shrine.farm * 5;
	shrine.production += shrine.temple * 30;
	shrine.production += shrine.sacrifice * 80;
	shrine.production += shrine.bank * 300;
	shrine.production += shrine.prison * 1500;
	shrine.production += shrine.hospital * 9000;
	shrine.production += shrine.hq * 40000;
	
	if (shrine.reset_count >= 1) {shrine.production *= 1 + shrine.worshipper * 0.01}
	if (shrine.reset_count >= 2) {shrine.production *= 1 + shrine.farm * 0.01}
	if (shrine.reset_count >= 3) {shrine.production *= 1 + shrine.temple * 0.01}
	if (shrine.reset_count >= 4) {shrine.production *= 1 + shrine.sacrifice * 0.01}
	if (shrine.reset_count >= 5) {shrine.production *= 1 + shrine.bank * 0.01}
	if (shrine.reset_count >= 6) {shrine.production *= 1 + shrine.prison * 0.01}
	if (shrine.reset_count >= 7) {shrine.production *= 1 + shrine.hospital * 0.01}
	if (shrine.reset_count >= 8) {shrine.production *= 1 + shrine.hq * 0.01}
	if (shrine.reset_count >= 4) {shrine.production *= shrine.click_bonus}
	
	shrine.favor += shrine.production * shrine.update_time;
	
	$("#shrine_value").html(fancyNumber(shrine.favor) + " Favor");
	$("#shrine_total_production").html(fancyNumber(shrine.production) + " Favor p/s");
	
	shrine.update_time = 0;
}
function handleShrineClick() {
	special.shrine.favor += 1;
	if (special.shrine.reset_count >= 4) {special.shrine.click_bonus += 0.001}
}
function buyShrineBuilding(type) {
	var shrine = special.shrine
		switch (type) {
			case 0: 
				if (shrine.favor >= shrine.worshipper_price) {
					shrine.favor -= shrine.worshipper_price;
					shrine.worshipper_price = Math.round(shrine.worshipper_price * 1.18);
					shrine.worshipper ++;
					$("#worshipper_count").html(shrine.worshipper);
				}
				break;
			case 1: 
				if (shrine.favor >= shrine.farm_price) {
					shrine.favor -= shrine.farm_price;
					shrine.farm_price = Math.round(shrine.farm_price * 1.18);
					shrine.farm ++;
					$("#farm_count").html(shrine.farm);
				}
				break;
			case 2: 
				if (shrine.favor >= shrine.temple_price) {
					shrine.favor -= shrine.temple_price;
					shrine.temple_price = Math.round(shrine.temple_price * 1.18);
					shrine.temple ++;
					$("#temple_count").html(shrine.temple);
				}
				break;
			case 3: 
				if (shrine.favor >= shrine.sacrifice_price) {
					shrine.favor -= shrine.sacrifice_price;
					shrine.sacrifice_price = Math.round(shrine.sacrifice_price * 1.18);
					shrine.sacrifice ++;
					$("#sacrifice_count").html(shrine.sacrifice);
				}
				break;
			case 4: 
				if (shrine.favor >= shrine.bank_price) {
					shrine.favor -= shrine.bank_price;
					shrine.bank_price = Math.round(shrine.bank_price * 1.18);
					shrine.bank ++;
					$("#bank_count").html(shrine.bank);
				}
				break;
			case 5: 
				if (shrine.favor >= shrine.prison_price) {
					shrine.favor -= shrine.prison_price;
					shrine.prison_price = Math.round(shrine.prison_price * 1.18);
					shrine.prison ++;
					$("#prison_count").html(shrine.prison);
				}
				break;
			case 6: 
				if (shrine.favor >= shrine.hospital_price) {
					shrine.favor -= shrine.hospital_price;
					shrine.hospital_price = Math.round(shrine.hospital_price * 1.18);
					shrine.hospital ++;
					$("#hospital_count").html(shrine.hospital);
				}
				break;
			case 7: 
				if (shrine.favor >= shrine.hq_price) {
					shrine.favor -= shrine.hq_price;
					shrine.hq_price = Math.round(shrine.hq_price * 1.18);
					shrine.hq ++;
					$("#hq_count").html(shrine.hq);
				}
				break;
		}
		
		if (special.shrine.worshipper >= 50) {upgrade_defs[175].available = true}
		if (special.shrine.farm >= 50) {upgrade_defs[176].available = true}
		if (special.shrine.temple >= 50) {upgrade_defs[177].available = true}
		if (special.shrine.sacrifice >= 50) {upgrade_defs[178].available = true}
		if (special.shrine.bank >= 50) {upgrade_defs[179].available = true}
		if (special.shrine.prison >= 50) {upgrade_defs[180].available = true}
		if (special.shrine.hospital >= 50) {upgrade_defs[181].available = true}
		if (special.shrine.hq >= 50) {upgrade_defs[182].available = true}
		
		if (special.shrine.sacrifice >= 10) {upgrade_defs[183].available = true}
		if (special.shrine.prison >= 10) {upgrade_defs[184].available = true}
}
function updateShrineCount() {
	var shrine = special.shrine;
	$("#worshipper_count").html(shrine.worshipper);
	$("#farm_count").html(shrine.farm);
	$("#temple_count").html(shrine.temple);
	$("#sacrifice_count").html(shrine.sacrifice);
	$("#bank_count").html(shrine.bank);
	$("#prison_count").html(shrine.prison);
	$("#hospital_count").html(shrine.hospital);
	$("#hq_count").html(shrine.hq);
}
function shrineReset() {
	var shrine = special.shrine;
	
	if (shrine.favor >= Math.pow(30, 1+shrine.reset_count) * 33333.3333) {
		shrine.reset_count++;
		shrine.favor = 0;
		shrine.worshippers = 0;
		shrine.update_time = 0;
		shrine.worshipper = 0;
		shrine.worshipper_price = 20;
		shrine.farm = 0;
		shrine.farm_price = 150;
		shrine.temple = 0;
		shrine.temple_price = 1800;
		shrine.sacrifice = 0;
		shrine.sacrifice_price = 15000;
		shrine.bank = 0;
		shrine.bank_price = 125000;
		shrine.prison = 0;
		shrine.prison_price = 1500000;
		shrine.hospital = 0;
		shrine.hospital_price = 25000000;
		shrine.hq = 0;
		shrine.hq_price = 300000000;
		shrine.production = 0;
		
		$("#reset_menu").hide();
		$("#sacrifice_reset_menu").show();
		
		updateShrineCount();
		shrineResetUpdate();
	}
}
function shrineResetUpdate() {
	var shrine = special.shrine;
	
	$("#reset_price").html("Cost: " + fancyNumber(Math.pow(30, 1+shrine.reset_count) * 33333.34) + " favor");
	
	if (shrine.reset_count == 0) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Worshipper<br>- Increases normal production by 5% + 1% per reset.");
	}
	else if (shrine.reset_count == 1) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Blood Farm<br>- Increases maximum game speed by 1 per reset.");
	}
	else if (shrine.reset_count == 2) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Blood Temple<br>- Increases the speed of time by 1% per reset.");
	}
	else if (shrine.reset_count == 3) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Sacrificial Practitioner<br>- Building prices are reduced 2% per reset.<br>- Each shrine click increases favor production by 0.1%.");
	}
	else if (shrine.reset_count == 4) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Blood Bank<br>- Increases the duration of positive buffs by 1% per reset.");
	}
	else if (shrine.reset_count == 5) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Prison<br>- Increases value from clicking by 1% of production per reset.");
	}
	else if (shrine.reset_count == 6) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per Hospital<br>- Amplifies all previous effects.");
	}
	else if (shrine.reset_count == 7) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Increases favor production by 1% per HQ<br>- Amplifies all previous effects.");
	}
	else if (shrine.reset_count >= 8) {
		$("#reset_description").html("Reseting now will grant the following:<br>- Amplifies all previous effects.");
	}
	shrine.sacrifice_string = ""
	
	if (shrine.reset_count >= 1) {shrine.sacrifice_string +=  "Production Bonus: "+ (5+shrine.reset_count) +"%"}
	if (shrine.reset_count >= 2) {shrine.sacrifice_string +=  "<br>Max Game Speed: +"+ (-1+shrine.reset_count)}
	if (shrine.reset_count >= 3) {shrine.sacrifice_string +=  "<br>Time: +"+ (shrine.reset_count) +"%"}
	if (shrine.reset_count >= 4) {shrine.sacrifice_string +=  "<br>Building Discount: +"+ (shrine.reset_count * 2) +"%"}
	if (shrine.reset_count >= 5) {shrine.sacrifice_string +=  "<br>Buff Duration: +"+ (shrine.reset_count) +"%"}
	if (shrine.reset_count >= 6) {shrine.sacrifice_string +=  "<br>Click Bonus: +"+ (shrine.reset_count) +"%"}
}
function powerTick(dt) {
	var power = special.power;
	power.max_power = Math.floor(100+building_defs[7].count/2)
	if (upgrade_defs[162].bought) {power.max_power+=50}
	if (upgrade_defs[305].bought) {power.max_power+=20}
	
	if ($("#power_menu").is(":visible")) {
		
		var building = building_defs[7];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#power_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		
		$("#stats_power").html("Energy: "+Math.round(power.power));
		$("#stats_max_power").html("Max Power: "+Math.round(power.max_power));
		$("#stats_total_activations").html("Total Activations: "+Math.round(power.total_activations));
		$("#stats_power_bonus").html("Energy Bonus: "+Math.round(power.power_bonus * 100)+"%");
		$("#energy_meter").css("height", (power.power/power.max_power)*116+"px");
		
		$("#power_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
	}
	
	if (power.power < power.max_power) {
		power.power += dt * (power.max_power/420);
		if (power.power > power.max_power) {power.power = power.power}
	}
	
	//if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function performEnergy(type, cost) {
	var power = special.power;
	if (power.power >= cost) {
		switch (type) {
			case 0: 
				showMessage("energy_0", "Lightning Speed");
				gold += production * 60;
				break;		
			case 1: 
				showMessage("energy_1", "Overcharge");
				buff_defs[18].activate(90);
				break;
			case 2: 
				showMessage("energy_2", "Energy Storage");
				power.power_bonus += 0.01;
				break;
			case 3: 
				showMessage("energy_3", "Lightning Fast Clicking");
				buff_defs[19].activate(10);
				break;	
			case 4: 
				showMessage("energy_4", "Lightning Storm");
				buff_defs[20].activate(60);
				break;	
		}
		power.power -= cost;
		power.total_activations += 1;
		
		if (power.total_activations >= 30) {upgrade_defs[161].available = true}
		if (power.total_activations >= 60) {upgrade_defs[162].available = true}
		if (power.total_activations >= 120) {upgrade_defs[163].available = true}
		if (power.total_activations >= 240) {upgrade_defs[164].available = true}

		if (upgrade_defs[163].bought) {power.plant_bonus+=30;}
	}
	

}
function researchTick(dt) {
	var research = special.research;

	if ($("#research_menu").is(":visible")) {
	
		
		var building = building_defs[2];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		
		$("#research_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#research_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_research_points").html(Math.round(special.research.research_points) + " Research Points");
		$("#stats_research_time").html(Math.round(special.research.time) + "s");
		if (upgrade_defs[80].bought) {$("#stats_research_bonus").html(Math.round(special.research.research_bonus) + "%")};
	}
	
	research.time -= dt;
	
	if (research.time <= 0) {
		research.research_points += 1;
		research.time = 3600 - Math.sqrt(building_defs[2].count) * 30;
		if (upgrade_defs[134].bought) {research.time -= 240}
		if (upgrade_defs[80].bought) {research.research_bonus ++;}
		if (upgrade_defs[217].bought) {research.research_bonus ++;}
		
		upgrade_defs[115].available = true;
	}
	
	if (upgrade_defs[115].bought) {research.time_bonus += dt/120}
	//if (temple.favor_time <= 0) {templeFavor()}
	//if (temple.displeasure_time <= 0) {templeDispleasure()}
}
function research(path) {
	var research = special.research

	if (path == 0) {
		if (research.research_points >= research.path_0_cost[research.path_0]) {
			upgrade_defs[research.path_0_upgrades[research.path_0]].available = true;

			research.research_points -= research.path_0_cost[research.path_0];
			research.path_0 ++;
		}
	}
	else if (path == 1) {
		if (research.research_points >= research.path_1_cost[research.path_1]) {
			upgrade_defs[research.path_1_upgrades[research.path_1]].available = true;

			research.research_points -= research.path_1_cost[research.path_1];
			research.path_1 ++;
		}
	}
	else if (path == 2) {
		if (research.research_points >= research.path_2_cost[research.path_2]) {
			upgrade_defs[research.path_2_upgrades[research.path_2]].available = true;

			research.research_points -= research.path_2_cost[research.path_2];
			research.path_2 ++;
		}
	}
}
function templeTick(dt) {
	var temple = special.temple;

	if ($("#temple_menu").is(":visible")) {
	
		
		var building = building_defs[6];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		
		$("#temple_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		$("#temple_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#stats_temple_bonus").html("Production bonus: " + Math.round((temple.production_bonus-1)*100) + "%");
		
		var worship = "";

		if (temple.current_worship == 0) {worship = "Huitzilopochtli";}
		else if (temple.current_worship == 1) {worship = "Quetzalcoatl";}
		else if (temple.current_worship == 2) {worship = "Tlaloc";}
		else if (temple.current_worship == 3) {worship = "Tezcatlipoca";}		
		$("#stats_worship").html("Worshipping: " + worship);
		
		$("#worship_click").css('box-shadow', '0px 0px 20px rgb('+ (125 - Math.round(temple.clicking_favor)) +',' + (125 + Math.round(temple.clicking_favor))+ ', 0)')
		$("#worship_construction").css('box-shadow', '0px 0px 20px rgb('+ (125 - Math.round(temple.construction_favor)) +',' + (125 + Math.round(temple.construction_favor))+ ', 0)')
		$("#worship_production").css('box-shadow', '0px 0px 20px rgb('+ (125 - Math.round(temple.production_favor)) +',' + (125 + Math.round(temple.production_favor))+ ', 0)')
		$("#worship_time").css('box-shadow', '0px 0px 20px rgb('+ (125 - Math.round(temple.time_favor)) +',' + (125 + Math.round(temple.time_favor))+ ', 0)')
		
	}
	var max_favor = 100
	if (upgrade_defs[76].bought) {max_favor *= 1.5}
	if (upgrade_defs[117].bought) {temple.time_bonus += dt/120}
	
	if (temple.current_worship == 0 && !(temple.clicking_favor >= max_favor)) {temple.clicking_favor += 1.25 * dt;}
	else if (temple.current_worship == 1 && !(temple.construction_favor >= max_favor)) {temple.construction_favor += 1.25 * dt;}
	else if (temple.current_worship == 2 && !(temple.production_favor >= max_favor)) {temple.production_favor += 1.25 * dt;}
	else if (temple.current_worship == 3 && !(temple.time_favor >= max_favor)) {temple.time_favor += 1.25 * dt;}
	

	if (temple.clicking_favor >= -100) {temple.clicking_favor -= 0.2 * dt;} else if (temple.clicking_favor <= -100) {temple.clicking_favor = -100}
	if (temple.construction_favor >= -100) {temple.construction_favor -= 0.2 * dt;} else if (temple.construction_favor <= -100) {temple.construction_favor = -100}
	if (temple.production_favor >= -100) {temple.production_favor -= 0.2 * dt;} else if (temple.production_favor <= -100) {temple.production_favor = -100}
	if (temple.time_favor >= -100) {temple.time_favor -= 0.2 * dt;} else if (temple.time_favor <= -100) {temple.time_favor = -100}
	
	if (temple.clicking_favor >= max_favor) {temple.clicking_favor = max_favor; upgrade_defs[57].available = true}
	else if (temple.construction_favor >= max_favor) {temple.construction_favor = max_favor; upgrade_defs[58].available = true}
	else if (temple.production_favor >= max_favor) {temple.production_favor = max_favor; upgrade_defs[59].available = true}
	else if (temple.time_favor >= max_favor) {temple.prodcution_favor = max_favor; upgrade_defs[60].available = true}
	
	temple.favor_time -= dt;
	temple.displeasure_time -= dt;
	
	if (temple.favor_time <= 0) {templeFavor()}
	if (temple.displeasure_time <= 0) {templeDispleasure()}
}
function templeFavor() {
	var temple  = special.temple;
	upgrade_defs[117].available = true
	
	if (temple.current_worship == 0) {
		switch (Math.floor(Math.random() * 2)) {
			case 0: 
				buff_defs[4].activate(30);
				break;
			case 1:
				buff_defs[5].activate(15);
				break;
		}
	}
	else if (temple.current_worship == 1) {
		switch (Math.floor(Math.random())) {
			case 0: 
				buff_defs[6].activate(30);
				break;
		}
	}
	else if (temple.current_worship == 2) {
		switch (Math.floor(Math.random() * 3)) {
			case 0: 
				buff_defs[7].activate(180);
				break;
			case 1:
				window.gold += production * 300;
				break;
			case 2:
				temple.production_bonus += 0.01;
		}
	}
	else if (temple.current_worship == 3) {
		switch (Math.floor(Math.random() * 1)) {
			case 0: 
				clock_ticks += 2 * building_defs[6].count;
				break;
		}
	}
	
	temple.favor_time = 480 + Math.random() * 240;
}
function stealIdol() {
	var temple = special.temple;

	if ( (temple.clicking_favor >= 80 || temple.construction_favor >= 80 || temple.production_favor >= 80 || temple.time_favor >= 80) ) {
		temple.clicking_favor =  -30;
		temple.construction_favor = -30;
		temple.production_favor = -30;
		temple.time_favor = -30;
		
		special.mine.gold ++;
		
		switch (Math.floor(Math.random() * 3)) {
			case 0: 
				buff_defs[23].activate(20);
				break;	
			case 1: 
				buff_defs[24].activate(90);
				break;	
			case 2: 
				buff_defs[25].activate(60);
				break;	
		}
	}
}
function templeDispleasure() {
	var temple = special.temple;
	
	switch (Math.floor(Math.random() * 4)) {
		case 0: 
			if (temple.click_favor <= 0) {buff_defs[8].activate(30);};
			break;
		case 1:
			if (temple.construction_favor <= 0) {buff_defs[9].activate(60);};
			break;
		case 2:
			if (temple.production_favor <= 0) {buff_defs[10].activate(30);}
			break;
		case 3:
			if (temple.time_favor <= 0) {buff_defs[11].activate(0.1);}
			break;
	}
	
	temple.displeasure_time = 720 + Math.random() * 240;
}
function factoryTick(dt) {
	var factory = special.factory;

	if ($("#factory_menu").is(":visible")) {
	
		
		var building = building_defs[5];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#factory_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		
		
		$("#factory_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		
		$("#gear_seconds").html(Math.round(factory.gear_time) + "s");
		$("#gear_count").html(Math.round(factory.gears) + " Gears");
		$("#stats_gears_obtained").html("Gears Obtained: "+Math.round(factory.gears_obtained));
		$("#stats_gear_production").html("Production Bonus: " + Math.round(factory.production_level) + "%");
		$("#stats_gear_time").html("Max Time Bonus +" + Math.round(factory.time_level) + "x");
		$("#stats_gear_click").html("Click Bonus +" + Math.round(factory.click_level)/5 + "%");
	}
	
	factory.gear_time -= 1 * dt;
	
	if (upgrade_defs[116].bought) {factory.time_bonus += dt/120}
	
	if (factory.gear_time <= 0) {
		factory.gear_time = 60;
		if (upgrade_defs[50].bought) {factory.gear_time -= 10}
		if (upgrade_defs[132].bought) {factory.gear_time -= 5}
		if (upgrade_defs[303].bought) {factory.gear_time -= 5}
		if (upgrade_defs[212].bought) {factory.gear_time /= 1.3}
		factory.gears_obtained += 1;
		factory.gears += 1;
		
		if (factory.gears_obtained >= 30) {upgrade_defs[116].available = true}
		
		if (factory.gears_obtained >= 10) {upgrade_defs[47].available = true}
		if (factory.gears_obtained >= 20) {upgrade_defs[48].available = true}
		if (factory.gears_obtained >= 30) {upgrade_defs[49].available = true}
		if (factory.gears_obtained >= 40) {upgrade_defs[50].available = true}
	}
}
function factoryUpgrade(type) {
		switch (type) {
			case 0: 
				if (special.factory.gears >= 10 + special.factory.production_level) {
					special.factory.gears -= 10 + special.factory.production_level;
					special.factory.production_level += 1;
				}
				break;
			case 1: 
				if (special.factory.gears >= 50 + special.factory.time_level * 15) {
					special.factory.gears -= 50 + special.factory.time_level * 15;
					special.factory.time_level += 1;
				}
				break;
			case 2: 
				if (special.factory.gears >= 10 + special.factory.click_level) {
					special.factory.gears -= 10 + special.factory.click_level;
					special.factory.click_level += 1;
				}
				break;
		}
}
function mineTick(dt) {
	var mine = special.mine;
	
	if (mine.click_amount <=60) {mine.click_amount += dt;}
	else if (mine.click_amount >= 60) {mine.click_amount = 60;}

	if ($("#mine_menu").is(":visible")) {
	
		
		var building = building_defs[4];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#mine_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		
		
		$("#mine_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
		$("#gold_seconds").html(Math.round(mine.gold_time) + "s");
		$("#stats_gold_mined").html("Gold Mined: " + Math.round(mine.gold_mined));
	}
	
	mine.gold_time -= 1 * dt;
	
	if (mine.gold_time <= 0) {
		mine.gold_time = 3600 - Math.sqrt(building_defs[4].count) * 30;
		if (upgrade_defs[39].bought) {mine.gold_time -= 300;}
		if (upgrade_defs[72].bought) {mine.gold_time -= 240;}
		if (upgrade_defs[127].bought) {mine.gold_time -= 180;}
		if (upgrade_defs[78].bought) {mine.gold_time -= Math.sqrt(building_defs[3].count) * 20}
		if (upgrade_defs[214].bought) {mine.gold_time /= 1.2}
		
		if (upgrade_defs[151].bought) {buff_defs[17].activate(120)}
		
		if (upgrade_defs[152].bought && Math.random() <= 0.2) {
			special.mine.gold_time = 0.1;
		}
		
		mine.gold_mined += 1;
		mine.gold += 1;
		
		if (mine.gold_mined >= 10) {upgrade_defs[37].available = true}
		if (mine.gold_mined >= 20) {upgrade_defs[38].available = true}
		if (mine.gold_mined >= 30) {upgrade_defs[39].available = true}
		if (mine.gold_mined >= 40) {upgrade_defs[40].available = true}

		if (mine.gold_mined >= 1) {upgrade_defs[114].available = true}
	}
	
	if (upgrade_defs[114].bought) {mine.time_bonus += dt/120}
}
function refill(building) {
	var mine = special.mine;

	if (mine.gold > 0) {
		switch (building) {
			case 0: 
				if (special.gambler.available_rolls != special.gambler.max_rolls) {
					special.gambler.available_rolls = special.gambler.max_rolls;
					mine.gold -= 1;
				}
				
				break;
			case 1: 
				if (special.cultist.blood < special.cultist.max_blood) {
					special.cultist.blood = special.cultist.max_blood;
					mine.gold -= 1;
				}
				
				break;
			case 2: 
				special.factory.gears += 15;
				mine.gold -= 1;
				break;
		}
	}
}
function stockTick(dt) {
	var stock = special.stock;
	if (upgrade_defs[78].bought) {stock.max_market_value = 0.1 + 0.001 * building_defs[4].count}
	if (upgrade_defs[27].bought) {stock.market_value = stock.max_market_value}

	if ($("#stock_menu").is(":visible")) {
	
		
		var building = building_defs[3];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#stock_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		
		$("#stats_market_bonus").html("Market Bonus: "+Math.round(stock.market_value * 100)+"%");
		
		$("#stock_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
	}
	stock.market_value += dt * stock.market_direction * 0.002;
	
	if (stock.market_direction == 1 && stock.market_value >= stock.max_market_value) {
		stock.market_direction *= -1;
		if (upgrade_defs[249].bought) {clock_ticks += 10}
	}
	else if (stock.market_direction == -1 && stock.market_value <= stock.max_market_value * -1) {
		stock.market_direction *= -1;
		upgrade_defs[113].available = true;
	}
	
	if (special.stock.market_value < 0-stock.max_market_value) {special.stock.market_value = 0-stock.max_market_value}
	if (upgrade_defs[113].bought) {stock.time_bonus += dt/120}
}
function cultistTick(dt) {
	var cultist = special.cultist;
	cultist.max_blood = Math.floor(100+building_defs[1].count/2)
	if (upgrade_defs[18].bought) {cultist.max_blood+=50}
	if (upgrade_defs[71].bought) {cultist.max_blood+=50}
	if (upgrade_defs[141].bought) {cultist.max_blood+=10}
	if (upgrade_defs[302].bought) {cultist.max_blood+=20}
	if (upgrade_defs[77].bought) {cultist.max_blood+=Math.round(building_defs[6].count/5)}

	if ($("#cultist_menu").is(":visible")) {
		
		var building = building_defs[1];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#cultist_production").html(base_production * production_multiplier * building_count + " p/s ("+Math.round(((base_production * production_multiplier * building_count)/total_building_production) * 100) +"%)");
		
		$("#stats_blood").html("Blood: "+Math.round(cultist.blood));
		$("#stats_max_blood").html("Max Blood: "+Math.round(cultist.max_blood));
		$("#stats_rituals_performed").html("Total Rituals: "+Math.round(cultist.total_rituals));
		$("#stats_ritual_bonus").html("Ritual Bonus: "+Math.round(cultist.blood_bonus * 100)+"%");
		$("#blood_pool").css("height", (cultist.blood/cultist.max_blood)*116+"px");
		
		$("#cultist_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
	}
	
	if (cultist.blood < cultist.max_blood) {
		cultist.blood += dt * (cultist.max_blood/420);
		if (cultist.blood > cultist.max_blood) {cultist.blood = cultist.max_blood}
	}
	
	if (upgrade_defs[112].bought) {cultist.time_bonus += dt/120}
}
function performRitual(type, cost) {
	var cultist = special.cultist;
	if (upgrade_defs[144].bought) {cost -= 30}
	if (upgrade_defs[210].bought) {cost -= 40}
	if (cultist.blood >= cost) {
	if (upgrade_defs[144].bought) {cost += 30}
	if (upgrade_defs[210].bought) {cost += 40}
		switch (type) {
			case 0: 
				showMessage("ritual_0", "Ritual Sacrifice");
				cultist.blood_bonus += 0.02;
				break;
			case 1:
				buff_defs[3].activate(66);
				showMessage("ritual_1", "Blood Rush");
				break;
			case 2:
				cultist.cultist_bonus += 0.25
				showMessage("ritual_2", "NHS Meeting");
				break;
			case 3:
				if (!buff_defs[27].active) {
					clock_ticks += 40;
				} else {
					clock_ticks += Math.max(40 - buff_defs[27].stack_count * 10, 0);
				}
				bloody_timing_count += 1;
				
				if (bloody_timing_count >= 20) {
					upgrade_defs[230].available = true;
					buff_defs[27].activate(900);
				}
				
				showMessage("ritual_3", "Bloody Timing");
				break;
			case 4:
				if (Math.random() <= 0.2) {cultist.blood = 125 ;building_defs[1].count++;upgrade_defs[20].available = true;}
				showMessage("ritual_4", "Occult Construction");
				break;			
		}
		cultist.blood -= cost;
		cultist.total_rituals += 1;
		
		if (cultist.total_rituals >= 30) {upgrade_defs[17].available = true}
		if (cultist.total_rituals >= 90) {upgrade_defs[18].available = true}
		if (cultist.total_rituals >= 150) {upgrade_defs[19].available = true}
		
		if (cultist.total_rituals >= 20) {upgrade_defs[112].available = true}
		
		if (upgrade_defs[140].bought) {buff_defs[15].activate(600)}
		if (upgrade_defs[143].bought) {buff_defs[15].time += 10}

	}
	

}
function gamblerTick(dt) {
	var gambler = special.gambler;
	
	if ($("#gambler_menu").is(":visible")) {
		$("#roll_count").html(gambler.available_rolls+"/"+gambler.max_rolls+" Rolls")
		
		$("#gambler_seconds").html(Math.round(gambler.roll_time-gambler.time)+"s");
		
		var building = building_defs[0];
		var base_production = building.base_production;
		var production_multiplier = building.production_multiplier;
		var building_count = building.count;
		$("#gambler_production").html(building.shown_production + " p/s ("+Math.round(((building.shown_production)/total_building_production) * 100) +"%)")
		
		
		
		$("#gambler_price").html("Cost: "+fancyNumber(building.cost * Math.pow(building.cost_increase, building.count+window.buy_count-1)) +" ("+building.cost_increase+"x)");
	}
	if (upgrade_defs[111].bought) {gambler.time_bonus += dt/120}
	
	
	if (gambler.available_rolls < gambler.max_rolls) {
		gambler.time += dt;
	}
	if (gambler.time >= gambler.roll_time) {
		gambler.available_rolls++;
		gambler.time = 0;
		if (upgrade_defs[147].bought) {gambler.time += 10}
		if (upgrade_defs[213].bought) {gambler.time += 40}
	}
	gambler.max_rolls = 4 + Math.floor(building_defs[0].count/50);
	if (upgrade_defs[73].bought) {gambler.max_rolls += 2}
	if (upgrade_defs[147].bought) {gambler.max_rolls += 1}
}
function rollDie() {
	var gambler = special.gambler;
	if (gambler.available_rolls != 0) {
		var roll = Math.ceil(Math.random() * 6);
		gambler.available_rolls -= 1;
		gambler.total_rolls += 1;
		gambler.last_roll = gambler.current_roll;
		gambler.current_roll = roll;
		switch (roll) {
			case 1: 
				buff_defs[0].activate(33);
				showMessage("roller", "1: +100% production");
				if (gambler.last_roll == 1) {
					showMessage("roller", "Snake Eyes");
					buff_defs[2].activate(10);
					upgrade_defs[7].available = true;
				}
				break;
			case 2:
				buff_defs[1].activate(33);
				showMessage("roller", "2: -33% production");
				break;
			case 3:
				showMessage("roller", "3: +3% production permanently");
				gambler.gambling_bonus += 0.03;
				break;
			case 4:
				showMessage("roller", "4: -1% production permanently");
				gambler.gambling_bonus -= 0.01;
				break;
			case 5:
				showMessage("roller", "5: No Effect");
				break;
			case 6:
				showMessage("roller", "6: 2 extra rolls");
				gambler.available_rolls += 2;
				if (gambler.last_roll == 6) {
					showMessage("roller", "Boxcars");
					building_defs[0].count++;
				
					if (upgrade_defs[8].bought) {gambler.available_rolls += 2}
				}
				break;
			}
		//Unlocks Upgrades
		if (gambler.total_rolls >= 50) {upgrade_defs[8].available = true}
		if (gambler.total_rolls >= 150) {upgrade_defs[9].available = true}
		if (gambler.total_rolls >= 300) {upgrade_defs[10].available = true}
		if (gambler.total_rolls >= 12) {upgrade_defs[111].available = true}
		
		$("#stats_roll_count").html("Total Rolls: "+gambler.total_rolls);
		$("#stats_current_roll").html("Current Roll: "+gambler.current_roll);
		$("#stats_last_roll").html("Last Roll: "+gambler.last_roll);
		$("#stats_gambling_bonus").html("Gambling Bonus: "+Math.round(gambler.gambling_bonus*100) + "%");
		
		
		if (upgrade_defs[146].bought) {buff_defs[16].activate(600)}
		if (upgrade_defs[148].bought) {buff_defs[16].time += 10}
	}
}
