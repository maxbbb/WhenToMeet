import React, { Component } from 'react';
var axios = require('axios')
const api = axios.create({
    responseType: "json"
});
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = { fieldValue: '', allMessages: 0 };
        this.sendMessage = this.sendMessage.bind(this);
        this.logMessage = this.logMessage.bind(this);
    }
    logMessage(e) {
        this.setState({ fieldValue: e.target.value })
        console.log(this.state.fieldValue)
    };
    componentWillMount() {
        api.get("http://localhost:6969/meeting/messages/" + this.props.id)
            .then(function (res) {
                this.setState(Object.assign({}, this.state, {
                    allMessages:
                    res.data.map((i) => (
                        <div>
                            {i.username} : {i.message}
                        </div>
                    ))
                })
                )
            }.bind(this))
    }
    sendMessage(e) {
        e.preventDefault()
        var x = document.getElementsByName("message")   //sets value back to blank after search enter
        x[0].value = ''
        var message = { username: this.props.user, message: this.state.fieldValue }
        api.post("http://localhost:6969/meeting/messages/" + this.props.id, message)
        api.get("http://localhost:6969/meeting/messages/" + this.props.id)
            .then(function (res) {
                this.setState(Object.assign({}, this.state, {
                    allMessages:
                    res.data.map((i) => (
                        <div>
                            <div style={{ textAlign: (i.username === this.props.user ? 'right' : 'left')}}>
                                {i.username}
                            </div>
                            <div className="message" style={{ backgroundColor: (i.username === this.props.user ? 'green' : 'grey') }}>
                                {i.message}
                            </div>
                            <br />
                        </div>
                    ))
                })
                )
            }.bind(this))
    }
    render() {
        return (
            <div className="messageContainer">
                {this.state.allMessages}
                <br />
                <form onSubmit={this.sendMessage} className="send-message">
                    <input type="text" onChange={this.logMessage} name="message" placeholder="Type in name your message" required="required" autoComplete="off" spellCheck="false" />
                    <input type="submit" className="submit"></input>
                </form>
            </div>
        )
    }
}
export default Messages