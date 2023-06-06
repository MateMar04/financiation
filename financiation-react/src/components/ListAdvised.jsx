import React from "react";
import {Link} from "react-router-dom";


const ListAdvised = ({advised}) => {
    return (
        <Link to={`/advised/${advised.id}/`}>
            <h3>{advised.first_name} {advised.last_name}</h3>
        </Link>
    )
}

export default ListAdvised;