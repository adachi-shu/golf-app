import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onPress: (value: string) => void;
  selectedValue: string | undefined;
};

export const BallisticArrow = ({ onPress, selectedValue }: Props) => {
  return (
    <View style={styles.container}>
      <CustomRadioButton
        label="↖"
        selected={selectedValue === "↖"}
        onSelect={() => onPress("↖")}
      />
      <CustomRadioButton
        label="↑"
        selected={selectedValue === "↑"}
        onSelect={() => onPress("↑")}
      />
      <CustomRadioButton
        label="↗"
        selected={selectedValue === "↗"}
        onSelect={() => onPress("↗")}
      />
    </View>
  );
};

export default BallisticArrow;

const CustomRadioButton = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.radioButton,
      { backgroundColor: selected ? "#007BFF" : "#FFF" },
    ]}
    onPress={onSelect}
  >
    <Text
      style={[styles.radioButtonText, { color: selected ? "#FFF" : "#000" }]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonText: {
    fontSize: 16,
  },
});
