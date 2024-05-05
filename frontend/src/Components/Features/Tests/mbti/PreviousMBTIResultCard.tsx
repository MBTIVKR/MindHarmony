import { FC } from "react";
import { Box, Text, Title, Image, Card, Stack, Flex } from "@mantine/core";

interface PreviousMBTIResultCardProps {
  previousType: string;
  previousDescription: string;
}

const PreviousMBTIResultCard: FC<PreviousMBTIResultCardProps> = ({ previousType, previousDescription }) => (
  <Card radius={10} pb={30}>
    <Title order={2}>{previousType}</Title>
    <Text>{previousDescription}</Text>
  </Card>
);

export default PreviousMBTIResultCard;
