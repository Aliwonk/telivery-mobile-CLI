/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MapBoxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';

// IMPORT ICONS
import IconSVGGPS from '../../assets/icons/gps.svg';
import {window, map} from '../../constants';

MapBoxGL.setWellKnownTileServer('Mapbox');
MapBoxGL.setAccessToken(map.mapBoxToken);

export default function MapScreen() {
  const [coordinates, setCoordinates] = useState<Array<number>>(
    map.centerCoordinates,
  );
  const [coordinatesUser, setCoordinateUser] =
    useState<Array<number>>(coordinates);
  const [zoomCamera, setZoomCamera] = useState<number>(14);
  const [changeCamera, setChangeCamera] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <MapBoxGL.MapView
        style={styles.map}
        compassEnabled={true}
        onRegionDidChange={feature => {
          setCoordinates(feature.geometry.coordinates);
          setChangeCamera(true);
        }}
        onPress={(event: any) => {
          setCoordinates(event.geometry.coordinates);
        }}
        styleURL={map.mapBoxStyleURL}>
        <MapBoxGL.Camera
          zoomLevel={zoomCamera}
          centerCoordinate={coordinates}
        />
      </MapBoxGL.MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position.coords);
              setCoordinateUser([
                position.coords.longitude,
                position.coords.latitude,
              ]);
              setCoordinates([
                position.coords.longitude,
                position.coords.latitude,
              ]);
              setZoomCamera(17);
              setChangeCamera(false);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 1000},
          );
        }}>
        <IconSVGGPS width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
}

const defaultStyle = {
  version: 8,
  name: 'Land',
  center: [94.4534, 51.7147],
  sources: {
    map: {
      type: 'raster',
      // url: 'mapbox://styles/aliwonk/clbpasg6v001715nzhqel69pi',
      tiles: ['https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90'],
      tileSize: 156,
      minzoom: 1,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f2efea',
      },
    },
    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
    // backgroundColor: 'white',
    position: 'absolute',
    left: '87%',
    top: window.height - 150,
  },
  markerContainer: {
    alignItems: 'center',
    width: 60,
    backgroundColor: 'transparent',
    height: 70,
  },
  textContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 5,
    flex: 1,
    color: 'white',
  },
});
