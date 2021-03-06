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

var config = require('./config.js');

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            spinner:100,
            stop:false,
            following: []

        }
        this.fetchData = this.fetchData.bind(this);
    }

    // Why do we need to do this?? Make sure you understand!!!
    //  this._handleSubmit = this._handleSubmit.bind(this);

fetchData() {

    if (!this.state.stop) {

   this.setState({loading: true});
    console.log("the loading condition is: ", this.state.loading)

    let url = "https://api.github.com/users/" + this.props.params.username + "/following?access_token="+config.APIKEY+"&page=" + this.state.page + "&per_page=50";
    //console.log("url: ", url)


        fetch(url)
            .then(response => response.json())
            .then(data => {
                //  console.log("data0: ", data[0].id)
                //  console.log("the array of followers", data)
                if (data.length > 0) {

                    this.setState({
                        following: this.state.following.concat(data),
                        loading: false,
                        page: this.state.page + 1
                    });
                }

                else {

                    console.log("data.length: ", data.length)
                    console.log("data.length: ", this.state.following.length)
                    this.setState({loading: false, stop: true, spinner:undefined})
                }

            })
    }



}

// componentDidMount(){
//
//     this.fetchData()
//
// }


componentDidUpdate(prevProps, prevState){

    console.log("prevprops: ", prevProps.params.username)
    console.log("this.props: ", this.props.params.username)
    if (prevProps.params.username !== this.props.params.username){

        this.fetchData()
    }

}




render() {

    var Infinite = require('react-infinite');

    console.log("Render method on following is called here and loading is: ", this.state.loading);

    return (
        <div className="following-page">
            <h2>{this.props.params.username} follows:</h2>


            <Infinite
                isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer
                elementHeight={75} infiniteLoadBeginEdgeOffset={this.state.spinner} loadingSpinnerDelegate={<div>LOADING User List</div>} className="infinit">


                {this.state.following.map((follow) => (
                    <GithubUser key={follow.id} username={follow.login} avatar={follow.avatar_url}/>))}
            </Infinite>


        </div>
    );


}
};

export default Following;

