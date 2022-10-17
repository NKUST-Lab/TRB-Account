export const LOGIN = (accountDetails) => {
    return {
        type: "LOGIN",
        payload: {
            accountDetails
        }
    }
}

export const LOGOUT = () => {
    return {
        type: "LOGOUT"
    }
}