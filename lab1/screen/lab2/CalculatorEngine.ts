// src/CalculatorEngine.ts
import { evaluate } from 'mathjs';

export const calculateExpression = (expression: string): string => {
  let expr = expression;

  // Kiểm tra ngoặc
  const openBrackets = (expr.match(/\(/g) || []).length;
  const closeBrackets = (expr.match(/\)/g) || []).length;
  if (openBrackets !== closeBrackets) {
    return 'Lỗi: Thiếu ngoặc';
  }

  try {
    // Xử lý phần trăm %
    expr = expr.replace(/(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)%/g, (match, num1, _, op, num2) => {
      const percentage = `(${num1} * ${num2}/100)`;
      return `${num1} ${op} ${percentage}`;
    });
    expr = expr.replace(/(\d+(\.\d+)?)%/g, '$1/100');

    // Thay thế √
    expr = expr.replace(/√\(/g, 'sqrt(');

    // Cot(x) = 1/tan(x)
    expr = expr.replace(/cot\(/g, '1/tan(');

    // Chuyển độ → radian cho sin/cos/tan
    const trigFunctions = ['sin', 'cos', 'tan'];
    for (const func of trigFunctions) {
      const regex = new RegExp(`${func}\\(([^()]+)\\)`, 'g');
      expr = expr.replace(regex, (match, innerExpr) => {
        const innerValue = evaluate(innerExpr);
        return `${func}(${innerValue} * Math.PI / 180)`;
      });
    }

    return evaluate(expr).toString();
  } catch (error: any) {
    return 'Lỗi: ' + (error.message || 'Không xác định');
  }
};
