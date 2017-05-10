import colors from 'colors';

export default (output) => {
    const kroSymbol = ' 🍺  ';
    console.log(`${colors.green("Kro.js | ")}${kroSymbol}${output}${kroSymbol}`);
};
