import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import tuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    // Singleton Design Pattern
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    public constructor() {
    }

    public async findTuitById(id: string):
        Promise<Tuit> {
        const tuitMongooseModel = await tuitModel
            .findById(id).populate('postedBy').exec();
        const tuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy);
        return tuit;
    }

    public async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels =
            await tuitModel.find();
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel?.postedBy);
            });
        return tuitModels;
    }

    public async findTuitsByUser(authorId: string):
        Promise<Tuit[]> {
        const tuitMongooseModels = await tuitModel
            .find({postedBy: authorId});
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel?.postedBy);
            });
        return tuitModels;
    }

    public async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await tuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy
        )
    }

    public async deleteTuit(tuitId: string): Promise<any> {
        return await tuitModel.deleteOne({_id: tuitId});
    }

    public async updateTuit(tuitId: string, tuit: any): Promise<any> {
        return tuitModel.updateOne(
            {_id: tuitId},
            {
                $set: {
                    tuit: tuit.tuit,
                    postedOn: tuit.postedOn,
                    postedBy: tuit.postedBy
                }
            })
    }
}

