const Tour = require("../models/Tour");

exports.addATourService = async (data) => {
    const result = await Tour.create(data);
    return result;
};