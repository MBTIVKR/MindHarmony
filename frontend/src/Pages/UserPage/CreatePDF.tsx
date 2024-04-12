//@ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@/assets/fonts/Roboto-ThinItalic-normal.js";

export const createPdf = (user) => {
  const doc = new jsPDF();

  doc.setFont("Roboto-ThinItalic", "normal");

  doc.text(`Профиль пользователя: ${user?.auth?.username}`, 14, 16);
  doc.autoTable({
    head: [["Поле", "Значение"]],
    body: [
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
    ],
    startY: 22,
    styles: { font: "Roboto-ThinItalic" },
  });

  doc.save(`Профиль-${user?.auth?.username}.pdf`);
};