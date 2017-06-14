export default class History {
  constructor(model) {
    'ngInject';
    this.model = model;
  }

   removeItem(index) {
     delete this.model.ls.listItem[index];

     this.model.ls.listItem = this.model.ls.listItem.filter(val => {
       return val !== undefined;
     });
   }

   assignHistoryData(item) {
     this.model.tag = item.tag;
     this.model.name = item.name;
     this.model.street = item.street;
     this.model.houseNumber = item.houseNumber;
     this.model.postalCode = item.postalCode;
     this.model.place = item.place;

     this.model.error = "";
   }

   showHistory() {
     this.isVisible = !this.isVisible;
   }
}
