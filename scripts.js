var username = "";
var selectedRow = null;
var isEditing = false;

function run() {
	var button = document.getElementsByClassName('btn-add')[0];
	button.addEventListener('click', onAddButtonClick);
    
    var username = document.getElementsByClassName('input-name')[0];
    username.addEventListener('focusout', onNameInput);
    
    var input = document.getElementsByClassName('messageText')[0];
	input.addEventListener('keydown', onTextInput);
    
    var edit = document.getElementsByClassName('icon')[0];
    edit.addEventListener('click', onEditClick);
    
    var remove = document.getElementsByClassName('icon')[1];
    remove.addEventListener('click', onRemoveClick);
    
    updateCounter();
}

function onAddButtonClick() {
    var message = document.getElementsByClassName('messageText')[0];
    
    if(isEditing == true)
    {
        selectedRow.getElementsByClassName('list-group-item-text')[0].innerHTML = message.value;
        message.value = '';
        
        isEditing = false;
        selectedRow = null;
        return;
    }
    
    while(username.length === 0)
    {
        username = prompt("Enter your username!");
    }
    
    var userInput = document.getElementsByClassName('input-name')[0];
    userInput.value = username;

	addMessage(message.value);
	message.value = '';
	updateCounter();
}

function onNameInput(e) {
    var name = document.getElementsByClassName('input-name')[0];
    username = name.value;
}

function onTextInput(e) {  
    if(isEditing == true)
    {
        if(e.currentTarget.value.length == 0)
        {
            isEditing = false;
            selectedRow = null;
        }
    }
    
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

function createRowValues(row, text) {
	row.classList.add('item');
    row.classList.add(username);
    row.id = "message" + document.getElementsByClassName("items")[0].rows.length;
    row.addEventListener('click', onMessageClick);
    
    var tdTime = document.createElement('td');
	tdTime.classList.add('col-time');
    tdTime.innerHTML = getCurrentTime();
	row.appendChild(tdTime);
    
    var tdMessage = document.createElement('td');
    tdMessage.classList.add('col-message');
    tdMessage.classList.add('list-group');
    
    var divMessage = document.createElement('div');
    divMessage.classList.add('list-group-item');
    
    var user = document.createElement('h4');
    user.classList.add('list-group-item-heading');
    user.innerHTML = username;
    divMessage.appendChild(user);
    
    var message = document.createElement('p');
    message.classList.add('list-group-item-text');
    message.innerHTML = text;
    divMessage.appendChild(message);
    
    tdMessage.appendChild(divMessage);
	row.appendChild(tdMessage);
}

function getCurrentTime() {
    var date = new Date();
    var time = date.getDate() + '.' + (date.getMonth() + 1);
    time += "<br>"
    time += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return time;
}

function generateMessage(text) {
    var message;
    return message;
}

function onMessageClick(e) {
    var row = document.getElementById(e.currentTarget.id);
    if(row.classList.contains(username))
    {
        var message = row.getElementsByClassName('list-group-item')[0];
        
        if(row.classList.contains('info'))
        {
            row.classList.remove('info');
            message.classList.remove('active');
            selectedRow = null;
            
            document.getElementsByClassName('icon')[0].style.visibility = "hidden";
            document.getElementsByClassName('icon')[1].style.visibility = "hidden";
        }
        else
        {
            if(selectedRow != null)
            {
                selectedRow.classList.remove('info');
                var selectedMessage = selectedRow.getElementsByClassName('list-group-item')[0];
                selectedMessage.classList.remove('active');
            }
            
            row.classList.add('info');
            message.classList.add('active');
            selectedRow = row;
            
            document.getElementsByClassName('icon')[0].style.visibility = "visible";
            document.getElementsByClassName('icon')[1].style.visibility = "visible";
        }
    }
}

function updateCounter() {
	var counter = document.getElementsByClassName('counter-holder')[0];
    var count = document.getElementsByClassName("items")[0].rows.length;
    
    counter.innerText = count.toString();
}

function onEditClick() {
    var text = selectedRow.getElementsByClassName('list-group-item-text')[0];
    var input = document.getElementsByClassName('messageText')[0];
	input.value = text.innerText;
    
    isEditing = true;
    document.getElementsByClassName('icon')[0].style.visibility = "hidden";
    document.getElementsByClassName('icon')[1].style.visibility = "hidden";
    
    selectedRow.classList.remove('info');
    var selectedMessage = selectedRow.getElementsByClassName('list-group-item')[0];
    selectedMessage.classList.remove('active');
}

function onRemoveClick() {
    selectedRow.parentNode.removeChild(selectedRow);
    selectedRow = null;
    document.getElementsByClassName('icon')[0].style.visibility = "hidden";
    document.getElementsByClassName('icon')[1].style.visibility = "hidden";
    updateCounter();
}