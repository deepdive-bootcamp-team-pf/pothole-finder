import { Controller, Post, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  create() {
    return this.verificationService.create();
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.verificationService.remove(+id);
  }
}
