buff_defs = [];

function createBuff(id, x, y, name, tooltip, formula, buff, stack) {
   var self = {
		id : id,
		x: x,
		y: y,
		name: name,
		buff: buff,
		tooltip: tooltip,
		time: 0,
		max_time: 0,
		stack_count: 1,
		formula: formula,
		active: false,		
		activate: function(times){
			if (!this.stack || !this.active) {
				this.active = true;
				this.time += times;
				if (upgrade_defs[89].bought) {this.time *= 1.2}
				if (upgrade_defs[197].bought) {this.time *= 1.1}
				if (upgrade_defs[297].bought) {this.time *= 1.05}
				if (special.shrine.reset_count >= 5 && this.buff) {this.time *= 1 + 0.01 * special.shrine.reset_count}
				this.max_time = this.time;
			}
			else {
				this.stack_count++;
			}
		},
		update: function(dt) {
			if (this.active) {
				if (special.temporal.tortoise) {this.time -= dt/(game_speed*0.1 + 1)}
				else {this.time -= dt;}
				if (this.time <= 0) {
					this.time = 0;
					this.active = false;
					this.stack_count = 1;
					hideTooltip();
				}
			}
		}
  };
  if (stack) {self.stack = true} else {self.stack = false}
  return self;
}
function initBuffs() {
	/* 0 */buff_defs.push(createBuff('lucky_1', 0, 0, 'Lucky 1','Increases production by 100%.', function() {window.total_production_multiplier *= 2}, true)); 
	/* 1 */buff_defs.push(createBuff('unlucky_2', 1, 0, 'Unlucky 2','Decreaes production by 33%.', function() {window.total_production_multiplier /= 1.33}, false)); 
	/* 2 */buff_defs.push(createBuff('snake_eyes', 2, 0, 'Snake Eyes','Increases production by 33%.', function() {window.total_production_multiplier *= 1.33}, true));
	/* 3 */buff_defs.push(createBuff('blood_rush', 3, 0, 'Blood Rush','Increases production by 75%.', function() {window.total_production_multiplier *= 1.75}, true));
	/* 4 */buff_defs.push(createBuff('blessing_of_huitzilopochtli', 4, 0, 'Blessing of Huitzilopochtli','Each click grants an additional 1 second worth of production.', function() {window.click_production_multiplier += 1}, true));
	/* 5 */buff_defs.push(createBuff('favor_of_huitzilopochtli', 4, 0, 'Favor of Huitzilopochtli','Autoclicks 5 times per second.', function() {window.autoclicks += 5}, true));
	/* 6 */buff_defs.push(createBuff('blessing_of_quetzalcoatl', 5, 0, 'Blessing of Quetzalcoatl','Building prices are 10% cheaper.', function() {window.cost_multiplier /= 1.1}, true));
	/* 7 */buff_defs.push(createBuff('favor_of_tlaloc', 6, 0, 'Favor of Tlaloc','Production is increased by 80%.', function() {window.total_production_multiplier *= 1.8}, true));
	/* 8 */buff_defs.push(createBuff('displeasure_of_huitzilopochtli', 4, 0, 'Displeasure of Huitzilopochtli','Percentage based clicking rewards are useless.', function() {window.click_production_multiplier *= 0}, false));
	/* 9 */buff_defs.push(createBuff('displeasure_of_quetzalcoatl', 5, 0, 'Displeasure of Quetzalcoatl','Buildings are 10% more expensive.', function() {window.cost_multiplier *= 1.1}, false));
	/* 10 */buff_defs.push(createBuff('displeasure_of_tlaloc', 6, 0, 'Displeasure of Tlaloc','Production is reduced by 50% for 30 seconds.', function() {window.total_production_multiplier /= 1.5}, false));
	/* 11 */buff_defs.push(createBuff('displeasure_of_tezcatlipoca', 6, 0, 'Displeasure of Tezcatlipoca','Time goes really really slow for 15 seconds.', function() {}, false));
	/* 12 */buff_defs.push(createBuff('bountiful_blood', 9, 0, 'Bountiful Blood','Increases production by 10%.', function() {window.total_production_multiplier *= 1.1}, true, true));
	/* 13 */buff_defs.push(createBuff('feast', 0, 1, 'Feast','Doubles production.', function() {window.total_production_multiplier *= 2}, true, true));
	/* 14 */buff_defs.push(createBuff('golden_boost', 1, 1, 'Golden Boost','Increases production by 75%.', function() {window.total_production_multiplier *= 1.75}, true, false));
	/* 15 */buff_defs.push(createBuff('ritual_bonus', 3, 0, 'Ritual Bonus','Increases production by 1%.', function() {window.total_production_multiplier *= 1.01}, true, true));
	/* 16 */buff_defs.push(createBuff('gambling_bonus', 2, 0, 'Gambling Bonus','Increases production by 1%.', function() {window.total_production_multiplier *= 1.01}, true, true));
	/* 17 */buff_defs.push(createBuff('gilded_bonus', 1, 1, 'Gilded Bonus','Increases production by 20%.', function() {window.total_production_multiplier *= 1.2}, true, true));
	/* 18 */buff_defs.push(createBuff('overcharge', 2, 1, 'Overcharge','Increases production by 70%.', function() {window.total_production_multiplier *= 1.70}, true));
	/* 19 */buff_defs.push(createBuff('lightning_fast_clicking', 3, 1, 'Lightning Fast Clicking','Autoclicks 10 times per second.', function() {window.autoclicks += 10}, true));
	/* 20 */buff_defs.push(createBuff('lightning_storm', 4, 1, 'Lightning Storm','Increases production by 20%.', function() {total_production_multiplier *= 1.20}, true, true));
	/* 21 */buff_defs.push(createBuff('absolute_zero', 5, 1, 'Absolute Zero','Prevents the activation of any buffs.', function() {for (i = 0; i < buff_defs.length; i++) {if (!(i == 21)) {buff_defs[i].time = 0;}}}, true, false));
	/* 22 */buff_defs.push(createBuff('snowballing_boost', 6, 1, 'Snowballing Boost','Increases production by 20% + 2% per 20 snowballs obtained this game.', function() {window.total_production_multiplier *= (1.2 + 0.001 * special.wasteland.snowballs_obtained)}, true, false));
	/* 23 */buff_defs.push(createBuff('acid_rain', 7, 1, 'Acid Rain','Lose 1% of total wealth every second.', function() {}, false, false));
	/* 24 */buff_defs.push(createBuff('sweltering_heat', 8, 1, 'Sweltering Heat','Production is reduced to 1/3.', function() {total_production_multiplier *= 0.33}, false, false));
	/* 25 */buff_defs.push(createBuff('loss_of_direction', 9, 1, 'Loss of Direction','Production is reduced to nothing.', function() {total_production_multiplier *= 0}, false, false));
	/* 26 */buff_defs.push(createBuff('bf_mysterious_clicking', 0, 2, 'Mysterious Clicking','Increases production by 0.4%.', function() {total_production_multiplier *= 1.004}, true, true));
	/* 27 */buff_defs.push(createBuff('sick_of_time', 1, 2, 'Deformed Time','Each stack reduces the amount of ticks granted from bloody timing by 10.', function() {}, false, true));
}
function htmlBuff(id) {
	var buff = buff_defs[id];
	var buff_x = -buff.x * 48;
	var buff_y = -buff.y * 48;
	var buff_background = "";
	
		if (buff.buff) {buff_background = "buff_green"}
		else {buff_background = "buff_red"}
		
	var buff_element = $("<div></div>");
	buff_element.attr("id", buff.id);
	buff_element.attr("class", "buff");
	buff_element.attr("onmouseleave", "hideTooltip()");
	//buff_element.attr("onclick", "upgrade_defs["+id+"].buy()");
	buff_element.attr("onmouseover", "showTooltip(this.id, 'url(images/buff_sheet.png)"+buff_x+"px "+buff_y+"px', '"+buff.name+"', '"+buff.tooltip+"', true)");
	buff_element.attr("style", "position:relative;float:left;height:64px;width:64px;background:url(images/"+buff_background+".png);");
	
	var buff_icon = $("<div></div>");
	//buff_element.attr("onmouseover", "showTooltip(this.id, 'url(images/buff_sheet.png)"+buff_x+"px "+buff_y+"px', '"+buff.name+"', '"+buff.tooltip+"')");
	buff_icon.attr("style", "position:absolute;left:8px;top:8px;height:48px;width:48px;background:url(images/buff_sheet.png) "+buff_x+"px "+buff_y+"px;");
	var buff_time = $("<div></div>");
	buff_time.attr("id", "buff_"+id);
	buff_time.attr("style", "position:absolute;left:0px;top:0px;height:64px;width:64px;background-color:#000000;opacity:0.5;");
	
	$(buff_element).append(buff_icon);
	$(buff_element).append(buff_time);
	if (buff.stack) {
		var buff_stack = $("<div></div>");	
		buff_stack.attr("style", "position:absolute;bottom:8px;right:8px;");	
		buff_stack.html(buff.stack_count);
		$(buff_element).append(buff_stack);
	}
	$("#centerContent").append(buff_element);
	
	//blueprints_bought++;
}

