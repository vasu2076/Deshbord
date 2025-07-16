import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/sidebaer';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/login/login';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import ProductUpload from './pages/ProductUpload/ProductUpload';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProductDetailsid from './pages/ProductDetails/ProductDetailsid';
import ProductEdit from './pages/ProductUpload/ProductEdit';
const mycontext = createContext()

function App() {
   const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const [islogin,setislogin] = useState(false)
    const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
   const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') === 'dark');
     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const [isOpenNav, setIsOpenNav] = useState(false);

     useEffect(()=>{
      if (themeMode) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('themeMode', 'dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('themeMode', 'light');
        }
     },[themeMode])
   
  useEffect(()=>{
     const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

      window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
  },[])

   const openNav = () => {
        setIsOpenNav(true);
    };

  const values ={
    isToggleSidebar,
    setIsToggleSidebar,
    islogin,
    setislogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    windowWidth,
     openNav,
     isOpenNav,
        setIsOpenNav
  }

  return (
<>
<HashRouter>
<mycontext.Provider value={values}> 
  {
    isHideSidebarAndHeader!==true &&
    <Header/>
  }
    <div className='main d-flex'>
      {
                            isHideSidebarAndHeader !== true &&(
                            <>
                                <div className={`side-bar-overlay d-none ${isOpenNav === true ? 'show' : ''}`} 
                                    onClick={()=>setIsOpenNav(false)}>
                                </div>
                                <div className={`sidebar-wrapper ${isToggleSidebar === true ? 'toggle' : ''} 
                                    ${isOpenNav === true ? 'open' : ''}`}>
                                    <Sidebar />
                                </div>
                            </>
                        )}
      <div className={`content ${isHideSidebarAndHeader=== true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
          <Routes>
      <Route path="/" element={<Dashboard/>} exact={true}/>
      <Route path="/Dashboard" element={<Dashboard/>} exact={true}/>
      <Route path="/login" element={<Login/>} exact={true}/>
      <Route path="/SignUp" element={<SignUp/>} exact={true}/>
      <Route path="/products" exact={true} element={<Products />} />
      <Route path="/products/details/:id" exact={true} element={<ProductDetailsid />} />
      <Route path="/products/details/" exact={true} element={<ProductDetails />} />
      <Route path="/products/upload" exact={true} element={<ProductUpload />} />
      <Route path="/products/edit/:id" exact={true} element={<ProductEdit />} />
    </Routes>
      </div>
    </div>
    </mycontext.Provider>
</HashRouter>
</>
  );
}

export default App;
export {mycontext}