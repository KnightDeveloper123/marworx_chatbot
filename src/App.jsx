import { Flex, Spinner } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css'



import Layout from './components/user/Layout';
import SignUp from './components/user/SignUp';
import AdminLayout from './components/admin/Layout';
import UserProfile from './components/admin/UserProfile';


const MainPage = lazy(() => import('./components/user/MainPage'));
const UserLogin = lazy(() => import('./components/user/UserLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const Employee = lazy(() => import('./components/admin/Employee'));
const User = lazy(() => import('./components/admin/User'));
const Queries = lazy(() => import('./components/admin/Queries'));
const Login = lazy(() => import('./components/admin/Login'));
// const MainPage = lazy(() => import('./components/user/MainPage'));



function App() {

  


  return (
    <Suspense
    fallback={
      <Flex h="calc(100vh - 60px)" w="100%" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed=".9s" emptyColor="gray.200" color="gray.800" size="xl" />
      </Flex>
    }
  >
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route exact path="/admin" element={<Login />} />
        <Route  path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="queries" element={<Queries />} />
          <Route path="user" element={<User />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/*" element={<Layout />}>
          <Route path="guestmode" element={<MainPage />} />
          <Route path=":userid" element={<MainPage />} />
          <Route path=":userid/:id" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  </Suspense>
  )
}

export default App
