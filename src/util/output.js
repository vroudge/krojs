import colors from 'colors';

export default (output, isError = false) => {
    let selectedColor = !isError ? colors.green : colors.red;
    const kroSymbol = ' 🍺  ';
    console.log(`${selectedColor("Kro.js | ")}${kroSymbol}${output}${kroSymbol}`);
};
