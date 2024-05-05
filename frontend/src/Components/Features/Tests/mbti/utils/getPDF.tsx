//@ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const createProfilePdf = (profile) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(profile.title, 14, 20);

  doc.setFontSize(12);
  doc.text(profile.description, 14, 30);

  doc.setFontSize(14);
  doc.text("Сильные стороны:", 14, 50);
  doc.setFontSize(12);
  profile.strengths.forEach((strength, index) => {
    doc.text(`${index + 1}. ${strength}`, 20, 60 + index * 10);
  });

  doc.setFontSize(14);
  doc.text("Когнитивные функции:", 14, 100);
  doc.setFontSize(12);
  profile.cognitives.forEach((cognitive, index) => {w
    doc.text(`${index + 1}. ${cognitive.function}: ${cognitive.description}`, 20, 110 + index * 20);
  });

  doc.setFontSize(14);
  doc.text("Подходящие задачи:", 14, 230);
  doc.setFontSize(12);
  profile.suitableTasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task}`, 20, 240 + index * 10);
  });

  doc.setFontSize(14);
  doc.text("Области для развития:", 14, 290);
  doc.setFontSize(12);
  profile.improvementAreas.forEach((area, index) => {
    doc.text(`${index + 1}. ${area}`, 20, 300 + index * 10);
  });

  doc.save(`Профиль-${profile.title}.pdf`);
};

// export const createProfilePdf = (profile) => {
//   const doc = new jsPDF();

//   // Добавляем заголовок
//   doc.setFontSize(18);
//   doc.text(profile.title, 14, 20);

//   // Добавляем описание
//   doc.setFontSize(12);
//   doc.text(profile.description, 14, 30);

//   // Добавляем сильные стороны
//   doc.setFontSize(14);
//   doc.text("Сильные стороны:", 14, 50);
//   doc.setFontSize(12);
//   profile.strengths.forEach((strength, index) => {
//     doc.text(`${index + 1}. ${strength}`, 20, 60 + index * 10);
//   });

//   // Добавляем когнитивные функции
//   doc.setFontSize(14);
//   doc.text("Когнитивные функции:", 14, 100);
//   doc.setFontSize(12);
//   profile.cognitives.forEach((cognitive, index) => {
//     doc.text(`${index + 1}. ${cognitive.function}: ${cognitive.description}`, 20, 110 + index * 20);
//   });

//   // Добавляем подходящие задачи
//   doc.setFontSize(14);
//   doc.text("Подходящие задачи:", 14, 230);
//   doc.setFontSize(12);
//   profile.suitableTasks.forEach((task, index) => {
//     doc.text(`${index + 1}. ${task}`, 20, 240 + index * 10);
//   });

//   // Добавляем области для развития
//   doc.setFontSize(14);
//   doc.text("Области для развития:", 14, 290);
//   doc.setFontSize(12);
//   profile.improvementAreas.forEach((area, index) => {
//     doc.text(`${index + 1}. ${area}`, 20, 300 + index * 10);
//   });

//   // Сохраняем PDF
//   doc.save(`Профиль-${profile.title}.pdf`);
// };
