"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../navbar/navbar";
import Fab from '@mui/material/Fab';

import { PiCardsBold, PiListBulletsBold } from "react-icons/pi";
import { Button, Card, Datepicker } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";
import { TaskFormModal } from "../components/TaskFormModal";

const TasksPage: React.FC = () => {
    //Calendar date management
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);

        if (date) {
            // You can immediately use the date here, e.g., for API calls or logging
            console.log('New Date Selected (Date object):', date);
            console.log('Formatted Date String (TH):', date.toLocaleDateString('th-TH'));
        } else {
            console.log('No date selected.');
        }
    };

    //ส่วนของการกรอง tasks
    const [filterMode, setFilterMode] = useState<'all' | 'complete' | 'incomplete'>('all');

    // ส่วนของการแสดงผล
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

    // ฟังก์ชันสำหรับกำหนดคลาส Active
    const getButtonClass = (isActive: boolean) => isActive
        ? 'bg-blue-300 hover:bg-blue-700 text-white' //Active State: Blue Backgruond with white text
        : 'bg-gray-300 hover:bg-gray-400 text-gray-800';//Active State: gray Backgruond with gray text

    // FAB handler
    // State สำหรับควบคุมการเปิด/ปิด Modal
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

    // Card list sample data
    const products = [
        {
            id: 1,
            name: 'Product A',
            image: 'https://flowbite.com/docs/images/products/apple-watch.png', // Replace with your image URL
            description: 'A brief description of Product A.',
            price: '$199',
        },
        {
            id: 2,
            name: 'Product B',
            image: 'https://flowbite.com/docs/images/products/imac.png', // Replace with your image URL
            description: 'A brief description of Product B.',
            price: '$1299',
        },
        {
            id: 3,
            name: 'Product C',
            image: 'https://flowbite.com/docs/images/products/iphone-12.png', // Replace with your image URL
            description: 'A brief description of Product C.',
            price: '$799',
        },
    ];

    return (

        <div className="flex flex-col max-w-full items-center justify-center min-h-screen bg-white">
            {/* ใช้ Navbar component */}
            <Navbar />

            <main className="min-h-screen bg-gray-100 flex flex-col items-center w-full">
                <div className="flex flex-row h-screen w-full">

                    {/* div หลักที่ใช้ขนาด 25% */}
                    <div className="w-1/4 bg-amber-100 flex flex-col">
                        {/* ส่วนของปฎิทิน */}

                        <div className="flex flex-col items-center p-4">
                            <Datepicker inline onChange={handleDateChange} />
                            <p className="mt-6 text-lg font-medium">
                                **Selected Date:** {selectedDate
                                    ? selectedDate.toLocaleDateString('th-TH', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'Please select a date.'}
                            </p>
                        </div>



                    </div>
                    {/* div หลักที่ใช้ขนาด 75% */}
                    <div className="w-3/4 bg-amber-300 flex flex-col">

                        {/* เนื้อหาของหน้าจัดการงาน (Tasks Management) */}

                        <div className="h-1/12 bg-amber-600 p-4 items-center flex justify-between">



                            {/* Task filtering button */}
                            <div className="inline-flex shadow-md">
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
                            <div className="inline-flex shadow-md">

                                <button onClick={() => setViewMode('cards')}
                                    className={`font-bold py-2 px-4 rounded-l-lg transition ${getButtonClass(viewMode === 'cards')}`}> {/* Class for LEFT roundness */}
                                    <PiCardsBold className="w-4 h-6" />
                                </button>
                                <button onClick={() => setViewMode('list')}
                                    className={`font-bold py-2 px-4 rounded-r-lg transition ${getButtonClass(viewMode === 'list')}`}> {/* Class for RIGHT roundness */}
                                    <PiListBulletsBold className="w-4 h-6" />
                                </button>

                            </div>
                            <p>โหมดการกรอง: {filterMode}</p>
                            <p>โหมดการแสดงผล: {viewMode}</p>

                        </div>

                        {/* Section 2: 80% width, full height */}
                        <div className="h-11/12 bg-amber-400 p-4 scrollbar-hide overflow-y-auto">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                                {products.map((task: { id: React.Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                                    <Card key={task.id} imgSrc={task.image} horizontal>
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {task.name}
                                        </h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            {task.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {task.price}
                                            </span>
                                            <Button>
                                                Add to cart
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
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
                        bottom: 32,
                        right: 64,
                    }}
                >
                    <IoMdAdd className="w-8 h-8" />

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