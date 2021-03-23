const { clientService } = require('../service');

const { errorMessageEnum, successMessageEnum } = require('../constant');
const { transactionInstance } = require('../dataBase').getInstance();

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
        const transaction = await transactionInstance();
        try {
            await clientService.postClient(req.body, transaction);

            await transaction.commit();

            res.status(201).json(successMessageEnum.CLIENT_OK);
        } catch (e) {
            await transaction.rollback();
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
        const transaction = await transactionInstance();
        try {
            const { id } = req.params;

            const client = await clientService.deleteOneClient(id, transaction);

            if (!client) {
                throw new Error(errorMessageEnum.CLIENT_NOT_DEL);
            }

            await transaction.commit();

            res.status(204).json(successMessageEnum.CLIENT_DELETE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateClient: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { id } = req.params;

            const client = await clientService.changeClient(id, req.body, transaction);

            if (!client[1]) {
                throw new Error(errorMessageEnum.CLIENT_NOT_FOUND);
            }

            await transaction.commit();

            res.status(201).json(successMessageEnum.CLIENT_UPDATE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
