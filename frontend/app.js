// connect socket
const socket = io();

// join board
socket.emit("join_board", { boardId: 1, userId: 1 });

// receive task created
socket.on("task_created", (task) => {
    addTaskToUI(task);
});

// receive task updated
socket.on("task_updated", (task) => {
    console.log("UPDATED:", task);
});

// UI add task
function addTaskToUI(task) {
    const column = document.getElementById(getColumn(task.column_id));

    const div = document.createElement("div");
    div.className = "task";
    div.innerText = task.title;

    column.appendChild(div);
}

// map DB columns to UI
function getColumn(id) {
    if (id == 1) return "todo";
    if (id == 2) return "progress";
    if (id == 3) return "done";
}

// Drag & Drop
document.querySelectorAll(".tasks").forEach(col => {
    new Sortable(col, {
        group: "shared",
        animation: 150,

        onEnd: (evt) => {
            const taskName = evt.item.innerText;
            const newColumnId = evt.to.parentElement.id;

            socket.emit("move_task", {
                title: taskName,
                column_id: parseInt(newColumnId)
            });
        }
    });
});