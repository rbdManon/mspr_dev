export default abstract class LocalStorage {
    static get(key : string) {
        return JSON.parse(localStorage.getItem(key))
    }

    static set(key : string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static remove(key) {
        localStorage.removeItem(key)
    }
}