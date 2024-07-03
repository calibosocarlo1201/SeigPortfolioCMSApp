import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "./screens/Dashboard";
import NavigationBar from "./components/NavigationBar";
import ExperienceScreen from "./screens/ExperienceScreen";
import Breadcrumb from './components/Breadcrumb';
import ProjectsScreen from './screens/ProjectsScreen';
import SkillsScreen from './screens/SkillsScreen';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import CreateProjectScreen from './screens/CreateProjectScreen';
import LoginScreen from './screens/LoginScreen';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='' element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/experience' element={<ExperienceScreen />} />
            <Route path='/projects' element={<ProjectsScreen />} />
            <Route path='/skills' element={<SkillsScreen />} />
            <Route path='/projects/:id' element={<ProjectDetailsScreen />} />
            <Route path='/projects/create' element={<CreateProjectScreen />} />

          </Route>
        </Routes>
      </Layout>
    </Router>
  )
}