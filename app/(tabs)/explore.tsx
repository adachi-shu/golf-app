import { getShotsInRound } from "@/adminFirestore";
import { useUserInfo } from "@/components/UserProvider";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Shot } from ".";

export default function TabTwoScreen() {
  const { userId, roundId } = useUserInfo();
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    const fetchShots = async () => {
      const shots = await getShotsInRound(roundId, userId);
      if (shots) {
        setShots(shots);
      }
    };
    fetchShots();
  }, [roundId, userId]);

  return (
    <View>
      {shots.map((shot, index) => (
        <Text key={index}>
          ホール{shot.hole}、{shot.strokes}打目、{shot.club},{" "}
          {shot.startBallistic},{shot.endBallistic}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
