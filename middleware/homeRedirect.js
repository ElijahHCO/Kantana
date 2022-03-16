module.exports = () => {

for (let i = 0; i < pizza.length; i++){
    if(i > 0){
        const slicedPizza = pizza.slice(0, i)
        app.get(slicedPizza, (req, res) => {
        res.redirect(pizza)
      })
    }
    
} 
}