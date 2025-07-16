import React, { useContext, useEffect, useState } from 'react'
import pattern from "../../assets/images/pattern.png";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import { mycontext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import googleicon from "../../assets/images/googleicon.png";
import Checkbox from '@mui/material/Checkbox';
import { MdHome } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import { userData } from '../../utils/api';

const SignUp = () => {
    const navigate = useNavigate()
    const context = useContext(mycontext)
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
     const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
     const [fromFields, setFromFields] = useState({
         name:'',
                 Email:'',
                 phoneno:'',
                 password:'',
                 cpassword:'',
     });

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true)
         window.scrollTo(0,0)
    },[])

      const focusInput = (index) => {
        setInputIndex(index);
    }
     const inputchange=(e)=>{
       setFromFields(()=>({
                    ...fromFields,
                    [e.target.name]:e.target.value
                }))
    }

     const adduser=(e)=>{
          e.preventDefault()
          userData('/signup/create',fromFields)

        if(fromFields.password !== fromFields.cpassword){
            alert("incorrect password")
          }else{
              alert("signup complted")
              navigate('/login')
          }

            setFromFields({
                 name:'',
                 Email:'',
                 phoneno:'',
                 password:'',
                 cpassword:'',
            })
        }

  return (
    <>
    <img src={pattern} className="login-patern" />
            <section className="login-section sign-up-section">
                <div className="row">
                    <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
                         <h1>Best UX/UI Fashion <br/><span className="text-sky"> Ecommerce Dashboard </span> & Admin Panel</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries</p>
                        <div className="w-100 mt-4">
                            <Link to={'/'}>
                                <Button className="btn-blue btn-lg btn-big"> <MdHome /> Go To Home</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 pr-0">
                        <div className="login-box">
                            <div className="logo text-center mt-5">
                                <img src={logo} alt="logo" width="60" />
                                <h5 className="font-weight-bold">Register A New Account</h5>
                            </div>
                            <div className="login-wrapper mt-5 card border">
                                <form  onSubmit={adduser}>
                                    <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                        <span className="icons"><FaUserCircle /></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Name"
                                            onFocus={() => focusInput(0)}
                                            onBlur={() => setInputIndex(null)}
                                            autoFocus
                                            onChange={inputchange}
                                            name='name' required
                                        />
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                        <span className="icons"><MdEmail /></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your Email"
                                            onFocus={() => focusInput(1)}
                                            onBlur={() => setInputIndex(null)}
                                            onChange={inputchange}
                                            name='Email' required
                                        />
                                    </div>
                                      <div className={`form-group position-relative ${inputIndex === 2 && 'focus'}`}>
                                        <span className="icons"><FaPhone /></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Your phone no"
                                            onFocus={() => focusInput(2)}
                                            onBlur={() => setInputIndex(null)}
                                            onChange={inputchange}
                                            name='phoneno' required
                                        />

                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 3 && 'focus'}`}>
                                        <span className="icons"><RiLockPasswordFill /></span>
                                        <input
                                            type={`${isShowPassword === true ? 'text' : 'password'}`}
                                            className="form-control"
                                            placeholder="Enter Your Password"
                                            onFocus={() => focusInput(3)}
                                            onBlur={() => setInputIndex(null)}
                                             name="password" onChange={inputchange} required
                                        />
                                        <span className="toggle-show-password"
                                            onClick={() => setIsShowPassword(!isShowPassword)}>
                                            {
                                                isShowPassword === true ? <IoMdEye />: <IoMdEyeOff />
                                            }
                                        </span>
                                    </div>
                                    <div className={`form-group position-relative ${inputIndex === 4 && 'focus'}`}>
                                        <span className="icons"><IoShieldCheckmarkSharp /></span>
                                        <input
                                            type={`${isShowConfirmPassword === true ? 'text' : 'password'}`}
                                            className="form-control"
                                            placeholder="Confirm Your Password"
                                            onFocus={() => focusInput(4)}
                                            onBlur={() => setInputIndex(null)}
                                             name="cpassword" onChange={inputchange} required
                                        />
                                        <span className="toggle-show-password"
                                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                            {
                                                isShowConfirmPassword === true ? <IoMdEye />: <IoMdEyeOff />
                                            }
                                        </span>
                                    </div>
                                    <FormControlLabel control={<Checkbox />} label="I agree to the all Terms & Condiotions" />
                                    <div className="form-group mt-3">
                                        <Button type="submit" className="btn-blue btn-big w-100">Sign Up</Button>
                                    </div>
                                    <div className="form-group text-center mt-3 mb-0">
                                        <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                            <span className="line"></span>
                                            <span className="txt">OR</span>
                                            <span className="line"></span>
                                        </div>
                                        <Button variant="outlined" className="w-100 btn-big login-with-google mt-4">
                                            <img src={googleicon} width="25px" /> &nbsp; Sign In with Google
                                        </Button>
                                    </div>
                                </form>
                            </div>
                           <div className="login-wrapper mt-3 card border footer p-3 ">
                                                  <span className="text-center">
                                                      Don't have an account?
                                                      <Link to='/SignUp' className="link links color ml-5"  style={{ color: '#0858f7', textDecoration: 'none'}}> Register</Link> 
                                                  </span>
                                              </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default SignUp