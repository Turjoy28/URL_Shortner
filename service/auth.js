
const jwt=require('jsonwebtoken')
const secret ="*26061968*Ab"
function setUser( user) {
  
    return jwt.sign({
       _id:user._id,
       email: user.email,
       role:user.role,
    },secret)
}


function getUser(token) {
    if(!token) return null;
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser,
}