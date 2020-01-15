import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Color from "color";
import { Loading } from "../loading";
import cssVariables from "../../variables.css";
import defaultStyle from "./mapStyle.json";

export const MapDataView = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxE_S9SAgyzDOOyWb24wbLDR4scnaUu7U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <Loading />,
    containerElement: (
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    ),
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    isMarkerShown
    defaultZoom={13}
    defaultCenter={props.center}
    options={{
      disableDefaultUI: true,
      styles: defaultStyle,
      minZoom: 3,
    }}
  >
    {props.data.map(property => (
      <Marker
        key={property.id}
        position={{
          lat: property.location.latitude,
          lng: property.location.longitude,
        }}
        onClick={() => props.onClick(property.id)}
        icon={[
          "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|",
          Color(cssVariables.colorAccent)
            .hex()
            .substr(1),
        ].join("")}
      >
        {props.selected === property.id ? (
          <InfoWindow onCloseClick={props.onClose}>
            <div>{property.address}</div>
          </InfoWindow>
        ) : (
          ""
        )}
      </Marker>
    ))}
  </GoogleMap>
));
