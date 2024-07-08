import { useState } from "react";

function PreviousChatsUsers({chatUsers,setChatUsers})
{
    if(chatUsers.length!=0)
    {
        return (
            <div className="w-full h-5/6 flex flex-col justify-evenly items-center">
                {chatUsers.map(user=>{
                    return (
                        <button className="w-full h-full">{user}</button>
                    );
                })}
            </div>
        );
    }
    else
    {
        return (
            <p className="w-full h-5/6 flex justify-center items-center">Loading.....</p>
        );
    }
}

function PreviousChats()
{
    const [chatUsers,setChatUsers] = useState(["Prabhat","Vikas","Inguva"]);

    return (
        <div className="w-2/6 h-full border-2 border-white flex flex-col justify-evenly items-center">
            <h3 className="w-full h-1/6 flex justify-center">Chats</h3>
            <PreviousChatsUsers chatUsers={chatUsers} setChatUsers={setChatUsers}/>
        </div>
    );
}

function CurrentChat({currentUser})
{
    const [chatMessages,setChatMessages]=useState([]);
    if(currentUser.length!=0 && chatMessages.length!=0)
    {
        return (
            <div className="w-full h-full flex justify-center items-center">
    
            </div>
        );
    }
    else if(currentUser.length!=0 && chatMessages.length==0)
    {
        return (
            <div className="w-full h-full flex justify-center items-center">
                Loading messages...
            </div>
        );
    }
    else
    {
        return (
            <div className="w-full h-full flex justify-center items-center">
                Please select a chat to view your messages
            </div>
        );
    }
}

function ChatScreen()
{
    const [currentChatDisplay,setCurrentChatDisplay] = useState("asd");
    return (
        <div className="w-4/5 h-4/5 border-2 border-white flex flex-row justify-evenly items-center">
            <PreviousChats/>
            <CurrentChat currentUser={currentChatDisplay}/>
        </div>
    );
}

export default ChatScreen;