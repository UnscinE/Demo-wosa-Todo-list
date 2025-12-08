"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import UpcommingTasksList from "../components/UpcomingTaskList";
import TaskList from "../components/Tasklist";
import { customTheme, customTheme1 } from "../components/theme/cardTheme";
import { Task } from '../components/datatype/Task';



import Fab from '@mui/material/Fab';


import { PiCardsBold, PiListBulletsBold } from "react-icons/pi";
import { Card, Checkbox, createTheme, Datepicker, ThemeProvider } from "flowbite-react";
import { IoAdd } from "react-icons/io5";
import { TaskFormModal } from "../components/TaskFormModal";
import { AnimatePresence, motion } from "framer-motion";

const TasksPage: React.FC = () => {

    const [tasks, setTasksData] = useState<Task[]>(() => {
        if (typeof window !== 'undefined') {
            const store = localStorage.getItem("to-do-list-tasks");
            if (store) {
                return JSON.parse(store) as Task[];
            }
        }
        return [];
    });

    useEffect(() => {
        if (tasks) {
            localStorage.setItem("to-do-list-tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    //Callback function from child
    const handleTaskSaved = (task: Task, mode: string) => {
        if (mode === 'add') {

            const store = localStorage.getItem('to-do-list-tasks');
            const oldTasks = store ? JSON.parse(store) : [];

            const update = [...oldTasks, task];

            localStorage.setItem('to-do-list-tasks', JSON.stringify(update));
            setTasksData(update);

        } else if (mode === 'edit') {

            const newTasksList = tasks.map(targetTask => {
                return targetTask.id === task.id ? task : targetTask;
            });

            localStorage.setItem('to-do-list-tasks', JSON.stringify(newTasksList));
            setTasksData(newTasksList);

        } else if (mode === 'delete') {

            const taskNotDelete = tasks.filter((taskToDelete) => taskToDelete.id !== task.id)
            localStorage.setItem('to-do-list-tasks', JSON.stringify(taskNotDelete));
            setTasksData(taskNotDelete);

        }
    }

    //Update by checkbox
    const updateBycheckbox = (updateTargetnew: Task) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked;

            const news = tasks.map((updateTargetold) =>
                updateTargetold.id === updateTargetnew.id
                    ? { ...updateTargetold, completed: checked }
                    : updateTargetold
            );

            setTasksData(news);
            localStorage.setItem('to-do-list-tasks', JSON.stringify(news));
        };

    //Calendar date management
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);

        if (date) {
            // You can immediately use the date here, e.g., for API calls or logging
            console.log('New Date Selected (Date object):', date);
            console.log('Formatted Date String (TH):', date.toLocaleDateString('th-TH'));
            console.log('Formatted Date String (EN):', date.toDateString());
        } else {
            console.log('No date selected.');
        }
    };

    //Filter tasks by selected date
    const filteredByDateTasks = tasks.filter(task => {
        // If no date selected, show all tasks
        if (!selectedDate) return true;

        if (selectedDate) return task.datetime === selectedDate.toLocaleDateString('en-GB');
    });

    //ส่วนของการกรอง tasks [complete / incomplete /all]
    const [filterMode, setFilterMode] = useState<'all' | 'complete' | 'incomplete'>('all');
    const filteredTasks = filteredByDateTasks.filter(task => {
        // Return tasks with task.completed === true
        if (filterMode === "complete") return task.completed === true;
        // Return tasks with task.completed === false
        if (filterMode === "incomplete") return task.completed === false;

        //else
        return true; // all
    });

    //Function to parse date string "dd/mm/yyyy" to Date object
    function parseDate(dateStr: string) {
        const [dayStr, monthStr, yearStr] = dateStr.split('/');
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        return new Date(year, month - 1, day);

    }

    //Up comming tasks list (past date) filter
    const upcommingTasks = tasks.filter(task => {
        const taskDate = parseDate(task.datetime);
        const now = new Date();

        now.setHours(0, 0, 0, 0);
        return taskDate >= now && task.completed === false;


    });

    //Sort upcomming tasks by date ascending
    upcommingTasks.sort((a, b) => {
        const dateA = parseDate(a.datetime);
        const dateB = parseDate(b.datetime);

        return dateA.getTime() - dateB.getTime();

    });

    // View mode change function
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
    const getViewClass = () => {
        return viewMode === "cards"
            ? "grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "flex flex-col gap-4";
    };

    // Active button function
    const getButtonClass = (isActive: boolean) => isActive
        ? 'bg-blue-300 hover:bg-blue-700 text-white' //Active State: Blue Backgruond with white text
        : 'bg-gray-300 hover:bg-gray-400 text-gray-800';//Active State: gray Backgruond with gray text

    // FAB handler
    // State for on/off Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ฟังก์ชันสำหรับปิด Modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // ปิด Modal
    };

    //Task in modal handle
    const [taskInmodal, setTaskInmodal] = useState<Task>();

    // Modal form mode
    const [formMode, setFormMode] = useState<'view' | 'add' | 'edit' | 'close' | 'delete'>('close')

    // ฟังก์ชันที่ถูกเรียกเมื่อปุ่ม FAB ถูกคลิก
    const handleClick = (mode: 'view' | 'add' | 'edit' | 'delete', taskToView_Edit_Delete?: Task) => {

        setTaskInmodal(taskToView_Edit_Delete)

        setIsModalOpen(true)
        if (mode === 'add') {
            setFormMode(mode)
        } else if (mode === 'view') {
            setFormMode(mode)
        } else if (mode === 'edit') {
            setFormMode(mode)
        } else if (mode === 'delete') {
            //setIsModalOpen(false)
            setFormMode(mode)
        }

    };

    return (
        <div className="flex flex-col max-w-full items-center justify-center min-h-screen bg-white">
            {/* ใช้ Navbar component */}
            <Navbar />

            <main className="min-h-screen bg-gray-100 flex flex-col items-center w-full">
                <div className="flex flex-row h-screen w-full">

                    {/* div หลักที่ใช้ขนาด 20% */}
                    <div className="w-1/5 flex flex-col">

                        {/* ส่วนของปฎิทิน */}
                        <div className="h-4/10 flex flex-col bg-none justify-center border-gray-300">
                            <div className="flex flex-col place-items-center pb-4 pt-2 max-h-screen overflow-y-hidden overflow-x-hidden">
                                <Datepicker inline onChange={handleDateChange} />
                            </div>
                        </div>

                        {/* Upcomming task field */}
                        <div className=" flex flex-col w-full h-6/10 ">

                            {/* Top field of Upcomming task */}
                            <div className=" w-full h-2/12 justify-center items-center flex px-4">
                                <h1 className="text-blue-400 font-bold text-3xl border-4 border-spacing-12 p-2 rounded-lg shadow-md bg-white border-blue-400">
                                    Upcomming task 🗓️
                                </h1>
                            </div>
                            {/* Middle field of Upcomming task */}
                            <div className=" w-full h-10/12 p-4 overflow-y-auto scrollbar-hide">

                                {/* Upcoming task list component */}
                                <UpcommingTasksList
                                    upcommingTasks={upcommingTasks}
                                    customTheme1={customTheme1}
                                    updateBycheckbox={updateBycheckbox}
                                />

                            </div>
                        </div>

                    </div>

                    {/* div หลักที่ใช้ขนาด 80% */}
                    <div className="w-4/5  flex flex-col">

                        {/* เนื้อหาของหน้าจัดการงาน (Tasks Management) */}

                        <div className="h-1/12 p-4 items-center flex justify-between">

                            {/* Task filtering button */}
                            <div className="inline-flex shadow-lg rounded-lg">
                                <button onClick={() => setFilterMode('all')}
                                    className={`font-bold py-2 px-4 rounded-l-lg transition ${getButtonClass(filterMode === 'all')}`}> {/* Class for LEFT roundness */}
                                    All
                                </button>
                                <button onClick={() => setFilterMode('complete')}
                                    className={`font-bold py-2 px-4 rounded-none border-x transition border-gray-400 ${getButtonClass(filterMode === 'complete')}`}> {/* Square middle button with border */}
                                    Complete
                                </button>
                                <button onClick={() => setFilterMode('incomplete')}
                                    className={`font-bold py-2 px-4 rounded-r-lg transition ${getButtonClass(filterMode === 'incomplete')}`}> {/* Class for RIGHT roundness */}
                                    Incomplete
                                </button>
                            </div>

                            {/* Switch task view mode*/}
                            <div className="inline-flex shadow-lg rounded-lg">

                                <button onClick={() => setViewMode('cards')}
                                    className={`font-bold py-2 px-4 rounded-l-lg transition ${getButtonClass(viewMode === 'cards')}`}> {/* Class for LEFT roundness */}
                                    <PiCardsBold className="w-4 h-6" />
                                </button>
                                <button onClick={() => setViewMode('list')}
                                    className={`font-bold py-2 px-4 rounded-r-lg transition ${getButtonClass(viewMode === 'list')}`}> {/* Class for RIGHT roundness */}
                                    <PiListBulletsBold className="w-4 h-6" />
                                </button>

                            </div>

                        </div>

                        {/* Task List component */}
                        <TaskList
                            getViewClass={getViewClass}
                            customTheme={customTheme}
                            filteredTasks={filteredTasks}
                            filterMode={filterMode}
                            viewMode={viewMode}
                            handleClick={handleClick}
                            updateBycheckbox={updateBycheckbox}
                        />

                    </div>
                </div>

                {/* FAB */}
                <Fab
                    size="large"
                    color="primary" // Customize color (e.g., "secondary", "success")
                    aria-label="add" // Accessibility label
                    onClick={() => handleClick('add')}
                    sx={{
                        position: 'fixed', // Keep it fixed relative to the viewportw
                        bottom: 64,
                        right: 64,
                    }}
                >
                    <IoAdd className="w-8 h-8" />

                </Fab>

                {/* Modal component */}
                <TaskFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    formMode={formMode}
                    taskData={taskInmodal}
                    onSaveSuccess={handleTaskSaved}
                />
            </main>
        </div>

    );
}

export default TasksPage;