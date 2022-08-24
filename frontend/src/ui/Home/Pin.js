import { Marker } from "react-map-gl";
import bomb from "./icons/bomb.png";
import crying from "./icons/crying.png";
import facepalm from "./icons/face-palm.png";

export const Pin = (props) => {
  const { setPopupInfo, pothole } = props;

  switch (pothole.potholeSeverity) {
    case "1":
      return (
        <Marker
          key={pothole.potholeId}
          longitude={pothole.potholeLng}
          latitude={pothole.potholeLat}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(pothole);
          }}
        >
          <img
            src={facepalm}
            alt="severity 1"
            style={{ width: "25px", height: "25px" }}
          />
        </Marker>
      );
    case "2":
      return (
        <Marker
          key={pothole.potholeId}
          longitude={pothole.potholeLng}
          latitude={pothole.potholeLat}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(pothole);
          }}
        >
          <img
            src={crying}
            alt="severity 2"
            style={{ width: "25px", height: "25px" }}
          />
        </Marker>
      );
    case "3":
      return (
        <Marker
          key={pothole.potholeId}
          longitude={pothole.potholeLng}
          latitude={pothole.potholeLat}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(pothole);
          }}
        >
          <img
            src={bomb}
            alt="severity 3"
            style={{ width: "25px", height: "25px" }}
          />
        </Marker>
      );
    default:
      return null;
  }
};
