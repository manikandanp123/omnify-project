import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register'; 
import Schedule from './pages/Schedule';
import PastSchedule from './pages/PastSchedule';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/schedule' element={<Schedule/>} />
          <Route path='/pastSchedule' element={<PastSchedule/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
