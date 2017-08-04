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
class Followers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page:1,
        loading:false,
            stop:false,
            followers:[]}

        this.fetchData=this.fetchData.bind(this);

        // Why do we need to do this?? Make sure you understand!!!
      //  this._handleSubmit = this._handleSubmit.bind(this);
    }

fetchData(){
  //after followers ?access_token=e06c4ef355fe5f5d9c1f5ac68600351889d992fd

    if (!this.state.stop) {
        this.setState({loading: true});
    }
    let url = "https://api.github.com/users/"+this.props.params.username+"/followers?access_token=e06c4ef355fe5f5d9c1f5ac68600351889d992fd&page="+this.state.page+"&per_page=50";
    //console.log("url: ", url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
           if (data.length > 0) {
                console.log("data0: ", data[0].id)
                console.log("the array of followers", data)
                this.setState(state => ({followers: this.state.followers.concat(data), loading: false,page:this.state.page +1}));
            }
            else {
               //console.log("data0: ", data[0].id)
               console.log("data.length: ", data.length)
               console.log("data.length: ", this.state.followers.length)
              this.setState({loading:false,stop:true})
           }
            console.log("Loading: ",this.state.loading)
        })


}

// componentDidMount(){
//
// this.fetchData()
//
// }

// handleEnd = () => {
//     console.log("handleEnd is being called")
//     //this.setState(state => ({page : state.page +1 }), () => this.fetchData());
//     this.setState(state => ({page : state.page +1 }));
// }


    componentDidUpdate(prevProps, prevState){

       console.log("prevprops: ", prevProps.params.username)
       console.log("this.props: ", this.props.params.username)
        // if (prevState.page !== this.state.page){
        //
        //     this.fetchData()
        // }

    }



    render() {
        var Infinite = require('react-infinite');
        console.log("Kabooey");

        /*containerHeight={window.innerHeight} timeScrollStateLastsForAfterUserScrolls={2000}*/
        return <Infinite
            isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer
            elementHeight={100} infiniteLoadBeginEdgeOffset={100} className="infinit"
            >


            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>
                <ul>
                    {this.state.followers.map((follower) => (
                        <GithubUser key={follower.id} username={follower.login} avatar={follower.avatar_url}/>))}
                </ul>
            </div>

        </Infinite>


    }







        //
        // if (this.state.followers) {
        //
        //     return (
        //         <div className="followers-page">
        //             <h2>Followers of {this.props.params.username}</h2>
        //             <ul>
        //                 {this.state.followers.map((follower) => (
        //                     <GithubUser key={follower.id} username={follower.login} avatar={follower.avatar_url}/>))}
        //             </ul>
        //         </div>
        //     );
        // }
        // else{
        //     return <div>LOADING FOLLOWERS...</div>
        // }

};

export default Followers;

