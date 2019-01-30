import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
    render() {
        const { users, userIds } = this.props;
        return (
            <div className='container leaderboard'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <ul className='leaderboard__list'>
                            {userIds.map(uid => (
                                <li className='mb-3' key={uid}>
                                    <div className='leaderboard__user border border-primary rounded d-flex'>
                                        <div className='leaderboard__user__picture px-3'>
                                            <img className='rounded-circle' src={users[uid].avatarURL} alt={`Avatar for ${users[uid].name}`} />
                                        </div>
                                        <div className='leaderboard__user__info p-3'>
                                            <h3 className='text-primary'>{users[uid].name}</h3>
                                            <table className='table'>
                                                <tbody>
                                                    <tr className='border-top-0'>
                                                        <td className='border-top-0'>Answered questions</td>
                                                        <td className='border-top-0'>{Object.keys(users[uid].answers).length}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Created questions</td>
                                                        <td>{users[uid].questions.length}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='leaderboard__user__score d-flex justify-content-center align-items-center'>
                                            <div className='text-center'>
                                                <div className='leaderboard__user__score__label'>Score</div>
                                                <div className='leaderboard__user__score__value'>{Object.keys(users[uid].answers).length + users[uid].questions.length}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return ({
        userIds: Object.keys(users).sort((a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)),
        users
    })
}

export default connect(mapStateToProps)(LeaderBoard);