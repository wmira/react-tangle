import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css";

import Footer from "./Footer";
import TodoList from "./TodoList";
import { TangleProvider } from "react-tangle";

export default function App() {
  return (
    <TangleProvider initial={{ todos: [] }}>
      <HashRouter>
        <React.Fragment>        
            <div className="todoapp">
              <Route path="/:filter?" component={TodoList} />
            </div>
            <Footer />          
        </React.Fragment>
      </HashRouter>
    </TangleProvider>
  );
}
