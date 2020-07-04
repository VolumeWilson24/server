const Boat = require('../models/Boat');

module.exports = {
    async store(req, res) {
        const { name } = req.body;
        const { location: image_url } = req.file;

        let boat = await Boat.findOne({ name });

        if(boat) {
            return res.status(409).send({
                menssagem: `Este barco já está cadastrado`
            });
        }
        
        boat = await Boat.create({ name, image_url });
        return res.status(201).send({
            menssagem: `Barco cadastrado com sucesso`,
            boat: boat
        });
    },
    async show(req, res) {
       const boats = await Boat.find();
       return res.status(200).send(boats);
    }
};