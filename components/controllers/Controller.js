class Controller {
    async fetchAll(model, fun) {
        const data = await model.fun()
        .then(data => data)
        .catch(err => err)

        return data
    }
    async update(model, fun) {

    }
    async delete(model, fun, arr) {

    }
    async show(model, fun, id) {

    }
}

module.exports = new Controller();