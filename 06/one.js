
function getUsername(user) {
  if (user && user.username) {
    const username = user.username;

    
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username);

    if (hasSpecialChar) {
      return username;
    } else {
      return "Invalid username (must contain at least one special character)";
    }
  }
  return "Guest";
}


const user1 = { username: "Vinay!" };   
const user2 = { username: "Abc123" };   
const user3 = {};                       

console.log(getUsername(user1));
console.log(getUsername(user2));

console.log(getUsername(user3));
