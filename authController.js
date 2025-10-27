const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = [];

exports.signup = async (req,res) => {
  const {name,email,password} = req.body;
  if (!email || !password) return res.status(400).json({msg:'missing'});
  if (users.find(u=>u.email===email)) return res.status(400).json({msg:'exist'});
  const hash = await bcrypt.hash(password,10);
  const user = { id: users.length+1, name, email, password:hash };
  users.push(user);
  res.status(201).json({id:user.id, email:user.email});
};

exports.login = async (req,res) => {
  const {email,password} = req.body;
  const user = users.find(u=>u.email===email);
  if (!user) return res.status(401).json({msg:'invalid'});
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({msg:'invalid'});
  const token = jwt.sign({id:user.id,email:user.email}, process.env.JWT_SECRET||'secret',{expiresIn:'1h'});
  res.json({token});
};
