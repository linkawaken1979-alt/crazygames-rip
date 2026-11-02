function unlockUpgrades() {
	if (stats.total_clicks >= 1) {unlockUpgrade(0)}
	if (stats.total_clicks >= 70) {unlockUpgrade(91)}
	if (stats.total_clicks >= 150) {unlockUpgrade(92)}
	if (stats.total_clicks >= 300) {unlockUpgrade(93)}
	if (stats.total_clicks >= 500) {unlockUpgrade(94)}
	if (stats.total_clicks >= 1000) {unlockUpgrade(95)}
	if (stats.total_clicks >= 1500) {unlockUpgrade(96)}
	if (stats.total_clicks >= 2000) {unlockUpgrade(97)}
	if (stats.total_clicks >= 2500) {unlockUpgrade(98)}
	if (stats.total_clicks >= 3000) {unlockUpgrade(99)}
	if (stats.total_clicks >= 3500) {unlockUpgrade(100)}
	
	
	if (gold >= 1000) {unlockUpgrade(101)}
	if (gold >= 10000) {unlockUpgrade(102)}
	if (gold >= 100000) {unlockUpgrade(103)}
	if (gold >= 1000000) {unlockUpgrade(104)}
	if (gold >= 10000000) {unlockUpgrade(105)}
	if (gold >= 100000000) {unlockUpgrade(106)}
	if (gold >= 1000000000) {unlockUpgrade(107)}
	if (gold >= 10000000000) {unlockUpgrade(108)}
	if (gold >= 100000000000) {unlockUpgrade(109)}
	if (gold >= 100000000000 && building_defs[3].count >= 1) {unlockUpgrade(27)}
	if (gold >= 1000000000000) {unlockUpgrade(110)}
	if (gold >= 1e15) {unlockUpgrade(222)}
	
	if (gold >= 1e12 && building_defs[0].count >= 100) {unlockUpgrade(223)}
	if (gold >= 1e12 && building_defs[1].count >= 100) {unlockUpgrade(224)}
	if (gold >= 1e12 && building_defs[3].count >= 100) {unlockUpgrade(225)}
	if (gold >= 1e12 && building_defs[4].count >= 100) {unlockUpgrade(226)}
	if (gold >= 1e12 && building_defs[5].count >= 100) {unlockUpgrade(227)}
	if (gold >= 1e12 && building_defs[2].count >= 100) {unlockUpgrade(228)}
	if (gold >= 1e12 && building_defs[6].count >= 100) {unlockUpgrade(229)}
	
	if (gold >= 30 && building_defs[0].count >= 1) {unlockUpgrade(247)}
	if (gold >= 30 && building_defs[1].count >= 1) {unlockUpgrade(248)}
	if (gold >= 30 && building_defs[3].count >= 1) {unlockUpgrade(249)}
	if (gold >= 30 && building_defs[4].count >= 1) {unlockUpgrade(250)}
	if (gold >= 30 && building_defs[5].count >= 1) {unlockUpgrade(251)}
	if (gold >= 30 && building_defs[6].count >= 1) {unlockUpgrade(252)}
	if (gold >= 30 && building_defs[2].count >= 1) {unlockUpgrade(253)}

	if (gold >= 1000000 && building_defs[0].count >= 40) {unlockUpgrade(264)}
	if (gold >= 1000000 && building_defs[1].count >= 40) {unlockUpgrade(265)}
	if (gold >= 1000000 && building_defs[3].count >= 40) {unlockUpgrade(266)}
	if (gold >= 1000000 && building_defs[4].count >= 40) {unlockUpgrade(267)}
	if (gold >= 1000000 && building_defs[5].count >= 40) {unlockUpgrade(268)}
	if (gold >= 1000000 && building_defs[6].count >= 40) {unlockUpgrade(269)}
	if (gold >= 1000000 && building_defs[2].count >= 40) {unlockUpgrade(270)}	
	
	if (gold >= 1e8) {unlockUpgrade(231)}
	if (gold >= 1e11) {unlockUpgrade(232)}
	
	if (gold >= 5000000000) {unlockUpgrade(233)}
	if (gold >= 500000000000) {unlockUpgrade(234)}
	if (gold >= 50000000000000) {unlockUpgrade(235)}
	if (gold >= 5000000000000000) {unlockUpgrade(236)}
	
	if (gold >= 1e15) {unlockUpgrade(237)}
	if (gold >= 1e16) {unlockUpgrade(238)}
	if (gold >= 1e17) {unlockUpgrade(239)}
	if (gold >= 1e18) {unlockUpgrade(240)}
	if (gold >= 1e19) {unlockUpgrade(241)}
	if (gold >= 1e20) {unlockUpgrade(242)}
	if (gold >= 1e21) {unlockUpgrade(243)}
	if (gold >= 1e22) {unlockUpgrade(244)}
	if (gold >= 1e23) {unlockUpgrade(245)}
	if (gold >= 1e24) {unlockUpgrade(246)}

	
	if (special.automation.unlocked) {
		if (gold >= 5000000000) {unlockUpgrade(125)}	
		if (gold >= 25000000000) {unlockUpgrade(126)}	
		if (gold >= 125000000000) {unlockUpgrade(127)}	
		if (gold >= 625000000000) {unlockUpgrade(128)}	
		if (gold >= 3000000000000) {unlockUpgrade(129)}	
	}
	
	if (special.temporal.unlocked) {
		if (gold >= 5000000000) {unlockUpgrade(130)}	
		if (gold >= 25000000000) {unlockUpgrade(131)}	
		if (gold >= 125000000000) {unlockUpgrade(132)}	
		if (gold >= 625000000000) {unlockUpgrade(133)}	
		if (gold >= 3000000000000) {unlockUpgrade(134)}	
	}
	
	if (special.trade.unlocked) {
		if (gold >= 5000000000) {unlockUpgrade(135)}	
		if (gold >= 25000000000) {unlockUpgrade(136)}
		if (gold >= 125000000000) {unlockUpgrade(137)}	
		if (gold >= 625000000000) {unlockUpgrade(138)}	
		if (gold >= 3000000000000) {unlockUpgrade(139)}	
	}
	
	
	if (building_defs[0].count >= 15) {upgrade_defs[118].available = true;}
	if (building_defs[1].count >= 15) {upgrade_defs[119].available = true;}
	if (building_defs[3].count >= 15) {upgrade_defs[120].available = true;}
	if (building_defs[4].count >= 15) {upgrade_defs[121].available = true;}
	if (building_defs[2].count >= 15) {upgrade_defs[122].available = true;}
	if (building_defs[5].count >= 15) {upgrade_defs[123].available = true;}
	if (building_defs[6].count >= 15) {upgrade_defs[124].available = true;}

	timeUnlocks();
}
function dateUnlocks() {
	//var day = new Date();
	//if (day.getMonth() == 0 && day.getDate() == 1) {}

}
function timeUnlocks() {
	if (gold >= 100000) {upgrade_defs[254].available = true}	
	if (gold >= 1000000 && stats.total_time>=3600 * 2) {upgrade_defs[255].available = true}	
	if (gold >= 10000000 && stats.total_time>=3600 * 4) {upgrade_defs[256].available = true}	
	if (gold >= 100000000 && stats.total_time>=3600 * 6) {upgrade_defs[257].available = true}	
	if (gold >= 1000000000 && stats.total_time>=3600 * 8) {upgrade_defs[258].available = true}	
	if (gold >= 10000000000 && stats.total_time>=3600 * 10) {upgrade_defs[259].available = true}	
	if (gold >= 100000000000 && stats.total_time>=3600 * 12) {upgrade_defs[260].available = true}	
	if (gold >= 1000000000000 && stats.total_time>=3600 * 14) {upgrade_defs[261].available = true}	
	if (gold >= 10000000000000 && stats.total_time>=3600 * 16) {upgrade_defs[262].available = true}	
	if (gold >= 100000000000000 && stats.total_time>=3600 * 18) {upgrade_defs[263].available = true}	
}

function unlockUpgrade(id) {
	upgrade = upgrade_defs[id]
	if (!upgrade.bought) {
		upgrade.available = true;
	}
}