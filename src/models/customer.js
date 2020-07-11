// Note: Please observe that the code here has been setup as a class
//       and I likely would have chosen a different approach had there
//       been a database to hook this model up to. In other words I
//       would have used something like a "mongoose.Schema" instead
//       of creating a class and with the schema I would have added
//       code to make sure certain properties were setup with their
//       data types and whether or not they were required fields.
//
//       Please also observe that while I do support allowing each
//       Customer to have a collection of Accounts they may be 
//       associated with, I am purposely capping their ability to
//       be assigned as a joint Account holder to only one instance.

module.exports = class Customer {
  constructor(id, name, email, accounts) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.accounts = accounts;
  }
};
