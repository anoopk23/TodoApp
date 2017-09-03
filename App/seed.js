var StatusENUMS = {

    ACTIVE : "ACTIVE",
    COMPLETED : "COMPLETED",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Understand Git", status: StatusENUMS.ACTIVE},
    2 : {title : "Install Webstorm", status: StatusENUMS.ACTIVE},
    3 : {title : "Learn CSS", status: StatusENUMS.ACTIVE},
}

var next_todo_id = 4;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}
