import { CreateRoleDto } from "./dto/create-role.dto";
import { QueryRoleDto } from "./dto/query-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
export declare class RoleService {
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
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        msg: string;
    }>;
    remove(id: number): Promise<{
        msg: string;
    }>;
    removeBatch(ids: number[]): Promise<{
        message: string;
        successCount: number;
        failedCount: number;
        successIds: number[];
        failedDetails: {
            id: number;
            reason: string;
        }[];
    }>;
}
