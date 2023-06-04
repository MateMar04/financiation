import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const authenticated = false
    return (
        !authenticated ? <Navigate to='/login'/> : children
    )
}

export default PrivateRoute;