"use client";
import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../public/css/second-page.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import Tabs from "../components/tabs";

const tabs = [
  { id: 1, title: "Tab 1" },
  { id: 2, title: "Tab 2" },
  { id: 3, title: "Tab 3" },
  { id: 4, title: "Tab 4" },
  { id: 5, title: "Tab 5" },

  { id: 6, title: "Tab 6" },
];

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id"));

  useEffect(() => {
    setActiveTab(id);
  }, [id]);

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs container-xxl second-page mt-5">
      <div className="row">
        <ul className="tabs-nav col-md-3">
          <li
            key={tabs[0].id}
            className={activeTab === tabs[0].id ? "active" : ""}
          >
            <button onClick={() => handleClick(tabs[0].id)}>
              Account Basics
            </button>
          </li>
          <li
            key={tabs[1].id}
            className={activeTab === tabs[1].id ? "active" : ""}
          >
            <button onClick={() => handleClick(tabs[1].id)}>
              Orders & Payments
            </button>
          </li>
          <li
            key={tabs[2].id}
            className={activeTab === tabs[2].id ? "active" : ""}
          >
            <button onClick={() => handleClick(tabs[2].id)}>
              Course & Enrolments
            </button>
          </li>
          <li
            key={tabs[3].id}
            className={activeTab === tabs[3].id ? "active" : ""}
          >
            <button onClick={() => handleClick(tabs[3].id)}> Live Class</button>
          </li>
          <li
            key={tabs[4].id}
            className={activeTab === tabs[4].id ? "active" : ""}
          >
            <button onClick={() => handleClick(tabs[4].id)}>1</button>
          </li>
        </ul>
        <div className="tabs-content col-md-9">
          <div
            key={tabs[0].id}
            className={activeTab === tabs[0].id ? "active" : "hidden"}
          >
            <div className="personal-details">
              <h2> Account Basics</h2>
            </div>
          </div>
          <div
            key={tabs[1].id}
            className={activeTab === tabs[1].id ? "active" : "hidden"}
          >
            <div className="order-details">
              <h2>Orders & Payments</h2>
            </div>
          </div>
          <div
            key={tabs[2].id}
            className={activeTab === tabs[2].id ? "active" : "hidden"}
          >
            <div className="manage-address">
              <h2> Course & Enrolments</h2>
            </div>
          </div>
          <div
            key={tabs[3].id}
            className={activeTab === tabs[3].id ? "active" : "hidden"}
          >
            <div className="settings">
              <h2> Live Class</h2>
            </div>
          </div>
          <div
            key={tabs[4].id}
            className={activeTab === tabs[4].id ? "active" : "hidden"}
          >
            <div className="help-support">
              <h2>Help & Support</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTabs;
