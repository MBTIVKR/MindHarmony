//@ts-nocheck
import * as XLSX from 'xlsx';

export const exportToExcel = (users, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(users.map(user => ({
    "ID": user.id,
    "Username": user.auth.username,
    "Email": user.auth.email,
    "Телефон": user.personal.phone || "Отсутствует",
    "Роль": user.auth.role,
    "Имя": user.personal.name || "Отсутствует",
    "Фамилия": user.personal.surname || "Отсутствует",
    "Отчество": user.personal.patronymic || "Отсутствует",
    "Дата рождения": user.personal.birthday || "Отсутствует",
    "Должность": user.position || "Отсутствует",
    "Страна": user.location.country || "Отсутствует",
    "Город": user.location.city || "Отсутствует",
    "MBTI тип": user.mbti.type || "Отсутствует"
  })), { header: [
    "ID", "Username", "Email", "Телефон", "Роль", "Имя", "Фамилия", "Отчество", "Дата рождения",
    "Должность", "Страна", "Город", "MBTI тип"
  ]});

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
