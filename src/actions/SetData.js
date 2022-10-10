
export const SetData = (data) => {
    return {
        type: "setData",
        payload: {
            data
        }
    }
}

export const RESET_DATA = () => {
    return {
        type: "RESET_DATA"
    }
}