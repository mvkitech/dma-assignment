// Note: Please observe that the code here has been setup as a class
//       and I likely would have chosen a different approach had there
//       been a database to hook this model up to. In other words I
//       would have used something like a "mongoose.Schema" instead
//       of creating a class and with the schema I would have added
//       code to make sure certain properties were setup with their
//       data types and whether or not they were required fields.

module.exports = class Account {
  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
  }
};
