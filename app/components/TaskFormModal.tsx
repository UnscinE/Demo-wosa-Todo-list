// components/TaskFormModal.tsx
"use client";

import {
  Button,
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
  image: string;
  description: string;
  price: string;
  completed: boolean;
  datetime: string;
};

interface TaskFormModalProps {
  isOpen: boolean; // สถานะเปิด/ปิด ที่มาจาก Parent
  onClose: () => void; // ฟังก์ชันปิด Modal ที่มาจาก Parent
  formMode: "view" | "add" | "edit" | "close";
  taskData?: Task;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  formMode,
  taskData,
}) => {
  if (!isOpen) return null;

  // State for form fields (used in add/edit)
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");

  // Pre-fill fields when editing
  useEffect(() => {
    if (formMode === "edit" && taskData) {
      setTaskTitle(taskData.name);
      setTaskDetails(taskData.description);
    } else {
      setTaskTitle("");
      setTaskDetails("");
    }
  }, [formMode, taskData]);

  // Close handler
  function handleClose() {
    setTaskTitle("");
    setTaskDetails("");
    onClose();
  }

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task Submitted:", { title: taskTitle, details: taskDetails });
    // TODO: save logic here

    

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
        ) : (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📝 Add New Task
          </h3>
        )}
      </ModalHeader>

      <ModalBody>
        {formMode === "view" && taskData ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{taskData.name}</h2>
            <img
              src={taskData.image}
              alt={taskData.name}
              className="w-32 h-32 object-cover rounded"
            />
            <p>{taskData.description}</p>
            <p>💰 Price: {taskData.price}</p>
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
              <Datepicker id="taskDate" />
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
            <div className="w-full flex justify-end gap-3">
              <Button color="gray" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
};