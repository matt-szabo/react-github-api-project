import React from 'react';
import { Link } from 'react-router';
import { browserHistory as history } from 'react-router';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class GithubUser extends React.Component {

    render() {

        return (
            <div className="myUserDiv">
            <Link to={'/user/'+this.props.username}>
                <img src={this.props.avatar} alt={this.props.username}/>
                {this.props.username}
            </Link>
            </div>
        );
    }
};

export default GithubUser;