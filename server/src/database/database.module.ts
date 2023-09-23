import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Part, PartSchema } from './part/part.schema';
import { PartController } from './part/part.controller';
import { PartService } from './part/part.service';
import { RejectionController } from './rejection/rejection.controller';
import { RejectionService } from './rejection/rejection.service';
import { Rejection, RejectionSchema } from './rejection/rejection.schema';
import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Part.name, schema: PartSchema },
        { name: Rejection.name, schema: RejectionSchema },
      ],
      process.env.DB_URL,
    ),
  ],
  controllers: [PartController, RejectionController, RecordController],
  providers: [PartService, RejectionService, RecordService],
  exports: [PartService],
})
export class DatabaseModule {}
