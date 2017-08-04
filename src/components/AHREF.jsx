import React from 'react';
import { browserHistory as history } from 'react-router';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
var styles = {border:2,borderStyle:'solid', borderColor:'black', width:'auto',display:'inline-block'}

class Ahref extends React.Component {


    render() {

        return (
            <div>
                <a href={this.props.url}>{this.props.fullname}</a>
                <p style={styles}>Stars {this.props.stars} </p>
                <i className="fa fa-star" aria-hidden="true"></i>
            </div>
        );
    }
};

export default Ahref;