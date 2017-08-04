import React from 'react';
import { browserHistory as history } from 'react-router';
import Ahref from './AHREF.jsx';


/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class GithubRepo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}



        // Why do we need to do this?? Make sure you understand!!!
        //  this._handleSubmit = this._handleSubmit.bind(this);
    }

    fetchData(){
        let url = "https://api.github.com/users/"+this.props.params.username+"/repos?access_token=326e94c381cdeef6b4699fd11ccd6f7ffa7c5824";
        console.log("url: ", url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({repo: data})
                console.log("the repo array: ", this.state.repo)
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

        if (this.state.repo) {

            return (
                <div className="repo-page">
                    <h2>{this.props.params.username}'s REPOS:</h2>
                    <ul>
                        {this.state.repo.map((item) => (
                            <Ahref key={item.id} url={item.html_url} fullname={item.full_name} stars={item.stargazers_count}/>))}
                    </ul>
                </div>
            );
        }
        else{
            return <div>LOADING REPOS...</div>
        }
    }
};

export default GithubRepo;

