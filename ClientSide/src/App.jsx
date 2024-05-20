import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PrimeGenerator from "./PrimeGenerator";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {isLoggedIn ? (
                <PrimeGenerator />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )}
            </div>
          }
        />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}  />
      </Routes>
    </BrowserRouter>
  );
}

