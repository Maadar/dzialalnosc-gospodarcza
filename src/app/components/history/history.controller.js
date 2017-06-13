export default class History {
  constructor(model) {
    'ngInject';
    this.model = model;
  }

  $onInit() {
    console.log(this.model);
  }

   removeItem(index) {
     delete this.model.listItem[index];

     this.model.listItem = this.model.listItem.filter(val => {
       return val !== undefined;
     });
   }

   assignHistoryData(item) {
     console.log(item);
     this.model.tag = item.tag;
     this.model.name = item.name;
     this.model.street = item.street;
     this.model.houseNumber = item.houseNumber;
     this.model.postalCode = item.postalCode;
     this.model.place = item.place;

     this.error = "";
   }

   showHistory() {
     this.isVisible = !this.isVisible;
   }
}