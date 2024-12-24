import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import ModalContainer from "./ModalContainer";
import { addPutter } from "@/adminFirestore";

const labels = [1, 2, 3, 4, 5];

type Props = {
  onChangePutterScore: (label: number) => void;
  selectedValue: number | undefined;
  onClose: () => void;
  onSave: () => void;
};

export default function PutterScoreModal({
  onChangePutterScore,
  selectedValue,
  onClose,
  onSave,
}: Props) {
  return (
    <ModalContainer onPress={onClose}>
      <View style={styles.radioButtonContainer}>
        <Text>パター打数</Text>
        {labels.map((label) => (
          <CustomRadioButton
            label={label.toString()}
            selected={selectedValue === label}
            onSelect={() => onChangePutterScore(label)}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="保存"
          onPress={() => {
            onSave();
            onClose();
          }}
        />
        <Button title="キャンセル" onPress={onClose} />
      </View>
    </ModalContainer>
  );
}

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
  radioButtonContainer: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 16,
    opacity: 1,
    borderRadius: 8,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonText: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
