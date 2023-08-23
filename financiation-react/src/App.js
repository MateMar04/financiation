import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavbarComponent'
import AdvisedListPage from './pages/AdvisedListPage'
import AdvisedPage from "./pages/AdvisedPage";
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
import CreateAdvisorPage from './pages/CreateAdvisorPage';
import CreateCoordinatorPage from './pages/CreateCoordinatorPage';
import {AddAdvisedPage} from "./pages/AddAdvisedPage";
import {GroupsPage} from "./pages/GroupsPage";
import {MainMenuPage} from "./pages/MainMenuPage";
import {VisitsPage} from "./pages/VisitsPage";
import {AdvisorsPage} from "./pages/AdvisorsPage";
import {CoordinatorsPage} from "./pages/CoordinatorsPage";
import React, { useState, useEffect } from 'react';
import "@fontsource/poppins";

function App() {
    return (
        <Router>
            <div className="App">
                    <AuthProvider>
                        <Navbar />
                        <Routes>
                        <Route path='/' exact element={<PublicRoute children={<LandingPage/>}></PublicRoute>}/>

                        <Route path='/login' element={<PublicRoute children={<LoginPage/>}/>}/>
                        <Route path='/signin' element={<PublicRoute children={<SigninPage/>}/>}/>
                        <Route path='/reset-password' element={<PublicRoute children={<ResetPasswordPage/>}/>}/>
                        <Route path='/password/reset/confirm/:uid/:token'
                               element={<PublicRoute children={<ResetPasswordConfirmPage/>}/>}/>
                        <Route path='/activate/:uid/:token' element={<PublicRoute children={<ActivateAccountPage/>}/>}/>

                        <Route exact path='/me' element={<PrivateRoute children={<ProfilePage/>}/>}/>

                        <Route path="/menu" element={<PrivateRoute children={<MainMenuPage/>}/>}/>

                        <Route path='/advised' exact element={<PrivateRoute children={<AdvisedListPage/>}/>}/>
                        <Route path='/advised/:id' element={<PrivateRoute children={<AdvisedPage/>}/>}/>

                        <Route path='/groups' element={<PrivateRoute children={<GroupsPage/>}/>}/>
                        <Route path='/form' element={<PrivateRoute children={<FormPage/>}/>}></Route>
                        <Route path='/visits' element={<PrivateRoute children={<VisitsPage/>}/>}></Route>
                        <Route path='/advisors' element={<PrivateRoute children={<AdvisorsPage/>}/>}></Route>
                        <Route path='/coordinators' element={<PrivateRoute children={<CoordinatorsPage/>}/>}></Route>


                        <Route path='/visit/add' element={<PrivateRoute children={<AddVisitPage/>}/>}/>
                        <Route path='/groups/add' element={<PrivateRoute children={<CreateGroupPage/>}/>}/>
                        <Route path='/advisor/add' element={<PrivateRoute children={<CreateAdvisorPage/>}/>}/>
                        <Route path='/coordinator/add' element={<PrivateRoute children={<CreateCoordinatorPage/>}/>}/>
                        <Route path='/advised/add' element={<PrivateRoute children={<AddAdvisedPage/>}/>}/>

                        <Route path='/reports' element={<PrivateRoute children={<ReportsPage/>}/>}/>

                        </Routes>
                    </AuthProvider>
            </div>
        </Router>
    );
}
export default App;
