import React from 'react';
import {PRESENT_DATE_FORMAT} from "@constants"
import moment from "moment";
import PropTypes from "prop-types";

const DisplayDate = ({data}) => {
  return (
    <div>
      {moment(data).format(PRESENT_DATE_FORMAT)}
    </div>
  );
};

DisplayDate.propTypes = {
  data: PropTypes.string,
}

export default DisplayDate;
