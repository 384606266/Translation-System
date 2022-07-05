import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer0';
import Home from './Home';
import DownloadPage from './Pages/Download/DownloadPage';
import Translation from './Pages/Translation/Translation';
import Dictionary from './Pages/Dictionary/Dictionary';
import Login from './Pages/Login/LoginView';
import RegView from './Pages/Register/RegView';

import {
  Nav00DataSource,
  Footer00DataSource,
} from './Home/data.source.js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }
  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Header dataSource={Nav00DataSource} isMobile={this.state.isMobile} />
          <Route exact path="/" component={Home} />
          <Route path="/download" component={DownloadPage} />
          <Route path="/Translation" component={Translation} />
          <Route path="/Dictionary" component={Dictionary} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegView} />
          <Footer dataSource={Footer00DataSource} isMobile={this.state.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;
