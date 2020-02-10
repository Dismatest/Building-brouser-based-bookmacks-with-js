function myFunc(day, ...dada) {
  dada.forEach(function(id) {
    console.log(id);
  });
}
myFunc("monday", 1, 2, 3, 4);

let car = [100, 200, 300];
[car1, car2, ...theRest] = car;
console.log(car1, car2, theRest);
