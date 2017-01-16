import React, { Component } from 'react';
import { ReactRouter, Router, Route, Link, browserHistory, hashHistory } from 'react-router'

class Bars extends Component {

    render() {
        // var timeBars = this.props.slots.map((slot) => (
        //     <div className="slot">
        //         <div className="time">
        //             {slot.time}
        //         </div>
        //         <div className="bar" style={{ height: '50px', width: '400px' }}>
        //             <div className="fill" style={{ height: "50px", width: slot.count / this.props.numRsvps * 400 + 'px' }}>
        //             </div>
        //         </div>
        //     </div>
        // )
        // )
        return (
            <div>
                {timeBars}
            </div>
        )
    }
}

export default Bars