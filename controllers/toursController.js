const { addATourService } = require("../services/tour.services");

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