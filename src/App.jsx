import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//-----------PAGES---------------//
import ModeratorMain from './pages/ModeratorMain';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Registration from './pages/RegisterForm';
import Events from './pages/Events';
import UserProfile from './pages/UserProfile';
import AdminMain from './pages/AdminMain';
import RolForm from './pages/RolForm';
import NewEventForm from './pages/NewEventForm';
import ValidationMain from './pages/ValidationMain';
import CancelEventForm from './pages/CancelEventForm';
import EnableEventForm from './pages/EnableEventForm';
import MyTickets from './pages/MyTickets';
import Dashboard from './pages/AdminDashboard';
import EventInformation from './pages/EventInformation';
import  MyEvents  from './pages/MyEvents';

//-------------------------------//
function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/register' element={<Registration/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path='/moderator' element={<ModeratorMain />} />
            <Route path='/rolform' element={<RolForm />} />
            <Route path='/adminmain' element={<AdminMain/>} />
            <Route path='/neweventform' element={<NewEventForm/>} />
            <Route path='/validationmain' element={<ValidationMain/>} />
            <Route path='/cancelevent' element={<CancelEventForm/>} />
            <Route path='/enableevent' element={<EnableEventForm/>} />
            <Route path='/mytickets' element={<MyTickets/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/eventinfo' element={<EventInformation/>} />
            <Route path='/myevents' element={<MyEvents/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
