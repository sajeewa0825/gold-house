const db = require('../../../model/mysql/index');
const Ads = db.ads;

const ads = async (req, res) => {
    const {
        videoUrl
    } = req.body;

    console.log("run")
    console.log('req.body', req.body);
    console.log('req.files', req.files);
    const images = req.files.map(file => {
        return {
            url: '/uploads/' + file.filename 
        };
    });


    try {
        const media = await Ads.create({
            videoUrl,
            images: JSON.stringify(images),
        });

        res.status(201).json(media);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = ads;
