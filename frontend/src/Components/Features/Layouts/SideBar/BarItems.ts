import { Paths, PathsDashboard } from '@/Components/App/Routing';
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconTestPipe,
} from '@tabler/icons-react';

export const BarItems = [
  { icon: IconHome2, label: 'Главная', href: PathsDashboard.Main },
  { icon: IconTestPipe, label: 'Тестирование', href: PathsDashboard.Tests },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: Paths.Test },
  { icon: IconCalendarStats, label: 'Releases', href: Paths.Test },
  { icon: IconUser, label: 'Аккаунт', href: PathsDashboard.Account },
  { icon: IconFingerprint, label: 'Security', href: Paths.Test },
  { icon: IconSettings, label: 'Настройки', href: PathsDashboard.Settings },
];
