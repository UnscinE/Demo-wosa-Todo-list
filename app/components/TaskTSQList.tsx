import { ThemeProvider, Card, Checkbox } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { TSQTask } from "./datatype/TSQTask";

type Props = {
    getViewClass: () => string;
    customTheme: never;
    filteredTasks: TSQTask[];
    filterMode: string;
    viewMode: string;
    handleClick: (mode: string, task: TSQTask) => void;
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
                                <div className="flex flex-col">
                                    <div className="w-3/4">

                                        <div className="bg-amber-100 h-2/4">
                                            <h5>
                                                {task.id}
                                            </h5>
                                        </div>
                                        <div className="bg-amber-200 h-1/4">
                                            <p>{task.todo}</p>
                                        </div>
                                        <div className="bg-amber-500 h-1/4">
                                            ⏳ : <Checkbox
                                                color="default"
                                                className=""
                                                checked={task.completed}
                                                onChange={updateBycheckbox(task)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                    test
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
};

export default TSQTaskList;