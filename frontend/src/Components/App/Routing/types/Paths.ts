//@ Route pathes
export enum Paths {
    Root = '/',
    NotFound = '*',
    Test = '/test',
    Example = '/example',
    //@ `/API` Authentication
    Signup = '/api/signup',
    Login = '/api/login',
    Logout = '/api/logout',
    //@ Profile
    Account = '/api/users/:id',
    Users = '/api/users',
    //@ `/APP` Aplication
    App = '/app',
    Home = `/app/home`,
    Settings = '/app/settings',
};