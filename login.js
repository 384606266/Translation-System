import React from "react";
import axios from "axios";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null, password: null, logged: false,
        };
    }

    onSubmit(event) {
        event.preventDefault();
        let formData = new FormData()
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        axios.post("http://localhost:8080/login/", formData, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                this.setState({logged: true})
                let data = response.data;
                this.props.logStatusChange(data.username, data.token);
            }
        })
    }

    render() {
        return (<div>
            <form onSubmit={(event) => (this.onSubmit(event))}>
                <p>Username: <input type="text" name="username" onChange={(event) => {
                    this.setState({username: event.target.value})
                }}/></p>
                <p>Password: <input type="password" name="password" onChange={(event) => {
                    this.setState({password: event.target.value})
                }}/></p>
                <p><input type="submit" value="send"/></p>
            </form>
        </div>);
    }

}