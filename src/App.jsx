import { Box, Button, Flex } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import MainPage from './components/user/MainPage'
import Layout from './components/user/Layout';
import UserLogin from './components/user/UserLogin';
import SignUp from './components/user/SignUp';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/admin/Login';
import AdminLayout from './components/admin/Layout';




function App() {

  


  return (
    <>
    
      <Router>
      <Routes>
      <Route exact path="/admin" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>

        <Route exact path="/" element={<UserLogin />} />
        <Route path="/user/*" element={<Layout />}>
          <Route path="guestmode" element={<MainPage />} />
          <Route path=":userid" element={<MainPage />} />
          <Route path=":userid/:id" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
