export default fields => `class DomainObject
{
${fields
    .map(field => {
        return `\tprivate ${field.name};`;
    })
    .join("\n")
}

${fields
    .filter(field => !!field.readonly)
    .map(field => {
        return `\tprivate function calculate_${field.name}() {\n\t};\n`;
    })
    .join("\n")
}

${fields
    .filter(field => !!field.readonly)
    .map(field => {
        return `\tprivate function get_${field.name}() {\n\t};\n`;
    })
    .join("\n")
}

${fields
    .filter(field => !field.readonly)
    .map(field => {
        return `\tprivate function set_${field.name}() {\n \t\t// trigger here \n\t};\n`;
    })
    .join("\n")
}
}
`;