const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true}));
const stripe = require("stripe")("sk_test_51OCSV1Lanh9VNkIVL8OS7lu9Mf6CzcgaY1ybwqIdZ6xTlHLRujpEWoxe8xvGv8U1OGswXZykZZavgryvkboMBJo100dtKZ0a4t");


app.post("/checkout", async (req, res, next)=> {
    try{
        const session = await stripe.checkout.sessions.create({
            line_item: req.body.items.map((item)=>({
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.product]
                },
                unit_amount: item.price * 100
            })),
            mode: 'payment',
            succes_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html"
        });

        res.status(200).json(session);
    }catch(error){
        next(erros);
    }
});

app.listen(4242, ()=> console.log('app is running on 4242'));
