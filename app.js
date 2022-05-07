const express = require('express');
//const mongoose = require('mongoose');
const mongo = require("mongodb").MongoClient
const app = express();
/*mongoose.connect('mongodb+srv://salmatek:nodecourse123@cluster0.w1q3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => {console.log('Connexion à MongoDB réussie !')
  bd = client.db("tripcost")
    trips = db.collection("trips")
    expenses = db.collection("expenses")})
  .catch(() => console.log('Connexion à MongoDB échouée !')); */
app.use(express.json())
mongo.connect('mongodb+srv://salmatek:nodecourse123@cluster0.w1q3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("tripcost")
      trips = db.collection("trips")
    }
  )
app.post("/trip", (req, res) => {
    const name = req.body.name
    trips.insertOne({ name: name }, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      console.log(result)
      res.status(200).json({ ok: true })
    })
  })

  app.get("/trips", (req, res) => {
    trips.find().toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ trips: items })
    })
  })

app.listen(3000, () => console.log("Server ready"))

