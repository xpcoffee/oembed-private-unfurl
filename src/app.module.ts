import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { LoginController } from './login.controller';
import { FooController } from './foo.controller';
import { SignupController } from './signup.controller';

@Module({
  imports: [],
  controllers: [
    BoardController,
    LoginController,
    FooController,
    SignupController,
  ],
  providers: [],
})
export class AppModule {}
