function run() {
	var button = document.getElementsByClassName('btn-add')[0];
	button.addEventListener('click', onAddButtonClick);
    var username = document.getElementsByClassName('input-name')[0];
    
    username.addEventListener('click', onNameInput);
    var input = document.getElementsByClassName('messageText')[0];

	input.addEventListener('keydown', onTextInput);
    updateCounter();
}

function onNameInput() {
    
}

function onAddButtonClick() {
	var message = document.getElementsByClassName('messageText')[0];

	addMessage(message.value);
	message.value = '';
	updateCounter();
}

function onTextInput(e) {
    var key = e.keyCode;
    if (key === 13) { // 13 is enter
      onAddButtonClick();
    }
}

function addMessage(value) {
	if(!value){
		return;
	}
    
	var table = document.getElementsByClassName('table')[0];
    var row = table.insertRow(-1);
    createRowValues(row, value);
    
	updateCounter();
}

function createRowValues(row, text){
	var tdTime = document.createElement('td');
	var tdMessage = document.createElement('td');
	var tdEdit = document.createElement('td');
	var tdRemove = document.createElement('td');

	row.classList.add('item');
    tdTime.classList.add('col-time');
    tdMessage.classList.add('col-message');
    tdEdit.classList.add('col-edit');
    tdRemove.classList.add('col-delete');
    
    tdTime.appendChild(document.createTextNode("2015-03-03"));
    tdMessage.appendChild(document.createTextNode(text));
    tdEdit.innerHTML = "<a class=btn-default href=&#35;><i class=glyphicon&#32;glyphicon-edit></i></a>";
    tdRemove.innerHTML = "<a class=btn-default href=&#35;><i class=glyphicon&#32;glyphicon-remove></i></a>";
    
	row.appendChild(tdTime);
	row.appendChild(tdMessage);
	row.appendChild(tdEdit);
	row.appendChild(tdRemove);

	//return row;
}

function updateCounter(){
	var counter = document.getElementsByClassName('counter-holder')[0];
    var count = document.getElementsByClassName("items")[0].rows.length;
    
    counter.innerText = count.toString();
}
