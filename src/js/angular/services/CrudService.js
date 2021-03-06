/**
 * @ngInject
 */

function CrudService($q, $http) {
    
    var service = {
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem
    };
    return service;

    function createAuthorizationHeader(uploadUrl, method) {
        var credentials = {
            id: 'd2b97532-e8c5-e411-8270-f0def103cfd0',
            algorithm: 'sha256',
            key: '7b76ae41-def3-e411-8030-0c8bfd2336cd'
        };
        var options = {
            credentials: credentials,
            ext: 'XRequestHeaderToProtect:secret'
        };
        var autourl = window.location.href
        var arr = autourl.split('/');
        autourl = arr[0] + '//' + arr[2];
        var header = hawk.client.header(autourl + uploadUrl, method, options);
        if (header.err != null) {
            alert(header.err);
            return null;
        }
        else
            return header;
    }

    // implementation
     function createItem(objData, url) {
        var def = $q.defer();
        console.log(objData)
        var header = createAuthorizationHeader(url,'POST');
        $http.post(url, objData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'XRequestHeaderToProtect': 'secret',
                'Authorization': header.field
            }
        })
        .success(function(data) {
            def.resolve(data);
        })
        .error(function() {
            def.reject("Failed to create item");
        });
        return def.promise;
    }
    function updateItem(objData, url) {
        var def = $q.defer();
        var header = createAuthorizationHeader(url,'POST');
        $http.post(url, objData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'XRequestHeaderToProtect': 'secret',
                'Authorization': header.field
            }
        })
        .success(function(data) {
            def.resolve(data);
        })
        .error(function() {
            def.reject("Failed to update item");
        });
        return def.promise;
    }
    function deleteItem(objData, url) {
        var def = $q.defer();
        $http.delete(url + '/' + objData.id)
            .success(function(data) {
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to delete item with id" + objData.id);
            });
            return def.promise;
    };

}