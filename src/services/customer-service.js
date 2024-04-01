const bcrypt = require("bcrypt");
const { Customer } = require("../models");

class CustomerService {
  async registerCustomer(customer) {
      const customerExists = await Customer.findOne({ where: { email: customer.email } }).then((customer) => {
            return customer;
      }).catch((error) => {
          return null;
      });

    if (customerExists) {
        throw new Error("Customer already exists");
    }

    const hashedPassword = await bcrypt.hash(customer.password, 10);

    return await Customer.create(
        {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            password: hashedPassword,
            isActivated: customer.isActivated
        }
    ).then((newCustomer) => {
        return newCustomer;
    }).catch((error) => {
        throw new Error(error.message);
    });
  }

  async loginCustomer(email, password) {
      try {
          const customer = await Customer.findOne({ where: { email: email } });

          if (!customer) {
              throw new Error("Customer not found");
          }

          const passwordMatch = await bcrypt.compare(password, customer.password);
          if (!passwordMatch) {
              throw new Error("Invalid password");
          }

          return customer.dataValues;
      } catch (error) {
          throw new Error(error.message);
      }
  }
}

module.exports = new CustomerService();
