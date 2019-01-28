import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
    render() {
        return (
            <div>
                <div>Questions component</div>
            </div>
        )
    }
}

export default connect()(Questions);