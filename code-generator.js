function getCellValue(row, col) {
    return `${row},${col}`
}

function generateCode(ast) {
    switch (ast.type) {
        case 'DIV_OP':
            return `${generateCode(ast.left)} / ${generateCode(ast.right)}`;
        case 'TIMES_OP':
            return `${generateCode(ast.left)} * ${generateCode(ast.right)}`;
        case 'PLUS_OP':
            return `${generateCode(ast.left)} + ${generateCode(ast.right)}`;
        case 'MINUS_OP':
            return `${generateCode(ast.left)} - ${generateCode(ast.right)}`;
        case 'CELL_REFERENCE':
            return getCellValue(ast.reference.row, ast.reference.col); // Assumes a function getCellValue(row, col)
        case 'NUMBER':
            return ast.value.toString();
        case 'PARENTHESES':
            return `(${generateCode(ast.expression)})`;
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

const jsCode = generateCode(ast);
console.log(jsCode);


export default fields => `class DomainObject
{
${fields
    .map(field => {
        return `\tprivate ${field.name}; // ${field.commentForName}`;
    })
    .join("\n")
}

${fields
    .filter(field => !!field.readonly)
    .map(field => {
        return `\tprivate function get_${field.name}() {\n\t\t// =${field.formula}\n\t\treturn ${field.formula}\n\t};\n`;
    })
    .join("\n")
}
${fields
    .filter(field => !field.readonly)
    .map(field => {
        const param = `$${field.name}In`;
        return `\tprivate function set_${field.name}(${param}) {\n\t\t$this->${field.name} = ${param};\n\t};\n`;
    })
    .join("\n")
}}
`;
