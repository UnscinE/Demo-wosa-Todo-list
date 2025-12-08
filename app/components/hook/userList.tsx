
import { UserData } from "../datatype/User";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (limit = 10): Promise<Array<UserData>> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    return data
}

const useUsers = (limit: number) => {
    return useQuery({
        queryKey: ['users',limit],
        queryFn: () => fetchUser(limit),
    })
}

export { useUsers , fetchUser }