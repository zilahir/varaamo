/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import Error from './Error';
import injectT from '../../../i18n/injectT';

function Textarea({
  input,
  meta: { error, touched },
  t,
  label,
}) {
  return (
    <div className="app-ReservationPage__formfield">
      <label>
        {label}
        <textarea {...input} required />
      </label>
      {touched && error && <Error error={t(error)} />}
    </div>
  );
}

Textarea.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default injectT(Textarea);
