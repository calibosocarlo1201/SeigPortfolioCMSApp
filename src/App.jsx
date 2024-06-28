import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "./screens/Dashboard";
import NavigationBar from "./components/NavigationBar";
import ExperienceScreen from "./screens/ExperienceScreen";
import Breadcrumb from './components/Breadcrumb';
import ProjectsScreen from './screens/ProjectsScreen';
import SkillsScreen from './screens/SkillsScreen';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import CreateProjectScreen from './screens/CreateProjectScreen';

export default function App() {
  return (
    <Router>
      <div className="w-full flex">
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Main Components */}
        <main className="w-4/5 grow py-12 px-14">
          <Breadcrumb />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/experience' element={<ExperienceScreen />} />
            <Route path='/projects' element={<ProjectsScreen />} />
            <Route path='/skills' element={<SkillsScreen />} />
            <Route path='/projects/:id' element={<ProjectDetailsScreen />} />
            <Route path='/projects/create' element={<CreateProjectScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}