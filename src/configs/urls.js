const baseURL = 'http://localhost:6060/api';

const urls = {
    signUpIn:
        {
            signIn: '/auth/signin',
            signUp: '/auth/signup'
        },

    forAdmin:
        {
            getAllUsers: '/admin/users',
            userRegister:'/admin/users/reg',
            userActivate:'/admin/activate',
            recreateToken:'/admin/users/re_token',
            deleteUser:'/admin/delete'
        },

    paid: {
        getAllPaid: '/paid',
        createGroup: '/group?name='
    },

    permissions: {
        createPermission:'/permissions/create'
    }

}

export {baseURL, urls}