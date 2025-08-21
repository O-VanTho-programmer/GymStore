const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function generatePurchaseExcel(purchaseDetails, userId) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Purchase Details');

    sheet.addRow(['User ID', purchaseDetails.userId]);
    sheet.addRow(['Address', purchaseDetails.address]);

    sheet.addRow(['ProductId', 'Quantity', 'Total Price']);

    purchaseDetails.forEach((item) => {
        if (item.product_id) {
            sheet.addRow([`ID: ${item.product_id}`, `Product Name: ${item.product_name}` , `Quantity: ${item.quantity}`, `Total: ${item.total_price_per}`]);
        }
    });

    const totalPrice = purchaseDetails.find(item => item.total_price)?.total_price;
    if (totalPrice !== undefined) {
        sheet.addRow(['Total Price','','', totalPrice]);
    }

    const filePath = path.join(__dirname, `purchase_${userId}_${Date.now()}.xlsx`);

    await workbook.xlsx.writeFile(filePath);

    console.log(`Purchase details saved to ${filePath}`);
    return filePath;
}

module.exports = generatePurchaseExcel;