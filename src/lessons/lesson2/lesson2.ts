console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9

const sum = (a: number) => {
    return (b: number) => {
        return a + b;
    };
};

console.log(sum(3)(6));

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

const makeCounter = () => {
    let count = 0;

    return () => {
        return count += 1;
    };
};

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
const counter2 = makeCounter();
console.log(counter2()); // 1
console.log(counter()); // 3

// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

const makeCounterUpd = (initialValue: number) => {
    let count = initialValue;

    return {
        increase: () => count += 1,
        decrease: () => count -= 1,
        reset: () => count = 0,
        set: (value: number) => count = value,
    };
};

const counter3 = makeCounterUpd(1);
console.log(counter3.increase()); // 2
console.log(counter3.decrease()); // 1
console.log(counter3.reset()); // 0
console.log(counter3.set(3)); // 3
console.log(counter3.increase()); // 4

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

const superSum = (n: number) => {
    if (n === 0) return 0;
    if (n === 1) return (num: number) => num;

    let _arguments: number[] = [];

    function helper(...args: number[]) {
        _arguments = [ ..._arguments, ...args ];
        if (_arguments.length >= n) {
            _arguments.length = n;
            return _arguments.reduce((acc, number) => acc + number);
        } else {
            return helper;
        }
    }

    return helper;
};

// @ts-ignore
console.log(superSum(0)); //0
// @ts-ignore
console.log(superSum(3)(2)(5)(3)); //10
// @ts-ignore
console.log(superSum(3)(2)(5, 3)); //10
// @ts-ignore
console.log(superSum(3)(2, 5, 3)); //10
// @ts-ignore
console.log(superSum(3)(2, 5)(3)); //10
// @ts-ignore
console.log(superSum(3)(2, 5)(3, 9)); //10

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

const sumTo = (n: number): number => {
    if (n === 1) return 1;

    return n + sumTo(n - 1);
};

console.log(sumTo(5)); // 15

const factorial = (n: number): number => {
    if (n === 1) return 1;

    return n * factorial(n - 1);
};

console.log(factorial(5)); // 120

const fib = (n: number): number => {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }

    return b;
};

console.log(fib(7)); // 13

const list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

const printList = (list: any) => {
    console.log(list.value);

    if (list.next) printList(list.next);
};

printList(list);

const printReverseList = (list: any) => {
    if (list.next) printReverseList(list.next);

    console.log(list.value);
};

printReverseList(list);

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.

const deepFlat = (arr: any[]) => {
    let result: any[] = [];

    for (let i = 0; i < arr.length; i += 1) {
        if (Array.isArray(arr[i])) {
            result = result.concat(deepFlat(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }

    return result;
};

const arr = [ 1, 2, [ 3, [ 4, 5 ] ], 6 ];
const flattened = deepFlat(arr);

console.log(flattened); // [1, 2, 3, 4, 5, 6]

// just a plug


export {};