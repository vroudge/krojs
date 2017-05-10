import prompt from 'prompt';
import colors from 'colors'
const kroSymbol = ' 🍺  ';

prompt.message = colors.green("Kro.js | ");
prompt.delimiter = kroSymbol;

export default prompt;
