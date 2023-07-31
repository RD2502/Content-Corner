import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import LogIn from './pages/Login.js';
import CreatePost from './admin/CreatePost';
import EditPost from './admin/EditPost';
import EditProfile from'./pages/updateProfile.js';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/userdashboard';
import AdminRoute from './components/AdminRoute.js';
import Layout from './admin/global/Layout';
import Userlist from './pages/UserList.js'
import LogUp from './pages/Register';
import Editrole from './pages/RoleUpdate.js';
import UserRoute from './components/UserRoute';
import Singlepost from './pages/Singlepost.js';
const AdminDashboardHOC=Layout(AdminDashboard);
const CreatePostHoc=Layout(CreatePost)
const EditPostHoc=Layout(EditPost)
const EditUserHoc=Layout(EditProfile)
const UserDashboardHoc=Layout(UserDashboard)
const UserHoc=Layout(Userlist)
const RoleHoc=Layout(Editrole)
const App = () => {
 
  return (
    <>
    <ToastContainer/>
    <Provider store={store}>
    < ProSidebarProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/register' element={<LogUp/>}/>
      <Route path='/post/:id' element={<Singlepost/>}/>
      <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC/></AdminRoute>}/>
      <Route path='/user/dashboard'  element={<UserRoute><UserDashboardHoc/></UserRoute>}/>
      <Route path='/post/create' element={<CreatePostHoc/>}/>
      <Route path='/post/edit/:id' element={<EditPostHoc/>}/>
      <Route path='/updateuser' element={<EditUserHoc/>}/>
      <Route path='/updaterole/:id' element={<RoleHoc/>}/>
      <Route path='/users' element={<UserHoc/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    </BrowserRouter>

    </ ProSidebarProvider>
    
    </Provider>
    
    </>
  )
}

export default App