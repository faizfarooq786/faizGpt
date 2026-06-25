import "./chat.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const SUGGESTIONS = [
    { icon: "fa-lightbulb", title: "Brainstorm ideas", text: "Brainstorm creative ideas for a weekend project" },
    { icon: "fa-code", title: "Write some code", text: "Write a function to debounce a callback in JavaScript" },
    { icon: "fa-feather", title: "Draft a message", text: "Help me draft a polite follow-up email to a client" },
    { icon: "fa-graduation-cap", title: "Explain a topic", text: "Explain how neural networks work in simple terms" },
];

const GptAvatar = () => <div className="avatar gptAvatar">f</div>;

function GptBubble({ content }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard?.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className="gptDiv">
            <GptAvatar />
            <div className="gptBubbleWrap">
                <div className="gptMessage">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
                </div>
                <button
                    className={copied ? "copyBtn copied" : "copyBtn"}
                    onClick={handleCopy}
                    aria-label="Copy message"
                    title="Copy"
                >
                    <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
}

function Chat() {
    const { newChat, prevChats, reply, setPrompt } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }

        if (!prevChats?.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));

            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    // auto-scroll to the newest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [prevChats, latestReply]);

    return (
        <div className="chats">
          <div className="chatsInner">
            {newChat && prevChats.length === 0 && (
                <div className="welcome">
                    <div className="welcomeMark">f</div>
                    <h1 className="welcomeTitle">How can I help you today?</h1>
                    <p className="welcomeSub">Ask me anything — I'm faizGPT, ready when you are.</p>

                    <div className="suggestions">
                        {SUGGESTIONS.map((s, i) => (
                            <button
                                className="suggestionCard"
                                key={i}
                                onClick={() => setPrompt(s.text)}
                            >
                                <span className="suggestionIcon"><i className={`fa-solid ${s.icon}`}></i></span>
                                <div className="suggestionBody">
                                    <span className="suggestionTitle">{s.title}</span>
                                    <span className="suggestionText">{s.text}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {
                prevChats?.slice(0, -1).map((chat, idx) =>
                    chat.role === "user" ? (
                        <div className="userDiv" key={idx}>
                            <p className="userMessage">{chat.content}</p>
                        </div>
                    ) : (
                        <GptBubble content={chat.content} key={idx} />
                    )
                )
            }

            {
                prevChats.length > 0 && (
                    latestReply === null ? (
                        <GptBubble content={prevChats[prevChats.length - 1].content} key={"non-typing"} />
                    ) : (
                        <div className="gptDiv" key={"typing"}>
                            <GptAvatar />
                            <div className="gptBubbleWrap">
                                <div className="gptMessage"><ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown></div>
                            </div>
                        </div>
                    )
                )
            }

            <div ref={bottomRef} />
          </div>
        </div>
    )
}

export default Chat;
