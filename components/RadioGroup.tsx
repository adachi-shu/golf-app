import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

type RadioGroupProps = {
  radioButtons: RadioButtonProps[];
  onPress: (selectedId: string) => void;
  selectedId: string | undefined;
  layout: "row" | "column";
};

export default function RadioGroupComponent({
  radioButtons,
  onPress,
  selectedId,
  layout,
}: RadioGroupProps) {
  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={onPress}
      selectedId={selectedId}
      layout={layout}
    />
  );
}
