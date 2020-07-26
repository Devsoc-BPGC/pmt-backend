import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../../database/entity/User';

class Auth {
  public user: any;
  constructor(
    public req: Request,
    public res: Response,
    public next: NextFunction
  ) {
    this.user = req.user;
  }
  async signup(): Promise<any> {
    try {
      const userRepository = getRepository(Users);
      const user = await userRepository.findOne({ email: this.user.email });
      if (user) {
        this.login();
      }
      await userRepository.create(this.user);
    } catch (error) {
      throw error;
    }
  }
  async login(): Promise<any> {
    // Log in user
  }
}

export default Auth;
