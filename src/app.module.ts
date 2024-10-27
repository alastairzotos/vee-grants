import * as path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GrantsModule } from './features/grants/grants.module';
import { TenantsModule } from './features/tenants/tenants.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/provider';
import { GrantMatchModule } from './features/grant-matches/grant-match.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        outputAs: 'class',
        path: path.resolve(process.cwd(), 'src/graphql.ts'),
      },
    }),
    GrantsModule,
    TenantsModule,
    GrantMatchModule,
    SeedModule,
  ],
})
export class AppModule { }
