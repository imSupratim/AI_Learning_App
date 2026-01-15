import fs from "fs";
import pdf from "pdf-parse";

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

export default extractTextFromPDF;
