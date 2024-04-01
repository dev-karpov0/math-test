testFunctions.set("Task1", (out, cb) => {
    let results = out.trim().split(/\s+/);
    //console.log(typeof results);
    console.log(results);

    var c1 = -1.6594594594594867;
    var c2 = 2.2972972972972987;
    if(results.length == 2)
    {
        if( Math.abs(c1 - parseFloat(results[0])) < 0.0003 && 
            Math.abs(c2 - parseFloat(results[1])) < 0.0003)
        {
            cb(`Результат верный!<br/>c1 = ${c1}<br/>c2 = ${c2}`);
            return;
        }
    }

    cb("Результат неверный!");
});


/*

import numpy as np
from scipy.linalg import solve


# Исходные данные
X = np.array([22, 19, 11, 7, 13, 20, 8, 12, 15, 23])
Y = np.array([45, 42, 23, 23, 23, 39, 19, 21, 28, 65])
n = len(X)

# Формируем список из x^2
X2 = [i**2 for i in X]

# Формируем список из xy
XY = [x*y for x, y in zip(X, Y)]

# Создаем систему из коэффициентов при неизвестных (в том же порядке что и системе уравнений)
A = np.array([
    [sum(X2), sum(X)],
    [sum(X), n]
])

# Создаем вектор-строку из свободных членов и превращаем его в вектор-столбец функцией reshape
B = np.array([
              sum(XY), 
              sum(Y)
              ]).reshape([2, 1])# 2 - кол-во столбцов исходного вектора, 1 - кол-во строк исходного вектора


# функция solve найдет неизвестные
result = solve(A, B)
c0 = result[1][0]
c1 = result[0][0]
print(f"{c0} {c1}")

*/
