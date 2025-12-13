import axios from "axios";

import { TSQTask } from "../datatype/TSQTask";

import { TSQAdd, TSQUpdate_Delete } from "../apilib/Todosapt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTSQTaskMutation = () => {
    const queryClient = useQueryClient();

    //Add function
    const addTask = useMutation({
        mutationFn: async (task: TSQTask) => {
            const response = await axios.post(TSQAdd, task)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    //Edit function
    const editTask = useMutation({
        mutationFn: async (task: TSQTask) => {
            const response = await axios.put(`${TSQUpdate_Delete}/${task.id}`,
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
            const response = await axios.delete(`${TSQUpdate_Delete}${task.id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

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
