import React from "react";
import axios from "axios";

export class Download extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: null,
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8080/file", {
            headers: {
                Username: this.props.username, Token: this.props.token,
            }, withCredentials: true,
        }).then((response) => {
            this.setState({
                files: response.data
            });
        });
    }

    render() {
        return (<div>
            <FilesListItems files={this.state.files} username={this.props.username} token={this.props.token}/>
        </div>);
    }

}

class FileItem extends React.Component {

    downloadFile() {
        axios.get("http://127.0.0.1:8080/file/download/" + this.props.file.id, {
            headers: {
                username: this.props.username,
                token: this.props.token,
            },
            responseType: "blob",
        }).then((response) => {
            const blob = new Blob(response.data);
            const blobURL = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
            console.log(a);
            window.URL.revokeObjectURL(blobURL);
        })
    }

    render() {
        return (<li key={this.props.file.id}>{this.props.file.filename}
            <button onClick={() => {
                this.downloadFile();
            }}>Download
            </button>
        </li>);
    }

}

function FilesListItems(props) {
    if (props.files) {
        const items = props.files.map((file) => (
            <FileItem file={file} username={props.username} token={props.token}/>));
        return (<ul>{items}</ul>);
    }
}