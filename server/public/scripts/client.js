$(onReady);

function onReady(){
    console.log('jquery is working');
    //get tasks to populate the DOM
    getTasks();
    //when submit button is pressed run get Input
    $('#submit-btn').on('click', getInput);
    $('#task-list').on('click', '.complete-btn', updateTask);
    $('#task-list').on('click', '.delete-btn', deleteTask);
}

//function to get the tasks from the database
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('response from db', response);
        render(response);
    }).catch((error) => {
        console.log('error with getting data', error);
    });
}

//function to get the task input and send to database
function getInput(){
    let input = {
        task: $('#task-input').val(),
        completed: 'no',
    };
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: input
    }).then((response) => {
        $('#task-input').val('Task Added!');
        setTimeout(function(){$('#task-input').val('')}, 2000);
        console.log('response fro db', response);
        getTasks();
    }).catch((error) => {
        console.log('error posting data', error);
    })
}

//function to update the status of tasks
function updateTask(){
    console.log('in updateTasks');
    let id = $(this).parent().parent().data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/completed/${id}`,
        data: {status: 'yes'},
    }).then(() => {
        getTasks();
    }).catch((error) => {
        console.log('error updating data', error);
    });
    getTasks();
}

//function to delete a task
function deleteTask(){

}

//function to update the DOM
function render(tasks){
    $('#task-list').empty();
    for (let i=0; i < tasks.length; i++){
        let color = 'grey';
        if(tasks[i].completed == 'yes'){
            color = 'green';
        }
        $('#task-list').append(
            `<tr style="background-color:${color};"  data-id=${tasks[i].id}>
                <td>${tasks[i].id}</td>
                <td>${tasks[i].task}</td>
                <td>${tasks[i].completed}</td>
                <td>
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </td>
            </tr>`
         )};
}