//@ Route pathes
export enum Paths {
    Root = '/',
    NotFound = '*',
    Test = '/test',
    //@ `/API` Authentication
    Signup = '/api/Signup',
    Login = '/api/Login',
    //@ Profile
    Account = '/api/users/:id',
    Users = '/api/users',
    //@ `/APP` Aplication
    App = '/app',
    Home = `/app/Home`,
    Settings = '/app/Settings',
};