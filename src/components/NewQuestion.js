import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
    }

    handleOnChange = (option, value) => {
        let cleanedValue = this.formatString(this.ltrim(value));

        this.setState({
            [option]: cleanedValue
        });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;

        dispatch(handleAddQuestion(this.state))
            .then(() => {
                this.props.history.push('/');
            });
    };

    formatString = ([first, ...rest]) => {
        if (first) {
            let cleaned = [first.toLowerCase(), ...rest].join('');
            if (cleaned.substr(-1) === '?') {
                cleaned = cleaned.slice(0, -1);
            }
            return cleaned;
        }

        return '';
    };

    ltrim = (str) => {
        if (str == null) return str;
        return str.replace(/^\s+/g, '');
    }

    render() {
        return (
            <div className='container newquestion'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <h1 className='text-center'>Create your own question!</h1>
                        <div className='border border-primary p-3 rounded'>
                            <p className='question-text'>Would you rather...</p>

                            <Form onSubmit={this.handleOnSubmit}>
                                <FormGroup className='d-flex align-items-center justify-content-center'>
                                    <Input
                                        type='text'
                                        id='optionOneText'
                                        name='optionOneText'
                                        placeholder='ex. "go waterskiing"'
                                        value={this.state.optionOneText}
                                        onChange={(e) => {
                                            this.handleOnChange('optionOneText', e.target.value)
                                        }}
                                    />
                                    <span className='question-text'>&nbsp;?</span>
                                </FormGroup>
                                <p className='question-text text-center'>OR</p>
                                <FormGroup className='d-flex align-items-center justify-content-center'>
                                    <Input
                                        type='text'
                                        id='optionTwoText'
                                        name='optionTwoText'
                                        placeholder='ex. "go surfing"'
                                        value={this.state.optionTwoText}
                                        onChange={(e) => {
                                            this.handleOnChange('optionTwoText', e.target.value)
                                        }}
                                    />
                                    <span className='question-text'>&nbsp;?</span>
                                </FormGroup>
                                <Button color='primary' type='submit'>Submit question</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(NewQuestion));