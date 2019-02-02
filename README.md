# Would you rather

Would you rather supplies polls to its users, allowing them to create and answer questions. Users are scored based on participation and displayed in a leaderboard.

## Installation

The app requires Node.js and `npm` or `yarn` to run.

To install and launch with npm:

```bash
npm install && npm start
```

The app provides it's own locally hosted web server.

## App Requirements

* Login - User account
  * user must be authorized to access the application
  * user information must appear on the screen
  * redirect to requested location post login
  * allow user to logout
  * user
    * name
    * handle
    * avatar
* Home page (`/`)
  * toggle between answered and unanswered questions/polls
    * unanswered questions shown by default
  * polls are arranged most recent created to oldest
* Question (`/question/:questionId`)
  * Content
    * Unaswered by user
      * text: "Would you rather"
      * Posting user avatar
      * avatar
      * two options
      * text
    * Answered by user
      * text: "Would you rather"
      * Posting user avatar
      * avatar
      * two options
        * text
        * number of people who voted
        * percebtage of people who voted
        * mark the user's selection
  * action
    * allow user to vote once
    * data updates immediately
* Add Question (`/add`)
  * Content
    * Text: "Would you rather"
    * Form: 2 options
  * Action
    * upon submission, redirect to home page
    * questions list updates immediately
* Leaderboard (`/leaderboard`)
  * Content
    * users list
      * sorted descending by number of questions asked + questions answered
      * user name
      * user picture
      * number of questions asked
      * number of questions answered
* 404 page
___
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
