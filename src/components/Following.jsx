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
<<<<<<< HEAD

var config = require('./config.js');

=======
>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095
class Following extends React.Component {

    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {
            page: 1,
            loading: false,
            stop:false,
            following: []

        }

    }
=======
        this.state = {}


>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095

        // Why do we need to do this?? Make sure you understand!!!
        //  this._handleSubmit = this._handleSubmit.bind(this);
    }
<<<<<<< HEAD
fetchData() {



    this.setState({loading: true});
    console.log("the loading condition is: ", this.state.loading)

    let url = "https://api.github.com/users/" + this.props.params.username + "/following?access_token="+config.APIKEY+"&page=" + this.state.page + "&per_page=50";
    //console.log("url: ", url)

    if (!this.state.stop) {
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
                    console.log("data0: ", data[0].id)
                    console.log("data.length: ", data.length)
                    console.log("data.length: ", this.state.following.length)
                    this.setState({loading: false, stop: true})
                }

            })
    }



}

    // componentDidMount(){
    //
    //     this.fetchData()
    //
    // }
=======

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
>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095


    componentDidUpdate(prevProps, prevState){

        console.log("prevprops: ", prevProps.params.username)
        console.log("this.props: ", this.props.params.username)
        if (prevProps.params.username !== this.props.params.username){

            this.fetchData()
        }

    }




    render() {

<<<<<<< HEAD
    var Infinite = require('react-infinite');

    console.log("Render method on following is called here and loading is: ", this.state.loading);
=======
        if (this.state.following) {
>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095

            return (
                <div className="following-page">
                    <h2>{this.props.params.username} follows:</h2>
<<<<<<< HEAD


                    <Infinite
                        isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer
                        elementHeight={75} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING</div>} className="infinit">


                        {this.state.following.map((follow) => (
                            <GithubUser key={follow.id} username={follow.login} avatar={follow.avatar_url}/>))}
                    </Infinite>


                </div>
            );


=======
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
>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095
    }
};

export default Following;

