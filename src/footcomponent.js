import React from 'react';
import './style.css'
class Footcomponent extends React.Component {
    render() {
        return (
            <tr>
                <td  align="left">Total</td>
                <td colSpan="3" align="center">Rs.{this.props.trs}  (estimate)  </td>
                <td colSpan="1" align="right"> $ {this.props.tds} (estimate)</td>
              </tr>
        )
    }
}
export default Footcomponent