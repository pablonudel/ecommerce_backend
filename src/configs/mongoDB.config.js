export default class MongoDBService {
  constructor(mongoose, config){
    this.connection = mongoose.connect(config.MONGO_DB.URL, {
      dbName: config.MONGO_DB.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDb');
  }
  // por si se necesitan usan otros daos

  static getInstance = () => {
    if(!this.instance){
      this.instance = new MongoDBService()
    }else{
      return this.instance
    }
  }
}