import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { Box,  CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { postDelete } from '../api-helper/helper';
const DiariesItem = ({title, description, image, location, date, id , user , name}) => {
const [open, setOpen] = useState(false); 
  const isLoggedUser = () => {
    if(localStorage.getItem("userId") === user){
      return true;
    }
    return false; 
  }
  const handleDelete = () => {
    postDelete(id).then(data => console.log(data)).catch(err => console.log(err)); 
    setOpen(true);
  }
  return (

        <Card sx={{ width: "50%", height: '70vh', margin: 1, padding: 1, display: "flex", flexDirection: 'column', boxShadow: "5px 5px 10px #ccc"}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <EditLocationIcon />
              </IconButton>
            }
            title={location}
            header= {location}
            subheader={date}
          />
          <img 
            
            height="194"
            style={{objectFit: 'cover'}}
            src={image}
            object-fit="contain"
            alt={title}
          />
          <CardContent>
          <Typography padding={1} variant="h6" color="text.secondary">
                {title}
            </Typography>
            <hr></hr>
            <Box display="flex" alignItems="center" marginBottom={1}>
                <Typography variant="subtitle1" fontWeight="bold" marginRight={1}>
                  {name}:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>

    
          </CardContent>
          {
            isLoggedUser() && (
              <CardActions sx={{marginLeft: 'auto', paddingTop: '2px'}}>
              <IconButton LinkComponent={Link} to={`/post/${id}`} color='warning' >
                  <EditIcon/>
              </IconButton>
              <IconButton onClick={handleDelete} color="error">
                  <DeleteIcon/>
              </IconButton>
          </CardActions>
            )
          }
          <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         Successfully Deleted
        </Alert>
      </Snackbar>
        
        </Card>

  )
}

export default DiariesItem