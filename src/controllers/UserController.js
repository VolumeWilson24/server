const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        const { name, email, decryptedPass, cpf, registry, role } = req.body;

        let user = await User.findOne({ registry, cpf, email });

        if(user) {
            return res.status(409).send({
                menssagem: `Este usuário já está cadastrado`
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(decryptedPass, salt);
        user = await User.create({ name, email, password, registry, cpf, role});
        return res.status(201).send({
            menssagem: `Usuario cadastrado com sucesso`,
            user: user
        });
    },

    async login(req, res) {
        const { registry, password } = req.body;

        const user = await User.findOne({ registry });

        if(!user) {
            return res.status(401).send({ menssagem: 'Usuário inválido' });
        }
        const login = bcrypt.compareSync(password, user.password);
        if(!login){
            return res.status(401).send({ menssagem: 'Senha inválida' });
        }
        return res.status(200).send({ 
            menssagem: 'sucesso',
            user: user
        })
    },

    async updatePhoto(req, res) {
        const { location } = req.file;
        const registry = req.params.reg;

        try {
        const update = await User.updateOne({ registry: registry }, { photo_url: location });
        return res.status(200).send(update);
        }catch(error) {
            return res.status(500).send({ error: error});
        }
    }
};