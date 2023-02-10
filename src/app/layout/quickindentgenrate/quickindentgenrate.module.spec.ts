import { QuickindentgenrateModule } from './quickindentgenrate.module';

describe('QuickindentgenrateModule', () => {
    let quickindentgenrateModule: QuickindentgenrateModule;

    beforeEach(() => {
        quickindentgenrateModule = new QuickindentgenrateModule();
    });

    it('should create an instance', () => {
        expect(quickindentgenrateModule).toBeTruthy();
    });
});