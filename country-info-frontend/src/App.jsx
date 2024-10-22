import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CountryList />} />
          <Route path="country/:countryCode" element={<CountryInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Outlet /> {/* it shows  the content of the route */}
    </div>
  );
}

export default App;
