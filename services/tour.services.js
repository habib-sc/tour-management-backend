const Tour = require("../models/Tour");

// Add A Tour Service 
exports.addATourService = async (data) => {
    const result = await Tour.create(data);
    return result;
};

// Get All Tour service 
exports.getAllToursService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const totalTours = await Tour.countDocuments();
    const pageCount = Math.ceil((totalTours / queries.limit));
    const resultCount = tours.length;
    return { totalTours, pageCount, resultCount, tours };
}