// App.js

import "./App.css";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="sidebar-content">
        <Header />
        <div className="main-content">
          <h1>Main Content</h1>
          <p>Content here</p>
        </div>
      </div>
    </div>
  );
}

export default App;
