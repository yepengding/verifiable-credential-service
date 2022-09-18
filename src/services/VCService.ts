import {Service} from 'typedi';
import {VCRepository} from "../repositories/VCRepository";
import {VC} from "../models/entities/VC";

/**
 * Verifiable Credential Service
 *
 * @author Yepeng Ding
 */
@Service()
export class VCService {

    public async findAll(): Promise<VC[]> {
        return await VCRepository.find();
    }

    public async retrieve(id: number): Promise<VC | null> {
        return await VCRepository.findOneBy({id});
    }

    public async create(vc: VC): Promise<VC> {
        return await VCRepository.save(vc);
    }

}
