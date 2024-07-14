import { useContext, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { sendMessage,fileUpload } from "./SocketMethods.jsx";

function CurrentChatDisplay({currentChat,chatMessages})
{
    const {user}=useContext(UserContext);
    const handleSend=()=>{
        const message=document.getElementById("message-input");
        if(message.value.length!=0)
        {
            sendMessage(user,currentChat,message.value);
            message.value="";
        }
    };

    const handleFileSend=()=>{

        const input = document.createElement('input');
        input.type = 'file';
        input.accept ='.jpg, .png, .jpeg';

        input.onchange =async(event) => {
            try
            {
                const file = event.target.files[0];
            if (file) {
                const convertFileToBase64 = (file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result.split(',')[1]);
                        reader.onerror = (error) => reject(error);
                    });
                };
                const base64Data = await convertFileToBase64(file);
                const jsonData = {
                    filename: file.name,
                    type: file.type,
                    data: base64Data,
                };
                fileUpload(user,currentChat,jsonData);               
                
            }
            }
            catch(e)
            {
                console.log("Couldn't upload the image");
            }
        };

        input.click();
    };
    return (
        <div id="chat-container" className="w-full h-full flex flex-col justify-evenly items-center">
            <div id="chat-header" className="w-5/6 basis-1/6 flex flex-row justify-start items-center">
                <div className="basis-4/6 overflow-x-auto max-w-full">{currentChat.username}</div>
            </div>
            <div id="message-container" className="w-5/6 h-5/6 flex flex-col justify-center items-center">
                {chatMessages[currentChat.email]&&chatMessages[currentChat.email].length!=0?(
                    <div id="chat-messages" className="w-full h-full overflow-y-auto max-h-full gap-y-6 flex flex-col justify-start items-center">
                    {chatMessages[currentChat.email].map(message=>{
                        if(message["type"]=="text")
                        {
                            if(message["sender"]==user.email)
                            {
                                return (
                                    <div key={message["timestamp"]+message["sender"]} className="w-full basis-1/6 flex flex-row justify-end items-center">
                                        <div className="basis-3/6 border-black border-2">
                                            {message["content"]}
                                        </div>
                                    </div>
                                );
                            }
                                else
                                {
                                    return (
                                        <div key={message["timestamp"]+message["sender"]} className="w-full basis-1/6 flex flex-row justify-start items-center">
                                            <div className="basis-3/6 border-black border-2">
                                                {message["content"]}
                                            </div>
                                        </div>
                                    );
                                }
                            }
                            else
                            {
                                if(message["sender"]==user.email)
                                    {
                                        return (
                                            <div key={message["timestamp"]+message["sender"]} className="w-full basis-1/6 flex flex-row justify-end items-center">
                                                <div className="basis-3/6 h-full border-black border-2">
                                                    <img className="w-fit h-fit" src={`data:${message["content"]["type"]};base64,${message["content"]["data"]}`}></img>
                                                </div>
                                            </div>
                                        );
                                    }
                                    else
                                    {
                                        return (
                                            <div key={message["timestamp"]+message["sender"]} className="w-full basis-1/6 flex flex-row justify-start items-center">
                                                <div className="basis-3/6 h-full border-black border-2">
                                                    <img className="w-fit h-fit" src={`data:${message["content"]["type"]};base64,${message["content"]["data"]}`}></img>
                                                </div>
                                            </div>
                                        );
                                    }
                            }
                    })}
                </div>
                ):(
                    <div id="empty-chat" className="w-full h-full flex flex-col justify-center items-center">
                        There are no messages sent or received
                    </div>
                )}
            </div>
            <div className="w-full basis-1/6 flex flex-row justify-evenly items-center">
                <div className="basis-4/6 border-2 border-black">
                    <input id="message-input" className="w-full text-black" type="text"></input>
                </div>
                <div className="basis-2/6 flex flex-row justify-evenly items-center">
                    <button onClick={handleFileSend} className="basis-2/6 border-2 hover:bg-black">Upload</button>
                    <button className="basis-2/6 border-2 hover:bg-black" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default CurrentChatDisplay;