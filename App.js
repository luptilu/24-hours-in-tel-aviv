import React from 'react';
import Root from './src/navigators/Root';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

// utils
import config from './src/utils/config';

MapboxGL.setAccessToken(config.get('accessToken'));

export default class App extends React.Component {
  render() {
    return <Root/>;
  }
}
