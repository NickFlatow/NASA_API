import request  from 'supertest'
import { mongoConnect,mongoDisconnect } from '../../../services/mongo';
import { app } from '../../../app';
import { loadPlanetsData } from '../../../models/planets.model';
import { describe, it, beforeAll,afterAll,test,expect } from 'vitest';

describe('launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    });
    afterAll(async () => {
        await mongoDisconnect();
    });
    describe('Test GET /launches', () => {

        it('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    //createa a test for post
    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028'
        }
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
        }
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'flarg'
        }

        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);

            //toMatchObject checks if the expected contains all of properties of the received object(launchDataWithoutDate) not that it is equal
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });

        it('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            });
        });

        it('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date'
            });
        });
    });
});
