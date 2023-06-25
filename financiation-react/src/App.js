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
import {PublicRoute} from "./utils/PublicRoute";
import AdvisorPage from './pages/AdvisorPage';
import CoordinatorPage from './pages/CoordinatorPage';


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
                        <Route path='/reset-password/confirm' element={<PublicRoute children={<ResetPasswordConfirmPage/>}/>}/>
                        <Route path='/activate/:uid/:token' element={<PublicRoute children={<ActivateAccountPage/>}/>}/>

                        <Route exact path='/me' element={<PrivateRoute children={<ProfilePage/>}/>}/>

                        <Route path='/advised' exact element={<PrivateRoute children={<AdvisedListPage/>}/>}/>
                        <Route path='/advised/:id' element={<PrivateRoute children={<AdvisedPage/>}/>}/>

                        <Route path='/groups' element={<PrivateRoute children={<GroupCard/>}/>}/>
                        <Route path='/form' element={<PrivateRoute children={<FormPage/>}/>}></Route>

                        <Route path='/visit/add' element={<PrivateRoute children={<AddVisitPage/>}/>}/>


                        <Route path='/request/add' element={<PrivateRoute children={<FormRequestPage/>}/>}/>
                        <Route path='/group/add' element={<PrivateRoute children={<CreateGroupPage/>}/>}/>

                        <Route path='/request/add' element={<FormRequestPage/>}/>
                        <Route path='/group/add' element={<CreateGroupPage/>}/>
                        <Route path='/advisor/add' element={<AdvisorPage/>}/>
                        <Route path='/coordinator/add' element={<CoordinatorPage/>}/>


                        <Route path='/reports' element={<PrivateRoute children={<ReportsPage/>}/>}/>



                    </Routes>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
