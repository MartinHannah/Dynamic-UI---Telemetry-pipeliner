import * as React from 'react';
import PropTypes from 'prop-types'; 



function Report({ name }) {
    return (
      <div>
        <h1>
            Latest Report 
          {name}
        </h1>
      </div>
    );
}

Report.propTypes = {
    name: PropTypes.string.isRequired
}
export default(Report);