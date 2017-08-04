import React from 'react';
import { browserHistory as history } from 'react-router';
import GithubUser from './GithubUser.jsx';


/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}



        // Why do we need to do this?? Make sure you understand!!!
        //  this._handleSubmit = this._handleSubmit.bind(this);
    }

    fetchData(){
        let url = "https://api.github.com/users/"+this.props.params.username+"/following?access_token=e06c4ef355fe5f5d9c1f5ac68600351889d992fd";
        console.log("url: ", url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({following: data})
                console.log("the array: ", this.state.following)
            })


    }

    componentDidMount(){

        this.fetchData()

    }


    componentDidUpdate(prevProps, prevState){

        console.log("prevprops: ", prevProps.params.username)
        console.log("this.props: ", this.props.params.username)
        if (prevProps.params.username !== this.props.params.username){

            this.fetchData()
        }

    }




    render() {

        if (this.state.following) {

            return (
                <div className="following-page">
                    <h2>{this.props.params.username} follows:</h2>
                    <ul>
                        {this.state.following.map((follow) => (
                            <GithubUser key={follow.id} username={follow.login} avatar={follow.avatar_url}/>))}
                    </ul>
                </div>
            );
        }
        else{
            return <div>LOADING USERS...</div>
        }
    }
};

export default Following;

