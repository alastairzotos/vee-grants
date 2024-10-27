import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Grant, Tenant } from 'src/graphql';
import { SeedService } from 'src/seed/seed.service';

describe('Vee app (e2e)', () => {
  let app: INestApplication;
  let tenant: Tenant;
  let openGrants: Array<{ grant: Grant }>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await app.get(SeedService).seed();
  });

  it('should get the tenants', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ tenants { id } }`
      })
      .expect(200);

    const tenants = res.body.data.tenants as Tenant[];
    tenant = tenants[0];

    expect(tenants.length).toBeGreaterThan(0);
  });

  it('should get the open grants', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
         query: `{
          tenant(id: "${tenant.id}") {
            openGrants {
              grant {
                name
                id
              }
            }
          }
         }`
      })
      .expect(200);

    openGrants = res.body.data.tenant.openGrants;

    expect(openGrants.length).toBeGreaterThan(0);
  });

  it('should accept a grant', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          respond(
            tenantId: "${tenant.id}"
            grantId: "${openGrants[0].grant.id}"
            feedback: "it's a cool grant"
            response: accepted
          ) {
            response
          }
        }`
      })
      .expect(200);

    expect(res.body.data.respond.response).toEqual("accepted");
  });

  it('should remove accepted grant from open grants and add to accepted', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
         query: `{
          tenant(id: "${tenant.id}") {
            openGrants {
              grant {
                name
                id
              }
            }
            acceptedGrants {
              grant {
                id
              }
            }
          }
         }`
      })
      .expect(200);

    const newOpenGrants = res.body.data.tenant.openGrants;
    const acceptedGrants = res.body.data.tenant.acceptedGrants;

    expect(newOpenGrants.length).toBeLessThan(openGrants.length);
    expect(acceptedGrants.length).toBeGreaterThan(0);
  })
});
