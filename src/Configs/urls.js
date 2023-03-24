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
        },

    paid: {
        getAllPaid: '/paid?page=',
        createGroup: '/group?name='
    },

    permissions: {
        createPermission:'/permissions/create'
    }

}

export {baseURL, urls}