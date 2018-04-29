import React, { Component } from "react";
import { Container, Fab, Text, List } from "native-base";
import { colors } from "../utils";

class TripHistory extends Component {
  navigateToNewTrip = () => {
    this.props.navigation.navigate("NewTrip");
  };
  render() {
    return (
      <Container>
        <Fab
          position="bottomRight"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary
          }}
          onPress={this.navigateToNewTrip}
        >
          <Text style={{ fontSize: 10 }}>Add</Text>
        </Fab>
      </Container>
    );
  }
}

export default TripHistory;
