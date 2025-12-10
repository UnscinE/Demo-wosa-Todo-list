// "use client";

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Button, Card } from "flowbite-react";


// //กำหนดลักษณะของข้อมูลที่ต้องการรับ เหมือนต้องการกล่องเก็บหัวใจ ต้องกำหนดว่าหัวใจหน้าตาเป็นยังไงควรกำหนดให้ตรงตามข้อมูลที่ต้องการรับ
// // (1) เริ่มต้น
// interface UserData {
//     id: number,
//     name: string,
//     email: string,
//     phone: string,
//     username: string,
//     website: string
// }

// // {  
// //     "id": 1,    id คือคีย์และมี value เป็น 1 ให้มองเป็นตารางที่มี คอลัมน์ id , name , username , email , address...
// //     "name": "Leanne Graham",            และมีค่าตาม object แต่ละตัว
// //     "username": "Bret",
// //     "email": "Sincere@april.biz",
// //     "address": {
// //       "street": "Kulas Light",
// //       "suite": "Apt. 556",
// //       "city": "Gwenborough",
// //       "zipcode": "92998-3874",
// //       "geo": {
// //         "lat": "-37.3159",
// //         "lng": "81.1496"
// //       }
// //     }

// //ไฟล์ json  ประกอบไปด้วย key และ value


// export default function Userlist() {

//     //เมื่อเรารู้แล้วว่าข้อมูลที่ต้องการเก็บหน้าตาเป็นยังไง ทีนี้ก็กำหนดว่าเป็นจะเก็บยังไง เป็นภาพ , เก็บในกล่อง , ตู้เย็น , ช่องฟรีซ
//     // const [ชื่อตัวแปร, ชื่อฟังก์ชันที่ใช้เปลี่ยนค่าตัวแปรนี้] = useState<ประเภทที่ต้องการเก็บ[]>(ค่าเริ่มต้นของข้อมูล ใส่ [] แปลว่า Array ว่าง);
//     //                                                     เติม [] แปลว่า เป็น Array ของประเภทนี้       การกำหนดอาเรย์ เหมือนรู้แล้วเราจะเก็บหัวใจ ใส่ตู้
//     //กำหนดวิธีการเก็บ (2)                                                                            แต่ไม่มีตู้ให้เก็บ เลยต้องสร้างตู้เปล่ามาก่อน
//     const [users, setUser] = useState<UserData[]>([]);
//     //เห็นไหม

//     //เรียกใช้ฟังก์ชันนี้ (5)
//     const getUser = async () => {
//         //กำหนดตัวแปรมาเพื่อรับข้อมูลที่ดึงจาก api 
//         // api คล้ายการติดต่อแบบหลังบ้าน หมอส่งเคสต่อ ส่งต่อโรงบาลไหน แจ้งข้อมูลผู้ป่วยเบื้องตัน ไรงี้

//         //object ก็แบบ ให้แกมองเป็นภาพ เช่น มะม่วง มีสี กลิ่น รส รูปร่าง
//         //string คือ คำบรรยายให้เห็นภาพ มันคือผลมะม่วง ดิบ รสเปรี้ยว
//         //ถ้าใช้แบบเบสิคอ่ะ มันจะต้องแปลงให้เป็นข้อมูลแบบ Object ก่อน โดยใช้ JSON.parse(ข้อมูลที่ต้องการแปลง)

//         // (6)
//         const getUser = await axios.get('https://jsonplaceholder.typicode.com/users') //axios เป็นไลบรารี่ที่แปลงให้เลย เอาง่ายๆ ทำให้ง่ายขึ้นนั่นแหล่ะ
//         // (7) log ออกมาดูว่าได้ข้อมูลมาหน้าตาแบบไหน ทำอันนี้ก่อนค่อยทำ (1) ก็ได้
//         console.log(getUser.data)

//         // (8) เอาข้อมูลที่ได้ยัดใส่ที่เก็บ (เอาหัวใจหลายๆดวงใส่กล่อง)
//         setUser(getUser.data);
//     }

//     //ฟังก์ชั่นของรีแอคมีหน้าที่เรียกใช้ตอนเปิดไฟล์นี้ อยู่ใน state mounting ref https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
//     //syntax useEffect(สิ่งที่ต้องการให้ทำงาน, เงื่อนไขที่ต้องการทำให้เรียกฟังก์ชันด้านซ้าย) ส่วนใหญ่จะใส่ [] หมายความว่าเรียกใช้หนึ่งครั้งหลังเปิด

//     //ตัวย่อ
//     // () => {
//     //     getUser();
//     // }
//     //                                                                     /\
//     //ตัวเต็ม                                                                 |
//     //พารามิเตอร์ = คล้ายๆเคาเตอร์ที่รับคนไข้แล้วส่งคนไข้ไปทำไรต่อ แบบคนไข้รับยาช่องหนึ่ง , ติดต่อห้องฉุกเฉิน
//     //function ชื่อฟังก์ชัน (พารามิเตอร์ที่รับ ไม่มีก็ได้) {                             |
//     //     getUser(); สิ่งที่ต้องทำหลังจากเรียกใช้ฟังก์ชันนี้                           |
//     //                ในที่นี้คือเรียกฟังก์ชัน getUser() ทีนี้ก็จะไปเรียกฟังก์ชันด้านบนต่อ   |
//     //}

