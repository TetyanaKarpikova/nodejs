module.exports = {
    commonSearch: (query) => {
        const { limit = 12, page = 1, sortBy = 'createdAt', order = 'asc', ...filters } = query;
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters); // отримаємо масив ключів
        const filterObject = {};
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        return {
            filterObject,
            filters,
            keys,
            sort,
            skip,
            limit,
            page
        };
    }
};
