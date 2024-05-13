/*
* API routes for 'users' collection.
*/
const { Router } = require('express')
const router = Router()

const {
    insertNewUser,
    getUserById,
    validateCredentials
} = require('../models/user')
const { generateAuthToken, requireAuthentication } = require('../lib/auth')

router.post('/login', async function (req, res, next) {
    try {
        const authenticated = await validateCredentials(req.body.id, req.body.password)
        if (authenticated) {
            const token = generateAuthToken(req.body.id)
            res.status(200).send({
                token: token
            })
        } else {
            res.status(401).send({
                error: "Invalid authentication credentials"
            })
        }
    } catch (e) {
        next(e)
    }
})

router.post('/', async function (req, res) {
    /*
     * Note: not doing validation of request body here.  Don't do that in
     * production.
     */
    try {
        const id = await insertNewUser(req.body)
        res.status(201).send({ _id: id })
    } catch (e) {
        next(e)
    }
})

router.get('/:id', requireAuthentication, async function (req, res, next) {
    if (req.user !== req.params.id) {
        res.status(403).send({
            error: "Not authorized to access the specified resource"
        })
    } else {
        try {
            const user = await getUserById(req.params.id)
            if (user) {
                res.status(200).send(user)
            } else {
                next()
            }
        } catch (e) {
            next(e)
        }
    }
})

module.exports = router
