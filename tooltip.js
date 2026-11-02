function hideTooltip() {
   $("#tooltip").hide();
   $("#tooltip").offset({ top: (-500), left: (-500)})
   
   buff_tooltip_show = false
}
function showTooltip(element, icon, title, text, is_buff) {
   $("#tooltip").show();
   var offset = $("#"+element).offset();
   var height = $("#"+element).height();
   var width = $("#"+element).width();

	if (width) {
	   $("#tooltip").offset({ top: (offset.top - height/2), left: (offset.left + width)})
	   
	   $("#tooltip_title").html(title);
	   $("#tooltip_text").html(text);
	   $("#tooltip_icon").attr( "style", "background-size: 48px 48x;height:48;width:48;float:left;background:"+icon+";");
	  
	  
	   if (is_buff) {
		buff_tooltip_show = true;
		buff_tooltip = $("#"+element).attr("onmouseover");
		buff_tooltip = buff_tooltip.replace('this.id', "'" + $('#'+element).attr('id') + "'");
	   }
   } else {
		console.log('tooltip error');
   }
}

function updateBuffTooltip() {
	if (buff_tooltip_show) {
		eval(buff_tooltip)
	}
}
function showMessage(element, text) {
	$("#popup_text").show();

   var offset = $("#"+element).offset();
   var height = $("#"+element).height();
   var width = $("#"+element).width();
   
	$("#popup_text").css("opacity", "0.8");   
    $("#popup_text").html(text);
	var popup_width = $("#popup_text").width()/2;
	$("#popup_text").offset({ top: (offset.top - height/2), left: (offset.left + width/2 - popup_width)})
}

document.addEventListener('keydown', (event) => {
  var key = event.key;
  if (shown_tier == 1) {
	  if (key == '1' && building_defs[0].count >= 1) {toggleBuildingMenu(event, 'gambler_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Gambler').addClass('selected_tab');}}
	  if (key == '2' && building_defs[1].count >= 1) {toggleBuildingMenu(event, 'cultist_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Cultist').addClass('selected_tab');}}
	  if (key == '3' && building_defs[2].count >= 1) {toggleBuildingMenu(event, 'research_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Research').addClass('selected_tab');}}
	  if (key == '4' && building_defs[3].count >= 1) {toggleBuildingMenu(event, 'stock_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Stock').addClass('selected_tab');}}
	  if (key == '5' && building_defs[4].count >= 1) {toggleBuildingMenu(event, 'mine_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Mine').addClass('selected_tab');}}
	  if (key == '6' && building_defs[5].count >= 1) {toggleBuildingMenu(event, 'factory_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Factory').addClass('selected_tab');}}
	  if (key == '7' && building_defs[6].count >= 1) {toggleBuildingMenu(event, 'temple_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Temple').addClass('selected_tab');}}
  }
  else if (shown_tier == 2) {
	  if (key == '1' && building_defs[7].count >= 1) {toggleBuildingMenu(event, 'power_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Power').addClass('selected_tab');}}
	  if (key == '2' && building_defs[8].count >= 1) {toggleBuildingMenu(event, 'shrine_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Shrine').addClass('selected_tab');}}
	  if (key == '3' && building_defs[9].count >= 1) {toggleBuildingMenu(event, 'wasteland_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Wasteland').addClass('selected_tab');}}
	  if (key == '4' && building_defs[10].count >= 1) {toggleBuildingMenu(event, 'banks_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Bank').addClass('selected_tab');}}
	  if (key == '5' && building_defs[11].count >= 1) {toggleBuildingMenu(event, 'alien_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Alien').addClass('selected_tab');}}	  
	  if (key == '6' && building_defs[12].count >= 1) {toggleBuildingMenu(event, 'propaganda_menu');$('.tab_icon').removeClass('selected_tab');if (menu_type != 0) {$('#tab_Propaganda').addClass('selected_tab');}}	  
  }
  
  if (key == 'Tab') {
	  event.preventDefault();
	  if (shown_tier == 1) {shown_tier ++;$('.tier').hide();$('#tier_2').show();}
	  else {shown_tier = 1;$('.tier').hide();$('#tier_1').show();}
  }
  if (key == 'Escape') {
	closeBuildingMenu();
	$('.tab_icon').removeClass('selected_tab');
  }
  
  if (key == 'f') {
	if ($("#gambler_menu").is(":visible")) {refill(0)}
	else if ($("#cultist_menu").is(":visible")) {refill(1)}
	else if ($("#factory_menu").is(":visible")) {refill(2)}
  }
  else if (key == 'q') {
	if ($("#gambler_menu").is(":visible")) {rollDie();}	  
	if ($("#cultist_menu").is(":visible")) {performRitual(0, 125)}
	if ($("#research_menu").is(":visible")) {research(0)}
	if ($("#factory_menu").is(":visible")) {factoryUpgrade(0)}
	if ($("#power_menu").is(":visible")) {performEnergy(0, 60)}
	if ($("#wasteland_menu").is(":visible")) {activateSnow(0)}
  }
  else if (key == 'w') { 
	if ($("#cultist_menu").is(":visible")) {performRitual(1, 70)}
	if ($("#research_menu").is(":visible")) {research(1)} 
	if ($("#factory_menu").is(":visible")) {factoryUpgrade(1)}
	if ($("#power_menu").is(":visible")) {performEnergy(1, 75)}
	if ($("#wasteland_menu").is(":visible")) {activateSnow(1)}
  }
   else if (key == 'e') { 
	if ($("#cultist_menu").is(":visible")) {performRitual(2, 25)}
	if ($("#research_menu").is(":visible")) {research(2)}
	if ($("#factory_menu").is(":visible")) {factoryUpgrade(2)}
	if ($("#power_menu").is(":visible")) {performEnergy(2, 100)}
	if ($("#wasteland_menu").is(":visible")) {activateSnow(2)}
  }
   else if (key == 'r') { 
	if ($("#cultist_menu").is(":visible")) {performRitual(3, 50)}
	if ($("#power_menu").is(":visible")) {performEnergy(3, 50)}	
  }
  else if (key == 't') { 
	if ($("#cultist_menu").is(":visible")) {performRitual(4, 125)}
	if ($("#power_menu").is(":visible")) {performEnergy(4, 50)}	
  }
});