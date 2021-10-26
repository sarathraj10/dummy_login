import React,{useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {signUp,signIn} from './action'

const initialState = {firstName: '',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const [isSignIn,setIsSignIn] = useState(true)
    const [formData,setFormData] = useState(initialState)
    const [isError,setIsError] = useState({error : false,msg : ''})
    const dispatch = useDispatch()
    const history = useHistory()
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(isSignIn){
           dispatch(signIn(formData,history))
        }else{
            const {password,confirmPassword} = formData
            if(password !== confirmPassword){
                setIsError({error : true,msg : 'Password mismatch'})
                return
            }
           dispatch(signUp(formData,history))
        }
    }
    return(
        <Grid>
            <Paper elevation={10} style={{padding :20,width:280, margin:"7rem auto"}}>
                <form onSubmit={submitHandler}>
                    <Grid align='center'>
                        <Avatar style={{backgroundColor:'#1bbd7e'}}><LockOutlinedIcon/></Avatar>
                        <h2> { isSignIn ? 'Sign In' : 'Sign Up '}</h2>
                    </Grid>
                    {!isSignIn && <TextField label='Firstname' name="firstName" onChange={handleChange} placeholder='Enter first name' fullWidth required/>}
                    {!isSignIn && <TextField label='Lastname' name="lastName" onChange={handleChange}  placeholder='Enter last name' fullWidth required/>}
                    <TextField label='Email' name="email" placeholder='Enter email' onChange={handleChange} fullWidth required/>
                    <TextField label='Password' name="password" placeholder='password' type='password' onChange={handleChange}  fullWidth required/>
                    {!isSignIn &&  <TextField label='confirmPassword' name="confirmPassword" placeholder='confirm password' type='password' onChange={handleChange} fullWidth required/>}
                    <Button type='submit' color='primary' variant="contained" style={{margin:'2rem 0'}} fullWidth> { isSignIn ? 'Sign In' : 'Sign Up '}</Button>
                    {isError.error && <p style={{color:'red' , margin:"5px auto"}}>{isError.msg}</p>}
                    <Typography > { !isSignIn ? 'Already have an account ?' : 'Do you have an account ?'}
                        <Link href="#" onClick={()=>setIsSignIn((prev)=>!prev)}>
                        { !isSignIn ? 'Sign In' : 'Sign Up '}
                    </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Auth
