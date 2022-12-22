const { addATourService, getAllToursService, getATourService, updateATourService, getTrendingToursService, getCheapestToursService } = require("../services/tour.services");

// Adding A tour Controller 
exports.addATour = async (req, res, next) => {
    try {
        const result = await addATourService(req.body);
        if (result._id) {
            res.status(200).json({
                status: 'success',
                message: 'Tour Inserted Successfully',
                data: result,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message,
        });
    }
};

// Getting All tours Controller 
exports.getAllTours = async (req, res, next) => {
    try {
        // copying the query and keep only filters without excludeFields 
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(field => delete filters[field]);

        //gt, lt, gte, lte
        // Adding $ sign in query operator by replace method 
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.page) {
            const { page = 1, limit = 4 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = limit;
        };

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = limit;
        };

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        };

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        };

        const tours = await getAllToursService(filters, queries);
        res.status(200).json({
            status: 'success',
            message: 'Tours Found',
            data: tours,
        });


    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not Found!",
            error: error.message,
        });
    }
};

// Getting A tour Controller 
exports.getATour = async (req, res, next) => {
    try {
        const tourId = req.params.id;
        const result = await getATourService(tourId);
        if (result._id) {
            res.status(200).json({
                status: 'success',
                message: 'Tour found Successfully',
                data: result,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data not found",
            error: error.message,
        });
    }
};

// Update A tour Controller 
exports.updateATour = async (req, res, next) => {
    try {
        const tourId = req.params.id;

        const isEmptyBody = Object.keys(req.body).length === 0;
        if (isEmptyBody) {
            res.send({ message: "Blank data not acceptable" });
            return;
        };

        const result = await updateATourService(tourId, req.body);
        if (result._id) {
            res.status(200).json({
                status: 'success',
                message: 'Tour update Successfully',
                data: result,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't update the tour",
            error: error.message,
        });
    }
};

// Get Top 3 viewed tours 
exports.getTrendingTours = async (req, res, next) => {
    try {
        const result = await getTrendingToursService();
        if (result) {
            res.status(200).json({
                status: 'success',
                message: 'Top 3 tour found successfully by views',
                data: result,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data not found",
            error: error.message,
        });
    }
};


// Get Top 3 cheapest tours 
exports.getCheapestTours = async (req, res, next) => {
    try {
        const result = await getCheapestToursService();
        if (result) {
            res.status(200).json({
                status: 'success',
                message: 'Top 3 Cheapest tour found successfully',
                data: result,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data not found",
            error: error.message,
        });
    }
};