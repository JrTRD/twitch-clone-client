import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Stream from "./subComponents/Stream";

class StreamList extends React.Component {
  showStreams = () => {
    const { streams, id: userId, isSignedIn } = this.props;
    const streamsJsx = () => {
      const jsx = [];
      for (let i in streams) {
        if (streams[i]) {
          const { title, description, id } = streams[i];
          jsx.push(
            <Stream
              title={title}
              description={description}
              id={id}
              key={id}
              ownStream={userId === id && isSignedIn}
            />
          );
        }
      }
      return jsx;
    };
    const jsx = streamsJsx();
    return <div className="streams">{jsx.map(str => str)}</div>;
  };

  showCreateStreamLink = () => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      return (
        <div>
          <Link className="btn btn-link" to="/stream/create">
            Create a stream
          </Link>
          <p className="p-note p">
            note: You can only create a single stream!
          </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        {this.showCreateStreamLink()}
        {this.showStreams()}
      </div>
    );
  }
}

const mapStateToProps = ({
  streams,
  user: {
    isSignedIn,
    profile: { id }
  },
  isStreaming
}) => ({
  streams,
  isSignedIn,
  id,
  isStreaming
});

export default connect(mapStateToProps)(StreamList);
