const Tour = require("../models/Tour");

// Update tour View Count 
exports.tourViewCount = async (req, res, next) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findById(tourId);

        let viewCount;
        if (tour.views) {
            const views = tour.views;
            viewCount = views + 1;
        } else {
            const views = 0;
            viewCount = views + 1;
        }

        const payload = { views: viewCount };
        const result = await tour.set(payload).save();

        next();

    } catch (error) {
        console.log(error);
    }
};