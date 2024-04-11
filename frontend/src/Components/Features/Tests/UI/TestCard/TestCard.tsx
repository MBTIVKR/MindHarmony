import { FC } from 'react';
import { Card, Group, Image, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export interface TestCardProps {
  title: string;
  description: string;
  bannerSrc: string;
  buttonText: string;
  to: string;
  disabled?: boolean;
}

const TestCard: FC<TestCardProps> = ({
  title,
  description,
  bannerSrc,
  buttonText,
  to,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;
  };

  return (
    <div onClick={handleClick} style={{ position: 'relative' }}>
      {disabled && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            borderRadius: '10px',
          }}
        />
      )}
      <Link to={to}>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Card.Section>
            <Image src={bannerSrc} height={300} alt='Test Banner' />
          </Card.Section>

          <Group justify='space-between' mt='md' mb='xs'>
            <Text fw={500}>{title}</Text>
          </Group>

          <Text size='sm' c='dimmed'>
            {description}
          </Text>

          <Link to={to}>
            <Button color='blue' fullWidth mt='md' radius='md'>
              {buttonText}
            </Button>
          </Link>
        </Card>
      </Link>
    </div>
  );
};

export default TestCard;
