import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./_components/header/header";
import Main from "./pages/main";
import ApiService from "./_services/ApiService";
import googleAnalytics from "./_services/google-analytics/google-analytics.service";
import Config from "./_config/config";
import "./App.css";

function App() {
  const [loginRoute, setloginRoute] = useState("");
  const [homeRoute, setHomeRoute] = useState("");
  const [suppressLogs, setSuppressLogs] = useState(null);

  const initGoogleAnalytics = async () => {
    try {
      const res = await ApiService.fetchGoogleAnalytics();
      console.log(res);
      const {
        "GA-Code": id,
        "Home-Route": homeRoute,
        "Login-Route": loginRoute,
        "Home-Title": homeTitle,
        "Suppress-Home-Page-Logs": suppressLogs
      } = res.data;

      console.log(id, homeRoute);
      console.log(homeTitle,suppressLogs);
      
      document.title = homeTitle || Config.siteTitle;
      googleAnalytics(id);
      setloginRoute(loginRoute);
      setHomeRoute(homeRoute);
      setSuppressLogs(suppressLogs);
    } catch (err) {
      console.log(err);
    }
  };

  const updateFavIcon = () => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    const url = `https://tuningfork-live.s3.ap-southeast-1.amazonaws.com/${Config.siteTitle}/files/logos/favicon.ico`;
    console.log(url);
    link.href = url;
  };

  useEffect(() => {
    initGoogleAnalytics();
    updateFavIcon();
  }, []);

  return (
    <div id="App">
      <div id="page-wrap">
        <div className="container1">
          <Header />
          <Router>
            <Main loginRoute={loginRoute} homeRoute={homeRoute} suppressLogs={suppressLogs} />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
