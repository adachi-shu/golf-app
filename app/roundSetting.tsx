import { addRoundSetting } from "@/adminFirestore";
import { useUserInfo } from "@/components/UserProvider";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const { userId, handleRoundId } = useUserInfo();
  const [roundSetting, setRoundSetting] = useState<RoundSettingProps>({
    name: "",
    weather: "sunny",
    objective: "",
  });

  const handleSave = async () => {
    const id = await addRoundSetting(userId, roundSetting);
    handleRoundId(id || "");
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ラウンド設定</Text>
      <View style={styles.inputContainer}>
        <View>
          <Text>ラウンド名</Text>
          <TextInput
            value={roundSetting.name}
            onChangeText={(text) =>
              setRoundSetting({ ...roundSetting, name: text })
            }
            style={styles.input}
          />
        </View>
        <View>
          <Text>天気</Text>
          <View style={styles.buttonContainer}>
            <CustomRadioButton
              label="晴れ"
              selected={roundSetting.weather === "sunny"}
              onSelect={() =>
                setRoundSetting({ ...roundSetting, weather: "sunny" })
              }
            />
            <CustomRadioButton
              label="曇り"
              selected={roundSetting.weather === "cloudy"}
              onSelect={() =>
                setRoundSetting({ ...roundSetting, weather: "cloudy" })
              }
            />
            <CustomRadioButton
              label="雨"
              selected={roundSetting.weather === "rainy"}
              onSelect={() =>
                setRoundSetting({ ...roundSetting, weather: "rainy" })
              }
            />
          </View>
        </View>
        <View>
          <Text>目標</Text>
          <TextInput
            value={roundSetting.objective}
            onChangeText={(text) =>
              setRoundSetting({ ...roundSetting, objective: text })
            }
            style={styles.input}
          />
        </View>
      </View>
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
      style={[styles.radioButtonText, { color: selected ? "#fff" : "#000" }]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    flex: 1,
    gap: 8,
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
  saveButton: {
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
