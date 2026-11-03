var trade = {
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

function exec_trade(trade_id) {
	switch (trade_id) {
	
		//Blood
		
		case 0: 
			if (special.cultist.blood >= 120) {
				special.cultist.blood -= 120;
				trade.blood_container += 1;
			}
			break;
		case 1:
			if (trade.blood_container >= 2) {
				trade.blood_container -= 2;
				trade.blood_bonus += 1;
			}
			break;
		case 2: 
			if (trade.blood_container >= 8 && trade.blood_upgrades[trade.blood_upgrade_count]) {
				trade.blood_container -= 8;	
				upgrade_defs[trade.blood_upgrades[trade.blood_upgrade_count]].available = true;
				trade.blood_upgrade_count ++;
			}
			break;
		case 3:
			if (trade.blood_container >= 1) {
				trade.blood_container -= 1;
				if (Math.random() >= 0.05 * buff_defs[12].stack_count- 0.5) {buff_defs[12].activate(600);}
			}
			break;
			
		//Luck	
		
		case 4: 
			if (special.gambler.available_rolls >= 5) {
				special.gambler.available_rolls -= 5;
				trade.clover += 1;
			}
			break;
		case 5:
			if (trade.clover >= 2) {
				if (Math.random() <= 0.5) {
					buff_defs[13].activate(180);
				}
				else {
					for (i = 0; i<=buff_defs.length; i++) {
						if (buff_defs[i] && buff_defs[i].buff) {
							buff_defs[i].time = 0.00001;
						}
					}		
				}
				trade.clover -= 2;
			}
			break;
		case 6: 
			if (trade.clover >= 8 && trade.luck_upgrades[trade.luck_upgrade_count]) {
				trade.clover -= 8;	
				upgrade_defs[trade.luck_upgrades[trade.luck_upgrade_count]].available = true;
				trade.luck_upgrade_count ++;
			}
			break;
		case 7:
			if (trade.clover >= 2) {
				trade.luck_bonus++;
				trade.clover -= 2;
			}
			break;
		//Gold
		
		case 8:
			if (special.mine.gold >= 2) {
				special.mine.gold -= 2;
				special.research.research_points += 1;
			}
			break;
		case 9:
			if (special.mine.gold >= 1) {
				special.mine.gold -= 1;
				trade.gold_bonus++;
			}			
			break;
		case 10:
			if (special.mine.gold >= 1) {
				special.mine.gold -= 1;
				buff_defs[14].activate(180)
			}
			break;
		case 11: 
			if (special.mine.gold >= 2 && trade.gold_upgrades[trade.gold_upgrade_count]) {
				special.mine.gold -= 2;	
				upgrade_defs[trade.gold_upgrades[trade.gold_upgrade_count]].available = true;
				trade.gold_upgrade_count ++;
			}
			break;
		//Gears
		case 12:
			if (special.factory.gears >= 20) {
				special.factory.gears -= 20;
				trade.machine++;
			}
			break;
		case 13:
			if (trade.machine >= 20) {
				trade.machine -= 20;
				trade.machine_click++;
			}	
			break;
		case 14:
			if (trade.machine >= 2) {
				trade.machine_bonus ++;
				trade.machine -= 2;
			}
			break;
	}
}



function updateTrade(dt) {
	if ($("#trade_menu_tab").is(":visible")) {
		$("#capsule_count").html(trade.blood_container);
		$("#clover_count").html(trade.clover);
		$("#gold_bar_count").html(special.mine.gold);
		$("#machine_count").html(trade.machine);
	}
	
	
	if (upgrade_defs[136].bought) {
		trade.hour_time -= dt;
		
		if (trade.hour_time <= 0) {
			trade.hour_time = 3600;
			if (upgrade_defs[136].bought) {trade.blood_container ++}
			if (upgrade_defs[137].bought) {trade.clover ++}
			if (upgrade_defs[138].bought) {trade.machine ++}
		}
	}
}