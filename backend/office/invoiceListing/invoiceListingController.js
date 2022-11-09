const InvoiceListing = require('./invoiceListingModel')

const getAllInvoice = async (req, res) => {
    const allInvoices = await InvoiceListing.find({});

    res.status(200).json(allInvoices);
}

module.exports = {getAllInvoice}