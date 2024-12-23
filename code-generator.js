function address(HyperFormulaLibrary, row, col) {
    return HyperFormulaLibrary.buildFromArray([[ ]], {licenseKey: 'gpl-v3'}).simpleCellAddressToString({  sheet: 0, col: col, row: row }, 0);
}

function getCellValue(HyperFormulaLibrary, row, col, fields) {
    return `$this->${fields.filter(field => field.commentForName == `${address(HyperFormulaLibrary, row, col)}`)[0].name}`;
}

function generateCode(HyperFormulaLibrary, ast, fields) {
    switch (ast.type) {
        case 'DIV_OP':
            return `${generateCode(HyperFormulaLibrary, ast.left, fields)} / ${generateCode(HyperFormulaLibrary, ast.right, fields)}`;
        case 'TIMES_OP':
            return `${generateCode(HyperFormulaLibrary, ast.left, fields)} * ${generateCode(HyperFormulaLibrary, ast.right, fields)}`;
        case 'PLUS_OP':
            return `${generateCode(HyperFormulaLibrary, ast.left, fields)} + ${generateCode(HyperFormulaLibrary, ast.right, fields)}`;
        case 'MINUS_OP':
            return `${generateCode(HyperFormulaLibrary, ast.left, fields)} - ${generateCode(HyperFormulaLibrary, ast.right, fields)}`;
        case 'CELL_REFERENCE':
            return getCellValue(HyperFormulaLibrary, ast.reference.row, ast.reference.col, fields); // Assumes a function getCellValue(row, col)
        case 'NUMBER':
            return ast.value.toString();
        case 'PARENTHESES':
            return `(${generateCode(HyperFormulaLibrary, ast.expression, fields)})`;
        default:
            throw new Error(`Unknown AST node type: ${ast.type}`);
    }
}

// Example usage
const ast = JSON.parse(`{
    "type": "DIV_OP",
    "left": {
        "type": "PARENTHESES",
        "expression": {
            "type": "TIMES_OP",
            "left": {
                "type": "CELL_REFERENCE",
                "reference": {
                    "col": 6,
                    "row": 1,
                    "type": "CELL_REFERENCE"
                }
            },
            "right": {
                "type": "NUMBER",
                "value": 4
            }
        }
    },
    "right": {
        "type": "NUMBER",
        "value": 1000
    }
}`);

// const jsCode = generateCode(ast);
// console.log(jsCode);


const parseFormula = (HyperFormulaLibrary, formula, fields) => {
    const node = HyperFormulaLibrary.buildFromArray([[ `${formula}` ]], {licenseKey: 'gpl-v3'}).graph.getNodes()[0];
    if (!!node && !!node.formula) {
        return generateCode(HyperFormulaLibrary, node.formula, fields);
    } else {
        throw "Invalid formula"
    }
}

const getterSetterCase = (fieldName) => {
    return `${fieldName.charAt(0).toUpperCase()}${fieldName.substring(1)}`
}

export default (HyperFormulaLibrary, fields) => `class DomainObject implements JsonSerializable
{
${fields
    .map(field => {
        return `\tprivate $${field.name}; // ${field.commentForName}`;
    })
    .join("\n")
}

${fields
    .filter(field => !!field.readonly)
    .map(field => {
        return `\tpublic function get${getterSetterCase(field.name)}() {\n\t\t// ${field.formula}\n\t\treturn ${parseFormula(HyperFormulaLibrary, field.formula, fields)};\n\t}\n`;
    })
    .join("\n")
}
${fields
    .filter(field => !field.readonly)
    .map(field => {
        const param = `$${field.name}In`;
        return `\tpublic function get${getterSetterCase(field.name)}() {\n\t\treturn $this->${field.name};\n\t}\n\n\tpublic function set${getterSetterCase(field.name)}(${param}) {\n\t\t$this->${field.name} = ${param};\n\t}\n`;
    })
    .join("\n")
}}

\tpublic function jsonSerialize(): mixed {\n}\n
`;


// return array(
//     "voltage" => $this->getVoltage(),
//     "current" => $this->getCurrent(),
//     "resistance" => $this->getResistance()
//   );
// }