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
        setInterval(() => api.get("http://localhost:6969/meeting/messages/" + this.props.id)
            .then(function (res) {
                this.setState(Object.assign({}, this.state, {
                    allMessages: res.data
                })
                )
        }.bind(this)), 1000)
    }
    sendMessage(e) {
        e.preventDefault()
        var x = document.getElementsByName("message")   //sets value back to blank after search enter
        x[0].value = ''
        var message = { username: this.props.user, message: this.state.fieldValue }
        api.post("http://localhost:6969/meeting/messages/" + this.props.id, message)
            .then(function (res) {
                this.setState(Object.assign({}, this.state, {
                    allMessages: res.data
                })
                )
            }.bind(this)).then(function (res) {
        var elem = document.getElementById('messageBox');
        elem.scrollTop = elem.scrollHeight;
            })
    }

    render() {
      if (!this.state.allMessages)
        return (
          <div>Loading...</div>
        )
        return (
            <div className="messageContainer">
                <div id='messageBox' className='messageContainer'>
                  {this.state.allMessages && this.state.allMessages.map((i) => (
                      <div>
                          <div style={{ textAlign: (i.username === this.props.user ? 'right' : 'left') }}>
                              {i.username}
                          </div>
                          <div className="message" style={{ backgroundColor: (i.username === this.props.user ? '#D1EEFC' : 'lightGrey') }}>
                              {i.message}
                          </div>
                          <br />
                      </div>
                  ))}
                </div>
                <br />
                <form onSubmit={this.sendMessage} className="send-message">
                    <input type="text" className='message-input' onChange={this.logMessage} name="message" placeholder="Type your message" required="required" autoComplete="off" spellCheck="false" />
                    <input type="submit" value="Submit" className="submit message-button"></input>
                </form>
            </div>
        )
    }
}
export default Messages
