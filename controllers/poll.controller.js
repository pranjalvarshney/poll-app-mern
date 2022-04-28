const Option = require("../models/Option");
const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
  const { topic, options } = req.body;
  console.log(topic, options);
  const newPoll = Poll({ topic });
  await newPoll.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
    options.map((option) => {
      Option({
        name: option.name,
        pollId: result._id,
      }).save((err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json("Server Error");
        }
        console.log(result);
      });
    });
    res.status(200).json("Success");
  });
};

exports.viewPoll = async (req, res) => {
  const { id } = req.params;

  try {
    const options = await Option.find({ pollId: id }).lean(true);
    const poll = await Poll.findById({ _id: id }).lean(true);

    let temp = options.map((option) => option.count);
    let totalVotes = temp.reduce(function (a, b) {
      return a + b;
    }, 0);

    res.status(200).json({
      poll: poll,
      options: options,
      totalVotes,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.allPolls = async (req, res) => {
  try {
    const polls = await Poll.find().lean(true);
    res.status(200).json({
      polls,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.markPoll = async (req, res) => {
  const { optionId } = req.body;

  Option.findOneAndUpdate(
    { _id: optionId },
    { $inc: { count: 1 } },
    { new: true },
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("Server Error");
      }
      const options = await Option.find({ pollId: result.pollId }).lean(true);
      const poll = await Poll.findById({ _id: result.pollId }).lean(true);

      let temp = options.map((option) => option.count);
      let totalVotes = temp.reduce(function (a, b) {
        return a + b;
      }, 0);

      const data = options.map((option) => {
        return {
          ...option,
          percent: ((option.count * 100) / totalVotes).toFixed(2),
        };
      });

      res.status(200).json({
        poll: poll,
        options: data,
        totalVotes,
      });
    }
  );
};