//     //อันนี้เรียกว่า Arrow function 

//     //ทีนี้ไฟล์นี้ทำงานยังไง 
//     //เริ่มมาเรียกฟังก์ชันนี้ (3)  useEffect(f,d)
//     useEffect(() => {
//         getUser(); //(4) แล้วเรียกใช้ฟังก์ชันที่ซ้อนอยู่ 
//     }, [])


//     //เริ่มส่งไปแสดงผล (9)
//     return (
//         <div className=" w-full h-full scroll-auto">

//             <div className="mt-10 justify-center flex flex-row items-center-safe">

//                 <Button href="/" className="absolute left-0 ms-10">Back</Button>

//                 <h1 className="font-extrabold text-4xl border-gray-300 border-8 p-5 rounded-full">User list</h1>
//             </div>
//             <div className="border-gray-300 border m-10 shadow-2xl">

//                 <div className="p-8 w-full h-full">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
//                         {/* เริ่มที่การ map ข้อมูล หยิบข้อมูลขึ้นมาทีละตัว (10) */}
//                         {/* เรียก สร้าง arrow ฟังก์ชันที่ป้อน user และ index เข้าไป */}
//                         {/* แกสามารถ double click ที่ตัวแปรเพื่อดูว่าตัวแปรตัวนี้มันคือตัวไหนถ้ามันเป็นตัวเดียวกันมันจะไฮไลท์ */}
//                         {/* เช่น users , user , index */}
//                         {users.map((user, index) => (
//                             //ให้ key(คล้ายๆ id) เป็น ค่า index 0 , 1 , 2 , 3 ...
//                             //user ให้แทนหัวใจแต่ละดวง
//                             <Card key={index} className="p-4 hover:scale-[1.025] transition-all duration-300">
//                                 <div className="flex items-center space-x-4 rtl:space-x-reverse">

//                                     <div className="flex-1 min-w-0">
//                                         <p className="text-sm font-medium text-heading truncate">
//                                             {/* เราสามารถเข้าถึงข้อมูลของหัวใจได้โดยใช้ หัวใจ.ข้อมูลที่ต้องการเข้าถึง */}
//                                             {/* มันก็มาจากอันที่เรากำหนดลักษณะของข้อมูลที่ต้องการรับ (1) ด้านบนนั่นแหล่ะ */}
//                                             {user.name}
//                                         </p>
//                                         <p className="text-sm text-body truncate">
//                                             {/* ไม่เชื่อแกก็ลอง double click username ดู */}
//                                             {user.username}
//                                         </p>
//                                         <p className="text-sm text-body truncate">
//                                             {/* เรียกมาสแดงให้ครบตามต้องการ */}
//                                             {user.email}
//                                         </p>
//                                         <p className="text-sm text-body truncate">
//                                             {user.phone}
//                                         </p>
//                                         <p className="text-sm text-body truncate">
//                                             {user.website}
//                                         </p>
//                                     </div>

//                                 </div>
//                             </Card>
//                         ))
//                         }

//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col items-center ">
//                 <Button>
//                     Load
//                 </Button>
//             </div>


//         </div>

//     );

// };

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "../components/UserCard";
import { UserData } from "../components/datatype/User";

// Zod schema
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string(),
});

const fetchUsers = async (limit: number): Promise<UserData[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  const parsed = z.array(userSchema).parse(res.data);
  return parsed.slice(0, limit);
};

const useUsers = (limit: number) => {
  return useQuery({
    queryKey: ["users", limit],
    queryFn: () => fetchUsers(limit),
  });
};

export default function UserListPage() {
  const [useQueryMode, setUseQueryMode] = useState(true);
  const [axiosUsers, setAxiosUsers] = useState<UserData[]>([]);
  const [postCount, setPostCount] = useState(5);

  const { data: queryUsers, isFetching, isError } = useUsers(postCount);

  const fetchAxiosUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const parsed = z.array(userSchema).parse(res.data);
    setAxiosUsers(parsed);
  };

  useEffect(() => {
    if (!useQueryMode) fetchAxiosUsers();
  }, [useQueryMode]);

  const usersToShow = useQueryMode ? queryUsers : axiosUsers;

  if (useQueryMode && isError) return <div>Error fetching data.</div>;

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-row items-center justify-between mb-8">
        <Button onClick={() => setUseQueryMode(!useQueryMode)}>
          Switch to {useQueryMode ? "Axios" : "React Query"}
        </Button>
        <h1 className="font-extrabold text-4xl border-gray-300 border-8 p-5 rounded-full">
          User List
        </h1>
        <Button href="/">
          Back
        </Button>
      </div>

      {(!usersToShow || usersToShow.length === 0) && <div>Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersToShow?.map((user, index) => (
          <UserCard key={user.id} index={index} {...user} />
        ))}
      </div>

      {useQueryMode && postCount <= 90 && (
        <div className="flex justify-center mt-8">
          <Button onClick={() => setPostCount(postCount + 5)} disabled={isFetching}>
            {isFetching ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}
