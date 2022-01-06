import React from 'react';
import PropTypes from "prop-types";

const CardContact = ({data}) => {
  const { phone, mail } = data
  return (
    <div>
      {
        phone && phone.map( item => (
          <div className="flex j-c-start mb-1">
            { item }
          </div>
        ))
      }
      {
        mail && (
          <div className="flex j-c-start fw-700 color-light-blue-2">
            {mail}
          </div>
        )
      }
    </div>
  );
};

CardContact.propTypes = {
  data: PropTypes.object,
}

CardContact.defaultProps = {
  data: {}
}

export default CardContact;
