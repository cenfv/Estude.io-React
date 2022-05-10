import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Login from "./view/login";
import Anotacoes from "./view/anotacoes";
import Tarefas from "./view/tarefas";
import Livros from "./view/livros";
import HomePage from "./view/home";
import DashboardHome from "./view/dashboard-home";

import Auth from "./components/auth";

function App() {
  const [logado, setLogado] = useState();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/anotacoes"
            component={() => <Auth component={Anotacoes} redirect={Login} />}
          />
          <Route
            exact
            path="/tarefas"
            component={() => <Auth component={Tarefas} redirect={Login} />}
          />
          <Route
            exact
            path="/livros"
            component={() => <Auth component={Livros} redirect={Login} />}
          />
          <Route
            exact
            path="/home"
            component={() => <Auth component={DashboardHome} redirect={Login} />}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
