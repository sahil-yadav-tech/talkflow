import { useEffect, useState } from "react";
import UserList from "../features/auth/components/UserList";
import { createChat } from "../features/chat/services/chat.api";
import { getMessages } from "../features/chat/services/message.api";
import socket from "../lib/socket";
import ChatWindow from "../features/chat/components/ChatWindow";
import { getCurrentUser } from "../features/auth/services/auth.api";





const ChatPage = () => {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [chatId, setChatId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [userLoading, setUserLoading] =
    useState(true);


  // =========================
  // GET CURRENT USER
  // =========================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setUserLoading(true);

        const user =
          await getCurrentUser();

        console.log(
          "Logged in user:",
          user
        );

        setCurrentUser(user);
      } catch (error) {
        console.error(
          "Failed to get current user:",
          error
        );
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);


  // =========================
  // SOCKET CONNECT
  // =========================

  useEffect(() => {
    const handleConnect = () => {
      console.log(
        "Socket connected:",
        socket.id
      );
    };

    const handleConnectError = (
      error
    ) => {
      console.error(
        "Socket connection error:",
        error.message
      );
    };

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "connect_error",
      handleConnectError
    );

    return () => {
      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "connect_error",
        handleConnectError
      );
    };
  }, []);


  // =========================
  // RECEIVE NEW MESSAGE
  // =========================

  useEffect(() => {
    const handleNewMessage = (
      message
    ) => {
      console.log(
        "New message received:",
        message
      );

      setMessages(
        (prevMessages) => [
          ...prevMessages,
          message,
        ]
      );
    };

    socket.on(
      "new-message",
      handleNewMessage
    );

    return () => {
      socket.off(
        "new-message",
        handleNewMessage
      );
    };
  }, []);


  // =========================
  // SELECT USER
  // =========================

  const handleSelectUser = async (
    user
  ) => {
    try {
      setLoading(true);

      setSelectedUser(user);

      // Get/Create chat

      const chat =
        await createChat(user._id);

      const currentChatId =
        chat._id;

      console.log(
        "Chat ID:",
        currentChatId
      );

      setChatId(
        currentChatId
      );


      // Get old messages

      const oldMessages =
        await getMessages(
          currentChatId
        );

      console.log(
        "Old messages:",
        oldMessages
      );

      setMessages(
        oldMessages
      );


      // Connect socket

      if (!socket.connected) {
        socket.connect();
      }


      // Join chat room

      socket.emit(
        "join-chat",
        currentChatId,
        (response) => {
          console.log(
            "Join chat response:",
            response
          );
        }
      );

    } catch (error) {
      console.error(
        "Select user error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // SEND MESSAGE
  // =========================

  const handleSendMessage = () => {
    if (!text.trim()) {
      return;
    }

    if (!chatId) {
      console.log(
        "Please select a user first"
      );

      return;
    }

    socket.emit(
      "send-message",
      {
        chatId,
        text,
      },
      (response) => {
        console.log(
          "Send message response:",
          response
        );
      }
    );

    setText("");
  };


  // =========================
  // ENTER KEY
  // =========================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };


  // =========================
  // CURRENT USER LOADING
  // =========================

  if (userLoading) {
    return (
      <div>
        Loading user...
      </div>
    );
  }


  // =========================
  // CURRENT USER ERROR
  // =========================

  if (!currentUser) {
    return (
      <div>
        Unable to load current user.
      </div>
    );
  }


  // =========================
  // UI
  // =========================

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "30px",
      }}
    >

      {/* ================= */}
      {/* USERS */}
      {/* ================= */}

      <div
        style={{
          width: "250px",
        }}
      >
        <UserList
          onSelectUser={
            handleSelectUser
          }
        />
      </div>


      {/* ================= */}
      {/* CHAT */}
      {/* ================= */}

      <div>

        <ChatWindow
          selectedUser={
            selectedUser
          }
          messages={messages}
          loading={loading}
          currentUserId={
            currentUser._id
          }
        />


        {/* ================= */}
        {/* INPUT */}
        {/* ================= */}

        {selectedUser && (
          <div
            style={{
              width: "500px",
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >

            <input
              type="text"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              onKeyDown={
                handleKeyDown
              }
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
              }}
            />

            <button
              onClick={
                handleSendMessage
              }
            >
              Send
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default ChatPage;