export const LOGIN = (accountDetails) => {
    return {
        type: "LOGIN",
        payload: {
            data: accountDetails
        }
    }
}

export const LOGOUT = () => {
    return {
        type: "LOGOUT"
    }
}