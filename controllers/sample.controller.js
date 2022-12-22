const { sampleProductService } = require("../services/sample.services");

exports.getItemSample = async (req, res, next) => {
    try {
        const result = await sampleProductService();
        res.status(200).json({
            status: 'success',
            message: 'Data Inserted Successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Data is not inserted",
            error: error.message,
        });
    }
};