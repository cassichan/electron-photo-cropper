import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import Hello from './Components/Hello';
import Photo from './Components/Photo';
import './App.css';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}
