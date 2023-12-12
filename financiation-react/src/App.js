import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavbarComponent'
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import LandingPage from "./pages/LandingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";
import ActivateAccountPage from "./pages/ActivateAccountPage";
import AddVisitPage from "./pages/AddVisitPage";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import FormPage from "./pages/FormPage";
import ProfilePage from "./pages/ProfilePage";
import {ReportsPage} from "./pages/ReportsPage";
import {CreateGroupPage} from "./pages/CreateGroupPage";
import {PublicRoute} from "./utils/PublicRoute";
import {GroupsPage} from "./pages/GroupsPage";
import {MainMenuPage} from "./pages/MainMenuPage";
import {VisitsPage} from "./pages/VisitsPage";
import React from 'react';
import {ReportsProvider} from "./context/ReportsContext";
import {AddMayorPage} from './pages/AddMayorPage';
import { CalendarPage } from './pages/CalendarPage';
import {EmailSended} from './pages/EmailSended';
import EditPhotoPage from './pages/EditPhotoPage';
import "@fontsource/poppins";
import * as logo from './assets/images/logo.jpeg'


import EditVisitPage from './pages/EditvisitPage';
function App() {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route path='/' exact element={<PublicRoute children={<LandingPage/>}></PublicRoute>}/>

                        <Route path='/login' element={<PublicRoute children={<LoginPage/>}/>}/>
                        <Route path='/signin' element={<PublicRoute children={<SigninPage/>}/>}/>
                        <Route path='/reset-password' element={<PublicRoute children={<ResetPasswordPage/>}/>}/>
                        <Route path='/password/reset/confirm/:uid/:token'
                               element={<PublicRoute children={<ResetPasswordConfirmPage/>}/>}/>
                        <Route path='/activate/:uid/:token'
                               element={<PublicRoute children={<ActivateAccountPage/>}/>}/>

                         <Route path='/emailsended' element={<PublicRoute children={<EmailSended/>}/>}/>

                        <Route exact path='/me' element={<PrivateRoute children={<ProfilePage/>}/>}/>

                        <Route path="/menu" element={<PrivateRoute children={<MainMenuPage/>}/>}/>


                        <Route path='/groups' element={<PrivateRoute children={<GroupsPage/>}/>}/>
                        <Route path='/form' element={<PrivateRoute children={<FormPage/>}/>}></Route>
                        <Route path='/visits' element={<PrivateRoute children={<VisitsPage/>}/>}></Route>

                        <Route path='/visits/add' element={<PrivateRoute children={<AddVisitPage/>}/>}/>
                        <Route path='/visits/edit/:visitId' element={<PrivateRoute children={<EditVisitPage/>}/>}/>
                        <Route path='/groups/add' element={<PrivateRoute children={<CreateGroupPage/>}/>}/>

                        <Route path='/reports'
                               element={<PrivateRoute children={<ReportsProvider><ReportsPage/></ReportsProvider>}/>}/>

                        <Route path='/mayors/add' element={<PrivateRoute children={<AddMayorPage></AddMayorPage>}/>}/>
                        <Route path='/calendar' element={<PrivateRoute children={<CalendarPage></CalendarPage>}/>}/>
                        <Route path='/editphoto' element={<PrivateRoute children={<EditPhotoPage/>}/>}/>
                    </Routes>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
