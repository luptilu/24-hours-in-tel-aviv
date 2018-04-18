import React , { Component }from 'react';
import { AppRegistry, View, ScrollView, FlatList, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    stretch: {
      height: 580,
      width: 350,
      flex: 1,
    },
    contentContainer: {
        paddingVertical: 30,
        backgroundColor: '#EB8D72',
        flex: 4,
        height: 1000,
        justifyContent: 'center',
        alignItems: 'center',
      },

      
      
  });

export default class GetStarted extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image 
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    width: undefined,
                    height: undefined
                  }}
                source={require('./24hoursintelaviv1.png')}
                resizeMode="contain" />
            <Text>Tips for the Middle East's bubble of hedonism, collected by a hummus-loving ex-flight attendant in over 20 short visits between 2015 and 2017.
                Enjoy my tips by swiping right to the map!
            </Text>
            <Text style={{
                fontSize: 10,
                textAlign: 'justify',
                lineHeight: 30,
                }}
            >© Luisa Bider, 2018</Text>
           

            </ScrollView>);


            
    }
}