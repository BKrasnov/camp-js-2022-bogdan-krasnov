/**
 * Mapper of DTO to domain model.
 */
export interface IMapperFromDto<TDto, TDomain> {

  /**
   * Maps from DTO to Domain model.
   */
  fromDto(data: TDto): TDomain;
}

/**
 * Mapper of domain model to DTO.
 */
export interface IMapperToDto<TDto, TDomain> {

  /**
   * Maps from Domain to DTO model.
   */
  toDto(data: TDomain): TDto;
}

/**
 * Mapper from DTO to Domain model and vice versa.
 */
export interface IMapper<TDto, TDomain>
  extends IMapperFromDto<TDto, TDomain>,
  IMapperToDto<TDto, TDomain> {}
