import { useContext } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import JoinRequests from './components/JoinRequests/JoinRequests';

// Context
import { UserContext } from './contexts/UserContext';
import ProjectsSearch from './components/ProjectsSearch/ProjectsSearch';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        {user ?
          <>
            <Route path='/' element={<Dashboard />}>
              <Route path='projects' element={<h1>Projects</h1>} />
              <Route path='projects/search' element={<ProjectsSearch />} />


              <Route path='requests' element={<JoinRequests />} />


              <Route path='tasks' element={<h1>Tasks</h1>} />
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