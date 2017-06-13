 export default class Check {

   /**
    * @param {resource} resource
   */

   constructor(resource) {
     "ngInject";
     this.resource = resource;
   }

   $onInit() {
     this.listItem = [];
     this.error = "";
   }

   displayResult() {
     if (this.listItem.length > 0) {
       this.setDataFromHistory();
     } else {
       this.fetchData();
     }
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

     if (flag === true) {
       this.fetchData();
       console.log("fecz");
     }
   }

   reset() {
     this.tag ="";
     this.name = "";
     this.street = "";
     this.houseNumber = "";
     this.postalCode = "";
     this.place = "";

     this.error = "";
   }

   addToHistory() {
     let key;
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
     let isValueUndefined = true;

     for (key in data) {
       if (data[key] === undefined) {
         isValueUndefined = false;
       }
     }

     if (this.listItem.length > 0) {
       last_element = this.listItem[this.listItem.length - 1];
     }

      angular.forEach(this.listItem, (element) => {
        if (element === last_element) {
          isExisting = false;
        }
      });

      if (isExisting && isValueUndefined) {
        this.listItem.push(data);
      }

     console.log(this.listItem);
   }

    removeItem(index) {
      delete this.listItem[index];

      this.listItem = this.listItem.filter(val => {
        return val !== undefined;
      });
    }

    assignHistoryData(item) {
      console.log(item);
      this.tag = item.tag;
      this.name = item.name;
      this.street = item.street;
      this.houseNumber = item.houseNumber;
      this.postalCode = item.postalCode;
      this.place = item.place;

      this.error = "";
    }

    showHistory() {
      this.isVisible = !this.isVisible;
    }
 }
