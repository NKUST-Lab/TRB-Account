
const initState = {
    signInStatus: '未登入',
    signIn: '登入',
    accountDetails: null
};

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN": {
            const accountDetails = payload.data;

            const nextState = {
                signInStatus: '已登入',
                signIn: '登出',
                accountDetails: accountDetails
            }
            return {...state, ...nextState};
        }

        case "LOGOUT": {
            const nextState = {
                signInStatus: '未登入',
                signIn: '登入',
                accountDetails: null
            }
            return {...state, ...nextState};
        }

        default: {
            return state;
        }
    }
}
export default reducer;