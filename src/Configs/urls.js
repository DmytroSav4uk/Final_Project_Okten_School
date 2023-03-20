const baseURL = 'localhost:6060/api';

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
        getAllPaid: '/paid?page=1&courseFormat=online',
        createGroup: '/group?name='
    },

    permissions: {
        createPermission:'/permissions/create'
    }

}

export {baseURL, urls}