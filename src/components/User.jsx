import React from 'react';
import { Link } from 'react-router';

var config = require('./config.js');


class User extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    /*
    This method will be called by React after the first render. It's a perfect place to load
    data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username

    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username

    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
    */
    fetchData() {
        // after username +"?access_token=9f68bc33faa84e740d9aefa8fe80304c17a94544
<<<<<<< HEAD
        let url = "https://api.github.com/users/"+this.props.params.username+"?access_token="+config.APIKEY;
=======
        let url = "https://api.github.com/users/"+this.props.params.username+"?access_token=e06c4ef355fe5f5d9c1f5ac68600351889d992fd";
>>>>>>> 27cb1eb6d301041c6e5e2d235936639e8e992095
        fetch(url)
        .then(response => response.json())
        .then(
            user => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    user: user
                });
            }
        );
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

    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        // If we get to this part of `render`, then the user is loaded
        const user = this.state.user;

        // Gather up some number stats about the user, to be used in a map below
        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.params.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.params.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.params.username}/following`
            }
        ];

        // Look in index.css for the styles that make this look like it does
        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
};

export default User;
