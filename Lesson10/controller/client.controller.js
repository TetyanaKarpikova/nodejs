const { clientService } = require('../service');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const clients = await clientService.findAll();

            res.json(clients);
        } catch (e) {
            next(e);
        }
    },

    createClient: async (req, res, next) => {
        try {
            await clientService.postClient(req.body);

            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
