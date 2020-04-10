import React from 'react';
import './style.css'
class Headcomponent extends React.Component {
    render() {
        return (
                <tr >
                    <th colSpan="2" align="left">Name</th>
                        <th colSpan="1" align="center">Amount-Domestic <br></br>(Excluding Tax)</th>
                        <th colSpan="2" align="right">Amount-International <br></br>(Excluding Tax)</th>
                </tr> 
    )}
}
export default Headcomponent