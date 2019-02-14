import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Color from "color";
import { Loading } from "../Loading";
import cssVariables from "../../variables.css";
import defaultStyle from "./mapStyle.json";

export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxE_S9SAgyzDOOyWb24wbLDR4scnaUu7U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <Loading />,
    containerElement: (
      <div
        style={{
          backgroundColor: "black",
          height: "110%",
          width: "100%",
        }}
      />
    ),
    mapElement: <div style={{ height: "100%" }} />,
    center: {
      lat: 43.465267,
      lng: -80.523608,
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    isMarkerShown
    defaultZoom={18}
    defaultCenter={props.center}
    className={props.className}
    options={{ disableDefaultUI: true, styles: defaultStyle, minZoom: 3 }}
  >
    <Marker
      position={{ lat: 43.465267, lng: -80.522608 }}
      icon={[
        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|",
        Color(cssVariables.colorAccent)
          .hex()
          .substr(1),
      ].join("")}
    />
  </GoogleMap>
));
