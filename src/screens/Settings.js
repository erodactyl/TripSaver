import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import * as mapDispatchToProps from "../actions/settings";

const mapStateToProps = ({ settings }) => ({ settings });

class Settings extends Component {
  render() {
    const {
      tripsGoal: daily,
      activeGoal: active,
      carpoolingGoal: carpooling,
      username,
      address
    } = this.props.settings;
    return (
      <View>
        <TextInput
          value={username}
          onChangeText={this.props.changeName}
          placeholder="Username"
        />
        <TextInput
          value={address}
          onChangeText={this.props.changeAddress}
          placeholder="Address"
        />
        <TextInput
          value={daily.toString()}
          keyboardType="numeric"
          onChangeText={this.props.changeDailyTrips}
          placeholder="Daily trips goal"
        />
        <TextInput
          value={active.toString()}
          keyboardType="numeric"
          onChangeText={this.props.changeDailyActiveTrips}
          placeholder="Daily active trips goal"
        />
        <TextInput
          value={carpooling.toString()}
          keyboardType="numeric"
          onChangeText={this.props.changeDailyCarpoolingTrips}
          placeholder="Daily carpooling trips goal"
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
