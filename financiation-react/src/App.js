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
import VisitRegisterPage from "./pages/VisitRegisterPage";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import Successful from "./components/Successful";
import GroupCard from "./components/GroupCard";
import FormPage from "./pages/FormPage";
import FormRequestPage from "./pages/FormRequestPage";

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
                        <Route exact path='/successful' element={<Successful/>}/>

                        <Route path='/advised' exact element={<PrivateRoute><AdvisedListPage/></PrivateRoute>}/>
                        <Route path='/advised/:id' element={<PrivateRoute><AdvisedPage/></PrivateRoute>}/>

                        <Route path='/groups' element={<GroupCard/>}/>
                        <Route path='/form' element={<FormPage/>}></Route>

                        <Route path='/visit/add' element={<AddVisitPage/>}/>
                        <Route path='/visit/register' element={<VisitRegisterPage/>}/>

                        <Route path='/request/add' element={<FormRequestPage/>}/>
                    </Routes>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
