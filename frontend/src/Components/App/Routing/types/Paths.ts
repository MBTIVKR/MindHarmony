//@ Route pathes
export enum Paths {
  Root = '/',
  NotFound = '*',
  Test = '/test',
  Example = '/example',
  Dashbord = '/dashbord',
  Admin = '/admin',
  //@ `/api` Authentication
  Signup = '/signup',
  Login = '/login',
  Logout = '/logout',
  Users = '/api/users',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
}

//@ Route pathes inside the application
export enum PathsDashboard {
  Main = '/dashbord/main',
  Settings = '/dashbord/settings',
  UpdatePassword = '/dashbord/update-password',
  Account = '/dashbord/account',
  Tests = '/dashbord/tests',
  MBTI = '/dashbord/tests/mbti',
  SMIL = '/dashbord/tests/smil',
  PublicUserProfile = '/dashbord/users/:id'
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
