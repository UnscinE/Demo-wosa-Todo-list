import { Task } from "../datatype/Task";

export const handleTaskSaved = (task: Task, mode: string) => {
        if (mode === 'add') {

            const store = localStorage.getItem('to-do-list-tasks');
            const oldTasks = store ? JSON.parse(store) : [];

            const update = [...oldTasks, task];

            localStorage.setItem('to-do-list-tasks', JSON.stringify(update));
            setTasksData(update);

        } else if (mode === 'edit') {

            const newTasksList = tasksDatafromoldCode.map(targetTask => {
                return targetTask.id === task.id ? task : targetTask;
            });

            localStorage.setItem('to-do-list-tasks', JSON.stringify(newTasksList));
            setTasksData(newTasksList);

        } else if (mode === 'delete') {

            const taskNotDelete = tasksDatafromoldCode.filter((taskToDelete) => taskToDelete.id !== task.id)
            localStorage.setItem('to-do-list-tasks', JSON.stringify(taskNotDelete));
            setTasksData(taskNotDelete);

        }
    }