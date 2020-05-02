const ChargesModel = require('../models/charge');
const Categories = require('./categories');
const UserModel = require('../models/user');

class Charge {
    async getAll(type, from) {
       const charges = await new ChargesModel().getAll(type, { startFrom: from });
       const totalBalance = await new ChargesModel().getTotalBalance();
       const result = charges.map(async(el) => {
           const category = await new Categories().getById(el.categoryId);
           const user = await new UserModel().getById(el.userId);
           delete el.categoryId;
           delete el.userId;
           return {
            ...el,
            category,
            user
           }
       });
       return {
         data: await Promise.all(result),
         count: result.length,
         totalBalance
       }
    }

    async getById(id) {
        try {
            const charge = await new ChargesModel().getById(id);
            const category = await new Categories().getById(charge.categoryId);
            const user = await new UserModel().getById(charge.userId);

            delete charge.categoryId;
            delete charge.userId;
            return {
                ...charge,
                category,
                user
           }
        } catch (err) {
            throw new Error(err);
        }

    }

    async create(data) {
        try {
            const { id } = await new ChargesModel().create(data);
            const totalBalance = await new ChargesModel().getTotalBalance();
            const charge = await this.getById(id);
            return {
                data: charge,
                totalBalance
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    async edit(data) {
        try {
            const result = await new ChargesModel().edit(data);
            if (!result) {
                throw new Error('Charge doesn`t exist');
            }
            const totalBalance = await new ChargesModel().getTotalBalance();
            const charge = await this.getById(result.id);
            return {
                data: charge,
                totalBalance
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    async remove(id) {
        try {
            await new ChargesModel().remove(id);
            const totalBalance = await new ChargesModel().getTotalBalance();
            return { totalBalance }
        } catch (err) {
            throw new Error(err);
        }
    }


    async getStats(fromDate) {
        const incomes = await this.getAll('income', fromDate);
        const charges = await this.getAll('charge', fromDate);
        
        const data = {
            charge: charges.data.map(el => {
                return {
                    category: el.category.name,
                    desc: el.description,
                    date: new Date(el.date).valueOf(),
                    price: el.money,
                }
            }),
            income: incomes.data.map(el => {
                return {
                    category: el.category.name,
                    desc: el.description,
                    date: new Date(el.date).valueOf(),
                    price: el.money,
                }
            }),
        };
        return data;
    }
}

module.exports = Charge;