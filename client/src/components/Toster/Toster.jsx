import React from 'react'
import {Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const Toster = ({showError,message}) => {
    return (
     <Snackbar open={showError} autoHideDuration={3000}>
        <Alert  elevation={6} variant="filled" severity="error">
          {message}
        </Alert>
      </Snackbar>
    )
}

export default Toster