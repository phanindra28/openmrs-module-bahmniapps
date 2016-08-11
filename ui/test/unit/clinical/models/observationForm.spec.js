'use strict';

describe("ObservationForm", function () {
    var ObservationForm = Bahmni.ObservationForm;

    describe('init', function () {
        it("should have isOpen set to false", function () {
            var observationForm = new ObservationForm('uuid', 'name');
            expect(observationForm.isOpen).toBe(false);
        });

        it("should have set formUuid and formName", function () {
            var observationForm = new ObservationForm('uuid', 'name');
            expect(observationForm.formName).toBe('name');
            expect(observationForm.formUuid).toBe('uuid');
        });
    });

    describe('toggleDisplay', function () {
        it("should set isOpen as true first time", function () {
            var observationForm = new ObservationForm('uuid', 'name');
            expect(observationForm.isOpen).toBe(false);
            observationForm.toggleDisplay();
            expect(observationForm.isOpen).toBe(true);
        });

        it("set isOpen as false when it was previously open", function () {
            var observationForm = new ObservationForm('uuid', 'name');
            observationForm.toggleDisplay();
            expect(observationForm.isOpen).toBe(true);
            observationForm.toggleDisplay();
            expect(observationForm.isOpen).toBe(false);
        });
    });
});
