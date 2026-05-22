import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Chat({ user, onLogout }) {
  const [room, setRoom] = useState("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesByRoom, setMessagesByRoom] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/messages/${room}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);

        setMessagesByRoom((prev) => ({
          ...prev,
          [room]: data,
        }));
      });

    socket.emit("join_room", room);

    const receiveHandler = (data) => {
      setMessagesByRoom((prev) => {
        const roomMsgs = prev[data.room]
          ? [...prev[data.room], data]
          : [data];

        return {
          ...prev,
          [data.room]: roomMsgs,
        };
      });

      if (data.room === room) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", receiveHandler);

    return () => {
      socket.emit("leave_room", room);
      socket.off("receive_message", receiveHandler);
    };
  }, [room]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      room,
      message,
      user: user || sessionStorage.getItem("username") || "Guest",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", data);

    setMessages((prev) => [...prev, data]);

    setMessage("");
  };

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");

    if (onLogout) onLogout();

    window.location.reload(); // يرجعك للـ login
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.sidebarTitle}>💬 Channels</h3>
        </div>

        <div style={styles.channelList}>
          <button
            onClick={() => setRoom("general")}
            style={{
              ...styles.channelButton,
              ...(room === "general" && styles.activeChannel),
            }}
          >
            # general
          </button>

          <button
            onClick={() => setRoom("random")}
            style={{
              ...styles.channelButton,
              ...(room === "random" && styles.activeChannel),
            }}
          >
            # random
          </button>
        </div>

        {/* USER + LOGOUT */}
        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {user ? user[0]?.toUpperCase() : "?"}
            </div>

            <div style={styles.userName}>
              {user || "Guest"}
            </div>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* CHAT */}
      <div style={styles.chatArea}>
        <div style={styles.chatHeader}>
          <h2># {room}</h2>
          <span>{messages.length} messages</span>
        </div>

        <div style={styles.messagesContainer}>
          {messages.map((m, i) => (
            <div key={i} style={styles.message}>
              <b>{m.user}:</b> {m.message}
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Arial",
    backgroundColor: "#36393f",
    color: "#dcddde",
  },

  sidebar: {
    width: 260,
    backgroundColor: "#2f3136",
    display: "flex",
    flexDirection: "column",
  },

  sidebarHeader: {
    padding: "20px",
    borderBottom: "1px solid #202225",
  },

  sidebarTitle: {
    margin: 0,
    color: "#fff",
  },

  channelList: {
    padding: "10px",
    flex: 1,
  },

  channelButton: {
    width: "100%",
    padding: "10px",
    marginBottom: "5px",
    background: "transparent",
    border: "none",
    color: "#8e9297",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "6px",
  },

  activeChannel: {
    backgroundColor: "#393c43",
    color: "#fff",
  },

  channelIcon: {
    marginRight: "8px",
  },

  sidebarFooter: {
    padding: "15px",
    backgroundColor: "#292b2f",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  userAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  userName: {
    color: "#fff",
  },

  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  chatHeader: {
    padding: "20px",
    borderBottom: "1px solid #202225",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chatTitle: {
    margin: 0,
    color: "#fff",
  },

  channelInfo: {
    color: "#8e9297",
  },

  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },

  message: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
  },

  messageAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    flexShrink: 0,
  },

  messageContent: {
    flex: 1,
  },

  messageHeader: {
    display: "flex",
    gap: "10px",
    marginBottom: "4px",
  },

  messageUser: {
    color: "#fff",
    fontWeight: "bold",
  },

  messageTime: {
    color: "#72767d",
    fontSize: "12px",
  },

  messageText: {
    color: "#dcddde",
  },

  inputArea: {
    padding: "20px",
    borderTop: "1px solid #202225",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#404249",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    outline: "none",
  },

  sendButton: {
    padding: "12px 20px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    marginTop: "80px",
    color: "#8e9297",
  },

  emptyStateEmoji: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  emptyStateText: {
    fontSize: "18px",
    marginBottom: "5px",
  },

  emptyStateSubtext: {
    fontSize: "14px",
  },
  logoutBtn: {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  backgroundColor: "#5865f2",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
},
};