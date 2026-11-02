Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
//kongregateAPI.loadAPI(function(){
//  window.kongregate = kongregateAPI.getAPI();
//});

function save() {
	save_time = 0;
	var save = {}
	save.date = Date.now();
	save.gold = gold;
	save.special = special;
	save.trade = trade;
	save.star_count = star_count;
	save.clock_ticks = clock_ticks;
	save.bloody_timing_count = bloody_timing_count;
	save.production = production;
	save.background_color = background_color;
	save.save_max_time = save_max_time;
	save.powersaver = powersaver;
	save.monospace = monospace;
	save.buildings = [];
	save.upgrades = [];
	save.buffs = [];
	save.stats = stats;
	save.production_stats = production_stats;
	save.tutorial_progress = tutorial_progress;
	
	for (i = 0; i < building_defs.length; i++) {
		save.buildings[i] = building_defs[i].count;
	}
	
	for (i = 0; i < upgrade_defs.length; i++) {
		save.upgrades[i] = [upgrade_defs[i].available, upgrade_defs[i].bought];
	}
	for (i = 0; i < buff_defs.length; i++) {
		save.buffs[i] = [buff_defs[i].time, buff_defs[i].stack_count, buff_defs[i].max_time];
	}
	localStorage.setObject("save", save);
	
	var load = localStorage.getObject('save');
	if (!load.special.automation) {save();}
	//if (kongregate) {kongScore();} //kong
}

function load() {
	var load = localStorage.getObject('save');
	
	if (load) { 
		if (load.special) {special = load.special;}
		if (load.stats) {stats = load.stats;}
		if (load.clock_ticks) {clock_ticks = load.clock_ticks}
		if (load.bloody_timing_count) {bloody_timing_count = load.bloody_timing_count}
		if (load.production_stats) {production_stats = load.production_stats;}
		if (load.production) {production = load.production}
		if (load.trade) {trade = load.trade}
		if (load.tutorial_progress) {tutorial_progress = load.tutorial_progress;}
		if (load.background_color) {background_color = load.background_color;changeBackground(background_color);}
		if (load.save_max_time) {save_max_time = load.save_max_time;changeAutosave(save_max_time);}
		if (load.powersaver) {powersaver = load.powersaver;togglePowersaver(powersaver);}
		if (load.monospace) {monospace = load.monospace;toggleFont(monospace);}
		
		if (!special.automation) {	
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
		}
		
		if (!special.temporal) {	
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
		}
		if (!special.asteroid) {
			special.asteroid =  {
				asteroid_bonus: 0,
			}		
		}
		if (!special.click) {
			special.click = {
				max_autoclicks: 2,
				current_autoclicks: [], //x,y,time
			}
		}	
		if (!special.merchant) {
			special.merchant = {
				drop_time: 360,
				upgrades: [295,296,297,298,299,300,301,302,303,304,305,306],
				upgrade_unlocked: 0,
				packages_obtained: 0,
				package_y: 0,
				merchant_bonus: 0,
			}
		}
		if (!special.black_hole) {
			special.black_hole = {
				karma_points: 0,
				total_karma_points: 0,
			}
		}		
		if (!special.trade) {	
			special.trade = {
				unlocked: false,
			}
		}
		if (load.star_count) {
			star_count = load.star_count
			for (i = 0; i < star_count; i++) {	
			var star = $("<img></img>");
			star.attr('src', 'images/misc_star.png');
			star.attr('style', 'position:absolute;left:' + Math.round(Math.random() * 95) +'%;top:' + Math.round(Math.random() * 100) +'%')
			star.attr('height', '10px')
			star.attr('width', '10px')			
			$("#star_container").append(star)
			}
		}
		gold = load.gold;
		
		var build = load.buildings;
		var upgrade = load.upgrades;
		var buff = load.buffs;
		if (build) {
			for (i = 0; i < build.length; i++) {
				building_defs[i].count = build[i];
				if (building_defs[i].count != 0) {
					building_defs[i].available = true;
					htmlBuilding(i);
				}
				
			}
			$(".building").show();
		}
		if (upgrade) {
			for (i = 0; i < upgrade.length; i++) {
				upgrade_defs[i].available = upgrade[i][0];
				upgrade_defs[i].bought = upgrade[i][1];
			}
		}
		if (buff) {
			for (i = 0; i < buff.length; i++) {
				if (buff[i][0] != 0) {buff_defs[i].activate(buff[i][0])}
				buff_defs[i].stack_count = buff[i][1];
				buff_defs[i].max_time = buff[i][2];
			}			
		}
		var last_date = load.date || Date.now();
		clock_ticks += (Math.floor((Date.now() - last_date)/1000)/20);
		if (special.temporal.blind_speed) {gold += production * Math.floor((Date.now() - last_date)/1000)/10}
		if (upgrade_defs[218].bought) {gold += production * Math.floor((Date.now() - last_date)/1000)/20}
		if (upgrade_defs[219].bought) {gold += production * Math.floor((Date.now() - last_date)/1000)/20}
	}
	else {
		clock_ticks = 180
	}
	
	
	updateFixer();
	
	$("#stats_roll_count").html("Total Rolls: "+special.gambler.total_rolls);
	$("#stats_current_roll").html("Current Roll: "+special.gambler.current_roll);
	$("#stats_last_roll").html("Last Roll: "+special.gambler.last_roll);
	$("#stats_gambling_bonus").html("Gambling Bonus: "+Math.round(special.gambler.gambling_bonus*100) + "%");
	
	loadDom();
	updateShrineCount();
}

