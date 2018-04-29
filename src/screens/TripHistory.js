import React, { Component } from "react";
import { Container, Fab, Text, List, View } from "native-base";
import { colors } from "../utils";
import { initialize } from "../actions/trips";
import { connect } from "react-redux";

const mapStateToProps = ({ history }) => ({ history });

const mapDispatchToProps = { initialize };

class TripHistory extends Component {
  componentWillMount() {
    this.props.initialize();
  }
  navigateToNewTrip = () => {
    this.props.navigation.navigate("NewTrip");
  };
  render() {
    return (
      <Container>
        <List>
          {this.props.history.map(
            trip =>
              trip.type === "carpooling" ? (
                <View key={trip.id}>
                  <Text>{trip.name}</Text>
                </View>
              ) : (
                <View key={trip.id}>
                  <Text>{trip.name}</Text>
                </View>
              )
          )}
        </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(TripHistory);
