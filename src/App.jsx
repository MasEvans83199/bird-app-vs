import React, { useState, useEffect, useCallback } from "react";
import { createClient } from '@supabase/supabase-js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./static/Menu";
import Footer from "./static/footer/Footer";
import Home from "./pages//home/Home";
import About from "./static/footer/About";
import Contact from "./static/footer/Contact";
import Birds from "./pages/birds-page/Birds";
import Photos from "./pages/Photos";
import Map from "./pages/Map";
import Login from "./pages/account/Login";
import Account from "./pages/account/Account";
import UpdatePassword from "./pages/account/UpdatePassword";
import Thread from "./pages/Thread";
import Posts from "./pages/Posts";
import "./App.css";
import "./index.css";
import { IconButton, Button, ThemeProvider } from "@material-tailwind/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const supabase = createClient(
  'https://ycfcamxsouvagmrltkbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkwMDY5NiwiZXhwIjoxOTk5NDc2Njk2fQ.HnRHsN9-nfvLXrxcMou7L4kerT6TAz77YCOMl6jZz8c'
)

const App = () => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Birds", href: "/birds" },
    { title: "Photos", href: "/photos" },
    { title: "Map", href: "/map" },
    { title: "Thread", href: "/thread" },
  ];

  const sessionTimeoutDuration = 1800000; // 1 hour in milliseconds
  const [session, setSession] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSessionTimeout = () => {
    supabase.auth.signOut();

    clearTimeout(sessionTimeout);
    setSession(null);
  };

  useEffect(() => {
    const handleUserActivity = () => {
      clearTimeout(sessionTimeout);

      const newSessionTimeout = setTimeout(
        handleSessionTimeout,
        sessionTimeoutDuration
      );
      setSessionTimeout(newSessionTimeout);
    };

    if (session) {
      const sessionTimeout = setTimeout(
        handleSessionTimeout,
        sessionTimeoutDuration
      );
      setSessionTimeout(sessionTimeout);
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
    }

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [session]);

  return (
    <BrowserRouter>
      <div>
        <Menu title="Beak to Basics" links={links} session={session} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/birds" element={<Birds />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route
              path="/account"
              element={
                <div
                  className="account-container"
                  style={{ padding: "50px 0 100px 0" }}
                >
                  {!session ? (
                    <Login />
                  ) : (
                    <Account key={session.user.id} session={session} />
                  )}
                </div>
              }
            />
            <Route path="/post/:postId" element={<Posts session={session} />} />
            <Route path="/thread" element={<Thread session={session} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;