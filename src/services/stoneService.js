const { Stone } = require("../models/Stone");

// TODO replace with real data service according to exam description

async function getAll() {
    return Stone.find().lean();
}

async function getRecent() {
    return Stone.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
    return Stone.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Stone({
        name: data.name,
        category: data.category,
        color: data.color,
        image: data.image,
        location: data.location,
        formula: data.formula,
        description: data.description,
        owner: authorId
    });

    await record.save();

    return record;
}

async function update(id, data, userId) {
    const record = await Stone.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.owner.toString() != userId) {
        throw new Error('Access denied');
    }


    // TODO replace with real properties
    record.name = data.name,
    record.category = data.category,
    record.color = data.color,
    record.image = data.image,
    record.location = data.location,
    record.formula = data.formula,
    record.description = data.description,
    await record.save();

    return record;
}

async function deleteById(id, userId) {
    const record = await Stone.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    await Stone.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getRecent
}

