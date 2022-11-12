import React from 'react'
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// const Map = () => {
//   return (
//     <div>
//       <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//         <Marker position={{ lat: -34.397, lng: 150.644 }} />
//       </GoogleMap>
//     </div>
//   );
// }

const Map = (): JSX.Element => {
  // <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
  // </GoogleMap>
  return <></>
};
export default Map;

// export default withScriptjs(withGoogleMap(Map));

