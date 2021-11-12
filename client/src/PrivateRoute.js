import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component, path, admin}) => {
    if(admin){
        return(<Route path={path} exact component={component}/>)
    } else {
        return(<Redirect to='/' />)
    }
}

export default PrivateRoute
