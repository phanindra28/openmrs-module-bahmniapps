'use strict';

describe('visitService', function () {
    var offlineDbService, visitService;
    var $q = Q;

    beforeEach(function () {
        module('bahmni.common.domain');
        module('bahmni.common.offline');
        module(function ($provide) {
            offlineDbService = jasmine.createSpyObj('offlineDbService', ['getVisitDetailsByPatientUuid', 'getVisitByUuid']);
            $provide.value('$q', $q);
            $provide.value('offlineDbService', offlineDbService);
        });
    });

    beforeEach(inject(['visitService','offlineDbService', function (visitServiceInjected,offlineDbServiceInjected) {
        visitService = visitServiceInjected;
        offlineDbService = offlineDbServiceInjected;
    }]));

    it('should fetch visits for a given patient UUID', function (done) {
        offlineDbService.getVisitDetailsByPatientUuid.and.returnValue(specUtil.respondWithPromise($q, [
            {uuid: 1},
            {uuid: 2},
            {uuid: 3}
        ]));

        visitService.search({patient: "patientUuid"}).then(function (results) {
            expect(results.data.results.length).toBe(3);
            done();
        });
    });

    it('should fetch a visit for a given visit UUID when visitType is defined', function (done) {
        var visitData = {
            visitJson: {
                uuid: "test",
                visitType: {
                    display: "test_type"
                }
            }
        };

        offlineDbService.getVisitByUuid.and.returnValue(specUtil.respondWithPromise($q, visitData));

        visitService.getVisitSummary("test").then(function (result) {
            expect(offlineDbService.getVisitByUuid).toHaveBeenCalledWith("test");
            expect(result.data.uuid).toBe("test");
            expect(result.data.visitType).toBe("test_type");
            done();
        });
    });

    it('should fetch a visit for a given visit UUID when visitType is not defined', function (done) {
        var visitData = {
            visitJson: {
                uuid: "test"
            }
        };

        offlineDbService.getVisitByUuid.and.returnValue(specUtil.respondWithPromise($q, visitData));

        visitService.getVisitSummary("test").then(function (result) {
            expect(offlineDbService.getVisitByUuid).toHaveBeenCalledWith("test");
            expect(result.data.uuid).toBe("test");
            expect(result.data.visitType).toBeUndefined();
            done();
        });
    });
});
