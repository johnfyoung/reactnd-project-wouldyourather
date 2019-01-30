import React, { Component, Fragment } from 'react';
import Question from './Question';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

class QuestionPage extends Component {
    render() {
        const { id } = this.props.match.params;
        const { isValidQuestion } = this.props;

        return (
            <Fragment>
                {id && isValidQuestion
                    ? (
                        <div className='container' >
                            <div className='row justify-content-center'>
                                <div className='col-md-8'>
                                    <button className='btn btn-link back-link' onClick={(e) => this.props.history.goBack()}><TiArrowBack className='back-arrow text-primary' /> Back</button>
                                    <Question id={id} isSolo={true} />
                                </div>
                            </div>
                        </div>)
                    : <NotFound />
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ questions }, props) {
    const { id } = props.match.params;
    return ({
        isValidQuestion: Object.keys(questions).indexOf(id) !== -1
    });
}

export default connect(mapStateToProps)(withRouter(QuestionPage));