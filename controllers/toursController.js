const { addATourService, getAllToursServices, getAllToursService } = require("../services/tour.services");

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
            const { page = 1, limit = 3 } = req.query;
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