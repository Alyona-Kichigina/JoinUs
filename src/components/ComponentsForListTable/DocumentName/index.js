import React from 'react';
import {DocumentIcon} from "../../../pages/Constants";
import PropTypes from "prop-types"

const DocumentName = ({data}) => {
  return (
    <div className="flex items-center">
      <div dangerouslySetInnerHTML={{__html: DocumentIcon}}/>
      <div className="ml-2">
        { data }
      </div>
    </div>
  );
};

DocumentName.propTypes = {
  data: PropTypes.string,
}

export default DocumentName;
