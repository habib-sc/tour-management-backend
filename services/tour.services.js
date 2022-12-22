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

// Get A Tour Service 
exports.getATourService = async (tourId) => {
    const result = await Tour.findById(tourId);
    return result;
};

// Update A Tour Service 
exports.updateATourService = async (tourId, data) => {
    const tour = await Tour.findById(tourId);
    const result = await tour.set(data).save();
    return result;
};

// get top 3 viewed tours Service 
exports.getTrendingToursService = async () => {
    const limit = 3
    const result = await Tour.find()
        .sort({ views: -1 })
        .limit(limit);

    return result;
};

// get top 3 cheapest tours Service 
exports.getCheapestToursService = async () => {
    const limit = 3
    const result = await Tour.find()
        .sort({ price: 1 })
        .limit(limit);

    return result;
};