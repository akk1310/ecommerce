// import React, { useState } from 'react';
// import axios from "axios";
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Login = ({setToken}) => {
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')

//     const onSubmitHandler = async (e)=>{
//         try {
//             e.preventDefault()
//             const response  = await axios.post(backendUrl+'/api/user/admin',{email,password})
//             if(response.data.success){
//                 setToken(response.data.token)
//                 localStorage.setItem("storeAdminId", response.data.storeAdminId);
//             }else{
//                 toast.error(response.data.message)
//             }      
//         } catch (error) {
//             console.log(error);   
//             toast.error(error.message)

//         }
//     }
//   return (
//     <div className='min-h-screen flex items-center justify-center w-full'>
//       <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
//         <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//             <div className='mb-3 min-w-72'>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//                 <input onChange={(e)=> setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' required type="email" placeholder='Email' />
//             </div>
//             <div className='mb-3 min-w-72'>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
//                 <input onChange={(e)=> setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' required type="password" placeholder='Password' />
//             </div>
//             <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? `${backendUrl}/api/admin/register`
        : `${backendUrl}/api/admin/login`;

      const payload = isRegister
        ? { name, storeName, email, password }
        : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        toast.success(data.message || (isRegister ? "Registered successfully" : "Login successful"));
        if (!isRegister) {
          setToken(data.token);
        } else {
          setIsRegister(false); // switch to login after register
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg p-6 rounded-lg w-[350px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isRegister ? "Register Your Store" : "Admin Login"}
        </h2>

        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="border p-2 rounded"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          className="text-sm text-blue-500 cursor-pointer text-center"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New here? Register your store"}
        </p>
      </form>
    </div>
  );
};

export default Login;

