import React from 'react';

class NewFeed extends React.Component {
    render() {
        return (
            <div className="input_twitter">
            <input ref={ref => this.twitterInputRef = ref}  placeholder="Add twitter ID...."/>
            <button className="input_buttons" onClick={() => {
                this.props.addFeed(this.twitterInputRef.value);
                this.twitterInputRef.value = null;
            }}>Add feed</button>
          </div>
        );
  }
}

export default NewFeed;