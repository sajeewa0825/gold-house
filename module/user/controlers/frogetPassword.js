const mongoose = require("mongoose");
const sendMail = require("../../../manager/mail")

const frogetPw = async (req, res) => {
  const { email } = req.body;
  const userModel = mongoose.model("user");

  if (!email) throw "Email is required";

  const user = await userModel.findOne({ email: email });

  if (!user) throw "Not found user";
  const resetCode = Math.floor(10000 + Math.random() * 90000);
  await userModel.findOneAndUpdate(
    {
      email: email,
    },
    {
      resetCode: resetCode,
    },
    {
      runValidators: true,
    }
  );


  await sendMail(email,"password reset code","your password reset code is "+resetCode)

  res.status(200).json({
    status: "succesfully",
    message:"password reset code send"
  });
};

module.exports = frogetPw;
