import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    return {
      userData: { email: user.email },
      token: this.generateToken(user),
    }
  }

  async signup(userDto: CreateUserDto) {
    const candidat = await this.usersService.getUserByEmail(userDto.email)
    if (candidat) {
      throw new HttpException(
        'user with this email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    })

    return {
      userData: { email: user.email },
      token: this.generateToken(user),
    }
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles }
    return this.jwtService.sign(payload)
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(loginDto.email)
    if (user) {
      const passwordEquals = await bcrypt.compare(
        loginDto.password,
        user.password,
      )
      if (passwordEquals) return user
    }
    throw new UnauthorizedException({ message: 'invalid email or password' })
  }
}
