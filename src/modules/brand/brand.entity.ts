import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/core';
import { YN } from 'src/common';
import { SPACE_TYPE } from 'src/shared';
import { Menu } from '../menu/menu.entity';

@Entity({ name: 'BRAND' })
export class Brand extends BaseEntity<Brand> {
  @PrimaryGeneratedColumn({
    name: 'NO',
    unsigned: true,
  })
  no: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
    name: 'NAME_KR',
  })
  nameKr: string;

  @Column('varchar', {
    length: 50,
    nullable: true,
    name: 'NAME_ENG',
  })
  nameEng: string;

  @Column('varchar', {
    length: 1000,
    nullable: true,
    name: 'DESC',
  })
  desc?: string;

  @Column('int', {
    nullable: false,
    default: 0,
    name: 'SPACE_TYPE_NO',
  })
  spaceTypeNo: SPACE_TYPE;

  @Column('int', {
    nullable: false,
    name: 'ADMIN_NO',
    unsigned: true,
  })
  adminNo: number;

  @Column('int', {
    nullable: false,
    name: 'CATEGORY_NO',
    unsigned: true,
    default: 0,
  })
  categoryNo: number;

  @Column('char', {
    default: YN.YES,
    nullable: false,
    length: 1,
    name: 'SHOW_YN',
  })
  showYn: YN;

  @Column('char', {
    default: YN.NO,
    nullable: false,
    length: 1,
    name: 'DEL_YN',
  })
  delYn: YN;

  @JoinColumn({ name: 'BRAND_NO' })
  @OneToMany(
    type => Menu,
    menu => menu.brand,
  )
  menus?: Menu[];
}
