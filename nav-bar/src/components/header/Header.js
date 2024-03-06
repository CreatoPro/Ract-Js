// Header.js

import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header class="site-header">
      <div class="site-identity">
        <h1>Site Name</h1>
      </div>
      <nav class="site-navigation">
        <ul class="nav">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
