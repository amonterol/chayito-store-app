import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import Footer from "./components/footer/Footer";
import MainPages from "./components/mainpages/Pages";
import TopNav from "./components/headers/TopNav";
//import "bulma/css/bulma.min.css";

function App() {
  return (
    <DataProvider>
      <Router>
        <TopNav />
        <div className="App">
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
