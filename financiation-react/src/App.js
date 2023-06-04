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

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path='/' exact element={<LandingPage/>}/>

                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/signin' element={<SigninPage/>}/>
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path='/reset-password/confirm' element={<ResetPasswordConfirmPage/>}/>
                    <Route path='/activate' element={<ActivateAccountPage/>}/>

                    <Route path='/advised' exact element={<AdvisedListPage/>}/>
                    <Route path='/advised/:id' element={<AdvisedPage/>}/>

                    <Route path='/visit/add' element={<AddVisitPage/>}/>
                    <Route path='/visit/register' element={<VisitRegisterPage/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
