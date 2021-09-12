import { Injectable, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

const users = [
  {
    id: 1,
    username: 'user1@user.com',
    password: '$2b$10$Q6KdIE/hvNobRl.9rh82LOaxfmc/K5b6pU9DFbkaUt.6onHrGCtNi',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '$2b$10$Q6KdIE/hvNobRl.9rh82LOaxfmc/K5b6pU9DFbkaUt.6onHrGCtNi',
    role: 'user'
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$Q6KdIE/hvNobRl.9rh82LOaxfmc/K5b6pU9DFbkaUt.6onHrGCtNi',
    role: 'user'
  }
];




@Injectable()
export class AuthService {
constructor(private jwt: JwtService){}
  @Post()
  login(username: string, password: string){
    const user = this.validateCredentials(username, password)
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    }
    return this.jwt.sign(payload);
  }

  validateCredentials(username: string, password: string){
    const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password),
    );
    if(!user){
      throw new Error('User not found')
    }
    return user;
  }

}
