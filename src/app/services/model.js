import moment from 'moment';
export default class Model {

  constructor(resource, $localStorage) {
    'ngInject';
    this.resource = resource;
    this.ls = $localStorage;
    this.ls.listItem;
    console.log(this.autoDelete());
  }

  fetchData() {
    console.log("from resource");
    this.error = "";
    let resource = this.resource.getResourceData(this.tag);

    resource.then(data => {
      this.name = data.CompanyInformation.Name;
      this.street = data.CompanyInformation.Street;
      this.houseNumber = data.CompanyInformation.HouseNumber;
      this.postalCode = data.CompanyInformation.PostalCode;
      this.place = data.CompanyInformation.Place;
      this.timeOf = moment().valueOf();
    })
    .catch(() => {
       this.error = "Nie znaleziono danych!";
       this.name = "";
       this.street = "";
       this.houseNumber = "";
       this.postalCode = "";
       this.place = "";
    });
  }

  isItemUndefined(data) {
    for (let key in data) {
      if (data[key] === undefined || data[key] === "") {
        return false;
      }
    }
    return true;
  }

  addToHistory() {
    let data = {
      "tag": this.tag,
      "name": this.name,
      "street": this.street,
      "houseNumber": this.houseNumber,
      "postalCode": this.postalCode,
      "place": this.place,
      "timeOf": moment().valueOf()
    };

    let last_element;
    let isUndefined = this.isItemUndefined(data);
    let isExist = true;

    angular.forEach(this.ls.listItem, item => {
      if (item.tag == data.tag) {
        isExist = false;
      }
    });

    if (isUndefined && isExist) {
      this.ls.listItem.push(data);
    }
    console.log(this.ls.listItem);
  }

  setDataFromHistory() {
    let flag = true;

    angular.forEach(this.ls.listItem, item => {
      if (item.tag === this.tag) {
        flag = false;
        this.name = item.name;
        this.street = item.street;
        this.houseNumber = item.houseNumber;
        this.postalCode = item.postalCode;
        this.place = item.place;
        console.log("from history");
      }
    });
    if (flag === true) {
      this.fetchData();
      console.log("fecz");
    }
  }

  autoDelete() {
    for (let key in this.ls.listItem) {
      //86400000 ms = doba
      if (this.ls.listItem[key].timeOf + 86400000 <= moment().valueOf() && this.ls.listItem[key].timeOf !== undefined) {
        delete this.ls.listItem[key];
      }

      this.ls.listItem = this.ls.listItem.filter(val => {
        return val !== undefined;
      });
      console.log(this.ls.listItem);
    }
  }

}
