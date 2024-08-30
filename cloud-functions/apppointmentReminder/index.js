const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

exports.sendAppointmentReminder = (req, res) => {
    const appointmentDetails = req.body;
    
    const messageBuffer = Buffer.from(JSON.stringify(appointmentDetails), 'utf8');
    
    pubsub.topic('appointment-reminders').publish(messageBuffer)
        .then(() => res.status(200).send('Reminder sent!'))
        .catch(err => res.status(500).send(err));
};
