import React from 'react';
import {browserHistory as history} from 'react-router';
import Ahref from './AHREF.jsx';


/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/

var config = require('./config.js');

class GithubRepo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            page: 1,
            loading: false,
            spinner:100,
            stop: false,
            repo: []
        }

        this.fetchData = this.fetchData.bind(this);

        // Why do we need to do this?? Make sure you understand!!!
        //  this._handleSubmit = this._handleSubmit.bind(this);
    }

    fetchData() {


        if (!this.state.stop) {
            this.setState({loading: true});
            console.log("the loading condition is: ", this.state.loading)

            let url = "https://api.github.com/users/" + this.props.params.username + "/repos?access_token=" + config.APIKEY + "&page=" + this.state.page + "&per_page=50";


            fetch(url)
                .then(response => response.json())
                .then(data => {

                    if (data.length === 0) {
                        this.setState({loading: false, stop: true, spinner:undefined})
                        console.log("the repo array: ", data)
                        console.log("data.length: ", data.length)
                        console.log("data.length: ", this.state.repo.length + " and loading is ", this.state.loading)


                    }


                    if (data.length > 0) {

                        console.log("data.length in active state: ", data.length)
                        console.log("the repo array: ", data)


                        this.setState({
                            repo: this.state.repo.concat(data),
                            loading: false,
                            page: this.state.page + 1
                        });
                    }



                })
        }


    }

    // Done in Infinite now
    // componentDidMount(){
    //
    //     this.fetchData()
    //
    // }





    render() {

        var Infinite = require('react-infinite');


        return (
            <div className="repo-page">
                <h2>{this.props.params.username}'s REPOS:</h2>
                <Infinite
                    isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer
                    elementHeight={54} infiniteLoadBeginEdgeOffset={this.state.spinner}
                    loadingSpinnerDelegate={<div>LOADING REPOS</div>} className="infinit">

                    {this.state.repo.map((item) => (
                        <Ahref key={item.id} url={item.html_url} fullname={item.full_name} stars={item.stargazers_count}/>))}

                </Infinite>
            </div>
        );


    }
};

export default GithubRepo;

