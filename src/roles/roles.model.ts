import { ApiProperty } from '@nestjs/swagger'
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './user-roles.model'

interface IRoleCreationProps {
  value: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationProps> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'admin', description: 'user role' })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string

  @ApiProperty({ example: 'administrator', description: 'rele description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
