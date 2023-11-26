import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ startDate, setStartDate }) {
  return (
    <div>
      <DatePicker
        className="form-input rounded-lg border border-gray-300 text-center bg-gray-200"
        selected={startDate}
        onChange={date => {
          setStartDate(date);
        }}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
}

CustomDatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
};

export default CustomDatePicker;
