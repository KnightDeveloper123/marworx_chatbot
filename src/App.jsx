import { Flex, Spinner } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import './App.css'
import Layout from './components/user/Layout';
import SignUp from './components/user/SignUp';
import AdminLayout from './components/admin/Layout';
import Guest from './components/user/Guest';
// import Sector from './components/admin/Pages/Sector';
// import ProductService from './components/admin/Pages/ProductService';
// import BotBuilder from './components/admin/Pages/BotBuilder';
// import Campaign from './components/admin/Pages/Campaign';
// import GenerativeBot from './components/admin/Pages/GenerativeBot';
// import SectorProfile from './components/admin/Pages/SectorProfile';
// import Employee from './components/admin/Pages/Employee';
// import ProductDetails from './components/admin/Pages/ProductDetails';
// import UserProfile from './components/admin/UserProfile';


const MainPage = lazy(() => import('./components/user/MainPage'));
const UserLogin = lazy(() => import('./components/user/UserLogin'));
const AdminDashboard = lazy(() => import('./components/admin/Pages/AdminDashboard'));
const Admin = lazy(() => import('./components/admin/Pages/Admin'));
const User = lazy(() => import('./components/admin/Pages/User'));
const Queries = lazy(() => import('./components/admin/Pages/Queries'));
const Login = lazy(() => import('./components/admin/Pages/Login'));
const UserProfile = lazy(() => import('./components/admin/Pages/UserProfile'));
const AdminProfile = lazy(() => import('./components/admin/Pages/AdminProfile'));
const Sector = lazy(() => import('./components/admin/Pages/Sector'));
const BotBuilder = lazy(() => import('./components/admin/Pages/BotBuilder'));
const Bot =lazy(()=>import ('./components/admin/Pages/Bot'))
const ViewBot = lazy(() => import('./components/admin/Pages/ViewBot'));
const Template = lazy(()=>import ('./components/admin/Pages/Template'));
const CreateTemplate = lazy(()=> import('./components/admin/Pages/CreateTemplate'))
const ViewTemplate = lazy(()=> import('./components/admin/Pages/ViewTemplate'))
const EmployeeProfile = lazy(() => import('./components/admin/Pages/EmployeeProfile'));
const Employee = lazy(() => import('./components/admin/Pages/Employee'));
const ProductDetails = lazy(() => import('./components/admin/Pages/ProductDetails'));
const SectorProfile = lazy(() => import('./components/admin/Pages/SectorProfile'));
const GenerativeBot = lazy(() => import('./components/admin/Pages/GenerativeBot'));
const Campaign = lazy(() => import('./components/admin/Pages/Campaign'));
const ProductService = lazy(() => import('./components/admin/Pages/ProductService'));
const RecycleBin = lazy(() => import('./components/admin/Pages/RecycleBin'));



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
          <Route exact path="/home" element={<Login />} />
          <Route path='bot_builder' element={<BotBuilder />} /> 
          <Route path="view/:id" element={<ViewBot />} />
          <Route path="create_template/:id" element={ <CreateTemplate /> } />
          <Route path="view_template/:id" element={ <ViewTemplate /> } />
          
          <Route path="/home/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="employee" element={<Employee />} />
            <Route path='sector' element={<Sector />} />
            <Route path='sector/:id' element={<SectorProfile />} />
            <Route path='employee/:id' element={<EmployeeProfile />} />
            <Route path='product' element={<ProductService />} />
            <Route path='product/:id' element={<ProductDetails />}> </Route>
            <Route path='bot' element={<Bot />} />
            <Route path='campaign' element={<Campaign />} />
            <Route path='gen_bot' element={<GenerativeBot />} />
            <Route path="queries" element={<Queries />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<UserProfile />} />
            <Route path="admin/:id" element={<AdminProfile />} />
            <Route path="template" element={ <Template /> } />
            <Route path="recycle_bin" element={ <RecycleBin /> } />
            
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
