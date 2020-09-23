const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();

});
const sequelize = new Sequelize(
  "postgres://jkdngvyp:o0h9TBf8PtqwlPVuXrHPf8Fx0GAvFctK@ruby.db.elephantsql.com:5432/jkdngvyp"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });



//

const QueueManager = sequelize.define(
  "queueManager",
  {
    // attributes
    candidate: {
      type: Sequelize.JSON,
      allowNull: false,
    },

    timeIn: {
      type: Sequelize.TIME,
      allowNull: false
    },
    room: {
      type: Sequelize.STRING,
      allowNull: false
    }
    

  },
  {
    // options
  }
);
// Note: using `force: true` will drop the table if it already exists
QueueManager.sync({ force: false }); // Now the `users` table in the database corresponds to the model definition
app.get("/", (req, res) => res.json({ message: "Hello World" }));


app.post("/queuemanager", async (req, res) => {
  try {
    const newQueueManager = new QueueManager(req.body);
    await newQueueManager.save();
    res.json({ queueManager: newQueueManager }); // Returns the new user that is created in the database
  } catch (error) {
    console.error(error);
  }
});

app.get("/sortByTime/:room", async (req, res) => {
  const room = req.params.room;
  try {
    const user = await QueueManager.findAll({
      where: {
        room: room
      },
      order: [['timeIn', 'ASC']]
    })
    res.json({ user })
  } catch(error) {
    console.error(error)
  }
  })

app.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await QueueManager.destroy({
      where: {
        id: userId
      }
    })
    res.json({user: 'Deleted'})
  } catch(error) {
    console.error(error)
  }
})

app.put("/changeRoom/:userId/:room", async (req, res) => {
  const room = req.params.room;
  const userId = req.params.userId;
  try {
    await QueueManager.update({ room: room }, {
      where: {
        id: userId
      }
    })
    res.json({user: 'Moved Rooms'})
  
  } catch(error) {
    console.error(error)
  }
})
app.get("")
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
