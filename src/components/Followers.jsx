import React from 'react';
import {browserHistory as history} from 'react-router';
import GithubUser from './GithubUser.jsx';

var config = require('./config.js');

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class Followers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            stop: false,
            followers: []
        }

        this.fetchData = this.fetchData.bind(this);

        // Why do we need to do this?? Make sure you understand
        //  this._handleSubmit = this._handleSubmit.bind(this);
    }

    fetchData() {



        this.setState({loading: true});
        console.log("the loading condition is: ", this.state.loading)

        let url = "https://api.github.com/users/" + this.props.params.username + "/followers?access_token="+config.APIKEY+"&page=" + this.state.page + "&per_page=50";
        //console.log("url: ", url)

        if (!this.state.stop) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    //  console.log("data0: ", data[0].id)
                    //  console.log("the array of followers", data)
                    if (data.length > 0) {

                        this.setState({
                            followers: this.state.followers.concat(data),
                            loading: false,
                            page: this.state.page + 1
                        });
                    }

                    else {
                        console.log("data0: ", data[0].id)
                        console.log("data.length: ", data.length)
                        console.log("data.length: ", this.state.followers.length)
                        this.setState({loading: false, stop: true})
                    }

                })
        }



    }


// componentDidMount(){
//
// this.fetchData()
//
// }





    render() {
        var Infinite = require('react-infinite');

        console.log("Render method is called here and loading is: ", this.state.loading);


        return (
            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>


                <Infinite
                    isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer
                    elementHeight={75} infiniteLoadBeginEdgeOffset={100} className="infinit">


                    {this.state.followers.map((follower) => (
                        <GithubUser key={follower.id} username={follower.login} avatar={follower.avatar_url}/>))}
                </Infinite>
            </div>
        )


    }



};

export default Followers;

