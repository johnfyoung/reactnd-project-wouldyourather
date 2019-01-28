import React, { Component } from 'react';
import Question from './Question';

class QuestionPage extends Component {
    render() {
        const { id } = this.props.match.params;
        console.log('question page props: ', this.props);
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <Question id={id} isSolo={true} />
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionPage;