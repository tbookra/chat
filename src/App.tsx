import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import MembersPage from "./pages/MembersPage";

import store, { RootState } from "./store";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage socket={socket} />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <MembersPage socket={socket} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.user);
  return currentUser ? children : <Navigate to="/" />;
};

export default App;
