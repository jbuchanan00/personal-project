import React from 'react';
import './App.css';
import { HashRouter as Router } from "react-router-dom"
import Header from "./components/Header"
import { Provider } from "react-redux"
import store from "./redux/store"

import router from "./components/Routes"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {router}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
