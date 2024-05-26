//@ Route pathes
export enum Paths {
  Root = '/',
  NotFound = '*',
  Test = '/test',
  Example = '/example',
  Dashboard = '/dashboard',
  Admin = '/admin',
  //@ `/api` Authentication
  Signup = '/signup',
  Login = '/login',
  Logout = '/logout',
  Users = '/api/users',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
  Documentation = 'https://mindharmony.ru:4000/swagger/index.html',
}

//@ Route pathes inside the application
export enum PathsDashboard {
  Main = '/dashboard/main',
  Settings = '/dashboard/settings',
  UpdatePassword = '/dashboard/update-password',
  Account = '/dashboard/account',
  Tests = '/dashboard/tests',
  MBTI = '/dashboard/tests/mbti',
  SMIL = '/dashboard/tests/smil',
  STROOP = '/dashboard/tests/stroop',
  PublicUserProfile = '/dashboard/users/:id'
}

//@ Admin Routes
export enum AdminPaths {
  Panel = '/admin/panel',
  Users = '/admin/panel/users',
  Tests = '/admin/panel/tests',
  Positions = '/admin/panel/positions',
  Departments = '/admin/panel/departments',
  CreatePosition = '/admin/panel/create-position',
  ManagePosition = '/admin/panel/manage-position',
}

//@ Tests
export enum TestsPaths {
  MBTI = '/dashboard/tests/mbti',
  SMIL = '/dashboard/tests/smil',
  STROOP = '/dashboard/tests/stroop',
  BECK = '/dashboard/tests/beck',
}