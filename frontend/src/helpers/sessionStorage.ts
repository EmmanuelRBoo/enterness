const hasItem = (key: string) => {
    const response = window.sessionStorage.getItem(key)

    if (!response) {
        return false
    }

    return true
}

const getItem = (key: string, err: unknown) => {
    if (hasItem(key) == false) {
        return err
    }

    return JSON.parse(String(window.sessionStorage.getItem(key)))
}

const setItem = (key: string, data: unknown) => window.sessionStorage.setItem(key, JSON.stringify(data))

const removeItem = (key: string) => {
    if (hasItem(key) == false) {
        return
    }

    window.sessionStorage.removeItem(key)
}

export default {
    hasItem,
    getItem,
    setItem,
    removeItem
}