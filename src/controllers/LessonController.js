const Lesson = require('../models/Lesson');

module.exports = {
    async store(req, res) {
        const { title, level, role, boat } = req.body;
        const { location: url } = req.file;

        let lesson = await Lesson.findOne({ title });

        if(lesson) {
            return res.status(409).send({
                menssagem: `Já existe uma aula com este título`
            });
        }
        
        lesson = await Lesson.create({ title, level, role, boat, url });
        return res.status(201).send({
            menssagem: `Aula cadastrada com sucesso`,
            lesson: lesson
        });
    },
    async show(req, res) {
       const lessons = await Lesson.find();
       return res.status(200).send(lessons);
    }
};