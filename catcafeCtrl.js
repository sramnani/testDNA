app.controller('catcafeCtrl', function ($scope, $http) {
    $scope.changeOwned = {};
    $scope.exactChange = false;
    $scope.amountNeg = false;
    $scope.calc = false;
    
    //Function to map the object to get change in denominations
    $scope.mapChange = function (changeOwned) {
        for (var key in changeOwned) {
            switch (key) {
                case "1":
                    $scope.numberOnes = changeOwned[key];
                case "3":
                    $scope.numberThrees = changeOwned[key];
                case "7":
                    $scope.numberSevens = changeOwned[key];
                case "21":
                    $scope.numberTwentyOnes = changeOwned[key];
                case "33":
                    $scope.numberThirtyThrees = changeOwned[key];
                case "100":
                    $scope.numberHundreds = changeOwned[key];
            }

        }

    }

    //Function to calculate the change to be returned
    $scope.calculateChange = function (amountCharged, amountTendered) {
        $scope.calc = true;
        var denoms = [1, 3, 7, 21, 33, 100];
        var index = denoms.length - 1;
        var changeOwned = {};
        var change = Math.floor(amountTendered - amountCharged);
        if (change === 0) {
            $scope.exactChange = true;
            $scope.getFortune();
        }
        else if(change < 0){
            $scope.amountNeg = true;
        }
        else {
            $scope.exactChange = false;
            $scope.amountNeg = false;
            for (var i = 0; i < denoms.length; i++) {
                changeOwned[denoms[i]] = 0;
            }
            while (change >= denoms[0]) {
                if (change >= denoms[index]) {
                    change -= denoms[index];
                    changeOwned[denoms[index]] += 1;
                } else {
                    index--;
                }
            }
        }
        //Object which stores the count for each denomination
        $scope.changeOwned = changeOwned;
        $scope.mapChange(changeOwned);

    };

    //Function to get fortune message from the API.
    $scope.getFortune = function () {
        $http({
            method: 'GET',
            url: 'http://fortunecookieapi.com/v1/cookie'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.fortune = response.data[0].fortune.message;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.fortune = '';
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

});
