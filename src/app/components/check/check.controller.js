 export default class Check {

   constructor(resource, model) {
     "ngInject";
     this.resource = resource;
     this.model = model;
   }

   showItem() {
     if (this.model.ls.listItem === undefined) {
       this.model.ls.listItem = [];
     }

     if (this.model.ls.listItem.length > 0) {
       this.model.setDataFromHistory();
     } else {
       this.model.fetchData();
     }
   }

   reset() {
     this.model.tag ="";
     this.model.name = "";
     this.model.street = "";
     this.model.houseNumber = "";
     this.model.postalCode = "";
     this.model.place = "";

     this.model.error = "";
   }
 }
