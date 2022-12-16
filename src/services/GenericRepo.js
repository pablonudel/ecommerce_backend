export default class GenericRepo{
    constructor(dao, model){
        this.dao = dao
        this.model = model
    }

    async getAll(params){
        return this.dao.getAll(params, this.model)
    }
    
    async getBy(params){
        return this.dao.findOne(params, this.model)
    }

    async save(data){
        return this.dao.save(data, this.model)
    }

    async update(id, data){
        return this.dao.update(id, data, this.model)
    }

    async delete(id){
        return this.dao.delete(id, this.model)
    }
}