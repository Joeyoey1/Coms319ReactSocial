import React from 'react';

export default class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.props.pageChange.bind(this);
    }

    canPost() {
        if (this.props.logged) {
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/#" onClick={() => this.props.pageChange("createPost")}>New Post</a>
                </li>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/#">CySocial</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/#" onClick={() => this.props.pageChange("profile")}>Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#" onClick={() => (this.props.logged) ? this.props.pageChange("profile") : this.props.pageChange("login") }>{this.props.logged ? this.props.user.displayName : "Login"}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#" onClick={() => this.props.pageChange("posts") }>Posts</a>
                        </li>
                        {this.canPost()}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}
