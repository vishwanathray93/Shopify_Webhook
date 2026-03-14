module.exports = (refund) => {

const order = refund.order;

let productHTML = "";
let totalRefund = 0;

order.line_items.forEach((item) => {

productHTML += `
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

refund.transactions?.forEach((t)=>{
if(t.kind === "refund"){
totalRefund += parseFloat(t.amount);
}
});

return `

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Refund Processed</title>
</head>

<body style="font-family:Arial;background:#f4f4f4;padding:30px;">

<table width="600" align="center" style="background:#ffffff;padding:30px;border-radius:6px;">

<tr>
<td>

<h2 style="color:#28a745;">Refund Processed</h2>

<p>Hello ${order.customer?.first_name || "Customer"},</p>

<p>Your refund for order <b>#${order.id}</b> has been processed.</p>

<h3>Refund Details</h3>

<table width="100%" cellspacing="0">

<tr>
<th align="left">Product</th>
<th align="center">Qty</th>
<th align="right">Price</th>
</tr>

${productHTML}

</table>

<br>

<p><b>Total Refunded:</b> $${totalRefund}</p>

<p>The refund may take 5-7 business days to appear in your account.</p>

<br>

<p>Thank you,<br>Store Team</p>

</td>
</tr>

</table>

</body>
</html>

`;

};