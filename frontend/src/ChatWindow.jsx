// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useContext, useState, useEffect } from "react";
// import {ScaleLoader} from "react-spinners";

// function ChatWindow() {
//     const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
//     const [loading, setLoading] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);

//     const getReply = async () => {
//         setLoading(true);
//         setNewChat(false);

//         console.log("message ", prompt, " threadId ", currThreadId);
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 message: prompt,
//                 threadId: currThreadId
//             })
//         };

//         try {
//             const response = await fetch("http://localhost:8080/api/chat", options);
//             const res = await response.json();
//             console.log(res);
//             setReply(res.reply);
//         } catch(err) {
//             console.log(err);
//         }
//         setLoading(false);
//     }

//     //Append new chat to prevChats
//     useEffect(() => {
//         if(prompt && reply) {
//             setPrevChats(prevChats => (
//                 [...prevChats, {
//                     role: "user",
//                     content: prompt
//                 },{
//                     role: "assistant",
//                     content: reply
//                 }]
//             ));
//         }

//         setPrompt("");
//     }, [reply]);


//     const handleProfileClick = () => {
//         setIsOpen(!isOpen);
//     }

//     return (
//         <div className="chatWindow">
//             <div className="navbar">
//                 <span className="faizlogo">faizGPT <i className="fa-solid fa-chevron-down"></i></span>
//                 <div className="userIconDiv" onClick={handleProfileClick}>
//                     <span className="userIcon"><i className="fa-solid fa-user"></i></span>
//                 </div>
//             </div>
//             {
//                 isOpen && 
//                 <div className="dropDown">
//                     <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
//                     <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
//                     <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
//                 </div>
//             }
//             <Chat></Chat>

//             <ScaleLoader color="#fff" loading={loading}>
//             </ScaleLoader>
            
//             <div className="chatInput">
//                 <div className="inputBox">
//                     <input placeholder="Ask anything"
//                         value={prompt}
//                         onChange={(e) => setPrompt(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
//                     >
                           
//                     </input>
//                     <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
//                 </div>
//                 <p className="info">
//                     faizGPT can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default ChatWindow;





import "./ChatWindow.css";
import Chat from "./chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { BASE } from "./base"; // ⬅️ added

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, isSidebarOpen, setIsSidebarOpen } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    console.log("message ", prompt, " threadId ", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      // ⬇️ only this line changed
      const response = await fetch(`${BASE}/api/chat`, options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Append new chat to prevChats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats => (
        [...prevChats, {
          role: "user",
          content: prompt
        }, {
          role: "assistant",
          content: reply
        }]
      ));
    }

    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <div className="navLeft">
          {!isSidebarOpen && (
            <button
              className="menuBtn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
              title="Open sidebar"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
          )}
          <span className="faizlogo">faizGPT <i className="fa-solid fa-chevron-down"></i></span>
        </div>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon"><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {isOpen &&
        <div className="dropDown">
          <div className="dropDownProfile">
            <span className="dropAvatar"><i className="fa-solid fa-user"></i></span>
            <div className="dropProfileInfo">
              <span className="dropName">Mohd Faiz</span>
              <span className="dropEmail">faiz@faizgpt.com</span>
            </div>
          </div>

          <div className="dropDivider"></div>

          <div className="dropDownItem">
            <span className="dropIcon"><i className="fa-solid fa-gear"></i></span>
            Settings
          </div>
          <div className="dropDownItem upgrade">
            <span className="dropIcon"><i className="fa-solid fa-bolt"></i></span>
            Upgrade plan
            <span className="proBadge">PRO</span>
          </div>
          <div className="dropDownItem">
            <span className="dropIcon"><i className="fa-solid fa-circle-question"></i></span>
            Help &amp; FAQ
          </div>

          <div className="dropDivider"></div>

          <div className="dropDownItem danger">
            <span className="dropIcon"><i className="fa-solid fa-arrow-right-from-bracket"></i></span>
            Log out
          </div>
        </div>
      }

      <Chat />

      {loading && (
        <div className="loaderWrap">
          <div className="avatar gptAvatar">f</div>
          <div className="typingBubble">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
          />
          <button
            id="submit"
            onClick={getReply}
            disabled={!prompt.trim() || loading}
            aria-label="Send message"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
        <p className="info">
          faizGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
