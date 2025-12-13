"use client"

import { Card, Checkbox, ThemeProvider } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { TSQTask } from "./datatype/TSQTask";

type Props = {
    upcommingTasks: TSQTask[];
    customTheme1: object;
    updateBycheckbox: (task: TSQTask) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export const upcommingTasksList: React.FC<Props> = ({
    upcommingTasks,
    customTheme1,
    updateBycheckbox
}) => {
    return (
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
                                            {task.userId}
                                        </p>
                                        <p className="text-sm text-body truncate">
                                            {task.todo}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center text-base font-semibold text-heading">
                                        {task.datetime}
                                        <div>
                                            ⏳ <Checkbox
                                                color="default"
                                                className=""
                                                checked={task.completed}
                                                onChange={updateBycheckbox(task)}
                                            />
                                        </div>
                                    </div>


                                </div>
                            </Card>
                        </motion.div>

                    ))}
                </AnimatePresence>
            </ThemeProvider>
        </div>
    );
};

export default upcommingTasksList;