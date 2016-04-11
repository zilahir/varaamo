import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeReservationInfoModal } from 'actions/uiActions';
import TimeRange from 'components/common/TimeRange';
import reservationInfoModalSelector from 'selectors/containers/reservationInfoModalSelector';
import { getName } from 'utils/DataUtils';

export class UnconnectedReservationInfoModal extends Component {
  renderModalContent(reservation, resource) {
    if (!reservation) {
      return null;
    }

    return (
      <div>
        <p>Name: {reservation.reserverName}</p>
        <p>
          Tila: {getName(resource)}
        </p>
        <p>
          Varauksen ajankohta: <TimeRange begin={reservation.begin} end={reservation.end} />
        </p>
      </div>
    );
  }

  render() {
    const {
      actions,
      reservationsToShow,
      resources,
      show,
    } = this.props;

    const reservation = reservationsToShow.length ? reservationsToShow[0] : undefined;
    const resource = reservation ? resources[reservationsToShow[0].resource] : {};

    return (
      <Modal
        onHide={actions.closeReservationInfoModal}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title>Varaukset tiedot</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.renderModalContent(reservation, resource)}
        </Modal.Body>

        <Modal.Footer>
          <Button
            bsStyle="default"
            onClick={actions.closeReservationInfoModal}
          >
            Takaisin
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UnconnectedReservationInfoModal.propTypes = {
  actions: PropTypes.object.isRequired,
  reservationsToShow: PropTypes.array.isRequired,
  resources: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    closeReservationInfoModal,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(reservationInfoModalSelector, mapDispatchToProps)(
  UnconnectedReservationInfoModal
);
