import React from "react";
import CreateUser from "./CreateUser";

export default class Profile extends React.Component {

    checkProps() {
        if (this.props.length === 0) {
            return false;
        } else {
            return true;
        }
    }


    render() {
        if (this.checkProps()) {
            return(
                <div>
                    <p>Hello {this.props.displayName}</p>
                </div>
            );
        } else {
            return (
              <CreateUser/>
            );
        }

    }

}