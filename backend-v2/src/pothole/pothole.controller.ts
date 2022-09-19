import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PotholeService } from './pothole.service';
import { CreatePotholeDto } from './dto/create-pothole.dto';
import { UpdatePotholeDto } from './dto/update-pothole.dto';
import { Pothole } from './pothole.entity';
import { GetPotholeFilterDto } from './dto/get-pothole-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pothole')
export class PotholeController {
  constructor(private readonly potholeService: PotholeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPothole(@Body() createPotholeDto: CreatePotholeDto): Promise<Pothole> {
    return this.potholeService.createPothole(createPotholeDto);
  }

  @Get()
  getPotholes(@Query() filterDto: GetPotholeFilterDto): Promise<Pothole[]> {
    return this.potholeService.getPotholes(filterDto);
  }

  @Get('/:id')
  getPotholeById(@Param('id') id: string): Promise<Pothole> {
    return this.potholeService.getPotholeById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updatePothole(@Param('id') id: string, @Body() updatePotholeDto: UpdatePotholeDto): Promise<Pothole> {
    return this.potholeService.updatePothole(id, updatePotholeDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePothole(@Param('id') id: string) {
    return this.potholeService.deletePothole(id);
  }
}
