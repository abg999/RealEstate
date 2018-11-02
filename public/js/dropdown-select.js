function populate(s1,s2){
	var s1 = document.getElementById(s1);
	var s2 = document.getElementById(s2);
	s2.innerHTML = "";
	if(s1.value == "1"){
		var optionArray = ["|","Mumbai","Pune","Kalyan"];
	} else if(s1.value == "2"){
		var optionArray = ["|","Ahmedabad","Gandhinagar","Surat"];
	}
	for(var option in optionArray){
		var pair = optionArray[option].split("|");
		var newOption = document.createElement("option");
		newOption.value = option;
		newOption.innerHTML = pair[0];
		s2.options.add(newOption);
	}
}