/**
 *
 * VisionResponseItem.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// class VisionResponseItem extends React.Component {
function VisionResponseItem({ description, score }) {
  // render() {
  // const description = this.props.description;
  // const score = this.props.score;
  let color = '';
  let visibility = '';

  if (score < 0) {
    color = 'list-group-item-dark';
    visibility = 'invisible';
  }

  return (
    <li
      className={`list-group-item ${color} d-flex justify-content-between align-items-center`}
    >
      {description}
      <span className={`badge badge-primary badge-pill ${visibility}`}>
        {Math.round(score * 100)}
      </span>
    </li>
  );
  // }
}

VisionResponseItem.propTypes = {
  description: PropTypes.string,
  score: PropTypes.number,
};

export default VisionResponseItem;
