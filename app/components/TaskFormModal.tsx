// components/TaskFormModal.tsx
"use client";

import {
  Button,
  Checkbox,
  Datepicker,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Textarea,
} from "flowbite-react";

import { TSQTask } from "./datatype/TSQTask";

import React, { useState, useEffect } from "react";
import { number } from "zod";
import { randomInt } from "crypto";

interface TaskFormModalProps {
  isOpen: boolean; // สถานะเปิด/ปิด ที่มาจาก Parent
  onClose: () => void; // ฟังก์ชันปิด Modal ที่มาจาก Parent
  formMode: "view" | "add" | "edit" | "close" | "delete";
  taskData: TSQTask;
  onSaveSuccess: (formtask: TSQTask, mode: "add" | "edit" | "delete") => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  formMode,
  taskData,
  onSaveSuccess,
}) => {


  //Parse string date dd/mm/yyyy to Date
  function parseDate(dateStr: string) {
    const [dayStr, monthStr, yearStr] = dateStr.split('/');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    return new Date(year, month - 1, day);

  }


  //Calendar date management
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onSelectedDateChanged = (date: Date | null) => {
    if (formMode === 'edit') {
      // setSelectedDate(parseDate(taskData.datetime));
    }

    //setSelectedDate(date);
  }

  // State for form fields (used in add/edit)
  const [taskUserID, setTaskUserID] = useState(0);
  const [taskTodo, setTaskDetails] = useState("");
  const [completestatus, setComplete] = useState<boolean>(false);

  //const [modaltask, setModaltask] = useState<Task>();

  // Update fields when modal opens or taskData/formMode changes
  useEffect(() => {
    if (isOpen) {
      if (formMode === "edit" && taskData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTaskUserID(taskData.userId ?? 0);
        setTaskDetails(taskData.todo ?? "");
        setComplete(taskData.completed ?? "");
      } else {
        setTaskUserID(Math.floor(Math.random() * 208) + 1);
        setTaskDetails("");
      }
    }

    if (formMode === 'delete') {

    }
    // Only run when modal opens or relevant props change
  }, [isOpen, formMode, taskData]);

  // Close handler
  function handleClose() {
    setTaskUserID(0);
    setTaskDetails("");
    onClose();
  }

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Task Submitted:", { UserID: taskUserID, taskTodo: taskTodo, taskCompletestatus: completestatus });
    // TODO: save logic here

    if (formMode === 'add') {

      const newTask: TSQTask = {
        id: 0,
        userId: taskUserID,
        todo: taskTodo,
        completed: false,
        datetime: new Date().toLocaleDateString('en-GB'), //dd/mm/yyyy
      };

      //Sent new task back to parent
      onSaveSuccess(newTask, formMode);
    } else if (formMode === 'edit') {

      const editTask: TSQTask = {
        id: taskData.id,
        userId: taskUserID,
        todo: taskTodo,
        completed: completestatus,
        datetime: taskData.datetime,
      };

      onSaveSuccess(editTask, formMode);
    } else if (formMode === 'delete') {
      onSaveSuccess(taskData, formMode);
    }
    handleClose();
  };

  return (
    <Modal show={isOpen} size="lg" onClose={handleClose} popup>
      <ModalHeader>
        {formMode === "view" && taskData ? (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📄 Task Details
          </h3>
        ) : formMode === "edit" ? (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            ✏️ Edit Task
          </h3>
        ) : formMode === "add" ? (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📝 Add New Task
          </h3>
        ) : (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            ❌ Delete Task
          </h3>
        )
        }
      </ModalHeader>

      <ModalBody>
        {formMode === "view" && taskData ? (
          // View Mode
          <div className="space-y-4">
            <h2 className="text-lg font-semibold wrap-break-words">{taskData.id}</h2>
            <p>UserID: {taskData.userId}</p>
            <p>{taskData.todo}</p>
            <p>✅ Status: {taskData.completed ? "Completed" : "Pending"}</p>
            <p>📅 Date: {taskData.datetime}</p>
            <div className="flex justify-end">
              <Button color="gray" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          // Delete Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            {formMode === 'delete' ? (
              <div className="flex flex-col gap-3">
                <div>
                  <span >Are you sure ?</span>
                </div>


                {/* Buttons */}
                <div className="w-full flex justify-end gap-3">

                  <div className="flex flex-row gap-3">


                    <Button color="red" type="submit">Confirm</Button>
                    <Button color="gray" onClick={handleClose}>Cancel</Button>
                  </div>
                </div>
              </div>


            ) : (
              // Add Mode
              <div className="flex flex-col gap-3">
                {/* Field 1: UserID */}
                <div>
                  <Label htmlFor="UserID">User ID</Label>
                  <TextInput
                    id="UserID"
                    type="number"
                    placeholder='1-208'
                    min={1}
                    max={208}
                    value={taskUserID}
                    onChange={(event) => setTaskUserID(event.target.valueAsNumber)}
                    required
                  />
                </div>

                {/* Field 2: Todo */}
                <div>
                  <Label htmlFor="taskTodo">Todo ℹ️</Label>
                  <Textarea
                    id="taskTodo"
                    placeholder="Detail of your task..."
                    color="gray"
                    value={taskTodo}
                    onChange={(event) => setTaskDetails(event.target.value)}
                    rows={6}
                  />
                </div>

                {/* Buttons */}
                <div className="w-full flex justify-between gap-3">
                  <div className="flex items-center gap-1">

                    <Checkbox color="default" defaultChecked={taskData?.completed} onChange={(e) => setComplete(e.target.checked)}>

                    </Checkbox>
                    : Status
                  </div>
                  <div className="flex flex-row gap-3">


                    <Button color="gray" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                </div>
              </div>
            )}

          </form>
        )}
      </ModalBody>
    </Modal>
  );
};