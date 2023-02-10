import { SuggestionModule } from './suggestion.module';

describe('SuggestionModule', () => {
    let suggestionModule: SuggestionModule;

    beforeEach(() => {
        suggestionModule = new SuggestionModule();
    });

    it('should create an instance', () => {
        expect(suggestionModule).toBeTruthy();
    });
});
