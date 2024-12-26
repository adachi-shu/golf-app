import { addPutter, addShot } from "@/adminFirestore";
import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import SelectPicker from "../../components/Picker";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import RadioGroupComponent from "@/components/RadioGroup";
import BallisticArrow from "../../components/BallisticArrow";
import ConditionRadioBtns from "@/components/ConditionRadioBtns";
import PutterScoreModal from "@/components/PutterScoreModal";
import { useUserInfo } from "@/components/UserProvider";
import ResultBtns from "@/components/ResultBtns";

export type Shot = {
  club: string;
  startBallistic: string | undefined;
  endBallistic: string | undefined;
  condition: string | undefined;
  hole: number;
  strokes: number;
  toe: string | undefined;
  leftFoot: string | undefined;
  shotResult: ShotResult;
};

export type Putter = {
  strokes: number;
  hole: number;
};

export type ShotResult = "成功" | "トップ" | "ダフリ" | "シャンク" | "チーピン";

export default function GolfScoreCard() {
  const { userId, userInfo, handleUserId, handleUserInfo } = useUserInfo();
  const [selectedClub, setSelectedClub] = useState("クラブを選んでください");
  const { roundId } = useUserInfo();
  const [hole, setHole] = useState(1);
  const [strokes, setStrokes] = useState(1);
  const [leftFootSelectedId, setLeftFootSelectedId] = useState<
    string | undefined
  >(undefined);
  const [displayPutterScoreModal, setDisplayPutterScoreModal] = useState(false);

  const [startBallistic, setStartBallistic] = useState<string | undefined>(
    undefined
  );
  const [endBallistic, setEndBallistic] = useState<string | undefined>(
    undefined
  );
  const [condition, setCondition] = useState<string | undefined>(undefined);
  const [putterScore, setPutterScore] = useState<number | undefined>(undefined);
  const [shotResult, setShotResult] = useState<ShotResult>("成功");

  const handleClubChange = (value: string) => {
    setSelectedClub(value);
    console.log(value);
  };

  // radio button
  const upDownRadioBtn: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "",
        value: "下がり２",
        size: 25,
        layout: "column",
      },
      {
        id: "2",
        label: "",
        value: "下がり１",
        size: 21,
        layout: "column",
      },
      {
        id: "3",
        label: "",
        value: "平坦",
        size: 17,
        layout: "column",
      },
      {
        id: "4",
        label: "",
        value: "上がり１",
        size: 21,
        layout: "column",
      },
      {
        id: "5",
        label: "",
        value: "上がり２",
        size: 25,
        layout: "column",
      },
    ],
    []
  );
  const [toeSelectedId, setToeSelectedId] = useState<string | undefined>(
    undefined
  );

  const resetForm = () => {
    setSelectedClub("クラブを選んでください");
    setStartBallistic(undefined);
    setEndBallistic(undefined);
    setCondition(undefined);
    setToeSelectedId(undefined);
    setLeftFootSelectedId(undefined);
  };

  const handleShotSave = async () => {
    const shot: Shot = {
      club: selectedClub,
      startBallistic: startBallistic,
      endBallistic: endBallistic,
      condition: condition,
      hole: hole,
      strokes: strokes,
      toe: toeSelectedId,
      leftFoot: leftFootSelectedId,
      shotResult: shotResult,
    };
    try {
      await addShot(userId || "", shot, roundId);
      resetForm();
      setStrokes(strokes + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartBallistic = (value: string) => {
    setStartBallistic(value);
  };

  const handleEndBallistic = (value: string) => {
    setEndBallistic(value);
  };

  const handleCondition = (value: string) => {
    setCondition(value);
  };

  const handleShotResult = (value: ShotResult) => {
    setShotResult(value);
  };

  const handlePutterScore = (value: number) => {
    setPutterScore(value);
  };

  const putterModalOpen = () => {
    setDisplayPutterScoreModal(true);
  };

  const putterModalClose = () => {
    setDisplayPutterScoreModal(false);
  };

  const nextHole = () => {
    const putter: Putter = {
      strokes: putterScore || 0,
      hole: hole,
    };
    addPutter(userId || "", putter, roundId);
    setHole(hole + 1);
    setStrokes(1);
    resetForm();
  };

  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.header}>
        <Text style={styles.text}>end</Text>
        <Text style={styles.text}>スコアボード</Text>
      </View> */}
        <View style={styles.holeInfo}>
          <View style={styles.directionColumn}>
            <View style={styles.direction}>
              <Text style={styles.text}>Par5</Text>
              <Text style={styles.text}>{hole}H</Text>
            </View>
            <Text style={styles.text}>{strokes}打目</Text>
          </View>
          <Button title="hole out" onPress={putterModalOpen} />
        </View>
        <View style={styles.direction}>
          <Text style={styles.text}>使用クラブ</Text>
          <SelectPicker
            items={(userInfo?.clubsUsed || []).map((club) => ({
              label: club,
              value: club,
            }))}
            placeholder=""
            defaultValue={selectedClub}
            onValueChange={handleClubChange}
          />
        </View>
        <View style={styles.buttons}>
          <ConditionRadioBtns
            onPress={handleCondition}
            selectedValue={condition}
          />
        </View>
        <View style={styles.directionColumn}>
          <Text style={styles.text}>つま先</Text>
          <View style={styles.direction}>
            <Text style={styles.text}>下がり</Text>
            <RadioGroupComponent
              radioButtons={upDownRadioBtn}
              onPress={setToeSelectedId}
              selectedId={toeSelectedId}
              layout="row"
            />
            <Text style={styles.text}>上がり</Text>
          </View>
        </View>
        <View style={styles.directionColumn}>
          <Text style={styles.text}>左足</Text>
          <View style={styles.direction}>
            <Text style={styles.text}>下がり</Text>
            <RadioGroupComponent
              radioButtons={upDownRadioBtn}
              onPress={setLeftFootSelectedId}
              selectedId={leftFootSelectedId}
              layout="row"
            />
            <Text style={styles.text}>上がり</Text>
          </View>
        </View>
        <View style={styles.direction}>
          <View style={styles.direction}>
            <View style={styles.directionColumn}>
              <BallisticArrow
                selectedValue={startBallistic}
                onPress={handleStartBallistic}
              />
              <BallisticArrow
                selectedValue={endBallistic}
                onPress={handleEndBallistic}
              />
            </View>
          </View>
          <View style={styles.distance}>
            <Text style={styles.text}>飛距離</Text>
            <TextInput style={styles.input} defaultValue="100" />
            <Text style={styles.text}>Y</Text>
          </View>
        </View>
        <View>
          <Text>結果</Text>
          <ResultBtns onPress={handleShotResult} selectedValue={shotResult} />
        </View>
        <View style={styles.footer}>
          <Button title="保存" onPress={handleShotSave} />
          <Button title="リセット" onPress={resetForm} />
        </View>
      </View>
      {displayPutterScoreModal && (
        <PutterScoreModal
          onChangePutterScore={handlePutterScore}
          selectedValue={putterScore}
          onClose={putterModalClose}
          onSave={nextHole}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
    width: "90%",
    maxWidth: 414,
    margin: "auto",
    gap: 10,
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
  direction: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 1,
  },
  directionColumn: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 1,
    gap: 1,
  },
  distance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 2,
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
    marginHorizontal: 2,
  },
});
