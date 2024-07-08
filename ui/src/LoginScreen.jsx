import { useState } from "react";
import CryptoJS from 'crypto-js';

function SignupForm({setSigningUp})
{
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleInput=(value,setState)=>{
        setState(value);
    };
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const hashedPassword=CryptoJS.SHA256(password).toString();
        const userData={email,username,password:hashedPassword};
        try
        {
            const response=await fetch("http://localhost:8080/create-user",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if(response.ok)
            {
                setSigningUp(false);
            }
            else
            {
                console.log("Couldn't create user on the server side");
            }
        }
        catch(e)
        {
            console.log("Soemthing went wrong singing up",e);
        }
    };
    
    return (
        <div className="basis-10/12 flex flex-col justify-evenly items-center">
            <div className="flex flex-col justify-center items-center">
                <p>E-mail</p>
                <input type="text" value={email} onChange={(e)=>handleInput(e.target.value,setEmail)} className="border-2 border-white"></input>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p>Username</p>
                <input type="text" value={username} onChange={(e)=>handleInput(e.target.value,setUsername)} className="border-2 border-white"></input>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p>Password</p>
                <input type="password" value={password} onChange={(e)=>handleInput(e.target.value,setPassword)} className="border-2 border-white"></input>
            </div>
            <button onClick={(e)=>handleSubmit(e)} className="border-2 border-white">Sign Up</button>
        </div>
    );
}

function LoginForm({setSigningUp,setAuthenticated})
{
    const [identifier,setIdentifier] = useState('');
    const [password,setPassword] = useState("");

    const handleLogin=async (e)=>{
        e.preventDefault();
        const hashedPassword=CryptoJS.SHA256(password).toString();
        const userData={identifier,password:hashedPassword};
        try
        {
            const response=await fetch("http://localhost:8080/login-user",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if(response.ok)
            {
                const result=await response.json();
                document.cookie=`token=${result.token};max-age=${30*60*60};path=/`
                setAuthenticated(true);
            }
            else
            {
                console.log("Something went wrong on the server side");
            }
        }
        catch(e)
        {
            console.log("Soemthing went wrong trying to login",e);
        }
    }

    const handleInput=(value,setState)=>{
        setState(value);
    };

    const handleScreenChange=()=>{
        setSigningUp(true);
    }
    return (
        <div className="basis-10/12 flex flex-col justify-evenly items-center">
            <div className="flex flex-col justify-center items-center">
                <p>Username or E-mail</p>
                <input type="text" value={identifier} onChange={(e)=>handleInput(e.target.value,setIdentifier)} className="border-2 border-white"></input>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p>Password</p>
                <input type="password" value={password} onChange={(e)=>handleInput(e.target.value,setPassword)} className="border-2 border-white"></input>
            </div>
            <button type="submit" onClick={(e)=>handleLogin(e)} className="border-2 border-white">Sign In</button>
            <a className="text-white text-sm" onClick={handleScreenChange}>Dont have an account? Sign Up</a>
        </div>
    );
}

function CheckSignupForm({setAuthenticated})
{
    const [singingUp,setSigningUp] = useState(false);
    if(singingUp)
    {
        return (
            <SignupForm setSigningUp={setSigningUp}/>
        );
    }
    else
    {
        return (
            <LoginForm setSigningUp={setSigningUp} setAuthenticated={setAuthenticated}/>
        );
    }
}

function LoginScreen({setAuthenticated})
{
    return (
        <div className="w-1/2 h-4/5 border-2 border-white flex flex-col justify-evenly items-center">
            <h6 className="flex items-center basis-2/12">ChatPlat</h6>
            <CheckSignupForm setAuthenticated={setAuthenticated}/>
        </div>
    );
}

export default LoginScreen