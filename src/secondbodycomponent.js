import React from 'react';
import './style.css'
class SecondBodyComponent extends React.Component {
    render() {
        return (
            <tr>
            <td align="left"><input type="text" placeholder="Name" name="excluded_name"  onChange={this.props.secondhandleChange} /></td>
            </tr>
        )
    }
}
export default SecondBodyComponent