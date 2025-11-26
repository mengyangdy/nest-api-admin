import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
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
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<{
        msg: string;
    }>;
    remove(id: string): Promise<{
        msg: string;
    }>;
}
