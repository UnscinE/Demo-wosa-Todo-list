// components/TaskFormModal.tsx (แก้ไข)
"use client";

import { Button, Checkbox, Datepicker, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react';

interface TaskFormModalProps {
    isOpen: boolean; // สถานะเปิด/ปิด ที่มาจาก Parent
    onClose: () => void; // ฟังก์ชันปิด Modal ที่มาจาก Parent
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose }) => {
    // 1. **ลบ State ที่ขัดแย้ง:** ลบ const [openModal, setOpenModal] ออก
    // 2. ใช้ State ภายในสำหรับ Field Form เท่านั้น
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");

    // ฟังก์ชันสำหรับปิด Modal
    // Flowbite จะเรียก onClose เมื่อคลิกปุ่มปิด หรือคลิกนอก Modal
    function handleClose() {
        // รีเซ็ต Form Fields ก่อนปิด
        setTaskTitle("");
        setTaskDetails("");
        onClose(); // เรียกฟังก์ชัน onClose ที่มาจาก Parent
    }

    // ฟังก์ชันสำหรับ Submit Form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Task Submitted:', { title: taskTitle, details: taskDetails });
        // ... (โค้ดสำหรับบันทึกงาน) ...
        handleClose(); // ปิด Modal หลังจาก Submit
    };

    return (
        // ใช้ isOpen (Prop) และ handleClose (ฟังก์ชันเรียก Prop) ในการควบคุม
        // Flowbite Modal จะสร้าง Overlay (ฉากหลังมืด) และ z-index ให้เอง
        <Modal show={isOpen} size="lg" onClose={handleClose} popup>
            <ModalHeader>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white ms-4 mt-4">📝 Add new task.</h3>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Field 1: หัวข้อ */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="taskTitle">Task</Label>
                        </div>
                        <TextInput
                            id="taskTitle"
                            placeholder="Task title..."
                            value={taskTitle}
                            onChange={(event) => setTaskTitle(event.target.value)}
                            required
                        />
                    </div>

                    {/* Field 2: วันที่ */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="taskTitle">Date 🗓️</Label>
                        </div>

                        <Datepicker id="taskDate" />

                    </div>


                    {/* Field 3: รายละเอียด */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="taskDetails">Description ℹ️</Label>
                        </div>
                        <Textarea
                            id="taskDetails"
                            placeholder="Detail of your task..."
                            color="gray"
                            value={taskDetails}
                            onChange={(event) => setTaskDetails(event.target.value)}
                            rows={16}
                        />
                    </div>

                    {/* ปุ่ม */}
                    <div className="w-full flex justify-end gap-3">
                        <Button color="gray" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};