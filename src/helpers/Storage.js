
const Storage = {
    set: (storage_name, el) => {
        return window.localStorage.setItem(storage_name, el);
    },

    get: (storage_name) => {
        return window.localStorage.getItem(storage_name);
    }
};

export default Storage;