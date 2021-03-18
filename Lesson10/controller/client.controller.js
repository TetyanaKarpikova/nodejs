const { clientService } = require('../service');

const { errorMessageEnum, successMessageEnum } = require('../constant');

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

            res.json(successMessageEnum.CLIENT_OK);
        } catch (e) {
            next(e);
        }
    },

    getOneClientById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const client = await clientService.findOneClient(id);

            res.json(client);
        } catch (e) {
            next(e);
        }
    },

    delOneClientById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const client = await clientService.deleteOneClient(id);

            if (!client) {
                throw new Error(errorMessageEnum.CLIENT_NOT_DEL);
            }

            res.json(successMessageEnum.CLIENT_DELETE);
        } catch (e) {
            next(e);
        }
    }
};
