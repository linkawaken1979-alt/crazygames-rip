var graph_type = 0;
var production_stats = [0];
var gold_stats = [0];

function togglePowersaver(direction) {
	if (direction) {
		powersaver = true;
		$("#powersaver_on").css('background-color', '#05630d');
		$("#powersaver_off").css('background-color', '#820c06');
	} else {
		powersaver = false;
		$("#powersaver_on").css('background-color', '#820c06');
		$("#powersaver_off").css('background-color', '#05630d');
	}
}
function toggleFont(direction) {
	if (direction) {
		monospace = true;
		$("#font_on").css('background-color', '#05630d');
		$("#font_off").css('background-color', '#820c06');
		$('#body_font').css('font-family', 'Courier New');
		$('#body_font').css('font-weight:', 'bold');
	} else {
		monospace = false;
		$("#font_on").css('background-color', '#820c06');
		$("#font_off").css('background-color', '#05630d');
		$('#body_font').css('font-family', 'Autour One');
		$('#body_font').css('font-weight:', 'normal');
	}
}
function changeAutosave(time) {
	
	$(".change_autosave").css('background-color', '#5e3f23')

	switch (time) {
		case 10:
			$("#autosave_10").css('background-color', '#05630d')
		break;
		case 30:
			$("#autosave_30").css('background-color', '#05630d')
		break;
		case 60:
			$("#autosave_60").css('background-color', '#05630d')
		break;
		case 10e10:
			$("#autosave_never").css('background-color', '#05630d')
		break;
	}
	
	
	
	save_max_time = time;
}
function changeBackground(color) {
	$(".bgs").css("box-shadow", "none");
	background_color = color;
	switch (color) {
		case 0:
			$("#rightContent").css("background-image", "url('images/misc_black_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_black_noise.png')");
			$("#bg_black").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 1:
			$("#rightContent").css("background-image", "url('images/misc_aqua_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_aqua_noise.png')");
			$("#bg_aqua").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 2:
			$("#rightContent").css("background-image", "url('images/misc_blue_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_blue_noise.png')");
			$("#bg_blue").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 3:
			$("#rightContent").css("background-image", "url('images/misc_brown_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_brown_noise.png')");
			$("#bg_brown").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 4:
			$("#rightContent").css("background-image", "url('images/misc_green_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_green_noise.png')");
			$("#bg_green").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 5:
			$("#rightContent").css("background-image", "url('images/misc_purple_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_purple_noise.png')");
			$("#bg_purple").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
		case 6:
			$("#rightContent").css("background-image", "url('images/misc_red_noise.png')");
			$("#leftContent").css("background-image", "url('images/misc_red_noise.png')");
			$("#bg_red").css("box-shadow", "0px 0px 10px 5px rgb(255, 255, 255)");
			break;
	}
}

function updateGraph() {
	var c = document.getElementById("stats_canvas");
	var ctx = c.getContext("2d");
	
	ctx.strokeStyle="#01b216";
	ctx.lineWidth=4;
	ctx.lineCap="round";
	ctx.beginPath();
	ctx.clearRect(0, 0, c.width, c.height);
	
	clipStats();
	
	if (graph_type == 0) {
		var graph_max = 0;
		var graph_interval = Math.round(c.width/production_stats.length)
		var graph_counter = 0;
		var graph_prior = 250;
		
		for (i = 0; i < production_stats.length; i ++) {
			if (production_stats[i] >= graph_max) {graph_max = production_stats[i]}
		}
		
		ctx.font="20px Georgia";
		ctx.fillStyle = '#e3e582';
		ctx.fillText(fancyNumber(graph_max),2,20);
		ctx.fillText(fancyNumber(Math.round(graph_max/2)),2,138);
		
		for (i = 0; i < production_stats.length; i ++) {
		
			ctx.moveTo(graph_counter * graph_interval, graph_prior);
			ctx.lineTo((graph_counter+1) * graph_interval, 250 - ((production_stats[i]/graph_max) * 250))
			
			graph_prior = 250 - ((production_stats[i]/graph_max) * 250)
			graph_counter++;
			
			ctx.stroke();
		}
		
		$("#stats_button_production").attr('style', 'color:gold')
		$("#stats_button_gold").attr('style', 'color:red')
	}
	if (graph_type == 1) {
		var graph_max = 0;
		var graph_interval = Math.round(c.width/gold_stats.length)
		var graph_counter = 0;
		var graph_prior = 250;
		
		for (i = 0; i < gold_stats.length; i ++) {
			if (gold_stats[i] >= graph_max) {graph_max = gold_stats[i]}
		}
		
		ctx.font="20px Georgia";
		ctx.fillStyle = '#e3e582';
		ctx.fillText(fancyNumber(graph_max),2,20);
		ctx.fillText(fancyNumber(Math.round(graph_max/2)),2,138);
		
		for (i = 0; i < gold_stats.length; i ++) {
		
			ctx.moveTo(graph_counter * graph_interval, graph_prior);
			ctx.lineTo((graph_counter+1) * graph_interval, 250 - ((gold_stats[i]/graph_max) * 250))
			
			graph_prior = 250 - ((gold_stats[i]/graph_max) * 250)
			graph_counter++;
			
			ctx.stroke();
		}
		
		$("#stats_button_production").attr('style', 'color:red')
		$("#stats_button_gold").attr('style', 'color:gold')
	}
}


