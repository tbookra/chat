import { Message } from '../types/generalTypes'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

interface Props {
    message: Message
}

const MessageComp = ({message}:Props) => {
  return (
    <Card
      sx={{
        minWidth: "100px",
        maxWidth: "240px",
        pointerEvents:"none",
        minHeight:"80px",
        position: "relative",
        m: 3,
        ml: message.sender === "host" ? "5px" : "30px",
        backgroundColor: message.sender === "host" ? "#edc790" : "#95C2D5",
        color: "#fffff0",
        cursor:"pointer",
        marginTop:"8px"
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="subtitle1" sx={{fontSize: 14 }}>
          {message.text}
        </Typography>
        <Typography gutterBottom variant="caption" sx={{fontSize: 6 }}>
          {message.timestamp}
        </Typography>
      </CardContent>
      
    </Card>
  )
}

export default MessageComp