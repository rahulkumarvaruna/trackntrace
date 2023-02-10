import { IndentModule } from './indent.module';

describe('IndentModule', () => {
    let indentModule: IndentModule;

    beforeEach(() => {
        indentModule = new IndentModule();
    });

    it('should create an instance', () => {
        expect(indentModule).toBeTruthy();
    });
});
