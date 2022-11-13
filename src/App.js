import {
    Link,
    useLocation,
    useParams,
    Navigate,
    Outlet,
    useRoutes,
} from 'react-router-dom';
import {useState} from 'react';

const UsersLayout = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

const HomePage = () => {
    return (
        <>
            <h1>Home page</h1>
            <Link to='/users'>Users list</Link>
            <Outlet/>
        </>
    );
};

const UsersList = () => {
    const [users] = useState([1, 2, 3, 4, 5]);
    return (
        <>
            <h1>Users list</h1>
            <Link to='/'>Home page</Link>
            <ul>
                {users.map((u, i) => (
                        <li key={i}>
                            <Link to={`${u}`}><p>User {u}</p></Link>
                        </li>
                    ),
                )}
            </ul>
        </>
    );
};

const UserProfile = () => {
    const {userId} = useParams();
    const {pathname} = useLocation();
    return (
        <>
            <h1>User {userId} info</h1>
            <p>
                <Link to={`${pathname}/edit`}>Edit User {userId}</Link>
            </p>
            <p>
                <Link to='/users'>Users List</Link>
            </p>
        </>
    );
};

const UserProfileEdit = () => {
    const {userId} = useParams();
    return (
        <>
            <h1>User {userId} edit</h1>
            <p>
                <Link to={`/users/${userId}`}>User {userId} info</Link>
            </p>
            <p>
                <Link to={`/users/${Number(userId) + 1}`}>Another User info</Link>
            </p>
            <p>
                <Link to='/users'>Users List</Link>
            </p>
        </>
    );
};

const routes = [
        {path: '', element: <HomePage/>},
        {
            path: 'users',
            element: <UsersLayout/>,
            children: [
                {path: '', element: <UsersList/>},
                {
                    path: ':userId',
                    children: [
                        {path: '', element: <Navigate to='profile'/>},
                        {path: 'profile', element: <UserProfile/>},
                        {path: 'profile/edit', element: <UserProfileEdit/>},
                        {path: '*', element: <UserProfile/>},
                    ],
                },
            ],
        },
        {path: '*', element: <Navigate to='/'/>},
    ]
;

function App() {
    const elements = useRoutes(routes);
    return (
        <>
            {elements}
        </>);
}

export default App;
