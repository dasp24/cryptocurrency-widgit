import React from 'react';
import { Timeline } from 'react-twitter-widgets';

class Feed extends React.Component {
    render() {
        return (<Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: this.props.profile
            }}
           className="text-right"
            options={{
              username: 'jimmysong',
              height: '300',
              width: '500'
            }}
          />
        );
  }
}

export default Feed;