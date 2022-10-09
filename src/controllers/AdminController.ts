import {VCService} from "../services/VCService";
import {Get, JsonController} from "routing-controllers";
import {Service} from "typedi";

/**
 * Admin Controller
 *
 * @author Yepeng Ding
 */
@JsonController('/admin')
@Service()
export class AdminController {

    constructor(
        private vcService: VCService
    ) {
    }

    /**
     * Get all VC documents.
     *
     */
    @Get('/all/vc')
    async getAllVCs() {
        return await this.vcService.findAll();
    }

}
