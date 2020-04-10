import React from 'react';
import './style.css'
class BodyComponent extends React.Component {
    render() {
        return (
            <tr>
                <td colSpan="1" align="left"><input type="text" placeholder="Name" name="Naam" value={this.props.data.Naam} onChange={this.props.handleChange } /></td>
              <td colSpan="1" style={{ color:"rgb(192, 187, 187)"}} align="right">RS</td>
              <td  colSpan="1" align="center"><input className="placeholder_center" type="Number" placeholder="amount" name="rs_amount"  value={this.props.data.rs_amount} onChange={this.props.handleChange} /></td>
              <td  colSpan="1" align="right" style={{ color:"rgb(192, 187, 187)"}}>$</td>
              <td colSpan="1" align="right"><input type="Number" className="placeholder_right" placeholder="amount" name="dollar_amount"   value={this.props.data.dollar_amount} onChange={this.props.handleChange} /></td>
            </tr>
        )
    }
}
export default BodyComponent