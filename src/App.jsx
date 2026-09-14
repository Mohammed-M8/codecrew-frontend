import { useContext } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'

// Context
import { UserContext } from './contexts/UserContext';
<<<<<<< HEAD
import TaskForm from './components/TaskForm/TaskForm';
=======
import ProjectsSearch from './components/ProjectsSearch/ProjectsSearch';
import MyProjects from './components/MyProjects/MyProjects';
import ProjectDetails from './components/ProjectLayout/ProjectLayout';
import ProjectInfo from './components/ProjectInfo/ProjectInfo';
>>>>>>> main

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        {user ?
          <>
            <Route path='/' element={<Dashboard />}>
              <Route index element={<MyProjects />} />
              <Route path='projects' element={<MyProjects />} />
              <Route path='projects/search' element={<ProjectsSearch />} />
              <Route path='projects/:projectId/' element={<ProjectDetails />}>
                <Route index element={<ProjectInfo />} />
                <Route path='tasks' element={<h1>Tasks</h1>} />
                <Route path='requests' element={<h1>Requests</h1>} />
              </Route>


              <Route path='requests' element={<h1>Requests</h1>} />


<<<<<<< HEAD
              <Route path='tasks' element={<><h1>Tasks</h1><TaskForm /></>} />
=======
              <Route path='tasks' element={<h1>Tasks</h1>} />
>>>>>>> main
            </Route>
          </> :
          <>
            <Route path='/' element={<Landing />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} /></>
        }
      </Routes>
    </>
  );
};

export default App;
