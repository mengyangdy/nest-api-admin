import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';
export declare class MenuService {
    create(createMenuDto: CreateMenuDto): Promise<{
        msg: string;
    }>;
    findAll(query: QueryMenuDto): Promise<{
        records: {
            id: number;
            name: string;
            type: number;
            routeName: string | null;
            routePath: string | null;
            pathParam: string | null;
            order: number | null;
            parentId: number | null;
            iconType: number | null;
            icon: string | null;
            status: number | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        total: number;
        current: number;
        size: number;
    }>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<{
        msg: string;
    }>;
    remove(id: number): Promise<{
        msg: string;
    }>;
    removeBatch(ids: number[]): Promise<void>;
}
