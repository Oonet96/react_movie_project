import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import NaviMenuBox from './components/NaviMenuBox';
import './App.css';

function App() {
  return (
    
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <NaviMenuBox/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/detail' element={<Detail/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
