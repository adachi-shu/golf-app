import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Setting() {
  return (
    <View>
      <Text>設定</Text>
      <Link href="/(tabs)">スコア登録</Link>
    </View>
  );
}
