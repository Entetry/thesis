import React from 'react';
import {Link} from 'react-router-dom';
import '../ActionBox/style.css';

const ActionBox = (props) => {
    return(
        <Link to={`${props.urlTo}`}>
            <div id="action-box">
                <p>{props.actionName}</p>
            </div>
        </Link>
    )
}

export default ActionBox;