import './App.css';
import HeaderSection from './components/navbar';
import { Route, Routes } from'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import About from './pages/about';
import Register from './pages/signup';
import Login from './pages/login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import AboutSection from './pages/moreabout';
import Profile from './pages/myprofile';
import MakeAppointment from './pages/makeappointment';
import ShopSection from './pages/shopsection';
import MyOrders from './pages/order';
import EditProfile from './components/editprofile';
import ChangePassword from './components/changepassword';
import Contact from './pages/contactus';
import Service from './pages/service';
import LandingPage from './components/landing';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<HeaderSection />} />
        <Route path='/makeappointment' element={<MakeAppointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/moreabout" element={<AboutSection />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/shopsection' element={<ShopSection />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contacts' element={<Contact />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/changepassword' element={<ChangePassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