function tickGraph(dt) {
	graph_time -= dt;
	
	if (graph_time <= 0) {
		graph_time = 60;
		
		production_stats.push(Math.round(production))
		gold_stats.push(Math.round(gold))
		
		updateGraph();
	}
	
 }
 
 function clipStats() {
	if (production_stats.length >= 60) {
		for (i = 1; i < production_stats.length; i+= 2) {
			remove(production_stats, i)
		}
	}
 }
 
 
 function updateRawStats() {
	$("#stats_display_gold").html("Gold: "+fancyNumber(window.gold));
	$("#stats_display_production").html("Production: "+fancyNumber(window.production) + " p/s");
	$("#stats_total_click").html("Total Clicks: "+Math.round(stats.total_clicks));
	$("#stats_total_real_click").html("Total Real Clicks: "+Math.round(stats.total_real_clicks));
	
	if (stats.total_time <= 500) { 
		$("#stats_total_time").html("Total Time: "+Math.round(stats.total_time) + "s");
	}
	else if (stats.total_time <= 3600 * 3) {
		$("#stats_total_time").html("Total Time: "+Math.round(stats.total_time/60) + "m");
	}
	else {
		$("#stats_total_time").html("Total Time: "+Math.round(stats.total_time/3600) + "h");	
	}
	
	if (stats.total_real_time <= 500) { 
		$("#stats_total_real_time").html("Total Real Time: "+Math.round(stats.total_real_time) + "s");
	}
	else if (stats.total_real_time <= 3600 * 3) {
		$("#stats_total_real_time").html("Total Real Time: "+Math.round(stats.total_real_time/60) + "m");
	}
	else {
		$("#stats_total_real_time").html("Total Real Time: "+Math.round(stats.total_real_time/3600) + "h");	
	}

	
	stats.building_count = 0;
	for (var i = 0; i < building_defs.length; i++) {
		stats.building_count +=  building_defs[i].count;
	}
	var upgrade_count = 0;
	for (var i = 0; i < upgrade_defs.length; i++) {
		if (upgrade_defs[i].bought) {upgrade_count ++};
	}
	$("#stats_total_upgrades").html("Total Upgrades: "+Math.round(upgrade_count));	
	$("#stats_total_buildings").html("Total Buildings: "+Math.round(stats.building_count));
 }
 function updateStars() {
	if (star_count <= Math.sqrt(stats.building_count)) {
		star_count += 1;
		
		var star = $("<img></img>");
		star.attr('src', 'images/misc_star.png');
		star.attr('style', 'position:absolute;left:' + Math.round(Math.random() * 95) +'%;top:' + Math.round(Math.random() * 80) +'%')
		star.attr('height', '10px')
		star.attr('width', '10px')
		
		$("#star_container").append(star)
	}
 }
 
 function remove(array, index) {    
    if (index !== -1) {
        array.splice(index, 1);
    }
}