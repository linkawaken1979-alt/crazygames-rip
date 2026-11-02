function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function fancyNumber(x) {
	//var x = toFixed(x)
	if (x < 1000000) {return (Math.ceil(x*10)/10).toFixed(1);}
	else if (x>=1e6 && x<1e9) {return roundPlace(x/1e6).toFixed(2)+" Million"}
	else if (x>=1e9 && x<1e12) {return roundPlace(x/1e9).toFixed(2)+" Billion"}
	else if (x>=1e12 && x<1e15) {return roundPlace(x/1e12).toFixed(2)+" Trillion"}
	else if (x>=1e15 && x<1e18) {return roundPlace(x/1e15).toFixed(2)+" Quadrillion"}
	else if (x>=1e18 && x<1e21) {return roundPlace(x/1e18).toFixed(2)+" Quintillion"}
	else if (x>=1e21 && x<1e24) {return roundPlace(x/1e21).toFixed(2)+" Sextillion"}
	else if (x>=1e24 && x<1e27) {return roundPlace(x/1e24).toFixed(2)+" Septillion"}
	else if (x>=1e27 && x<1e30) {return roundPlace(x/1e27).toFixed(2)+" Octillion"}
	else if (x>=1e30 && x<1e33) {return roundPlace(x/1e30).toFixed(2)+" Nonillion"}
	else if (x>=1e33 && x<1e36) {return roundPlace(x/1e33).toFixed(2)+" Decillion"}
	else if (x>=1e36 && x<1e39) {return roundPlace(x/1e36).toFixed(2)+" Undecillion"}
	else if (x>=1e39 && x<1e42) {return roundPlace(x/1e39).toFixed(2)+" Duodecillion"}
	else if (x>=1e42 && x<1e45) {return roundPlace(x/1e42).toFixed(2)+" Tredecillion"}
	else if (x>=1e45 && x<1e48) {return roundPlace(x/1e45).toFixed(2)+" Quaddecillion"}
	else if (x>=1e48 && x<1e51) {return roundPlace(x/1e48).toFixed(2)+" Quindecillion"}
	else if (x>=1e51 && x<1e54) {return roundPlace(x/1e51).toFixed(2)+" Sexdecillion"}
	else if (x>=1e54 && x<1e57) {return roundPlace(x/1e54).toFixed(2)+" Septendecillion"}
	else if (x>=1e57 && x<1e60) {return roundPlace(x/1e57).toFixed(2)+" Octodecillion"}
	else if (x>=1e60 && x<1e63) {return roundPlace(x/1e60).toFixed(2)+" Novemdecillion"}
	else if (x>=1e63 && x<1e66) {return roundPlace(x/1e63).toFixed(2)+" Vigintillion"}
	else if (x>=1e66 && x<1e69) {return roundPlace(x/1e66).toFixed(2)+" Unvigintillion"}
	else if (x>=1e69 && x<1e72) {return roundPlace(x/1e69).toFixed(2)+" Duovigintillion"}
	else if (x>=1e72 && x<1e75) {return roundPlace(x/1e72).toFixed(2)+" Trevigintillion"}
	else if (x>=1e75 && x<1e78) {return roundPlace(x/1e75).toFixed(2)+" Quattuorvigintillion"}
	else if (x>=1e78 && x<1e81) {return roundPlace(x/1e78).toFixed(2)+" Quinvigintillion"}
	else if (x>=1e81 && x<1e84) {return roundPlace(x/1e81).toFixed(2)+" Sexvigintillion"}
	else if (x>=1e84 && x<1e87) {return roundPlace(x/1e84).toFixed(2)+" Septenvigintillion"}
	else if (x>=1e87 && x<1e90) {return roundPlace(x/1e87).toFixed(2)+" Octovigintillion"}
	else if (x>=1e90 && x<1e93) {return roundPlace(x/1e90).toFixed(2)+" Novemvigintillion"}
	else if (x>=1e93 && x<1e96) {return roundPlace(x/1e93).toFixed(2)+" Trigintillion"}
	else if (x>=1e96 && x<1e99) {return roundPlace(x/1e96).toFixed(2)+" Untrigintillion"}
	else if (x>=1e99 && x<1e102) {return roundPlace(x/1e99).toFixed(2)+" Duotrigintillion"}
	else if (x>=1e102 && x<1e105) {return roundPlace(x/1e102).toFixed(2)+" Tretrigintillion"}
	else {return x}
}
function roundPlace(x) {
	return (Math.round(x*100)/100);
}
function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


function findPrice(building) {

var temp = 0;
var i = 0;

while (i < buy_count) {
temp += building.cost * (Math.pow(1.15,building.count+i))
i++
}

return temp;

}