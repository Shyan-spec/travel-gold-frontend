//import styles from "./PointsOfInterest.css";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";

const PointsOfInterest = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h1" sx={{ fontSize: "2rem" }}>
          Points of Intrest:
        </Typography>
        <Typography variant="body2">well meaning and kindly.</Typography>
      </CardContent>
    </Card>
  );
};

export default PointsOfInterest;
