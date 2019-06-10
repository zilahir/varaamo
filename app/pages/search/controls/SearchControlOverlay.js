import PropTypes from 'prop-types';
import React from 'react';

import injectT from '../../../i18n/injectT';

function SearchControlOverlay({ children }) {
  return (
    <div className="app-SearchControlOverlay">
      <div className="app-SearchControlOverlay__overlay">
        <div className="app-SearchControlOverlay__content">
          {children}
        </div>
      </div>
    </div>
  );
}

SearchControlOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default injectT(SearchControlOverlay);
