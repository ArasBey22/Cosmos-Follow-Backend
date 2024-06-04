import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create_branch.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    belong_branch_id: number
    @ApiProperty({default: false})
    is_sub_branch: boolean;
}
