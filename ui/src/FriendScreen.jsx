import { useState } from "react";
import AddFriendScreen from "./AddFriendScreen.jsx";
import CheckFriendRequestScreen from "./CheckFriendRequestScreen.jsx";

function FriendScreen({setAddFriendDisplay,setFriendsList,pendingFriendsList,setPendingFriendsList})
{
    const [checkRequestScreen,setCheckRequestScreen]=useState(false);
    
    const handleFriendScreenChange=(value)=>{
        setCheckRequestScreen(value);
    };

    return (
        <div id="friend-screen" className="basis-4/6 w-full sm:h-full flex flex-col justify-evenly items-center">
            <div className="basis-1/6 w-5/6 flex flex-row justify-center items-center">
                <button onClick={()=>handleFriendScreenChange(false)} className="w-full h-full bg-slate-900 hover:bg-black">Add Friend</button>
                <button onClick={()=>handleFriendScreenChange(true)} className="w-full h-full bg-slate-900 hover:bg-black">Friend Requests</button>
            </div>
            {checkRequestScreen?
                (<CheckFriendRequestScreen pendingFriendsList={pendingFriendsList} setFriendsList={setFriendsList} setPendingFriendsList={setPendingFriendsList}/>)
            :(<AddFriendScreen setAddFriendDisplay={setAddFriendDisplay} setFriendsList={setFriendsList}/>)
            }
        </div>
    );
}

export default FriendScreen;