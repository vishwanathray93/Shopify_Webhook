module.exports = (order) => {

let productsHTML = "";

order.line_items.forEach((item) => {

productsHTML += `
<tr>
<td style="padding:10px;border-bottom:1px solid #eee;">
${item.title}
</td>

<td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
${item.quantity}
</td>

<td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
$${item.price}
</td>
</tr>
`;

});

return `

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Order Cancelled</title>
</head>

<body style="font-family:Arial;background:#f4f4f4;padding:30px;">

<table width="600" align="center" style="background:#ffffff;padding:30px;border-radius:6px;">

<tr>
<td>

<h2 style="color:#d9534f;">Order Cancelled</h2>

<p>Hello ${order.customer?.first_name || "Customer"},</p>

<p>Your order <b>#${order.id}</b> has been cancelled.</p>

<h3>Order Details</h3>

<table width="100%" cellspacing="0">

<tr>
<th align="left">Product</th>
<th align="center">Qty</th>
<th align="right">Price</th>
</tr>

${productsHTML}

</table>

<br>

<p>If you have any questions please contact our support.</p>

<p>Thank you,<br>Store Team</p>

</td>
</tr>

</table>

</body>
</html>

`;

};