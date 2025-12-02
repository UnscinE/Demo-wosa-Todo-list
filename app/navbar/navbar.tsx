// navbar.tsx
import React from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const hdlToggle = () => {
        setIsOpen(!isOpen);
        // Note: console.log(isOpen) here will log the *previous* state value, 
        // as state updates are asynchronous.
    }
    return (
        <header className='bg-black text-white w-full z-50'>
            <nav className='flex items-center justify-between px-12 h-18'>
                
                <a href='#' className="text-2xl font-bold px-2 py-1">
                    
                    <Image
                                src="/image.png"
                                alt="Todo Illustration"
                                width={60}
                                height={60}
                                className="rounded-xl shadow-xl"
                              /></a>
                    

                <div
                    className={`absolute left-0 top-18 bg-black w-full
                     flex flex-col items-center gap-2 font-bold text-lg 
                     
                     transition-all duration-750 ease-in-out overflow-hidden

                     ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <ul className="flex flex-col items-center gap-4 mt-1">
                        <Link href="/">
                        <li>Home</li>
                        </Link>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <button>Register</button>
                        <button className="border-2 px-2 py-1">Login</button>
                    </div>
                </div>

                <div className='cursor-pointer'>
                    <FaBars onClick={hdlToggle} />
                </div>

            </nav>
        </header>
    );
};

export default Navbar;