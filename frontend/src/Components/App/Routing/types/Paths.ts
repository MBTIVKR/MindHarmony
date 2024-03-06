//@ Route pathes
export enum Paths {
  Root = '/',
  NotFound = '*',
  Test = '/test',
  Example = '/example',
  Dashbord = '/dashbord',
  //@ `/api` Authentication
  Signup = '/signup',
  Login = '/login',
  Logout = '/logout',
  Users = '/api/users',
}

//@ Route pathes inside the application
export enum PathsDashboard {
  Main = '/dashbord/main',
  Settings = '/dashbord/settings',
  Account = '/dashbord/account',
}
