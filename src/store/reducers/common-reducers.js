const initialState = {
}

export default function (state = initialState, action) {

    switch (action.type) {
        case "": {
            return {}
        }
        default:
            return state
    }
}