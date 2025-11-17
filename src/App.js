import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home';
import Riwayat from "./pages/Riwayat";
import Struk from "./pages/Struk";
import Sukses from './pages/Sukses';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
            <Route path="/riwayat" component={Riwayat} exact />
            <Route path="/struk/:id" component={Struk} exact />

          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
