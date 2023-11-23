var sum_to_n_a = function(n) {
  const arr = Array.from({length: n}, (_, i) => i + 1);
  return arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0)
};

var sum_to_n_b = function(n) {
  var mod = n % 2;
  var temp = n + 1;
  var couples = Math.floor(n / 2);
  return mod === 0 ? temp * couples : temp * couples + (couples + 1);
};

var sum_to_n_c = function(n) {
  if (n === 1) return 1;
  if (n > 1) return sum_to_n_c(n - 1);
};
