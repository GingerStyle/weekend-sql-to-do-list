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
        completed: 'n',
    };
}

//function to update the DOM
function render(tasks){
    $('#task-list').empty();
    for (let i=0; i < tasks.length; i++){
        let color = 'grey';
        if(tasks[i].completed == 'y'){
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