var temp = `
(defun myappend (L1 L2)
   (cond
      ; error checking
      ((not (listp L1)) (format t "cannot append, first argument is not a list~%" L1))
      ((not (listp L2)) (format t "cannot append, second argument is not a list~%" L2))
      ; base cases
      ((null L1) L2)
      ((null L2) L1)
      ; general case, neither list is empty
      (t (cons (car L1) (myappend (cdr L1) L2)))))
`;
var opens = (temp.match(/\(/g) || []).length;
var closes = (temp.match(/\)/g) || []).length;

if (opens === closes) {
    console.log('Valid');
} else {
    console.log('Invalid');
}