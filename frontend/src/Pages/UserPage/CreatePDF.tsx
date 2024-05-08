//@ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@/assets/fonts/Roboto-Medium-normal.js";

export const createPdf = (user) => {
  const doc = new jsPDF();

  doc.setFont("Roboto-Medium", "normal");

  doc.text(`Профиль пользователя: ${user?.auth?.username}`, 14, 16);

  const bodyContent = [
    ["Имя пользователя", user?.auth?.username || "Нет данных"],
    ["Email", user?.auth?.email || "Нет данных"],
    ["Роль", user?.auth?.role || "Нет данных"],
    ["Имя", user?.personal?.name || "Нет данных"],
    ["Фамилия", user?.personal?.surname || "Нет данных"],
    ["Телефон", user?.personal?.phone || "Нет данных"],
    ["Должность", user?.position || "Нет данных"],
    ["Страна", user?.location?.country || "Нет данных"],
    ["Город", user?.location?.city || "Нет данных"],
    ["Тип MBTI", user?.mbti?.type || "Отсутствует"],
    // Заголовок для теста Струпа
    [{content: 'Тест Струпа', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [211, 211, 211] }}],
    ["Кол-во правильных ответов", user?.stroop?.correct || "Отсутствует"],
    ["Кол-во неправильных ответов", user?.stroop?.incorrect || "Отсутствует"],
    // Заголовок для теста СМИЛ
    [{content: 'Тест СМИЛ', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [211, 211, 211] }}],

  ];
  
  doc.text("Последний результат теста Бека:", 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Общий балл: ${beckResult.totalScore}`, 14, doc.lastAutoTable.finalY + 20);
  beckResult.answers.forEach((answer, index) => {
    doc.text(`Вопрос ${index + 1}: ${answer.text} (Баллы: ${answer.score})`, 14, doc.lastAutoTable.finalY + 30 + (index * 10));
  });

  if (user?.smil?.url) {
    bodyContent.push(["Результат", user.smil.url]);
  } else {
    bodyContent.push(["Результат", "Не пройден"]);
  }

  doc.autoTable({
    head: [["Поле", "Значение"]],
    body: bodyContent,
    startY: 22,
    styles: { font: "Roboto-Medium" },
  });

  doc.save(`Профиль-${user?.auth?.username}.pdf`);
};
