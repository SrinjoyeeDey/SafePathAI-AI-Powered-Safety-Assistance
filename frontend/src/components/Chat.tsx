import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { formatResponse } from "../utils/ChatResponseMap";
import { useLocation } from "../context/LocationContext";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [geoLocationError, setGeoLocationError] = useState(false);
  const {  setShowLocationModal } = useLocation();
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now() + Math.random(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

   
    navigator.geolocation.getCurrentPosition(
      
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Frontend is sending these coordinates:", { latitude, longitude });

        try {
          const response = await fetch('http://localhost:4000/api/ai/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              message: userMsg.text,
              latitude,
              longitude 
            }),
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();
          const aiMsg: Message = {
            id: Date.now() + Math.random(),
            sender: "ai",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, aiMsg]);

        } catch (error) {
          console.error("Failed to get AI response:", error);
          const errorMsg: Message = {
            id: Date.now() + Math.random(),
            sender: "ai",
            text: "Sorry, I'm having trouble connecting to the AI service.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      },
     
      (error) => {
        console.error("Geolocation error details:", error);
        const errorMsg: Message = {
          id: Date.now() + Math.random(),
          sender: "ai",
          text: `I can't access your location. (Error: ${error.message})`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setGeoLocationError(true);
        setMessages((prev) => [...prev, errorMsg]);
      },
     
      {
        timeout: 30000,
      }
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all"
      >
        <FaRobot />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 h-[65%] bg-gray-50 dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
          {/* ... The rest of your JSX code remains the same ... */}
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <span className="font-semibold">AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="font-bold hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm break-words ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none"
                  }`}
                >
                  {
                      msg.sender === "user" ? <p className="text-sm">{msg.text}</p> : <div 
                  className="prose prose-sm md:prose-base max-w-none" 
                  dangerouslySetInnerHTML={formatResponse(msg.text)} 
                  />
                  }
                  <span className={`text-xs ${msg.sender === "user"?'text-white':'text-gray-400'} mt-1 block text-right`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {
            geoLocationError && (
              <div className="bg-red-100 text-red-700 p-2 text-center text-sm">
                Unable to access your location. Please enable location services for better assistance.
                <button
                  onClick={() => {
                    setGeoLocationError(false);
                    setShowLocationModal(true);
                  }}
                  className="underline font-semibold ml-1"
                >
                  Set Location
                </button>
              </div>
            )
          }
          <div className="p-3 bg-gray-100 dark:bg-gray-700 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;