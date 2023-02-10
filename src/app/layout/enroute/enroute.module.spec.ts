import { EnrouteModule } from './enroute.module';

describe('EnrouteModule', () => {
    let enrouteModule: EnrouteModule;

    beforeEach(() => {
        enrouteModule = new EnrouteModule();
    });

    it('should create an instance', () => {
        expect(enrouteModule).toBeTruthy();
    });
});
