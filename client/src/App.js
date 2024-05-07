import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Bookingscreen from './screens/Bookingscreen';

function App() {
  return (
    <div className='App'>
      <Navbar/>

      
      <BrowserRouter>
      
      <Routes>
        <Route path='/home' element={<Homescreen />} />
        <Route path='/book/:roomid' exact Component={Bookingscreen} />
      
      
      </Routes>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
