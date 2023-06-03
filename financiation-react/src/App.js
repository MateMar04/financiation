import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/NavbarComponent'
import AdvisedListPage from './pages/AdvisedListPage'
import AdvisedPage from "./pages/AdvisedPage";
import LoginPage from "./pages/LoginPage";

    function App() {
        return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path='/' exact element={<AdvisedListPage/>}/>
                    <Route path='/advised/:id' element={<AdvisedPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
