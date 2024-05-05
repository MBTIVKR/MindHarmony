import { FC } from "react";
import { Text, Title, Image, Card, Stack, Flex } from "@mantine/core";

interface CognitiveFunction {
  function: string;
  description: string;
}

interface MBTIProfile {
  title: string;
  description: string;
  avatar: string;
  skills: string[];
  cognitives: CognitiveFunction[];
}

interface ProfileCardProps {
  profile: MBTIProfile;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => (
  <Card radius={10} pb={30}>
    <Flex gap={20} direction={{ sm: "row", base: "column" }}>
      <Image
        src={profile.avatar}
        alt={profile.title}
        w={{ sm: "100%", base: "90%" }}
        m="auto"
        ta="center"
        pt={{sm: 0, base: 20}}
      />
      <Stack gap="sm" style={{ flex: 1, justifyContent: "center" }}>
        <Title order={2}>{profile.title}</Title>
        <Text>{profile.description}</Text>
        <Title order={4}>Сильные стороны:</Title>
        <ul>
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <Title order={4}>Когнитивные функции:</Title>
        <ul>
          {profile.cognitives.map((func) => (
            <li key={func.function}>
              <strong>{func.function}:</strong> {func.description}
            </li>
          ))}
        </ul>
      </Stack>
    </Flex>
  </Card>
);

export default ProfileCard;
