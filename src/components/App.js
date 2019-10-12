import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getStreams, stream as streamAction } from "../actions";

import StreamList from "./StreamList";
import StreamShow from "./StreamShow";
import StreamCreate from "./StreamCreate";
import StreamEdit from "./StreamEdit";

import Header from "./Header";

import MustLogin from "./subComponents/MustLogin";
import AlreadyStreaming from "./subComponents/AlreadyStreaming";
import MustCreateToEdit from "./subComponents/MustCreateToEdit";

class App extends Component {
  state = {
    streamsReady: false
  };
  componentDidMount() {
    const { getStreams } = this.props;
    getStreams(() => {
      this.setState({ streamsReady: true });
    });
  }

  getCreateRoute = () => {
    const {
      user: { isSignedIn },
      isStreaming
    } = this.props;
    if (!isSignedIn) {
      return <Redirect to="/error/login" />;
    } else if (isStreaming) {
      return <Redirect to="/error/streaming" />;
    }
    return <StreamCreate />;
  };

  getEditRoute = () => {
    const { isStreaming } = this.props;
    if (!isStreaming) {
      return <Redirect to="/error/edit" />;
    }
    return <StreamEdit />;
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        {this.state.streamsReady ? (
          <Route path="/" exact component={StreamList} />
        ) : null}
        <Route path="/stream/show/:id" exact component={StreamShow} />
        {this.props.authReady ? (
          <div>
            <Route path="/stream/edit" exact render={this.getEditRoute} />
            <Route path="/stream/create" exact render={this.getCreateRoute} />
          </div>
        ) : null}

        <Route path="/error/login" exact component={MustLogin} />
        <Route path="/error/streaming" exact component={AlreadyStreaming} />
        <Route path="/error/edit" component={MustCreateToEdit} />
      </BrowserRouter>
    );
  }
}

export default connect(
  ({ user, authReady, isStreaming }) => ({ user, authReady, isStreaming }),
  { getStreams, streamAction }
)(App);
