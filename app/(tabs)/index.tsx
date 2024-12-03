import { createUser, getUserInfo } from "@/adminFirestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SelectPicker from "../../components/Picker";
import { UserInfo } from "@/types";

export default function GolfScoreCard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedClub, setSelectedClub] = useState("");

  const handleClubChange = (value: string) => {
    setSelectedClub(value);
    console.log(value);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data as any);
      console.log(data);
    };

    fetchUserInfo();
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.text}>end</Text>
        <Text style={styles.text}>スコアボード</Text>
      </View> */}
      {/* <View style={styles.holeInfo}>
        <Button title="◀" onPress={() => {}} />
        <Text style={styles.text}>Par5 18H</Text>
        <Button title="▶" onPress={() => {}} />
      </View> */}
      <View style={styles.section}>
        <Text style={styles.text}>使用クラブ</Text>
        <SelectPicker
          items={(userInfo?.clubsUsed || []).map((club) => ({
            label: club,
            value: club,
          }))}
          placeholder="クラブを選んでください"
          defaultValue={selectedClub}
          onValueChange={handleClubChange}
        />
      </View>
      <View style={styles.direction}>
        <Text style={styles.arrow}>↖</Text>
        <Text style={styles.arrow}>↑</Text>
        <Text style={styles.arrow}>↗</Text>
        <Text style={styles.arrow}>←</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
      <View style={styles.distance}>
        <Text style={styles.text}>飛距離</Text>
        <TextInput style={styles.input} defaultValue="100" />
        <Text style={styles.text}>Y</Text>
      </View>
      <View style={styles.radioGroup}>
        <Text style={styles.text}>つま先</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
      </View>
      <View style={styles.radioGroup}>
        <Text style={styles.text}>左足</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
        <Text style={styles.radio}>○</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="ティ" onPress={() => {}} />
        <Button title="フェアウェイ" onPress={() => {}} />
        <Button title="ラフ" onPress={() => {}} />
        <Button title="バンカー" onPress={() => {}} />
      </View>
      <View style={styles.footer}>
        <Button title="保存" onPress={() => {}} />
        <Button title="リセット" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  holeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    alignItems: "center",
    marginVertical: 8,
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  distance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    width: 50,
    textAlign: "center",
  },
  radio: {
    fontSize: 24,
    marginHorizontal: 4,
  },
});
