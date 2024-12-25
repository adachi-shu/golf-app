import { addRoundSetting } from "@/adminFirestore";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type RoundSettingProps = {
  name: string;
  weather: "sunny" | "cloudy" | "rainy";
  objective: string;
};

export default function RoundSetting() {
  const [roundSetting, setRoundSetting] = useState<RoundSettingProps>({
    name: "",
    weather: "sunny",
    objective: "",
  });

  const handleSave = async () => {
    const id = await addRoundSetting(roundSetting);
    console.log(id);
  };

  return (
    <View>
      <Text>ラウンド設定</Text>
      <TextInput
        value={roundSetting.name}
        onChangeText={(text) =>
          setRoundSetting({ ...roundSetting, name: text })
        }
      />
      <Text>天気</Text>
      <View style={styles.container}>
        <CustomRadioButton
          label="a"
          selected={roundSetting.weather === "sunny"}
          onSelect={() =>
            setRoundSetting({ ...roundSetting, weather: "sunny" })
          }
        />
        <CustomRadioButton
          label="b"
          selected={roundSetting.weather === "cloudy"}
          onSelect={() =>
            setRoundSetting({ ...roundSetting, weather: "cloudy" })
          }
        />
        <CustomRadioButton
          label="c"
          selected={roundSetting.weather === "rainy"}
          onSelect={() =>
            setRoundSetting({ ...roundSetting, weather: "rainy" })
          }
        />
      </View>
      <Text>目的</Text>
      <TextInput
        value={roundSetting.objective}
        onChangeText={(text) =>
          setRoundSetting({ ...roundSetting, objective: text })
        }
      />
      <View style={styles.saveButton}>
        <Button title="保存" onPress={handleSave} />
      </View>
    </View>
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
      style={[styles.radioButtonText, { color: selected ? "#000" : "#000" }]}
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
    width: 20,
  },
  radioButtonText: {
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
  },
});
