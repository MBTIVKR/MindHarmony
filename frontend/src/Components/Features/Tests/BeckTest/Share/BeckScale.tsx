// BeckScale.tsx
import { Text, Slider, Stack } from "@mantine/core";

export interface IBeckScale {
    score: number,
    level: string,
    color: string,
}

const BeckScale = ({ score, level, color }: IBeckScale) => {
  return (
    <Stack>
      <Text>Результат: {score}</Text>
      <Text>Уровень депрессии: {level}</Text>
      <Slider
        value={score}
        min={0}
        max={42}
        label={level}
        marks={[
          { value: 13, label: '13' },
          { value: 19, label: '19' },
          { value: 28, label: '28' },
          { value: 29, label: '29' },
          { value: 63, label: '63' }
        ]}
        disabled
        styles={{
          bar: {
            backgroundColor: color,
          }
        }}
      />
    </Stack>
  );
};

export default BeckScale;
