import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';

import constants from '../../constants/AppConstants';
import Label from '../label/Label';
import injectT from '../../i18n/injectT';

// Visibility of label for normal vs payment reservations are a bit different.
// For payment related reservations just show all states.
const shouldSkipStateLabelRendering = (reservation, isPayment) => {
  return (
    !isPayment
    && !reservation.needManualConfirmation
    && includes(['confirmed', 'denied', 'requested'], reservation.state)
  );
};

const getLabelData = state => constants.RESERVATION_STATE_LABELS[state];

function ReservationStateLabel({ reservation, isPayment = false, t }) {
  const data = getLabelData(reservation.state);
  if (!data || shouldSkipStateLabelRendering(reservation, isPayment)) {
    return <span />;
  }

  const { labelBsStyle, labelTextId } = data;
  return (
    <div className="reservation-state-label-container">
      <Label bsStyle={labelBsStyle}>{t(labelTextId)}</Label>
    </div>
  );
}

ReservationStateLabel.propTypes = {
  reservation: PropTypes.shape({
    needManualConfirmation: PropTypes.bool.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  isPayment: PropTypes.bool.isRequired,
};

export default injectT(ReservationStateLabel);
