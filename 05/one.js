//Question 1

const result = (2*3) + "NorthCap" + "23" + "NorthCap" +  "21";
console.log(result);




//-----------------------------------------------------------------------------------
//Question 2
let seed  = "CS-27A"
let sum = 0
for (const char of seed) {
    if ( !isNaN(char)  ) {
        sum += parseInt(char)
    }
}


let p  = ''
if (sum % 2 == 0) {
   p = 'E'
    
}else{
   p = 'O'
    
}

let letter = ''
for (const char of seed) {
    if ( isNaN(char) && char !== 'A') {
        letter += char
    }
}
console.log(letter  + sum +  p );




//--------------------------------------------------------------------------------------------------
//Question 5
let a = 1; 
let b = 1; 
let f;     

for (let i = 3; i <= 15; i++) {
    f = a + b;  
    a = b;      
    b = f;
}

console.log("15th Fibonacci number is:", f);




//--------------------------------------------------------------------------------------------------------
//Question 3





