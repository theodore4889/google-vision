/**
 *
 * VisionResponseList.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class VideoResponseList extends React.Component {
  renderList() {
    return this.props.items.map(item => (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {item.description}
        <span className="badge badge-primary badge-pill">{item.score}</span>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul className="list-group">{this.renderList()}</ul>
      </div>
    );
  }
}

VideoResponseList.propTypes = {
  items: PropTypes.array,
};

export default VideoResponseList;
