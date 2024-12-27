[excel-to-domain-object](https://dirkarnez.github.io/excel-to-domain-object)
============================================================================
### Using
- hyperformula
  - [hyperformula/test/parser/parser.spec.ts at master · handsontable/hyperformula](https://github.com/handsontable/hyperformula/blob/master/test/parser/parser.spec.ts)
  - [handsontable/hyperformula-demos](https://github.com/handsontable/hyperformula-demos)
    - [hyperformula-demos/svelte-demo at develop · handsontable/hyperformula-demos](https://github.com/handsontable/hyperformula-demos/tree/develop/svelte-demo)

### Notes
- Sheet name must be in English (Excel will automatically update related formulae referencing the renamed sheets)

### TODOs
- [ ] svelte form generation (`$state()` for form)
  - [dirkarnez/svelte-5-async-form](https://github.com/dirkarnez/svelte-5-async-form)
- [ ] function
  - [ ] `VLOOKUP(value_to_equal, ranges, column of data to return related to ranges)`
  - [ ] `IFERROR(value, value_if_error)`
  - [ ] `COLUMN()` get current column the current cell locates
  - [ ] `FALSE()` set cell to logical false
  - [ ] `LEFT` and `RIGHT`
  - [ ] `IFNA()`
- [ ] Range to fields array
- [ ] Table references
- [ ] PHP api JSON serializable
### Tools
- [hyperformula-parser-playground](https://dirkarnez.github.io/hyperformula-parser-playground/)
