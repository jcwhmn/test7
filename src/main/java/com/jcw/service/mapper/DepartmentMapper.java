package com.jcw.service.mapper;

import com.jcw.domain.*;
import com.jcw.service.dto.DepartmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "location", source = "location", qualifiedByName = "id")
    DepartmentDTO toDto(Department s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoId(Department department);
}
