var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield db.migrate.rollback();
    yield db.migrate.latest();
}));
beforeEach(() => __awaiter(this, void 0, void 0, function* () {
    yield db.seed.run();
}));
afterAll((done) => __awaiter(this, void 0, void 0, function* () {
    yield db.destroy();
    done();
}));
it('sanity check', () => {
    expect(true).not.toBe(false);
});
describe('server.js', () => {
    it('is the correct testing environment', () => __awaiter(this, void 0, void 0, function* () {
        expect(process.env.NODE_ENV).toBe('testing');
    }));
});
