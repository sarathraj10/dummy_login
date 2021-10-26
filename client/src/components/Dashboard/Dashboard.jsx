import React from 'react'
import { Button} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Dashboard = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const logoutHandler = () => {
        dispatch({type : 'LOGOUT'})
        history.push('/auth')
    }
    return (
        <div>
            <h1>DashBoard</h1>
            <Button variant="contained" color="secondary" onClick={logoutHandler}>Logout</Button>
        </div>
    )
}

export default Dashboard
