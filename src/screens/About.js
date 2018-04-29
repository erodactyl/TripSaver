import React, { Component } from "react";
import { View, Text } from "react-native";

class About extends Component {
  render() {
    return (
      <View>
        <Text>
          Hello. I am Erik. I don't know how to predict someone's mood based on
          weather, so I save trips :P. Default landmarks are - 100 trips saved,
          100 certain kind of trips (carpooling) saved, and 20 independent trips
          in the same day.
        </Text>
      </View>
    );
  }
}

export default About;
