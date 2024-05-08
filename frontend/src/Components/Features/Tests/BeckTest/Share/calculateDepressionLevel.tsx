//@ts-nocheck

export const calculateDepressionLevel = ({ score }: number) => {
  switch (true) {
    case score <= 13:
      return {
        label: "Минимальная или отсутствующая депрессия",
        color: "green",
      };
    case score <= 19:
      return { label: "Легкая депрессия", color: "yellow" };
    case score <= 28:
      return { label: "Умеренная депрессия", color: "orange" };
    case score >= 29:
      return { label: "Тяжелая депрессия", color: "red" };
    default:
      return { label: "Неопределенный уровень депрессии", color: "gray" };
  }
};

export const getTotalScore = (answers) => {
  return Object.values(answers).reduce((total, current) => total + current, 0);
};
