import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ caption, username }) => {
    return (
        <div className="p-4 pt-2 pb-1">
        <span className="mr-1 font-bold">{username}</span>
        <span className="italic">{caption}</span>
      </div>
    )
}

export default Footer;

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };