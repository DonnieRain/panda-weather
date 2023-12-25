export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : data
}

export const getBookmark = () => {
    return getLocalStorage('bookmark')
}

export const toogleBookmark = (data) => {
    const bookmark = getBookmark()
    if (!bookmark) {
        setLocalStorage('bookmark', [data])
        return
    }

    const cardIndex = bookmark.findIndex((item) => item.id === data.id)
    if (cardIndex >= 0) {
        const newData = bookmark.filter((item) => item.id !== data.id)
        setLocalStorage('bookmark', newData)
    } else {
        setLocalStorage('bookmark', [...bookmark, data])
    }
}

export const handleClickOutside = (event, elem) => {
    if (elem && !elem.contains(event.target)) {
      console.log('Clicked outside!');
    }
};



