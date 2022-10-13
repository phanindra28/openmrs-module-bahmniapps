'use strict';

describe("dateToAge Filter", function () {    
    var dateToAgeFilter;
    
    beforeEach(module('bahmni.common.patient'));
    beforeEach(inject(function($filter) {
      dateToAgeFilter = $filter('dateToAge');
    }));

    it("should return years when age is more than a year w.r.t reference date", function() {
      expect(dateToAgeFilter('2013-09-01', '2014-10-01')).toBe('1 year');
      expect(dateToAgeFilter('2012-09-01', '2014-11-11')).toBe('2 years');
      expect(dateToAgeFilter('2012-09-10', '2015-09-05')).toBe('2 years');
    });

    it("should return months when age is less than a year w.r.t reference date", function() {
      expect(dateToAgeFilter('2014-09-01', '2014-10-01')).toBe('1 month');
      expect(dateToAgeFilter('2013-11-01', '2014-10-01')).toBe('11 months');
      expect(dateToAgeFilter('2012-09-10', '2013-09-05')).toBe('11 months');
    });

    it("should return days when age is less than a month w.r.t reference date", function() {
      expect(dateToAgeFilter('2014-09-30', '2014-10-01')).toBe('1 day');
      expect(dateToAgeFilter('2014-09-02', '2014-10-01')).toBe('29 days');
      expect(dateToAgeFilter('2014-02-28', '2014-03-01')).toBe('1 day');
      expect(dateToAgeFilter('2014-03-01', '2014-03-01')).toBe('0 day');
    });

    it("should age w.r.t current time when reference date is not given", function() {
      spyOn(Bahmni.Common.Util.DateUtil, 'now').and.returnValue('2014-10-01');
      
      expect(dateToAgeFilter('2014-09-30')).toBe('1 day');
      expect(dateToAgeFilter('2013-09-30')).toBe('1 year');
    });
});