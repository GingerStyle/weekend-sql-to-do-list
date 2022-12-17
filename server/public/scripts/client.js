$(onReady);

function onReady(){
    console.log('jquery is working');
    //get tasks to populate the DOM
    getTasks();
    //when submit button is pressed run get Input
    $('#submit-btn').on('click', getInput);
}

//function to get the tasks from the database
function getTasks(){

}

//function to get the task input and send to database
function getInput(){
    let input = {
        task: $('#task-input').val(),
        completed: 'n',
    }
    $.ajax({
        
    })
}

//function to update the DOM
function render(){

}