import {
    Link,
    Redirect,
    Route,
    Switch,
    useLocation,
    useParams,
} from 'react-router-dom';
import {useState} from 'react';

const HomePage = () => {
    return (
        <>
            <h1>Home page</h1>
            <Link to='/users'>Users list</Link>
        </>
    );
};

const UsersList = () => {
    const [users] = useState([1, 2, 3, 4, 5]);
    return (
        <>
            <h1>Users list</h1>
            <Link to='/'>Home page</Link>
            {users.map((u, i) => (
                <ul key={i}>
                    <li>
                        <Link to={`/users/${u}`}><p>User {u}</p></Link>
                    </li>
                </ul>
            ))}
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

function App() {
    return (<>
        <Switch>
            <Route path='/users/:userId/profile/edit' component={UserProfileEdit}/>
            <Route path='/users/:userId/profile' component={UserProfile}/>
            <Redirect from='/users/:userId' to='/users/:userId/profile'/>
            <Route path='/users' component={UsersList}/>
            <Route exact path='/' component={HomePage}/>
            <Redirect from='*' to='/'/>
        </Switch>
    </>);
}

export default App;
