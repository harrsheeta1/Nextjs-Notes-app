'use client';
import { useState } from 'react';
import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import  React from 'react';
import { useRouter } from 'next/navigation'; 

const login=()=>
{   const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); //app router for navigation
    const handleSubmit = async () => {
    const endpoint = isLogin ? '/api/login' : '/api/signup';

    const res = await fetch(endpoint,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:username, password:password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      router.push('/dashboard');
    } else if (res.ok) {
      alert('Sign up successful! You can now log in.');
      setIsLogin(true);
    } else {
      alert(data.message || 'Request failed. Please try again.');
    }
  };

   return(
     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2e003e] to-[#1a1a40] text-white p-4">
      <h1 className="text-3xl font-bold text-[#ff5dc8] mb-8 text-shadow">
       Welcome to Notes App!!
      </h1>

      <div className="bg-white/5 border border-[#ff5dc8] rounded-xl p-8 w-[350px] shadow-lg">
      <h2 className='text-xl text-[#ff80cc] mb-4'></h2>
      {isLogin ?'Login':'Sign Up'}
      <Input placeholder="username" className="mb-4 bg-[#2a1a40] text-white border-[#ff5dc8]"
       value={username}
          onChange={(e) => setUsername(e.target.value)}/>
      <Input placeholder="Paasowrd" type="password" className="mb-4 bg-[#2a1a40] text-white border-[#ff5dc8]"
      value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      <Button className="w-full bg-gradient-to-r from-[#ff5dc8] to-[#ff80cc] text-white"
       onClick={handleSubmit}>
       {isLogin?"Login":"Sign Up"}
       </Button>
       <div className="text-sm mt-4">
          {isLogin?
          (
               <>
                Don't have an account?{" "}
               <span
                 className="text-[#ff5dc8] cursor-pointer"
                 onClick={()=> setIsLogin(false)}
               > 
                 Sign Up
               </span>
               </>
          ):
          (
                <>
                Already have an account?{""}
                <span className="text-[#ff5dc8] cursor-pointer"
                onClick={()=> setIsLogin(true)}>
                    Login
                </span>
                </>
          )
        }
       </div>

      </div>
    </div>
   )
}
export default login;


