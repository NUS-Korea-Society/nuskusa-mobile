import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";

const BoardTypeSelect = ({
  title,
  subtitle1, // Some long sentences need two lines
  subtitle2 = "",
  handlePress,
}: {
  title: string;
  subtitle1: string;
  subtitle2: string;
  handlePress: any;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle1}
        {"\n"}
        {subtitle2}
      </Text>
    </TouchableOpacity>
  );
};

export default BoardTypeSelect;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    width: width * 0.42,
    height: width * 0.42 - 2,
    padding: 15,
    margin: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: "50%",
  },
  subtitle: {
    fontSize: 11,
    marginTop: "7%",
  },
});
