import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from 'src/roles/roles.model'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/addRole.dto'
import { BanUserDto } from './dto/banUser.dto'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesRepository: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.rolesRepository.getRoleByValue('user')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: Role })
    users.forEach(async (user) => {
      user.bannes = false
      await user.save()
    })
    return users
  }

  async getUserByEmail(email: string) {
    const users = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    })
    return users
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.rolesRepository.getRoleByValue(dto.value)
    if (role && user) {
      user.$add('role', role.id)
      return dto
    }
    throw new HttpException('invalid values', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    user.bannes = dto.value
    user.banReason = dto.value ? dto.banReason : ''
    await user.save()
    return user
  }
}
