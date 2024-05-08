//@ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@/assets/fonts/Roboto-Medium-normal.js";

export const createPdf = (user, beckResult) => {
  if (!user || !user.auth) {
    console.error("User data is incomplete or undefined.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("Roboto-Medium", "normal");

  // Заголовок документа
  doc.text(`Профиль пользователя: ${user.auth.username || "Нет данных"}`, 14, 16);

  // Таблица с основными данными пользователя
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
    // Добавление разделителя для теста Струпа
    [{ content: 'Тест Струпа', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [211, 211, 211] } }],
    ["Кол-во правильных ответов", user.stroop.correct || "Отсутствует"],
    ["Кол-во неправильных ответов", user.stroop.incorrect || "Отсутствует"]
  ];

  doc.autoTable({
    head: [["Поле", "Значение"]],
    body: bodyContent,
    startY: 30,
    styles: { font: "Roboto-Medium" },
  });

  let finalY = doc.lastAutoTable.finalY || 70; // Установите начальное значение, если finalY не определен

  // Результаты теста Бека
  doc.text("Последний результат теста Бека:", 14, finalY + 10);
  doc.text(`Общий балл: ${user?.backtes?.totalScore}`, 14, finalY + 20);
  
  if (user?.baktest?.answers) {
    Object.entries(user?.baktest?.answers).forEach(([questionId, { text, score }], index) => {
      doc.text(`Вопрос ${questionId}: ${text} (Баллы: ${score})`, 14, finalY + 30 + (index * 10));
    });
  }

  // Сохранение документа
  doc.save(`Профиль-${user.auth.username}.pdf`);
};
