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