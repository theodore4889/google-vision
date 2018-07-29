/**
 *
 * VisionResponseList.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import VisionResponseItem from 'components/VisionResponseItem';

const divStyle = {
  height: '500px',
  overflowY: 'scroll',
};

class VideoResponseList extends React.Component {
  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderList() {
    return this.props.items.map(item => (
      <VisionResponseItem description={item.description} score={item.score} />
    ));
  }

  render() {
    return (
      <div style={divStyle}>
        <ul className="list-group">{this.renderList()}</ul>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.listEnd = el;
          }}
        />
      </div>
    );
  }
}

VideoResponseList.propTypes = {
  items: PropTypes.array,
};

export default VideoResponseList;
