const status = (request, response) => {
    response.status(200).json({
        message: "ok",
    });
};

export default status;
