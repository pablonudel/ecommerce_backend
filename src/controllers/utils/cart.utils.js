export const stockValidation = (cartProduct, qty, product, newCartProduct) => {
    if(cartProduct && cartProduct.qty + qty > product.stock)
        return 'Stock no disponible'
    if(newCartProduct.qty > product.stock)
        return 'Stock no disponible'
    if(newCartProduct.qty < 1)
        return 'La cantidad no puede ser menor a 1'
    if(!qty)
        return {qtyError:'El campo CANTIDAD es requerido'}
}

export const addQty = (cartProducts, index, qty)=>{
    cartProducts[index].qty += qty,
    cartProducts[index].subTotal += qty * cartProducts[index].price
}