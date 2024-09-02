import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Apps from '../Apps';
import Details from './Details';
import Header from './Header';
import Filters from './Filters';

const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5500/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication Failed");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Apps />} />
        <Route path="/filter" element={<Filters />} />
        <Route path="/details" element={<Details />} />

        <Route path="/success" element={<Apps payStatus="success" />} />
                <Route path="/cancel" element={<Apps payStatus="fail" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;