function updateFixer(){
	if (!stats.total_real_clicks) {stats.total_real_clicks = 0}
	if (!special.mine.click_amount) {special.mine.click_amount = 60;}
}

function tickSave(rt) {
	save_time += rt;
	
	if (save_time >= save_max_time) {
		save_time = 0;
		save();
	}

	$("#save_element").css('height', save_time/save_max_time*36 + "px")
	
}

function wipeSave(confirmation) {
	if (confirmation == 0) {
		if (wipe_save) {wipe_save = false;$("#wipe_save").attr('style', 'background-color:#820c06;border: 3px solid black;border-radius:3px;');}
		else if (!wipe_save) {wipe_save = true;$("#wipe_save").attr('style', 'background-color:#05630d;border: 3px solid black;border-radius:3px;');}
	} 
	if (confirmation == 1) {
		if (confirm_wipe) {confirm_wipe = false;$("#wipe_confirmation").attr('style', 'background-color:#820c06;border: 3px solid black;border-radius:3px;');}
		else if (!confirm_wipe) {confirm_wipe = true;$("#wipe_confirmation").attr('style', 'background-color:#05630d;border: 3px solid black;border-radius:3px;');}
	}
	
	if (wipe_save && confirm_wipe) {
		localStorage.clear();
		location.reload();
	}
}

function loadDom() {
	//updates automation stuff
	var automation = special.automation
	$('#automation_count').html(special.automation.tasks);	
	$('#autoclick_count').html(special.automation.autoclicks);
	if (automation.gambler) {$("#gambler_autobuy").attr('src', $("#gambler_autobuy").attr('data-on'))}
	if (automation.cultist) {$("#cultist_autobuy").attr('src', $("#cultist_autobuy").attr('data-on'))}
	if (automation.mine) {$("#mine_autobuy").attr('src', $("#mine_autobuy").attr('data-on'))}
	if (automation.factory) {$("#factory_autobuy").attr('src', $("#factory_autobuy").attr('data-on'))}
	if (automation.research) {$("#research_autobuy").attr('src', $("#research_autobuy").attr('data-on'))}
	if (automation.stock) {$("#stock_autobuy").attr('src', $("#stock_autobuy").attr('data-on'))}
	if (automation.temple) {$("#temple_autobuy").attr('src', $("#temple_autobuy").attr('data-on'))}
	
	if (automation.autoupgrade) {
		$("#autoupgrade_on").attr('style', 'color:green');
		$("#autoupgrade_off").attr('style', 'color:white');	
	}
	else {
		$("#autoupgrade_off").attr('style', 'color:green');	
	}
	
	
	
	var temporal = special.temporal;
	if (temporal.bottle) {$("#time_bottle").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.fast_forward) {$("#time_fast_forward").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.fast_clicking) {$("#time_fast_click").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.tortoise) {$("#time_tortoise").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.endless) {$("#time_endless").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.blind_speed) {$("#time_speed").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.profits) {$("#time_profits").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	if (temporal.drain) {$("#time_drain").attr('style', 'box-shadow: 0px 0px 20px rgb(0, 255, 0);');}
	$("#temporal_count").html(temporal.tasks);
}
//function kongScore() {
//	//kong
//	kongregate.stats.submit('Total Clicks', stats.total_real_clicks);
//	kongregate.stats.submit('Total Buildings', stats.building_count);
//	kongregate.stats.submit('Score', Math.floor(Math.log(gold)));
//}