import React from 'react';

const FullscreenLayout = ({ content }) => (
  <div className="full-screen">
    <div className="content-scrollable">
      {content}
    </div>
  </div>
);

FullscreenLayout.propTypes = {
  content: React.PropTypes.element
};

export default FullscreenLayout;
