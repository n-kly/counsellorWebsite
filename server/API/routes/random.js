// Create (OLD)
router.post('/create', (req, res) => {
    const aptDate = req.body.aptDate;
    const status = req.body.status;
    const uniName = req.body.booking.uniName;
    const uniRepName = req.body.booking.uniRepName;
    const uniRepJobTitle = req.body.booking.uniRepJobTitle;
    const uniRepEmail = req.body.booking.uniRepEmail;
    const uniRegion = req.body.booking.uniRegion;

    const newBooking = new bookingDateInfo({
        aptDate: aptDate,
        status: status,
        booking: {
            uniName,
            uniRepName,
            uniRepJobTitle,
            uniRepEmail,
            uniRegion,
        },
    });

    newBooking.save()
        .then(() => res.json('Booking created'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// Delete
router.delete('/delete/:id', (req, res) => {
    bookingDateInfo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Booking deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// Update
router.patch('/update/:id', (req, res) => {
    bookingDateInfo.findById(req.params.id)
        .then((bookingDateInfo) => {
            bookingDateInfo.booking.uniName = req.body.uniName;
            bookingDateInfo.booking.uniRepName = req.body.uniRepName;
            bookingDateInfo.booking.uniRepJobTitle = req.body.uniRepJobTitle;
            bookingDateInfo.booking.uniRepEmail = req.body.uniRepEmail;
            bookingDateInfo.booking.uniRegion = req.body.uniRegion;

            bookingDateInfo
                .save()
                .then(() => res.json('Booking updated'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});