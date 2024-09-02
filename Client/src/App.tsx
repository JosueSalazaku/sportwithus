
import { BrowserRouter as Router, Route } from 'react-router-dom';
import calendar from './pages/calendar';
import home from './pages/home';

export default function App() {
  return (
    <Router>
        <Route path="/" Component={home}/>
        <Route path="/calendar" Component={calendar} />
    </Router>
  )
}