import { Flex, Spinner } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import './App.css'




import Layout from './components/user/Layout';
import SignUp from './components/user/SignUp';
import AdminLayout from './components/admin/Layout';
import Guest from './components/user/Guest';
// import UserProfile from './components/admin/UserProfile';


const MainPage = lazy(() => import('./components/user/MainPage'));
const UserLogin = lazy(() => import('./components/user/UserLogin'));
const AdminDashboard = lazy(() => import('./components/admin/Pages/AdminDashboard'));
const Employee = lazy(() => import('./components/admin/Pages/Employee'));
const User = lazy(() => import('./components/admin/Pages/User'));
const Queries = lazy(() => import('./components/admin/Pages/Queries'));
const Login = lazy(() => import('./components/admin/Pages/Login'));
const UserProfile = lazy(() => import('./components/admin/Pages/UserProfile'));
const EmployeeProfile = lazy(() => import('./components/admin/Pages/EmployeeProfile'));
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
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="queries" element={<Queries />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<UserProfile />} />
            <Route path="employee/:id" element={<EmployeeProfile />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<Guest />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Layout />}>
            <Route path=":userid" element={<MainPage />} />
            <Route path=":userid/:id" element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
