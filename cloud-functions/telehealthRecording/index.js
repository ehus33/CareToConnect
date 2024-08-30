const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.recordTelehealthSession = (req, res) => {
    const sessionId = req.body.sessionId;

    const bucketName = 'your-bucket-name';
    const fileName = `recordings/${sessionId}.txt`;

    storage.bucket(bucketName).file(fileName).save('Recording data...');

    res.status(200).send('Session recorded!');
};
