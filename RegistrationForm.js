function validateinfo()
{
	var fcheck = checkName("fname");
	var lcheck = checkName("lname");
	var ucheck = checkName("username");
	var passcheck = checkPass("password");
	var echeck = checkEmail("email");
	var pcheck = checkPhone("phone");
	var acheck = checkAddress("address");
	var fimg = getImage(fcheck, 1, "This field must be alphanumeric");
	var limg = getImage(lcheck, 2, "This field must be alphanumeric");
	var uimg = getImage(ucheck, 3, "This field must be alphanumeric");
	var passimg = getImage(passcheck, 4, "Your password must be at least 8 characters long");
	var gimg = getImage(true, 5);
	var simg = getImage(true, 6);
	var eimg = getImage(echeck, 7, "Must be in the form xxx@xxx.xxx and x must be alphanumeric");
	var pimg = getImage(pcheck, 8, "Must be in the form xxx-xxx-xxxx or xxxxxxxxxx and x must be numeric");
	var aimg = getImage(acheck, 9, "Must be in the form of city,state. Ex. Ames,IA");
	document.getElementById("FName").appendChild(fimg[0]);
	document.getElementById("LName").appendChild(limg[0]);
	document.getElementById("Gender").appendChild(gimg[0]);
	document.getElementById("State").appendChild(simg[0]);
	document.getElementById("Username").appendChild(uimg[0]);
	document.getElementById("Password").appendChild(passimg[0]);
	document.getElementById("Email").appendChild(eimg[0]);
	document.getElementById("Phone").appendChild(pimg[0]);
	document.getElementById("Address").appendChild(aimg[0]);
	document.getElementById("Email").appendChild(eimg[1]);
	document.getElementById("Phone").appendChild(pimg[1]);
	document.getElementById("Address").appendChild(aimg[1]);
	document.getElementById("FName").appendChild(fimg[1]);
	document.getElementById("LName").appendChild(limg[1]);
	document.getElementById("Username").appendChild(uimg[1]);
	document.getElementById("Password").appendChild(passimg[1]);
	//since the drop-down menus by design do not have blank options, they do not have error labels
	
}

function getImage(bool, num, msg)
{
	var image = document.getElementById("image" + num);
	var label = document.getElementById("label" + num);
	if(image == null)
	{
		image = new Image(15, 15);
		image.id = "image" + num;
	}
	if(label == null)
	{
		label = document.createElement("theLabel");
		label.id = "label" + num;
		label.setAttribute( 'class', 'errorMessage' );
	}
	if(bool)
	{
		image.src = './correct.png';
	}
	else
	{
		image.src = './wrong.png';
		label.innerHTML = msg;
	}
	var theArr = [image, label];
	return theArr;
}

function checkName(fOl)
{
	var ans = document.forms["personalinfo"][fOl].value;
	return validCharCheck(ans);
}

function validCharCheck(whatCheck)
{
	let regex = /^[a-z0-9]+$/i;
	if(whatCheck != null && whatCheck.match(regex))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function checkEmail(email)
{
	let mail = document.forms["personalinfo"][email].value;
	if(!mail.includes('@') || !mail.includes('.'))
	{
		return false;
	}
	let split1 = mail.split('@');
	if(split1.length != 2 || !validCharCheck(split1[0]))
	{
		return false;
	}
	let split2 = split1[1].split('.');
	if(split2.length != 2 || !validCharCheck(split2[0]) || !validCharCheck(split2[1]))
	{
		return false;
	}
	return true;
}

function checkPhone(telephone)
{
	let phone = document.forms["personalinfo"][telephone].value;
	if(phone.includes('-'))
	{
		let split = phone.split('-');
		if(split.length != 3)
		{
			return false;
		}
		if(!numbersOnlyCheck(split[0]) || split[0].length != 3)
		{
			return false;
		}
		if(!numbersOnlyCheck(split[1]) || split[1].length != 3)
		{
			return false;
		}
		if(!numbersOnlyCheck(split[2]) || split[2].length != 4)
		{
			return false;
		}
		return true;
	}
	if(phone.length != 10 || !numbersOnlyCheck(phone))
	{
		return false;
	}
	return true;
}

function checkAddress(address)
{
	let addr = document.forms["personalinfo"][address].value;
	if(!addr.includes(','))
	{
		return false;
	}
	let split = addr.split(',');
	if(split.length != 2 || !validCharCheck(split[0]) || !validCharCheck(split[1]))
	{
		return false;
	}
	return true;
}

function checkPass(thePassword)
{
	let pass = document.forms["personalinfo"][thePassword].value;
	if(pass.length >= 8)
	{
		return true;	
	}
	return false;
}


function checkName(fOl)
{
	var ans = document.forms["personalinfo"][fOl].value;
	return validCharCheck(ans);
}

//add validation checks for email, phone and address.
function validCharCheck(whatCheck)
{
	let regex = /^[a-z0-9]+$/i;
	if(whatCheck != null && whatCheck.match(regex))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function numbersOnlyCheck(whatCheck)
{
	let regex = /^[0-9]+$/i;
	if(whatCheck != null && whatCheck.match(regex))
	{
		return true;
	}
	else
	{
		return false;
	}
}