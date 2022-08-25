import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePotholeDto } from './dto/create-pothole.dto';
import { GetPotholeFilterDto } from './dto/get-pothole-filter.dto';
import { UpdatePotholeDto } from './dto/update-pothole.dto';
import { Pothole } from './pothole.entity';
import { PotholeRepository } from './pothole.repository';

@Injectable()
export class PotholeService {
  constructor(private potholeRepository: PotholeRepository) {}

  createPothole(createPotholeDto: CreatePotholeDto): Promise<Pothole> {
    return this.potholeRepository.createPothole(createPotholeDto);
  }

  getPotholes(filterDto: GetPotholeFilterDto): Promise<Pothole[]> {
    return this.potholeRepository.getPotholes(filterDto)
  }

  async getPotholeById(id: string): Promise<Pothole> {
    const pothole = await this.potholeRepository.findOne({
      where: {
        id,
      },
    });

    if (!pothole) {
      throw new NotFoundException(`Pothole with ID:${id} not found.`);
    }

    return pothole;
  }

  async updatePothole(
    id: string,
    updatePotholeDto: UpdatePotholeDto,
  ): Promise<Pothole> {
    const pothole = await this.getPotholeById(id);

    const { description, severity } = updatePotholeDto;

    pothole.description = description;
    pothole.severity = severity;

    await this.potholeRepository.save(pothole);

    return pothole;
  }

  async deletePothole(id: string) {
    const pothole = await this.getPotholeById(id);

    if (!pothole) {
      throw new NotFoundException(`Pothole with ID:${id} not found.`);
    }

    await this.potholeRepository.delete({
      id,
    });

    console.log('Pothole deleted.');
  }
}
