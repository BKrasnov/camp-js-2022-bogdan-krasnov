import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination model dto.
   * @param mapperDto Callback of result mapper from DTO to Model.
   */
  export function fromDto<DtoModel, Model>(
    dto: PaginationDto<DtoModel>,
    mapperDto: (resultDto: DtoModel) => Model,
  ): Pagination<Model> {
    return new Pagination<Model>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(anime => mapperDto(anime)),
    });
  }
}
