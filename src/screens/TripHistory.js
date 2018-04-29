import React, { Component } from "react";
import {
  Container,
  Fab,
  Text,
  List,
  Item,
  Icon,
  Input,
  Button
} from "native-base";
import { TouchableOpacity } from "react-native";
import { colors, getDateString } from "../utils";
import { initialize } from "../actions/trips";
import { connect } from "react-redux";
import { Calendar } from "react-native-calendars";

const mapStateToProps = ({ history }) => ({ history });

const mapDispatchToProps = { initialize };

class TripHistory extends Component {
  state = {
    low: getDateString(),
    high: getDateString()
  };
  componentWillMount() {
    this.props.initialize();
  }
  navigateToNewTrip = () => {
    this.props.navigation.navigate("NewTrip");
  };
  selectDate = day => {
    const newDate = new Date(day.dateString);
    if (newDate > new Date(this.state.low)) {
      this.setState({ high: day.dateString });
    } else {
      this.setState({ low: day.dateString });
    }
  };
  render() {
    const { high, low } = this.state;
    const trips = this.props.history.filter(trip => {
      const currDate = new Date(trip.date);
      const hDate = new Date(high);
      const lDate = new Date(low);
      return currDate >= lDate && currDate <= hDate;
    });
    return (
      <Container>
        <Calendar
          onDayPress={this.selectDate}
          markedDates={{
            [low]: { selected: true },
            [high]: { selected: true }
          }}
        />
        <List>
          {trips.map(trip => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EditTrip", { trip });
              }}
              style={{
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "black"
              }}
              key={trip.id}
            >
              <Text>{trip.name}</Text>
              <Text>{trip.type}</Text>
              <Text>{trip.date}</Text>
              <Text>You saved {trip.saved} trips</Text>
            </TouchableOpacity>
          ))}
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
