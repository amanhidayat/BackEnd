const fs = require('fs')
const moment = require('moment/moment')

const expenseData = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

module.exports = {
    // Get expense list
    getAll: (req, res) => {
        res.status(200).send(expenseData)
    },

    // Get expense detail
    getById: (req, res) => {
        const result = expenseData.filter((item) => item.id == req.params.id)

        if (result.length == 1) {
            res.status(200).send(result)
        } else {
            res.status(400).send("Expense data not found")
        };
    },

    // Create new Expense data
    postExpense: (req, res) => {
        // finding the biggest id in the expenseData, and add 1 for the new data. if not present, id = 1
        const id = expenseData.length ? Math.max(...expenseData.map((item) => item.id)) + 1 : 1;

        // * defining date using npm moment
        // const date = new Date();
        // const dateFormat = moment(date).format("YYYY-MM-DD HH:mm:ss");

        const todayDate = new Date().toISOString().slice(0, 10);

        // setting id and date to the new expense data
        req.body.id = id;
        req.body.date = todayDate

        // pushing new expenseData from what has been inputted in the body
        expenseData.push(req.body)

        // updating data in the db.json, with the new ones, (Rewriting)
        fs.writeFileSync('./db.json', JSON.stringify(expenseData), 'utf-8')

        // sending response if succesful
        res.status(200).send("Posting new expense data success!")
    },

    // Edit expense data
    editById: (req, res) => {
        const id = +req.params.id;
        const dataUpdate = req.body;

        const index = expenseData.findIndex((item) => item.id == id);

        if (index >= 0) {
            expenseData[index] = { ...expenseData[index], ...dataUpdate };
            res.status(200).send(expenseData[index]);
            fs.writeFileSync('./db.json', JSON.stringify(expenseData), 'utf-8')
        } else {
            res.status(400).send("Expense data not found.")
        }

    },

    // Delete expense data
    deleteById: (req, res) => {
        // finding index corresponding to req.params.id
        const index = expenseData.findIndex((item) => item.id == req.params.id);

        if (index >= 0) {
            expenseData.splice(index, 1)
            res.status(200).send(expenseData)
            fs.writeFileSync('./db.json', JSON.stringify(expenseData), 'utf-8')
        } else {
            res.status(400).send("Expense data not found.")
        };
    },

    // Get total expense by date range
    getTotalByDate: (req, res) => {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            res.status(400).send("Date is required!")
        } else {
            const start = new Date(startDate)
            const end = new Date(endDate)

            const expenseInRange = expenseData.filter((item) => {
                const expenseDate = new Date(item.date);

                return expenseDate >= start && expenseDate <= end;
            });

            const totalExpense = expenseInRange.reduce(
                (accumulator, currentExpense) => accumulator + currentExpense.nominal,
                0
            );

            res.status(200).send({ data: expenseInRange, total: totalExpense })
        }
    },

    // Get total expense by category
    getTotalByCategory: (req, res) => {
        const { category } = req.query;
        const filteredCategory = expenseData.filter(
            (item) => item.category == category
        )

        const totalExpense = filteredCategory.reduce(
            (accumulator, currentExpense) => accumulator + currentExpense.nominal,
            0
        );

        res.status(200).send({ category: filteredCategory, total: totalExpense })
    }
}

        
        