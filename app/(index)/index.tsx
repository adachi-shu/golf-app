import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Hello</Text>
      <Link href="/roundSetting">スコア登録</Link>
    </View>
  );
}
