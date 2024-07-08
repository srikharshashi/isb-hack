import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginScreen from './LoginScreen.jsx'
import ChatScreen from './ChatScreen.jsx'

function App()
{
  const [authenticated,setAuthenticated] = useState(false);
  const [cookieChecked,setCookieChecked]=useState(false);
  const checkCookies=async ()=>{
    const response=await fetch("http://localhost:8080/check-cookie",{
      method:"GET",
      credentials:"include",
    });
    const result=await response.json();
    if(result.validity)
    {
      setAuthenticated(true);
    }
    else
    {
      document.cookie="token=;max-age=0;path=/";
    }
    setCookieChecked(true);
  }
  useEffect(()=>{
    checkCookies();
  },[]);
  if(cookieChecked && authenticated)
  {
    return (
      <ChatScreen/>
    );
  }
  else if(cookieChecked && !authenticated)
  {
    return (
      <LoginScreen setAuthenticated={setAuthenticated}/>
    );
  }
  else
  {
    return (
      <div className="w-1/2 h-4/5 border-2 border-white flex flex-col justify-evenly items-center">
        Checking for login...
      </div>
    );
  }
}
export default App
