import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
}
