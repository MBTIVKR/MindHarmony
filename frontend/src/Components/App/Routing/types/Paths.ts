//@ Route pathes
export enum Paths {
    Root = '/',
    NotFound = '*',
    Test = '/test',
    Example = '/example',
    
    
    Dashbord = '/dashbord',


    //@ `/API` Authentication
    Signup = '/signup',
    Login = '/login',
    Logout = '/logout',
    //@ Profile
    // Account = '/api/users/:id',
    Users = '/api/users',
    //@ `/APP` Aplication
    // App = '/app',
    // Home = `/app/home`,
    // Settings = '/app/settings',
    // Account = '/app/account',
};


export enum PathsDashboard {
    Main = '/dashbord/main',
    Settings = '/dashbord/settings',
    Account = '/dashbord/account'
}