function updateBuffs() {
	hideBuffs();
	
	for (var i = 0; i < buff_defs.length; i++) {
		var buff = buff_defs[i];
		if (buff.active) {
			htmlBuff(i);
			buff_x = -buff.x * 48;
			buff_y = -buff.y * 48;
			var distance = buff.time/buff.max_time * 64;
			var y = 64 - distance;
			$("#"+buff.id).attr("onmouseover", "showTooltip(this.id, 'url(images/buff_sheet.png)"+buff_x+"px "+buff_y+"px', '"+buff.name+"', '"+buff.tooltip+"<br>"+Math.round(buff.time)+"s left', true)");
			$("#buff_"+i).attr("style", "position:absolute;left:0px;top:"+y+"px;height:"+distance+"px;width:64px;background-color:#000000;opacity:0.5")
		}
	}
}

function hideBuffs() {
	$("#centerContent").find(".buff").each(function(i, obj) {
			obj.remove();
	});
}

/*
			<!â€“
			<img id="button_console" onclick="if ($('#console_menu').is(':visible')) {$('#console_menu').hide();} else {$('#stats_menu').hide();$('#options_menu').hide();$('#upgrades_menu').hide();$('#console_menu').show();}" class="side_button" src="images/button_console.png" style="position:absolute;left:5px;top:262px"/>
			->
*/