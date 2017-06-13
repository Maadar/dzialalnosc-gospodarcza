export default class Model {
  constructor(resource) {
    'ngInject';
    this.resource = resource;
    this.listItem = [];
  }

  $onInit() {
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
     //  this.saveItem();
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

  addToHistory() {
    console.log("wchodzi");
    let key;
    let data = {
      "tag": this.tag,
      "name": this.name,
      "street": this.street,
      "houseNumber": this.houseNumber,
      "postalCode": this.postalCode,
      "place": this.place
    };
    console.log(data);
    console.log(this.name);
    let last_element;
    let isExisting = true;
    let isValueUndefined = true;

    for (key in data) {
      if (data[key] === undefined) {
        isValueUndefined = false;
      }
    }

    if (this.listItem.length > 0) {
      last_element = this.listItem[this.listItem.length - 1];
      console.log(last_element);
    }

     angular.forEach(this.listItem, (element) => {
       if (element !== last_element) {
         isExisting = false;
       }
     });

     if (isExisting && isValueUndefined) {
       this.listItem.push(data);
     }
    console.log(this.listItem);
  }

setDataFromHistory() {
  let flag = true;

  angular.forEach(this.listItem, (item) => {
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
  console.log(flag);
  if (flag === true) {
    this.fetchData();
    console.log("fecz");
  }
}
}
