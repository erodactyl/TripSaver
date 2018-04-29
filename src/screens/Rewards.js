import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";

export default class Rewards extends Component {
  state = { rewards: [] };
  componentWillMount() {
    this.fetchRewards();
  }
  componentWillReceiveProps() {
    this.fetchRewards();
  }
  fetchRewards = async () => {
    const rewards = await AsyncStorage.getItem("rewards");
    if (rewards !== null) {
      this.setState({ rewards });
    }
  };
  render() {
    return (
      <View>
        {!this.state.rewards.length ? (
          <Text>You have no rewards haha</Text>
        ) : (
          <View>
            {this.state.rewards.map(rew => <Text key={rew}>{rew}</Text>)}
          </View>
        )}
      </View>
    );
  }
}
