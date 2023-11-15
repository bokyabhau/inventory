import { Controller, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { RecordDto } from './record.types';
import { RecordService } from './record.service';
import { Record } from './record.schema';

@Controller('record')
export class RecordController {
  @Post()
  async create(@Body() recordDto: RecordDto): Promise<Record> {
    return this.recordService.create(recordDto);
  }

  @Get()
  async read(): Promise<Record[]> {
    return this.recordService.read();
  }

  @Put()
  async update() {}

  @Delete()
  async delete() {}

  constructor(private recordService: RecordService) {}
}

// const body = {
//     "part": {
//         "_id": "650d639d5a3482fa3e68a2c6",
//         "name": "scale",
//         "createdAt": "2023-09-22T09:51:25.646Z",
//         "updatedAt": "2023-09-22T09:51:25.646Z",
//         "__v": 0,
//         "id": "650d639d5a3482fa3e68a2c6"
//     },
//     "rejection": [
//   {
//     "_id": "650d817582a0539666891f49",
//     "name": "scratch",
//     "createdAt": "2023-09-22T11:58:45.168Z",
//     "updatedAt": "2023-09-22T12:15:37.478Z",
//     "__v": 0,
//     "id": "650d817582a0539666891f49"
// },
// {
//     "_id": "650d858a82a0539666891f54",
//     "name": "dent",
//     "createdAt": "2023-09-22T12:16:10.094Z",
//     "updatedAt": "2023-09-22T12:16:10.094Z",
//     "__v": 0,
//     "id": "650d858a82a0539666891f54"
// },
// {
//     "_id": "650d888682a0539666891f5b",
//     "name": "color",
//     "createdAt": "2023-09-22T12:28:54.211Z",
//     "updatedAt": "2023-09-22T12:28:54.211Z",
//     "__v": 0,
//     "id": "650d888682a0539666891f5b"
// }
// ],
//     "loadNumber": 1,
//     "numberofParts": 100,
//     "numberOfRejections": 2
// }
