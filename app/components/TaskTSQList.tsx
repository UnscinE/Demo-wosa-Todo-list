import { ThemeProvider, Card, Checkbox } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { TSQTask } from "./datatype/TSQTask";

type Props = {
    getViewClass: () => string;
    customTheme: object;
    filteredTasks: TSQTask[];
    filterMode: string;
    viewMode: string;
    handleClick: (mode: "view" | "add" | "edit" | "delete", task: TSQTask) => void;
    updateBycheckbox: (task: TSQTask) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TSQTaskList: React.FC<Props> = ({
    getViewClass,
    customTheme,
    filteredTasks,
    filterMode,
    viewMode,
    handleClick,
    updateBycheckbox
}) => {
    return (
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
                                <div className="flex flex-row gap-2">
                                    <div className="w-3/4">

                                        <div className="h-1/4">
                                            <h5 className="font-extrabold text-3xl">
                                                {task.id}
                                            </h5>
                                        </div>
                                        <div className="p-2 h-2/4">
                                            <p className="line-clamp-4 min-h-32 text-base font-normal text-gray-700">
                                                {task.todo}
                                            </p>
                                        </div>
                                        <div className="h-1/4 flex items-center">
                                            ⏳ :  <Checkbox
                                                color="default"
                                                className="ms-2"
                                                checked={task.completed}
                                                onChange={updateBycheckbox(task)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-row flex-wrap gap-2 inline-flex w-full">
                                                <button type="button" onClick={() => handleClick("view", task)} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 rounded-xl w-full">
                                                    📋 View
                                                </button>
                                                <button type="button" onClick={() => handleClick("edit", task)} className="text-white bg-[#7ba3fa] hover:bg-[#7ba3fa]/90 focus:ring-4 focus:outline-none focus:ring-[#7ba3fa]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7ba3fa]/55 rounded-xl w-full">
                                                    ✏️ Edit
                                                </button>
                                                <button type="button" onClick={() => handleClick("delete", task)} className="text-white hover:text-black bg-[#d8d8d8] hover:bg-[#bfbfbf]/90 focus:ring-4 focus:outline-none focus:ring-[#bfbfbf]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7ba3fa]/55 rounded-xl w-full">
                                                    🗑️ Delete
                                                </button>
                                            </div>
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
    )
};

export default TSQTaskList;