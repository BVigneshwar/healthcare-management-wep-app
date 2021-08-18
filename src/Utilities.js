const host = "http://localhost:3301";

function postAjax(url, data, on_success, on_error){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(JSON.stringify(data));
    xhr.onload = function(event){
        if(this.status == 200){
            if(this.getResponseHeader('Content-Type') == "application/json; charset=utf-8"){
                on_success(JSON.parse(this.responseText));
            }else{
                on_success(this.responseText);
            }
        }else if(on_error){
            on_error(this);
        }
    }
}

function getAjax(url, on_success){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + url, true);
    xhr.send();
    xhr.onload = function(event){
        if(this.getResponseHeader('Content-Type') == "application/json; charset=utf-8"){
            on_success(JSON.parse(this.responseText));
        }else{
            on_success(this.responseText);
        }
    }
}

function formatDate(format_date){
	var date = format_date.getDate();
	if(date < 10){
		date = "0" + date;
	}
	var month = format_date.getMonth()+1;
	if(month < 10){
		month = "0" + month;
	}
	var year = format_date.getFullYear();
	return date + "-" + month + "-" + year;
}

export {postAjax, getAjax, formatDate};