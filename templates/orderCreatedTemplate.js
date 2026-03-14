module.exports = (order, recommended) => {

let productHTML = "";
let recommendHTML = "";

order.line_items.forEach((item) => {

productHTML += `
<tr>
<td>${item.title}</td>
<td>${item.quantity}</td>
<td>$${item.price}</td>
</tr>
`;

});

recommended.forEach((p) => {

recommendHTML += `
<td style="padding:10px;text-align:center">

<img src="${p.image?.src}" width="120"/>

<p>${p.title}</p>

<a href="${p.handle}">View</a>

</td>
`;

});

return `

<html>

<body style="font-family:Arial">

<h2>Thank you for your order</h2>

<p>Order #${order.id}</p>

<h3>Order Details</h3>

<table border="1" cellpadding="10">

<tr>
<th>Product</th>
<th>Qty</th>
<th>Price</th>
</tr>

${productHTML}

</table>

<h3>You Might Also Like</h3>

<table>

<tr>

${recommendHTML}

</tr>

</table>

</body>

</html>

`;
};