export default class Resource {
  constructor($http) {
  	this._$http = $http;
  }

  getResourceData(tag) {

    let request = {
      url: `http://ihaveanidea.aveneo.pl/NIPAPI/api/Company?CompanyId=${tag}`,
      dataType: 'json',
      method: 'GET'
    };
    return this._$http(request).then(r => r.data);
  }
}
