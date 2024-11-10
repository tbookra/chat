import { useEffect, useState } from "react";
import "./pages.css";
import ChatRoom from "./ChatRoom";
import { members } from "../constants/members";
import Contact from "../components/Contact";
import { Socket } from "socket.io-client";
import { User } from "../types/generalTypes";

interface Props {
  socket: Socket | null;
}

const MembersPage = ({ socket }: Props) => {
  const [contacts, setContacts] = useState(members);
  const [chatOpen, setChatOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  socket?.on("getOnlineUsers", (res) => {
    setOnlineUsers(res);
  });
  useEffect(() => {
    setContacts([...members, ...onlineUsers]);
  }, [onlineUsers]);
  return (
    <div style={{ display: "flex" }}>
      <div className="membersGrid">
        {contacts.map((contact: User) => (
          <Contact
            key={contact?._id}
            username={contact?.userName || "no name found"}
            isOnline={onlineUsers.some(
              (user: User) => user?._id === contact?._id
            )}
            setOpen={setChatOpen}
          />
        ))}
      </div>
      {chatOpen && <ChatRoom socket={socket} />}
    </div>
  );
};

export default MembersPage;
