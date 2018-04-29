import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Icon } from "native-base";
import NewTrip from "./NewTrip";
import TripHistory from "./TripHistory";
import Settings from "./Settings";
import About from "./About";

import { colors } from "../utils";

const TripNav = StackNavigator({
  TripHistory: { screen: TripHistory, navigationOptions: { title: "History" } },
  NewTrip: { screen: NewTrip }
});

const SettingsNav = StackNavigator({
  Settings: { screen: Settings, navigationOptions: { title: "Settings" } }
});

const AboutNav = StackNavigator({
  About: { screen: About, navigationOptions: { title: "About" } }
});

export default TabNavigator(
  {
    Trips: TripNav,
    Settings: SettingsNav,
    About: AboutNav
  },
  {
    // navigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     switch (routeName) {
    //       case "Trips":
    //         iconName = "md-car";
    //         break;
    //       case "Settings":
    //         iconName = "md-settings";
    //         break;
    //       case "About":
    //         iconName = "md-code";
    //         break;
    //     }
    //     return (
    //       <Icon
    //         name={iconName}
    //         style={{ color: focused ? "white" : colors.disabled }}
    //       />
    //     );
    //   }
    // }),
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      style: {
        backgroundColor: colors.primaryDeep
      }
    },
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: true
  }
);
