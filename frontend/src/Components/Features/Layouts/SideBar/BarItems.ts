import { Paths, PathsDashboard } from '@/Components/App/Routing';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';

export const BarItems = [
  { icon: IconHome2, label: 'Home', href: PathsDashboard.Main },
  { icon: IconGauge, label: 'Dashboard', href: Paths.NotFound },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: Paths.Test },
  { icon: IconCalendarStats, label: 'Releases', href: Paths.Test },
  { icon: IconUser, label: 'Account', href: PathsDashboard.Account },
  { icon: IconFingerprint, label: 'Security', href: Paths.Test },
  { icon: IconSettings, label: 'Settings', href: PathsDashboard.Settings },
];
