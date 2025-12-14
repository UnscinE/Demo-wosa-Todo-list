//Import library that used
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

//Import api link component you need to create it by yourself
import { TSQTask, APITSQTask } from "../datatype/TSQTask";

//Datatype definition
// export type TSQTask = APITSQTask & {
//     datetime: string, This field is added for integrate with my old code,
//                       You don't need to use it in your code.
// };

// export type APITSQTask = {
//   id: number;
//   todo: string;
//   completed: boolean;
//   userId: number;
// };

//Data fetched from API example
//{
//  "id": 1,
//  "todo": "Do something nice for someone you care about",
//  "completed": false,
//  "userId": 152
//}

const [limit, setlimit] = useState(5);

//Part 1 : Fetching code using Tanstack Query
//Tanstack Query useQuery
//ref : https://tanstack.com/query/latest/docs/framework/react/reference/useQueries#memoization  
//axios method get/post/put/delete
//ref : https://axios-http.com/docs/post_example
//This is queryFn : fetchTasks       
//    Promise<TSQTask[]> that means this function will return a promise that resolves to an array of TSQTask objects                  
const fetchTasks = async (limit: number): Promise<TSQTask[]> => {
    //old data src (load from local storage)
    //const storeData = localStorage.getItem("to-do-list-tasks");

    //change to new data src (load from TSQ)
    const response = await axios.get("https://dummyjson.com/todos");

    //Debuging command for check data are fetched from api
    console.log("Fetched data froms TSQ111: ", response.data.todos);

    //return task from api using TSQ management
    //If you don't understand why i use response.data.todos
    //You can check the API response structure in https://dummyjson.com/todos
    //You will see that the tasks are inside the "todos" property
    const Api: APITSQTask[] = response.data.todos;
    //So you can use return after fetch data from API
    //return Api.slice(0, limit);

    const fullTasks: TSQTask[] = Api.map(tasks => ({
        ...tasks,
        datetime: new Date().toLocaleDateString('en-GB'),
    }));

    //Load management with limit in this code i set it to 5
    //So only 5 tasks will be showing
    return fullTasks.slice(0, limit);

};

const useTasks = (limit: number) => {
    return useQuery({
        queryKey: ["tasks", limit],
        queryFn: () => fetchTasks(limit),
        initialData: [
            // I use this for debugging, You can ignore it.
            //  { id: 1, todo: "Initial Task", completed: false, userId: 8838, datetime: new Date().toLocaleDateString('en-GB') }
        ],
    });
};

const { data: taskDataTSQ, isPending, isFetching, refetch } = useTasks(limit);

//Part 2 : Usemutation code for add/edit/delete
//Add api : https://dummyjson.com/todos/add
//Update/Delete api : https://dummyjson.com/todos/
import { TSQAdd, TSQUpdate_Delete } from "../apilib/Todosapt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTSQTaskMutation = () => {
    const queryClient = useQueryClient();

    //Add function
    const addTask = useMutation({
        //By the way you can write mutationFn like fetchTasks function above
        mutationFn: async (task: TSQTask) => {
            //By calling post method the server will retrun the created task
            //So you can checked the response data
            const response = await axios.post(TSQAdd, task)
            return response.data;
        },
        onSuccess: () => {
            //It will refetch the tasks query to get the updated list
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    //Edit function
    const editTask = useMutation({
        mutationFn: async (task: TSQTask) => {
            //same as add but use put method and pass the task id in the url
            //example https://dummyjson.com/todos/1
            const response = await axios.put(`${TSQUpdate_Delete}/${task.id}`,
                //The body is what data you want to update
                {
                    todo: task.todo,
                    completed: task.completed,
                    userId: task.userId
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    //Delete function
    const deleteTask = useMutation({
        mutationFn: async (task: TSQTask) => {
            //same as edit but use delete method and no body needed
            const response = await axios.delete(`${TSQUpdate_Delete}${task.id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    //this code use to handle with my old code you can ignore it
    const handleTSQTaskSaved = (task: TSQTask, mode: string) => {
        if (mode === 'add') {
            addTask.mutate(task);

        } else if (mode === 'edit') {
            editTask.mutate(task);

        } else if (mode === 'delete') {
            deleteTask.mutate(task);

        }
    };
    return { handleTSQTaskSaved };

};
