import React,{Dispatch,SetStateAction} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface Props {
  username: string;
  isOnline: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}


const Contact = ({ username, isOnline,setOpen }: Props) => {
  const dotStyle = {
    width: 18,
    height: 18,
    backgroundColor: isOnline ? "#49be2c" : "#a1a1a4",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    top: 5,
    right: 5,
    border: "1px solid #fffff0"
  };
  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 240,
        position: "relative",
        m: 5,
        backgroundColor: "#4b4a48",
        color: "#fffff0",
        cursor:"pointer"
      }}
      onClick={()=>setOpen(true)}
    >
      <CardContent>
        <Typography gutterBottom sx={{fontSize: 14 }}>
          contact
        </Typography>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
        <Box sx={dotStyle}></Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Contact;
