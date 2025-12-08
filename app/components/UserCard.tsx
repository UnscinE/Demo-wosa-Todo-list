"use client";
import { Card } from "flowbite-react";
import { UserData } from "./datatype/User"

export const UserCard: React.FC<UserData> = ({ id, name, username, email, phone, website }) => {
  return (
    <Card className="p-4 hover:scale-[1.025] transition-all duration-300">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold truncate">{id}. {name}</p>
        <p className="text-sm text-gray-600 truncate">@{username}</p>
        <p className="text-sm text-gray-600 truncate">{email}</p>
        <p className="text-sm text-gray-600 truncate">{phone}</p>
        <p className="text-sm text-gray-600 truncate">{website}</p>
      </div>
    </Card>
  );
};
