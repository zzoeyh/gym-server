import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  // NotFoundException,
} from '@nestjs/common';
import {
  CreateUserVenueDto,
  UserVenueWeekDto,
} from './dto/create-user-venue.dto';
import { UserVenue } from './user.venue.model';
import { UserVenueService } from './user.venue.service';

@Controller('venue/user')
export class UserVenueController {
  constructor(private readonly venueService: UserVenueService) {}

  @Post('book')
  create(
    @Body() createVenueDto: CreateUserVenueDto,
    @Req() request,
  ): Promise<UserVenue> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    // 将 createId 添加到 createVenueDto 中
    createVenueDto.createId = createId;
    return this.venueService.create(createVenueDto);
  }

  @Get()
  findAll(): Promise<UserVenue[]> {
    return this.venueService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.venueService.remove(id);
  }

  @Post('/week')
  async getUserVenueByWeek(
    @Body() userVenueWeekDto: UserVenueWeekDto,
  ): Promise<UserVenue[]> {
    return this.venueService.findUserVenuesByDateRange(userVenueWeekDto);
  }

  @Post('/cancel')
  async cancelBook(@Query('id') id: number): Promise<void> {
    console.log(id);
    return this.venueService.cancelBook(id);
  }

  @Post('/paginate')
  async getUserVenuePage(
    @Req() request,
    @Query('current') current,
    @Query('pageSize') pageSize,
  ): Promise<{ data: UserVenue[]; total: number }> {
    const user = request.user; // 从请求对象中获取用户信息，包括 createId
    const createId = user.sub; // 获取 createId
    const result = await this.venueService.paginateUserBookVenue({
      createId,
      current,
      pageSize,
    });
    return {
      data: result.data,
      total: result.total,
    };
  }
}
