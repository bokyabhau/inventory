import { Controller, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { PartService } from './part.service';
import { PartDto } from './part.types';
import { Part, PartDocument } from './part.schema';

@Controller('part')
export class PartController {
  @Get()
  findAllProducts(): Promise<PartDocument[]> {
    return this.partService.getParts();
  }

  @Post()
  addPart(@Body() partDto: PartDto): Promise<PartDocument> {
    return this.partService.addPart(partDto);
  }

  @Put()
  updatePart(@Body() partDto: PartDocument): Promise<PartDocument> {
    return this.partService.editPart(partDto);
  }

  @Delete()
  deletePart(@Body() body: PartDocument): Promise<Part> {
    return this.partService.deletePart(body);
  }

  constructor(private partService: PartService) {}
}
