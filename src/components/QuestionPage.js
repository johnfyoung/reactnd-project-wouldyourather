import React, { Component } from 'react';
import Question from './Question';
import { withRouter } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

class QuestionPage extends Component {

    render() {
        const { id } = this.props.match.params;
        console.log('question page props: ', this.props);
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <button className='btn btn-link back-link' onClick={(e) => this.props.history.goBack()}><TiArrowBack className='back-arrow text-primary' /> Back</button>
                        <Question id={id} isSolo={true} />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(QuestionPage);