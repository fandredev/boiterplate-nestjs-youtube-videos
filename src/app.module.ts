import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 40,
        blockDuration: 5000, // Tempo de bloqueio que o usuário terá ao receber o erro de ManyRequests
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
