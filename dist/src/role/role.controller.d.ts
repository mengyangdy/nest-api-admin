import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { DeleteRolesDto } from './dto/delete-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<{
        msg: string;
    }>;
    findAll(query: QueryRoleDto): Promise<{
        records: {
            id: number;
            name: string;
            code: string;
            description: string | null;
            status: number | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        total: number;
        current: number;
        size: number;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        msg: string;
    }>;
    removeBatch(deleteRolesDto: DeleteRolesDto): Promise<{
        message: string;
        successCount: number;
        failedCount: number;
        successIds: number[];
        failedDetails: {
            id: number;
            reason: string;
        }[];
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
}
