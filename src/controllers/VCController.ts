import {Get, JsonController, Param} from 'routing-controllers';
import {Service} from "typedi";
import {Assert} from "../common/assertion/Assert";
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {HttpErrorCode} from "../common/error-handling/ErroCode";


/**
 * VC Controller
 *
 * @author Yepeng Ding
 */
@JsonController('/vc')
@Service()
export class VCController {

    constructor(
        private vcService: VCService
    ) {
    }

    /**
     * Get VC Document
     *
     * @param id
     */
    @Get('/:id')
    async getById(@Param('id') id: number) {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, HttpErrorCode.NOT_FOUND, `VC (id: ${id}) does not exist.`);
        return this.vcService.resolveVCToDoc(<VC>vc);
    }

}


