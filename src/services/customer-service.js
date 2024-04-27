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

    async updateCustomer(customer) {
        try {
            const customerExists = await Customer.findOne({ where: { id: customer.id } });

            if (!customerExists) {
                throw new Error("Customer not found");
            }

            await Customer.update(
                {
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email,
                },
                {
                    where: { id: customer.id }
                }
            );

            return await Customer.findOne({ where: { email: customer.email } }).then((updatedCustomer) => {
                return updatedCustomer;
            }).catch((error) => {
                throw new Error(error.message);
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async resetPassword(data) {
        try {
            const customer = await Customer.findOne({ where: { id: data.id } });

            if (!customer) {
                throw new Error("Customer not found");
            }

            const passwordMatch = await bcrypt.compare(data.currentPassword, customer.password);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            const hashedPassword = await bcrypt.hash(data.newPassword, 10);

            await Customer.update(
                {
                    password: hashedPassword
                },
                {
                    where: { id: data.id }
                }
            );

            return await Customer.findOne({where: {id: data.id}});

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CustomerService();
