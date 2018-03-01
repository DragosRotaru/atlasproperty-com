import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Color from 'color';
import Loading from '../../Loading/Loading';
import Variables from '../../../Variables.css';
import defaultStyle from './MapStyle.json';

const MapDataView = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXELzXBjvUGeVEAGXO---IuQIpoAoi16Y&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <Loading />,
    containerElement: <div style={ {
      backgroundColor: 'black',
      height: '110%',
      width: '100%',
    } }
    />,
    mapElement: <div style={ { height: '100%' } } />,
    center: {
      lat: 43.465267,
      lng: -80.522608,
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  return (
    <GoogleMap
      isMarkerShown
      defaultZoom={ 14 }
      defaultCenter={ props.center }
      options={ { disableDefaultUI: true, styles: defaultStyle, minZoom: 3 } }
    >{ props.data.map(datum => <Marker key={ datum.id } position={ datum.location } icon={ ['http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|', Color(Variables.colorAccent).hex().substr(1)].join('') } />) }
    </GoogleMap>
  );
});

export default MapDataView;
