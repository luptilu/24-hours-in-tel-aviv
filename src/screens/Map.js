import React from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { SegmentedControls } from 'react-native-radio-buttons';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

import { Icon } from 'react-native-elements';

// styles
import sheet from '../styles/sheet';
import colors from '../styles/colors';

// utils
import { IS_ANDROID } from '../utils';
import config from '../utils/config';
import configPlaces from '../utils/PlacesConfig';

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    marginTop: 48,
    fontSize: 24,
    textAlign: 'center',
  },
  exampleList: {
    flex: 1,
    marginTop: 60 + 12, // header + list padding,
  },
  exampleListItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  exampleListItem: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleListLabel: {
    fontSize: 18,
  },
  exampleBackground: {
    flex: 1,
    backgroundColor: colors.primary.pinkFaint,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#696969',
    borderRadius: 15,
  },
  annotationIcon: {
    width: 10,
    height: 10,
    borderRadius: 1,
    transform: [{ scale: 0.7 }],
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  infoPanelContainer : {
    backgroundColor: '#EB8D72',
    paddingBottom : 10,
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 10
  }
  
});

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      growAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.visible !== newProps.visible) {
      if (!newProps.visible) {
        Animated.timing(
          this.state.growAnim,
          {
            toValue: 0,
            duration: 300,
          }
        ).start();
      } else {
        Animated.timing(
          this.state.growAnim,
          {
            toValue: 200,
            duration: 300,
          }
        ).start();
      }
    }
  }
  render() {

    if (this.props.place === null) {
      return null;
    }

    return (
      <Animated.View
        style={{
          height : this.state.growAnim,
          backgroundColor: '#EB8D72',
          paddingLeft : 10,
          paddingRight : 10,
        }}>
        <Text style={{ fontWeight: 'bold'}}>{this.props.place.name}</Text> 
        <Text>{this.props.place.description}</Text> 
        <Text>{this.props.place.address}</Text>
      </Animated.View>
    )
  }
}

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlace : null,
      placeFilter : 'food',
      infoPanelVisible : false
    }
  }
  async componentWillMount() {
    if (IS_ANDROID) {
      const isGranted = await Mapbox.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }
  renderAnnotations() {
    return Object.keys(configPlaces)
      .filter(key => key === this.state.placeFilter)
      .map(key => {
        let annotation = configPlaces[key];
        return annotation.items.map(item => {
          return (
            <Mapbox.PointAnnotation
              key={`${key}_${item.name}`}
              id={`${key}_${item.name}`}
              coordinate={item.coordinates}>

              <View style={styles.annotationContainer}>
                <Icon 
                  name={annotation.icon} 
                  size={25}
                  type='font-awesome'
                  color={annotation.color}
                  onPress={() => this.setState({infoPanelVisible : true, selectedPlace : item})}/>
              </View>
              <Mapbox.Callout title={item.name} />
            </Mapbox.PointAnnotation>);
        });
      })
  }

  render() {
    if (IS_ANDROID && !this.state.isAndroidPermissionGranted) {
      if (this.state.isFetchingAndroidPermission) {
        return null;
      }
      return (
        <View style={sheet.matchParent}>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      );
    }

    return (
      <View style={sheet.matchParent}>
        <View style={{marginTop: 30}}>
          <SegmentedControls
            options={ ['food', 'clubs', 'cafes', 'art', 'bars', 'markets'] }
            onSelection={value => this.setState({placeFilter : value})}
            selectedOption={this.state.placeFilter}
          />
        </View>
        <TouchableWithoutFeedback 
          style={sheet.matchParent}
          onPress={() => this.setState({infoPanelVisible : false})}>
          <Mapbox.MapView
            centerCoordinate={[34.773078, 32.063069]}
            showUserLocation={true}            
            zoomLevel={11}
            //userTrackingMode={Mapbox.UserTrackingModes.Follow}
            styleURL="mapbox://styles/luptilu/cjfmn8flo15ty2rlh17vxj2sb"
            style={sheet.matchParent}
            attributionEnabled>
            {this.renderAnnotations()}
          </Mapbox.MapView>
        </TouchableWithoutFeedback>
        <InfoPanel 
          place={this.state.selectedPlace}
          visible={this.state.infoPanelVisible}/>
      </View>
    );
  }
}