const getRandomItem = array => {
    let index = Math.floor(Math.random() * (array.length));
    let item = array[index];
    array.splice(index, 1);
    return item;
};

export default getRandomItem;
