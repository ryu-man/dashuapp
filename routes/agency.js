const router = require('express').Router()
const authService = require('../service/auth_service')
const Agency = require('../model/agency')

// Route protection, user must be authorized to access this route
router.use(authService)

// Retrieve the list of Agencies
router.get('/agency', (req, res) => {
    // Retrieve agencies list
    // Sorted createdAt ascendant
    Agency.find({}, null, { sort: { createdAt: 1 } }, (err, docs) => {
        if (err) {
            res.statusCode = 403
            res.send()
        }
        // Send the list to the client
        res.send(docs)
    })
})

// Add new Agency
router.post('/agency', async (req, res) => {
    // Extract agency's information
    const { name, address, wilaya, commune, phone } = req.body
    // Verify required information
    if (name && address && phone) {
        // Create new agency with given information
        const agency = await Agency.create({
            name, address, wilaya, commune, phone
        })
        // send created agency to the client for ui updating purposes
        res.send(agency)
    }

    // else send bad request response
    res.statusCode = 400
    res.send()
})

// Update a given Agency
router.put('/agency/:id', async (req, res) => {
    // Retrieve agency's id
    const { id } = req.params
    // Check if the id neither undefined nor null
    if (id) {
        // Extract agency's information
        const { name, address, wilaya, commune, phone } = req.body
        // Check that there is at least only one property is not null or undefined
        if (name || address || wilaya || commune || phone) {
            // Construct object containing properties that going to be changed
            const changes = {}
            name && (changes.name = name)
            address && (changes.address = address)
            wilaya && (changes.wilaya = wilaya)
            commune && (changes.commune = commune)
            phone && (changes.phone = phone)
            // Find agency and apply update
            Agency.findByIdAndUpdate(id, changes, { new: true }, (err, doc) => {
                if (err || !doc) {
                    res.statusCode = 404
                }
                // Send the updated document to the client
                res.send(doc)
            })
        }
    } else {
        // If the id does not exist send bad request response
        res.statusCode = 400
        res.send()
    }


})
// Delete a given Agency
router.delete('/agency/:id', (req, res) => {
    // Retrieve agency's id
    const { id } = req.params
    // Check if the id neither undefined nor null
    if (id) {
        // Find the agency and delete it
        Agency.findByIdAndRemove(id, (err, doc) => {
            if (err) {
                res.statusCode = 400
                res.send()
            }
            if (!doc) {
                res.statusCode = 404
                res.send()
            }
            res.send()
        })
    } else {
        res.statusCode = 400
        res.send()
    }

})
// Capture all the other http request related to the "/ageny" roue and send theme not implemented response
router.use((req, res, next) => {
    res.statusCode = 501
    res.send()
})

// Setup "/agency" route in Express ap
module.exports = (app) => {
    app.use('/', router)
}