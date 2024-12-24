import { ReactNode } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function ModalContainer({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
