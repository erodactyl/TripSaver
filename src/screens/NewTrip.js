import React, { Component } from "react";
import { TextInput, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Container, Picker, Form, Button, Text, View } from "native-base";
import { Calendar } from "react-native-calendars";
import { saveTrip } from "../actions/trips";
import { colors, getDateString } from "../utils";
import uuid from "uuid/v4";

const mapDispatchToProps = { saveTrip };

class NewTrip extends Component {
  constructor(props) {
    super(props);
    this.date = Date.now();
    this.state = {
      tripType: "carpooling",
      name: "",
      date: getDateString(),
      carpoolingSaved: "",
      activeTrips: {
        start: "",
        destinations: [{ id: uuid(), name: "" }]
      }
    };
  }
  onSubmit = () => {
    const { name, tripType, date, carpoolingSaved, activeTrips } = this.state;
    if (!name) {
      Alert.alert("Please input name");
      return;
    }
    if (tripType === "carpooling") {
      if (!carpoolingSaved) {
        Alert.alert("Please input saved trips");
        return;
      }
      this.props.saveTrip({
        name,
        type: tripType,
        date,
        saved: carpoolingSaved
      });
    } else if (tripType === "active") {
      if (!activeTrips.destinations.length) {
        Alert.alert("Please input at least one destination");
        return;
      } else if (!activeTrips.start.length) {
        Alert.alert("Please input start point");
        return;
      }
      this.props.saveTrip({
        name,
        type: tripType,
        saved: activeTrips.length,
        trips: {
          start: activeTrips.start,
          destinations: activeTrips.destinations.filter(el => el.name !== "")
        }
      });
    }
    this.props.navigation.goBack();
  };
  onTripTypeChange = tripType => this.setState({ tripType });
  selectDate = day => this.setState({ date: day.dateString });
  onCarpoolingSavedChange = carpoolingSaved =>
    this.setState({ carpoolingSaved });
  changeName = name => this.setState({ name });
  addDestDisabled = () =>
    this.state.activeTrips.destinations.some(el => el.name === "");
  render() {
    const { tripType, name, date, carpoolingSaved, activeTrips } = this.state;
    return (
      <ScrollView>
        <Picker
          selectedValue={tripType}
          onValueChange={this.onTripTypeChange}
          placeholder="Select trip type"
          textStyle={{ color: colors.primary }}
          mode="dropdown"
        >
          <Picker.Item label="Carpooling" value="carpooling" />
          <Picker.Item label="Active/Public Transportation" value="active" />
        </Picker>
        <TextInput
          value={name}
          onChangeText={this.changeName}
          placeholder="Name"
        />
        {tripType === "carpooling" ? (
          <TextInput
            placeholder="Number of people (trips saved)"
            keyboardType="numeric"
            onChangeText={this.onCarpoolingSavedChange}
            value={carpoolingSaved}
          />
        ) : (
          <View>
            <TextInput
              value={activeTrips.start}
              onChangeText={start =>
                this.setState(state => ({
                  activeTrips: { ...state.activeTrips, start }
                }))
              }
              placeholder="Start point"
            />
            {activeTrips.destinations.map((dest, idx) => (
              <TextInput
                key={dest.id}
                value={dest}
                placeholder={`Destination ${idx + 1}`}
                onChangeText={text =>
                  this.setState(state => {
                    const destinations = activeTrips.destinations.map(
                      el =>
                        dest.id === el.id ? { id: dest.id, name: text } : el
                    );
                    return {
                      activeTrips: { ...state.activeTrips, destinations }
                    };
                  })
                }
              />
            ))}
            <Button
              style={{
                backgroundColor: this.addDestDisabled()
                  ? colors.disabled
                  : colors.primary
              }}
              disabled={this.addDestDisabled()}
              onPress={() => {
                const destinations = [
                  ...this.state.activeTrips.destinations,
                  { id: uuid(), name: "" }
                ];
                this.setState(state => ({
                  activeTrips: { ...state.activeTrips, destinations }
                }));
              }}
            >
              <Text>Add destination</Text>
            </Button>
          </View>
        )}
        <Calendar
          minDate={new Date(this.date - 1000 * 60 * 60 * 24 * 2)}
          maxDate={new Date(this.date + 1000 * 60 * 60 * 24 * 2)}
          onDayPress={this.selectDate}
          markedDates={{ [date]: { selected: true } }}
        />
        <Button
          onPress={this.onSubmit}
          style={{ backgroundColor: colors.primary, alignSelf: "center" }}
        >
          <Text>Submit</Text>
        </Button>
      </ScrollView>
    );
  }
}

export default connect(null, mapDispatchToProps)(NewTrip);
