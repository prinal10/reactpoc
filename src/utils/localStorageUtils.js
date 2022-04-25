export const setDataWithExpiry = (key, value, ttl) => {
    return setDataInLocalStorage(key, value, ttl);
};

export const setDataWithoutExpiry = (key, value) => {
    return setDataInLocalStorage(key, value);
};

const setDataInLocalStorage = (key, value, ttl = null) => {
    const item = {
        value: value,
        ...ttl && {expiry: new Date().getTime() + ttl},
    };
    localStorage.setItem(key, JSON.stringify(item));
    return value;
};

export const getDataFromLocalStorage = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    if (item.expiry && new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}