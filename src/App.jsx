import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "./screens/Dashboard";
import NavigationBar from "./components/NavigationBar";
import ExperienceScreen from "./screens/ExperienceScreen";
import Breadcrumb from './components/Breadcrumb';
import ProjectsScreen from './screens/ProjectsScreen';
import SkillsScreen from './screens/SkillsScreen';

export default function App() {
  return (
    <Router>
      <div className="w-full flex">
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Main Components */}
        <main className=" grow py-12 px-14">
          <Breadcrumb />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/experience' element={<ExperienceScreen />} />
            <Route path='/projects' element={<ProjectsScreen />} />
            <Route path='/skills' element={<SkillsScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}