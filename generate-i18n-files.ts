const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Google Sheet URL
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNnQrhVvOSpk-PELqyK9fAfCN-BLLtLNtLXoPdVUO6umev49CAVA9CCyp07bhYuSNkBb-lByA0Qce-/pub?output=csv";

// Function to fetch translations from Google Sheets
async function fetchTranslations(): Promise<{
  [lang: string]: { [key: string]: string };
}> {
  const response = await axios.get(SHEET_URL);
  const csvData: string = response.data;

  // Parse CSV data
  const rows: string[][] = csvData.split("\n").map((row) => row.split(","));
  const headers: string[] =
    rows.shift()?.map((lang) => lang.trim().replace(/\r/g, "")) || []; // First row as headers
  const translations: { [lang: string]: { [key: string]: string } } = {};

  headers.slice(1).forEach((lang) => {
    const cleanedLang = lang.trim().replace(/\r/g, "");
    translations[cleanedLang] = {};
  });
  rows.forEach((row) => {
    const key = row[0];
    headers.slice(1).forEach((lang, index) => {
      translations[lang][key] = row[index + 1].trim().replace(/\r/g, "");
    });
  });
  return translations;
}

// Function to write JSON files
function writeJsonFiles(translations: {
  [lang: string]: { [key: string]: string };
}): void {
  Object.keys(translations).forEach((lang) => {
    const filePath = path.resolve(__dirname, `./locales/${lang}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify(translations[lang], null, 2),
      "utf8"
    );
  });
}

// Main function to generate i18n files
async function generateI18nFiles(): Promise<void> {
  try {
    const translations = await fetchTranslations();
    writeJsonFiles(translations);
  } catch (error) {
    console.error("Error generating i18n JSON files:", error);
  }
}

generateI18nFiles();
