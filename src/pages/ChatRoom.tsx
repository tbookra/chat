import { useEffect, useState, useRef } from "react";
import "./pages.css";
import { TextField, Button, Typography } from "@material-ui/core";
import MessageComp from "../components/MessageComp";
import { setMessages } from "../features/messagesSlice";
import { Message } from "../types/generalTypes";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket | null;
}

export default function ChatRoom({ socket }: Props) {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [showRoom, setShowRoom] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setMessages({ message, room, sender: "host" }));
    socket?.emit("send_message", { message, room });
    setMessage("");
  };
  const joinRoom = () => {
    if (room !== "") {
      socket?.emit("join_room", room);
      setShowRoom(false);
    }
  };

  useEffect(() => {
    socket?.on("receive_message", (data) => {
      dispatch(setMessages({ ...data, sender: "guest" }));
    });
    return () => {
      socket?.off("receive_message");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="container">
      <Typography variant="h4">{room ? `Room ${room}` : null}</Typography>
      <div ref={containerRef} className="messagesContainer">
        {messages[room]?.map((message: Message) => (
          <MessageComp key={message.textId} message={message} />
        ))}
      </div>

      {showRoom && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            type="text"
            label="choose room"
            variant="outlined"
            placeholder="On which room do you want to chat?"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
          <div style={{ padding: 0, marginTop: "3px" }}>
            <Button
              style={{
                width: "120px",
                height: "100%",
              }}
              type="button"
              onClick={joinRoom}
            >
              Enter Room
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="messagesForm">
        <TextField
          type="text"
          label="Your Message"
          variant="outlined"
          placeholder="what do you have to say"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          style={{ width: "calc(100% - 85px)" }}
        />

        <Button
          style={{
            width: "80px",
            height: "100%",
            padding: 0,
          }}
          type="submit"
        >
          send
        </Button>
      </form>
    </div>
  );
}
