let urls = [];

export const saveUrl = url => {
    urls.push(url);
};

export const getAllUrls = () => {
    return urls;
};

export const deleteUrls = () => {
    urls = [];
};
