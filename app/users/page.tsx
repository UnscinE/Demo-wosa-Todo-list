"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card } from "flowbite-react";
import Divider from "@mui/material/Divider";
import Link from "next/link";

interface UserData {
    id: number,
    name: String,
    email: String,
    phone: String,
    username: String,
    website: String
}

export default function Userlist() {

    const [users, setUser] = useState<UserData[]>([]);

    const getUser = async () => {
        const getUser = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(getUser.data)
        setUser(getUser.data);
    }


    useEffect(() => {
        getUser();
    }, [])



    return (
        <div className=" w-full h-full">

            <div className="mt-10 justify-center flex flex-row items-center-safe">
               
                    <Button href="/" className="absolute left-0 ms-10">Back</Button>
             
                <h1 className="font-extrabold text-4xl border-gray-300 border-8 p-5 rounded-full">User list</h1>
            </div>
            <div className="border-gray-300 border m-10 shadow-2xl">


                <div className="p-8 w-full h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                        {users.map((user, index) => (
                            <Card key={index} className="p-4 hover:scale-[1.025] transition-all duration-300">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-body truncate">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-body truncate">
                                            {user.email}
                                        </p>
                                        <p className="text-sm text-body truncate">
                                            {user.phone}
                                        </p>
                                        <p className="text-sm text-body truncate">
                                            {user.website}
                                        </p>
                                    </div>

                                </div>
                            </Card>
                        ))
                        }


                    </div>
                </div>
            </div>
        </div>

    );

};