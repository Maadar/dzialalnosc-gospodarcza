export default class Model {

  constructor(resource, $localStorage) {
    'ngInject';
    this.resource = resource;
    this.ls = $localStorage;
    this.ls.listItem;
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
      if (data[key] === undefined) {
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
      "place": this.place
    };

    let last_element;
    let isExisting = true;
    let isUndefined = this.isItemUndefined(data);

    if (this.ls.listItem.length > 0) {
      last_element = this.ls.listItem[this.ls.listItem.length - 1];
    }
    console.log(last_element);

    angular.forEach(this.ls.listItem, (element) => {
      if (element === last_element) {
        isExisting = false;
      }
    });

    console.log(isExisting);
    console.log(isUndefined);

    if (isExisting && isUndefined) {
      this.ls.listItem.push(data);
    }
    console.log(this.ls.listItem);
  }

  setDataFromHistory() {
    let flag = true;

    angular.forEach(this.ls.listItem, (item) => {
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
}
