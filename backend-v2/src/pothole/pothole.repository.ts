import { InternalServerErrorException } from '@nestjs/common';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CreatePotholeDto } from './dto/create-pothole.dto';
import { GetPotholeFilterDto } from './dto/get-pothole-filter.dto';
import { Pothole } from './pothole.entity';

@CustomRepository(Pothole)
export class PotholeRepository extends Repository<Pothole> {
  async getPotholes(filterDto: GetPotholeFilterDto): Promise<Pothole[]> {
    const { severity } = filterDto;
    const query = this.createQueryBuilder('pothole');

    if (severity) {
      query.andWhere('LOWER(pothole.severity) = LOWER(:severity)', {severity: severity});
    }

    const potholes = await query.getMany();
    return potholes;
  }
  catch(e) {
    throw new InternalServerErrorException();
  }

  async createPothole(createPotholeDto: CreatePotholeDto): Promise<Pothole> {
    const { description, lat, lng, severity } = createPotholeDto;

    const pothole = this.create({
      description,
      lat,
      lng,
      severity,
    });

    await this.save(pothole);
    return pothole;
  }
}
