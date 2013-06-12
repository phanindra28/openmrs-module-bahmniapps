'use strict';

angular.module('navigation.navigationController', ["infrastructure.configurationService"])
    .controller('NavigationController', ['$scope', '$location', '$route', 'ConfigurationService', function ($scope, $location, $route, configurationService) {
    $scope.mainButtonText = "Consultation";

    (function () {
        configurationService.init()
    })();

    $scope.blank = function () {
        return $location.url("/blank");
    }

    $scope.treatment = function () {
        return buttonClickAction("treatment", false);
    }

    $scope.investigation = function () {
        return buttonClickAction("investigation", false);
    }

    $scope.diagnosis = function () {
        return buttonClickAction("diagnosis", false);
    }

    $scope.templates = function () {
        return buttonClickAction("templates", false);
    }

    $scope.consultation = function (patient) {
        if (patient === undefined) {
            return buttonClickAction("consultation", true);
        }
        return $location.url("/patient/" + patient.uuid + "/" + "consultation");
    }

    $scope.notes = function () {
        return buttonClickAction("notes", false);
    }

    $scope.onLists = function () {
        var url = $location.url();
        if (url.search(constants.activePatientsListUrl) !== -1) {
            return true;
        }
        return false;
    }

    var buttonClickAction = function (url, isMainPage) {
        $scope.mainButtonText = isMainPage == true ? "Consultation" : "Done";
        $scope.uuid = $route.current.params.patientUuid;
        return $location.url("/patient/" + $scope.uuid + "/" + url);
    }
}]);
