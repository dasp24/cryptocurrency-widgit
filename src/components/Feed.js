import React from 'react';
import { Timeline } from 'react-twitter-widgets';

class Feed extends React.Component {
    render() {
        return (
        <div>
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: this.props.profile
            }}
            options={{
              height: '300',
              width: '500'
            }}
          />
          <button className="remove_buttons" onClick={() => this.props.removeFeed(this.props.profile)}>remove</button>
          </div>
        );
  }
}

export default Feed;