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

import React, { useState, useEffect } from "react";

// Task type define
type Task = {
  id: number;
  name: string;
  //image: string;
  description: string;
  //price: string;
  completed: boolean;
  datetime: string;
};

interface TaskFormModalProps {
  isOpen: boolean; // สถานะเปิด/ปิด ที่มาจาก Parent
  onClose: () => void; // ฟังก์ชันปิด Modal ที่มาจาก Parent
  formMode: "view" | "add" | "edit" | "close" | "delete";
  taskData: Task;
  onSaveSuccess: (formtask: Task, mode: string) => void;
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
      setSelectedDate(parseDate(taskData.datetime));
    }
    setSelectedDate(date);
  }

  // State for form fields (used in add/edit)
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [completestatus, setComplete] = useState<boolean>(false);

  //const [modaltask, setModaltask] = useState<Task>();

  // Update fields when modal opens or taskData/formMode changes
  useEffect(() => {
    if (isOpen) {
      if (formMode === "edit" && taskData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTaskTitle(taskData.name ?? "");
        setTaskDetails(taskData.description ?? "");
        setComplete(taskData.completed ?? "");
      } else {
        setTaskTitle("");
        setTaskDetails("");
      }
    }

    if (formMode === 'delete') {

    }
    // Only run when modal opens or relevant props change
  }, [isOpen, formMode, taskData]);

  // Close handler
  function handleClose() {
    setTaskTitle("");
    setTaskDetails("");
    onClose();
  }

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Task Submitted:", { title: taskTitle, details: taskDetails, completestatus: completestatus });
    // TODO: save logic here

    if (formMode === 'add') {

      const newTask: Task = {
        id: Date.now(),
        name: taskTitle,
        description: taskDetails,

        // price: "0.00",
        //image: "default-image-url.jpg",

        completed: false,
        datetime: selectedDate ? selectedDate.toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
      };

      //Sent new task back to parent
      onSaveSuccess(newTask, formMode);
    } else if (formMode === 'edit') {

      const editTask: Task = {
        id: taskData.id,
        name: taskTitle,
        description: taskDetails,

        // price: "0.00",
        // image: "default-image-url.jpg",

        completed: completestatus,
        datetime: selectedDate ? selectedDate.toLocaleDateString('en-GB') : taskData.datetime,
      };

      onSaveSuccess(editTask, formMode);
    } else {
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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold wrap-break-words">{taskData.name}</h2>
            {/* <img
              src={taskData.image}
              alt={taskData.name}
              className="w-32 h-32 object-cover rounded"
            /> */}
            <p>{taskData.description}</p>
            {/* <p>💰 Price: {taskData.price}</p> */}
            <p>✅ Status: {taskData.completed ? "Completed" : "Pending"}</p>
            <p>📅 Date: {taskData.datetime}</p>
            <div className="flex justify-end">
              <Button color="gray" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
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

              <div className="flex flex-col gap-3">
                {/* Field 1: Title */}
                <div>
                  <Label htmlFor="taskTitle">Task</Label>
                  <TextInput
                    id="taskTitle"
                    placeholder="Task title..."
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                    required
                  />
                </div>

                {/* Field 2: Date */}
                <div>
                  <Label htmlFor="taskDate">Date 🗓️</Label>
                  {formMode === 'edit' ? (<Datepicker
                    id="taskDate"
                    onChange={onSelectedDateChanged} // May need specific prop based on your library
                    value={parseDate(taskData.datetime)}
                  />) : (<Datepicker
                    id="taskDate"
                    onChange={onSelectedDateChanged}
                  />)
                  }
                </div>

                {/* Field 3: Description */}
                <div>
                  <Label htmlFor="taskDetails">Description ℹ️</Label>
                  <Textarea
                    id="taskDetails"
                    placeholder="Detail of your task..."
                    color="gray"
                    value={taskDetails}
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