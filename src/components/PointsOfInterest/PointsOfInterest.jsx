//import styles from "./PointsOfInterest.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const PointsOfInterest = ({ pointsOfInterest }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h1" sx={{ fontSize: "2rem" }}>
          Points of Intrest:
        </Typography>
        <Typography variant="body2">
          {pointsOfInterest.map((location, index) => {
            return (
              <>
                <div key={index}>
                  <h2> {location.name} </h2>
                  <p> {location.address} </p>
                </div>
              </>
            );
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PointsOfInterest;
