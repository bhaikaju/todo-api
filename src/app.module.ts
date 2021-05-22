import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nestjs',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [TodoModule, TypeOrmModule.forRoot(ormOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
