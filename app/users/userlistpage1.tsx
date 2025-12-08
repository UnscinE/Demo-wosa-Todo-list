import { useState } from 'react';
import { useUsers } from '../components/hook/userList';

export default function Userlist() {

    // const queryClient = new QueryClient()

    // await queryClient.prefetchQuery({
    //     queryKey: ['users', 10],
    //     queryFn: () => fetchUser(10),
    // })

    //const userData = queryClient.getQueryData(['users'])
    const [postCount, setPostCount] = useState(10)
    const { data, isPending, isFetching } = useUsers(10);

    if (isPending) return <div>Loading</div>

    return (
        <div>
            <ul>
                {data?.map((user, index) => (
                    <li key={user.id}>
                        {index + 1}.{user.name}
                    </li>
                )

                )}
            </ul>
            {postCount <= 90 && (
                <button
                    onClick={() => setPostCount(postCount + 10)}
                    disabled={isFetching}
                >
                    {isFetching ? 'Loading...' : 'Show More'}
                </button>
            )}

        </div>
    )
}