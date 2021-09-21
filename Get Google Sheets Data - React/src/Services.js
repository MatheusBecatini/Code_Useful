import axios from "axios";

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const tsvJSON = (tsv) => {
  const lines = tsv.split("\n");
  let headers = lines.slice(0, 1)[0].split("\t");
  headers = headers.map((h) => camelize(h.toString()).replace(/\s/g, ""));
  return lines.slice(1, lines.length).map((line) => {
    const data = line.split("\t");
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
};

const buscarDados = async () => {
  const planilhaTsv = await axios.get(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vReAzjxWzrH_yvSrSTWNW_3ICILnA_6GVMfiziNvMAke6fN26lF7fxGLZuY5zU86BJP9wAafefTmVM6/pub?output=tsv"
  );

  return tsvJSON(planilhaTsv.data.toString());
};

export default buscarDados;
