"use client";

import React from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import Fab from '@mui/material/Fab';


import { PiCardsBold, PiListBulletsBold } from "react-icons/pi";
import { Card, Checkbox, createTheme, Datepicker, ThemeProvider } from "flowbite-react";
import { IoAdd } from "react-icons/io5";
import { TaskFormModal } from "../components/TaskFormModal";
import { AnimatePresence, motion } from "framer-motion";

const TasksPage: React.FC = () => {

    //Sample tasks data
    // Card list sample data
    const tasks = [
        {
            id: 1,
            name: 'Product A',
            image: 'https://flowbite.com/docs/images/products/apple-watch.png', // Replace with your image URL
            description: 'A brief description of Product A.sdawadsadwsd dddddddddddd dddddsadasdw qeqeqwesadqweqdd ddddddddd fkefkekfkk kkkkefkkfek kkerkwrewkrdflsd kksdfksfkekwkwekr kwkerkwerkwekrk wkerkwerkkwdflsdk;f wepw[er kq eporwk pweorkpwekrpo [qer poqkewrkpqwerokwer w[qerk weropwqerkwpr[ kqwrkowoqkqp werwer',
            price: '$199',
            completed: false,
            datetime: "19/12/2025"
        },
        {
            id: 2,
            name: 'Product B',
            image: 'https://flowbite.com/docs/images/products/imac.png', // Replace with your image URL
            description: 'A brief description of Product B.',
            price: '$1299',
            completed: true,
            datetime: "20/12/2025"
        },
        {
            id: 3,
            name: 'Product C',
            image: 'https://flowbite.com/docs/images/products/iphone-12.png', // Replace with your image URL
            description: 'A brief description of Product C.',
            price: '$799',
            completed: false,
            datetime: "21/12/2025"
        }, {
            id: 4,
            name: 'Product C',
            image: 'https://flowbite.com/docs/images/products/iphone-12.png', // Replace with your image URL
            description: 'A brief description of Product C.',
            price: '$799',
            completed: false,
            datetime: "24/12/2025"
        }, {
            id: 5,
            name: 'Product C',
            image: 'https://flowbite.com/docs/images/products/iphone-12.png', // Replace with your image URL
            description: 'A brief description of Product C.',
            price: '$799',
            completed: false,
            datetime: "24/12/2025"
        }, {
            id: 6,
            name: 'Product C',
            image: 'https://flowbite.com/docs/images/products/iphone-12.png', // Replace with your image URL
            description: 'A brief description of Product C.',
            price: '$799',
            completed: false,
            datetime: "24/12/2025"
        },
    ];

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

    console.log("Upcomming Tasks:", upcommingTasks);

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

    // ฟังก์ชันที่ถูกเรียกเมื่อปุ่ม FAB ถูกคลิก
    const handleClick = () => {
        console.log('FAB clicked! Opening Modal...');
        setIsModalOpen(true); // เปิด Modal
    };

    // ฟังก์ชันสำหรับปิด Modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // ปิด Modal
    };

    // Custom theme for cards
    const customTheme = createTheme({
        card: {
            "root": {
                "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
                "children": "flex h-full flex-col justify-start gap-4 p-4",
                "horizontal": {
                    "off": "flex-col",
                    "on": "flex-col md:max-w-xl md:flex-row"
                },
                "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
            },
            "img": {
                "base": "",
                "horizontal": {
                    "off": "rounded-t-lg",
                    "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                }
            }
        }
    });

    // Custom theme for upcomming task cards
    const customTheme1 = createTheme({
        card: {
            "root": {
                "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
                "children": "flex h-full flex-col justify-start gap-4 p-2",
                "horizontal": {
                    "off": "flex-col",
                    "on": "flex-col md:max-w-xl md:flex-row"
                },
                "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
            },
            "img": {
                "base": "",
                "horizontal": {
                    "off": "rounded-t-lg",
                    "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                }
            }
        }
    });

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
                                {/* <p className="mt-6 text-lg font-medium">
                                **Selected Date:** {selectedDate
                                    ? selectedDate.toLocaleDateString('en-GB', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric'
                                    })
                                    : 'Please select a date.'}
                            </p> */}
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


                                {/* Upcoming task list */}
                                <div className="flex flex-col gap-4 items-stretch">
                                    <ThemeProvider theme={customTheme1}>
                                        <AnimatePresence mode="popLayout">
                                            {upcommingTasks.slice(0, 5).map((task, index) => (

                                                <motion.div
                                                key={task.id}
                                                layout
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.1,
                                                }}
                                                >
                                                    <Card key={index} className="p-4 hover:scale-[1.025] transition-all duration-300">
                                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">

                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-heading truncate">
                                                                    {task.name}
                                                                </p>
                                                                <p className="text-sm text-body truncate">
                                                                    {task.description}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-col items-center text-base font-semibold text-heading">
                                                                {task.datetime}
                                                                <Checkbox color="default" className="mt-2" defaultChecked={task.completed} />
                                                            </div>


                                                        </div>
                                                    </Card>
                                                </motion.div>

                                            ))}
                                        </AnimatePresence>
                                    </ThemeProvider>
                                </div>
                                {/* <ul className="max-w-md divide-y divide-default">
                                    <li className="pb-3 sm:pb-4">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="shrink-0">

                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-heading truncate">
                                                    Neil Sims
                                                </p>
                                                <p className="text-sm text-body truncate">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-heading">
                                                $320
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="shrink-0">

                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-heading truncate">
                                                    Bonnie Green
                                                </p>
                                                <p className="text-sm text-body truncate">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-heading">
                                                $3467
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="shrink-0">

                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-heading truncate">
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-body truncate">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-heading">
                                                $67
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="shrink-0">

                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-heading truncate">
                                                    Thomas Lean
                                                </p>
                                                <p className="text-sm text-body truncate">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-heading">
                                                $2367
                                            </div>
                                        </div>
                                    </li>
                                    <li className="pt-3 pb-0 sm:pt-4">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="shrink-0">

                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-heading truncate">
                                                    Lana Byrd
                                                </p>
                                                <p className="text-sm text-body truncate">
                                                    email@flowbite.com
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-heading">
                                                $367
                                            </div>
                                        </div>
                                    </li>
                                </ul> */}


                            </div>

                            {/* Bottom field of Upcomming task */}
                            {/* <div className="bg-amber-300 w-full h-1/12">

                            </div> */}

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

                        {/* Section 2: 80% width, full height */}
                        <div className="h-11/12 p-4 scrollbar-hide overflow-y-auto">

                            <div className={`${getViewClass()} items-stretch`}>
                                <ThemeProvider theme={customTheme}>
                                    <AnimatePresence mode="popLayout">
                                        {filteredTasks.map((task, index) => (

                                            <motion.div
                                                key={task.id + filterMode + viewMode} // เพิ่ม filterMode และ viewMode เป็นส่วนหนึ่งของ key เพื่อบังคับให้ React รีเรนเดอร์เมื่อเปลี่ยนโหมด
                                                layout
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.1,   // ให้ card ลอยขึ้นทีละใบ

                                                }}
                                            >
                                                <Card className="hover:scale-[1.025] transition-all duration-300 h-full flex flex-col">
                                                    <div className="flex flex-col h-3/4">

                                                        <div className="justify-between flex flex-row">


                                                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                                                {task.name}
                                                            </h5>
                                                            <p className="text-lg font-lg text-gray-500 dark:text-gray-400">
                                                                {task.datetime} 📌
                                                            </p>
                                                        </div>

                                                        <p className="text-base font-normal text-gray-700 dark:text-gray-400 line-clamp-4 min-h-24">
                                                            {task.description}
                                                        </p>
                                                    </div>

                                                    <div className="mt-auto">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-row flex-wrap gap-2 inline-flex">
                                                                <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 rounded-xl">
                                                                    📋 View
                                                                </button>
                                                                <button type="button" className="text-white bg-[#7ba3fa] hover:bg-[#7ba3fa]/90 focus:ring-4 focus:outline-none focus:ring-[#7ba3fa]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7ba3fa]/55 rounded-xl">
                                                                    ✏️ Edit
                                                                </button>
                                                                <button type="button" className="text-white hover:text-black bg-[#d8d8d8] hover:bg-[#bfbfbf]/90 focus:ring-4 focus:outline-none focus:ring-[#bfbfbf]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7ba3fa]/55 rounded-xl">
                                                                    🗑️ Delete
                                                                </button>
                                                            </div>
                                                            {/* <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                                {task.price}
                                                            </span> */}

                                                            <div className="me-2">
                                                                <Checkbox color="default" defaultChecked={task.completed} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>

                                        ))}
                                    </AnimatePresence>
                                </ThemeProvider>
                            </div>



                        </div>





                    </div>
                </div>
                {/* FAB */}
                <Fab
                    size="large"
                    color="primary" // Customize color (e.g., "secondary", "success")
                    aria-label="add" // Accessibility label
                    onClick={handleClick}
                    sx={{
                        position: 'fixed', // Keep it fixed relative to the viewport
                        bottom: 64,
                        right: 64,
                    }}
                >
                    <IoAdd className="w-8 h-8" />

                </Fab>

                {/* นำ Modal component มาใช้ */}
                <TaskFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </main>
        </div>

    );
}

export default TasksPage;