import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import AdvisedListPage from './pages/AdvisedListPage'
import AdvisedPage from "./pages/AdvisedPage";

    function App() {
        return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path='/' exact element={<AdvisedListPage/>}/>
                    <Route path='/advised/:id' element={<AdvisedPage/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
