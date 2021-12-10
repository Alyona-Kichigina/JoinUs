import React, {Component} from 'react';

class EmptyPage extends Component {
    render() {
        return (
          <div className="flex-container">
            <div className="flex justify-between p-b-25">
              <h1>Empty Page</h1>
            </div>
          </div>
        );
    }
}

EmptyPage.propTypes = {};

export default EmptyPage;
