exports.upload = async (req, res, next) => {
    try {
        return res.status(200).json({
            code: 200,
            message: 'success upload file',
            data: {
                uri: `/images/${req.file.filename}`
            }
        })
    } catch (error) {
        next(error)
    }
}