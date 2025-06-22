import {Watchlist} from "../models/watchlist.model.js";

const addCoin = async (req, res) => {
  const { data, userid } = req.body;
  const { coinId, coin, current_price, low_24h, high_24h, image, userId } =
    req.body;
  if (!data || !userid) {
    return res
      .status(400)
      .json({ message: "Coin data and User ID are required" });
  }

  try {
    const existingCoin = await Watchlist.findOne({
      coin: data.coin,
      owner: userid,
    });

    if (existingCoin) {
      return res
        .status(409)
        .json({ message: "Coin already exists in the watchlist" });
    }

    const newCoin = new Watchlist({
      ...data,
      owner: userid,
    });

    await newCoin.save();
    return res.status(200).json({ message: "Coin added successfully" });
  } catch (error) {
    console.error("Error while adding coin:", error.message);
    return res.status(500).json({ message: "Server Error", error });
  }
};

const removeCoin = async (req, res) => {
  const { data, userid } = req.body;

  if (!data || !userid) {
    return res
      .status(400)
      .json({ message: "Coin data and User ID are required" });
  }

  try {
    const coinToBeDeleted = await Watchlist.findOne({
      coin: data.coin,
      owner: userid,
    });

    if (!coinToBeDeleted) {
      return res.status(404).json({ message: "Coin not found in watchlist" });
    }

    await Watchlist.deleteOne({ _id: coinToBeDeleted._id });
    return res.status(200).json({ message: "Coin deleted successfully" });
  } catch (error) {
    console.error("Error while deleting coin:", error.message);
    return res.status(500).json({ message: "Server Error", error });
  }
};

export { addCoin, removeCoin };
