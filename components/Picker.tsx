import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

type Props = {
  items: { label: string; value: string }[];
  placeholder: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
};

export default function SelectPicker({
  items,
  placeholder,
  defaultValue,
  onValueChange,
}: Props) {
  return (
    <Picker
      // placeholder={{
      //   label: placeholder,
      //   value: null,
      //   color: "#9EA0A4",
      // }}
      selectedValue={defaultValue}
      onValueChange={onValueChange}
      style={styles.picker}
      itemStyle={{ color: "#000" }}
      selectionColor={"#fff"}
    >
      <Picker.Item label={defaultValue} value={null} />
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1041a3",
  },
  picker: {
    height: 50,
    width: 200,
  },
});
