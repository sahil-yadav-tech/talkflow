import { useEffect, useRef } from "react";

const ChatWindow = ({
  selectedUser,
  messages,
  loading,
  currentUserId,
}) => {
  const messagesEndRef =
    useRef(null);


  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // =========================
  // NO USER SELECTED
  // =========================

  if (!selectedUser) {
    return (
      <div
        style={{
          width: "500px",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <h2>
          Select a user to start chatting
        </h2>
      </div>
    );
  }


  return (
    <div
      style={{
        width: "500px",
        border: "1px solid #ccc",
      }}
    >

      {/* ================= */}
      {/* CHAT HEADER */}
      {/* ================= */}

      <div
        style={{
          padding: "15px",
          borderBottom:
            "1px solid #ccc",
        }}
      >
        <h2>
          {selectedUser.name}
        </h2>

        <small>
          {selectedUser.email}
        </small>
      </div>


      {/* ================= */}
      {/* MESSAGES */}
      {/* ================= */}

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          padding: "15px",
        }}
      >

        {loading && (
          <p>
            Loading messages...
          </p>
        )}


        {!loading &&
          messages.length === 0 && (
            <p>
              No messages yet. Start the
              conversation.
            </p>
          )}


        {messages.map(
          (message) => {

            const senderId =
              message.senderId?._id ||
              message.senderId;

            const isMyMessage =
              senderId?.toString() ===
              currentUserId?.toString();

            return (
              <div
                key={message._id}
                style={{
                  display: "flex",
                  justifyContent:
                    isMyMessage
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "10px",
                }}
              >

                <div
                  style={{
                    maxWidth: "70%",
                    padding:
                      "10px 14px",
                    borderRadius:
                      "10px",
                    backgroundColor:
                      isMyMessage
                        ? "#DCF8C6"
                        : "#F1F1F1",
                  }}
                >

                  {!isMyMessage && (
                    <div>
                      <strong>
                        {message.senderId
                          ?.name ||
                          "User"}
                      </strong>
                    </div>
                  )}

                  <div>
                    {message.text}
                  </div>

                  <small>
                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </small>

                </div>

              </div>
            );
          }
        )}

        <div
          ref={messagesEndRef}
        />

      </div>

    </div>
  );
};

export default ChatWindow;