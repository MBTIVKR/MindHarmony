//@ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@/assets/fonts/Roboto-Medium-normal.js";

export const createPdf = (user) => {
  if (!user || !user.auth || !user.backtest) {
    console.error("User data or test results are incomplete or undefined.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("Roboto-Medium", "normal");
  doc.text(
    `Профиль пользователя: ${user.auth.username || "Нет данных"}`,
    14,
    16
  );

  const bodyContent = [
    ["Имя пользователя", user.auth.username || "Нет данных"],
    ["Email", user.auth.email || "Нет данных"],
    ["Роль", user.auth.role || "Нет данных"],
    ["Имя", user.personal.name || "Нет данных"],
    ["Фамилия", user.personal.surname || "Нет данных"],
    ["Телефон", user.personal.phone || "Нет данных"],
    ["Должность", user.position || "Нет данных"],
    ["Страна", user.location.country || "Нет данных"],
    ["Город", user.location.city || "Нет данных"],
    ["Тип MBTI", user.mbti.type || "Отсутствует"],
    [
      {
        content: "Тест Струпа",
        colSpan: 2,
        styles: { fontStyle: "bold", fillColor: [211, 211, 211] },
      },
    ],
    ["Кол-во правильных ответов", user.stroop.correct || "Отсутствует"],
    ["Кол-во неправильных ответов", user.stroop.incorrect || "Отсутствует"],
  ];

  doc.autoTable({
    head: [["Поле", "Значение"]],
    body: bodyContent,
    startY: 30,
    styles: { font: "Roboto-Medium" },
  });

  let finalY = doc.lastAutoTable.finalY || 70;
  doc.text("Последний результат теста Бека:", 14, finalY + 10);

  if (user.backtest && user.backtest.answers) {
    const totalScore = user?.backtest?.totalScore;
    const depressionLevel = calculateDepressionLevel(totalScore);
    finalY += 20;

    doc.text(`Общий балл: ${totalScore}`, 14, finalY);
    doc.text("Уровень депрессии: ", 14, finalY + 10);

    // Устанавливаем цвет для текста уровня депрессии
    doc.setTextColor(depressionLevel.color);
    doc.text(depressionLevel.label, 70, finalY + 10);
    doc.setTextColor(0);

    finalY += 20;

    Object.entries(user?.backtest?.answers).forEach(
      ([questionId, { text, score }], index) => {
        const lines = doc.splitTextToSize(
          `Вопрос ${questionId}: ${text} (Баллы: ${score})`,
          180
        );
        lines.forEach((line) => {
          if (finalY > 280) {
            doc.addPage();
            finalY = 20;
          }
          doc.text(line, 14, finalY);
          finalY += 10;
        });
      }
    );
  } else {
    doc.text("Не пройден", 107, finalY + 10);
  }

  doc.save(`Профиль-${user.auth.username}.pdf`);
};

//? Функция определения уровня депрессии
const calculateDepressionLevel = (score) => {
  switch (true) {
    case score <= 13:
      return {
        label: "Минимальная или отсутствующая депрессия",
        color: "#00FF00",
      };
    case score <= 19:
      return { label: "Легкая депрессия", color: "#FFFF00" };
    case score <= 28:
      return { label: "Умеренная депрессия", color: "#FFA500" };
    case score >= 29:
      return { label: "Тяжелая депрессия", color: "#FF0000" };
    default:
      return { label: "Неопределенный уровень депрессии", color: "#808080" };
  }
};
