import React, { Component }  from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Button, FlexStyle} from 'react-native';
import PlacesConfig from '../utils/PlacesConfig';

class PlaceInfo extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      descriptionVisible : false
    }
  }

  render() {
    return (
      <View>
        <Button 
          color="black"
          onPress={() => this.setState({descriptionVisible : !this.state.descriptionVisible})}
          title={this.props.title}/>
        {this.state.descriptionVisible &&
        <View>
          
          <Text>
          {this.props.description}
          </Text>
          <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'justify',
            lineHeight: 30,
            }}>
            {this.props.address}
            </Text>
        </View>
          
        }  
      </View>
    )
  }
}

export default class Places extends React.Component {
    render() {
        let sections = Object.keys(PlacesConfig)
          .map(key => {
            
            let data = PlacesConfig[key].items
              .map(item => ({name : item.name, description : item.description, address : item.address}));

              let address = PlacesConfig[key].items
              .map(item => ({address : item.address}));

            return {title : key, data : data, address: address};
          })

       

        // ]
        
        return (
            <View style={styles.container}>
            <Text>Click on the name of the restaurant to display its description and address.</Text>
            <SectionList
              sections={sections}
              renderItem={({item}) => 
              
                <PlaceInfo 
                  style={styles.item}
                  title={item.name}
                  description={item.description} 
                  address={item.address} 
                  />}

              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({

       container: {
       flex: 1,
       paddingTop: 22,
       backgroundColor: '#EB8D72',
      },

      sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', // <-- the magic
        backgroundColor: '#cd5b45',
      },

      item: {
        color: 'black',
        padding: 10,
        fontSize: 50,
        height: 44,
        backgroundColor: '#EB8D72',
      },
    })
    