import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    useMantineTheme,
  } from '@mantine/core';
  import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
  } from '@tabler/icons-react';
  import classes from './ActionsGrid.module.scss';
  
  const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
    { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
    { title: 'Transfers', icon: IconRepeat, color: 'blue' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
    { title: 'Reports', icon: IconReport, color: 'pink' },
    { title: 'Payments', icon: IconCoin, color: 'red' },
    { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
  ];
  
const ActionsGrid = () => {
    const theme = useMantineTheme();
  
    const items = mockdata.map((item) => {
      const Icon = item.icon; // Присвоение компонента переменной перед использованием
      return (
        <UnstyledButton key={item.title} className={classes.item}>
          <Icon color={theme.colors[item.color][6]} size="2rem" />
          <Text size="xs" mt={7}>
            {item.title}
          </Text>
        </UnstyledButton>
      );
    });
    
  
    return (
      <Card withBorder radius="md" className={classes.card} mt={20} mb={{base: 120, sm: 0}}>
        <Group justify="space-between">
          <Text className={classes.title}>СЕРВИСЫ</Text>
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
            + 21 other services
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    );
  }

  export default ActionsGrid