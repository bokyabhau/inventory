import { Controller, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { PartService } from './part.service';
import { PartDto } from './part.types';
import { Part, PartDocument } from './part.schema';

@Controller('part')
export class PartController {
  @Post()
  create(@Body() partDto: PartDto): Promise<PartDocument> {
    return this.partService.create(partDto);
  }

  @Get()
  read(): Promise<PartDocument[]> {
    return this.partService.read();
  }

  @Put()
  update(@Body() partDto: PartDocument): Promise<PartDocument> {
    return this.partService.update(partDto);
  }

  @Delete()
  delete(@Body() body: PartDocument): Promise<Part> {
    return this.partService.delete(body);
  }

  constructor(private partService: PartService) {}
}
