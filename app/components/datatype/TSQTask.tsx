// "id": 1,
//     "todo": "Do something nice for someone you care about",
//         "completed": false,
//             "userId": 152

export type TSQTask = APITSQTask & {
    datetime: string,
};

export type APITSQTask = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};