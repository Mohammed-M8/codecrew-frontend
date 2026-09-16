import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import Activity from "./components/Activity/Activity";
import JoinRequests from './components/JoinRequests/JoinRequests';

// Context
import { UserContext } from './contexts/UserContext';
import ProjectsSearch from './components/ProjectsSearch/ProjectsSearch';
import MyProjects from './components/MyProjects/MyProjects';
import ProjectDetails from './components/ProjectLayout/ProjectLayout';
import ProjectInfo from './components/ProjectInfo/ProjectInfo';
import TaskDetail from './components/TaskDetails/TaskDetails';
import TaskList from './components/TaskList/TaskList';
import CreateProjectForm from './components/CreateProjectForm/CreateProjectForm';
import TaskForm from './components/TaskForm/TaskForm';
import EditProjectForm from './components/EditProjectForm/EditProjectForm';
import EditTask from './components/EditTask/EditTask';
import ErrorPage from './components/ErrorPage/ErrorPage';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='404' element={<ErrorPage />} />
        {user ?
          <>
            <Route path='/' element={<Dashboard />}>
              <Route index element={<Navigate to='/projects'/>} />
              <Route path='projects' element={<MyProjects />} />
              <Route path='projects/search' element={<ProjectsSearch />} />
              <Route path='projects/new' element={<CreateProjectForm />} />
              <Route path='projects/:projectId/' element={<ProjectDetails />}>
                <Route index element={<ProjectInfo />} />
                <Route path='tasks' element={<TaskList />} />
                <Route path='requests' element={<JoinRequests />} />
              </Route>
              <Route path='projects/:projectId/edit' element={<EditProjectForm />} />


              <Route path='projects/:projectId/tasks/new' element={<TaskForm />}></Route>
              <Route path='projects/:projectId/tasks/:taskId/edit' element={<EditTask />}></Route>

              <Route path='projects/:projectId/tasks/:taskId' element={<TaskDetail />}></Route>

              <Route path='requests' element={<JoinRequests />} />

              <Route path='tasks' element={<Activity />} />
            </Route>
          </> :
          <>
            <Route path='/' element={<Landing />} />
            <Route path='/projects' element={<ProjectsSearch />} />
            <Route path='projects/:projectId/' element={<ProjectDetails />}>
              <Route index element={<ProjectInfo />} />
            </Route>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} /></>
        }
      </Routes>
    </>
  );
};

export default App;