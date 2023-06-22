import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
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
import GroupCard from "./components/GroupCard";
import FormPage from "./pages/FormPage";
import FormRequestPage from "./pages/FormRequestPage";
import ProfilePage from "./pages/ProfilePage";
import {ReportsPage} from "./pages/ReportsPage";
import {CreateGroupPage} from "./pages/CreateGroupPage";
import React from "react";


function App() {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route path='/' exact element={<PrivateRoute><LandingPage/></PrivateRoute>}/>

                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/signin' element={<SigninPage/>}/>
                        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                        <Route path='/reset-password/confirm' element={<ResetPasswordConfirmPage/>}/>
                        <Route path='/activate' element={<ActivateAccountPage/>}/>

                        <Route exact path='/me' element={<ProfilePage/>}/>

                        <Route path='/advised' exact element={<PrivateRoute><AdvisedListPage/></PrivateRoute>}/>
                        <Route path='/advised/:id' element={<PrivateRoute><AdvisedPage/></PrivateRoute>}/>

                        <Route path='/group' element={<GroupCard group={{id: 1, name: 'Pepe'}} advisors={[
            {
                "id": 1,
                "id_user": "Mateo Marchisone",
                "id_group": 1
            },
            {
                "id": 2,
                "id_user": "Elvio Marchisone",
                "id_group": 2
            },
            {
                "id": 3,
                "id_user": "Tadeo Funes",
                "id_group": 3
            }
        ]}
                   coordinators={[
                       {
                           "id": 1,
                           "id_user": "Mateo Marchisone",
                           "id_group": 1
                       },
                       {
                           "id": 2,
                           "id_user": "Elvio Marchisone",
                           "id_group": 2
                       },
                       {
                           "id": 3,
                           "id_user": "Tadeo Funes",
                           "id_group": 3
                       }
                   ]}/>}/>
                        <Route path='/form' element={<FormPage/>}></Route>

                        <Route path='/visit/add' element={<AddVisitPage/>}/>

                        <Route path='/request/add' element={<FormRequestPage/>}/>
                        <Route path='/group/add' element={<CreateGroupPage/>}/>

                        <Route path='/reports' element={<ReportsPage/>}/>

                    </Routes>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
