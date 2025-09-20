// Removes parentheses from a string
export const removeParentheses = (text: string) =>
  text.replace(/\s*\([^)]*\)/g, "");
