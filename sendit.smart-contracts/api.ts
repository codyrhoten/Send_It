// approve() of USDC contract
// user is prompted upon creating or connecting their wallet
// approves SentIt contract to make transactions on behalf of user

// allowance() of USDC contract
// whenever focus leaves the transfer fund amount field and it's not empty
// used for checking how much more the user can have SendIt contract transfer on their behalf before needing further approval

// createOrder() of Orders contract - takes receiver address, amount, from currency, to currency
// when user taps button to send for courier after inputting receiver, amount + currencies to exchange
// creates order process

// assignCourier() of Orders contract - takes order ID and courier address
// when courier is selected by user
// assigns courier to previously created order

// completeOrder() of Orders contract - takes order ID
// when cash has been exchanged for crypto in user's wallet address
// moves order of previously created order to completed status

// cancelOrder() of Orders contract - takes order ID
// when user/courier decides they don't wish to continue with this order
// moves previously created order to canceled status