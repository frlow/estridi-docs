# Estridi tutorial

## Jam file

## Config file
create config file
```json5
// estridi.json
{
  "token": "your_access_token_here",
  "fileId": "figjam_board_file_id",
  "mode": "playwright"
}
```

## Create root node
In figma add <code>root:tutorial</code> to out arrow on start node

## Run estridi binary
```bash
npx estridi
```
After you have run the command successfully you should notice 3 new files
- **someName.spec.ts**
  - This is where you run and debug your tests from. This file will update everytime you run the estridi command
- **someName.handles.ts**
  - This file contains 5 methods:
    - handleSetup: method for setting up for example environment
    - handleStart: method for starting up test
    - handleServiceCall: method for implementing service calls
    - handleAction: method for implementing actions
    - handleTestNode: method for implementing tests
- **scraped.json**

## Install playwright

## Your first test
now it is time to implement your first test. So in
- handleSetup, no need to implement anything here just add, `return {}`
- handleStart, implement `await args.page.goto("/")`
- handleTestNode, implement your first test, make a new `case '':` and hopefully you'll get correct key as a suggestion, then inside implement the test 
```
await expect(args.page.locator('h1:has-text("Hello World!")')).toBeVisible()
```

## Change requirement
- Change the title requirement in FigJam from "Hello World!" => "Estridi tutorial"
- Rerun estridi binary
- Rerun your tests and hopefully they will not pass
- Now you'll se that because the requirement has changed, you also need to change the implementation of your test
- Change implementation

## Link first sub-flow
- To link you subflows, in figma add the "Name of subflow" to out arrow on sub flow start node. Like you did for the root node
- Rerun estridi binary

## Link table
- When linking tables we often have a subflow that has a name like this: <code>Display fields: Some Fields</code> or <code>Validate fields: Some Fields</code>
- Then to link you table to the subflow in figma, add ".Name" to top left corner of the table. In this case you would add <code>.Some Fields</code>
- Rerun estridi binary

## Test Table rows
Implement test that checks for input fields with labels attached to them

```javascript
switch(args.key){
    // ...
    case "1:205: Display fields Some Fields": {
      const table = args.getTable("1:663: Some Fields")
      for (const row of table.values) {
        const label = row.Id
        const inputType = row["Input Type"]
        await expect(
            args.page.getByLabel(label).and(
                args.page.locator(`input[type="${inputType}"]`)
            )).toBeVisible()
      }
      break
    }
}
```

## Protect table from requirement changes
```javascript
expect(table.signature).toEqual(`
8877|9739
2420|3556
1134|3076
`)
```

## Actions
- Link actions subflow
- Rerun estridi
- Implement action

```javascript
switch(args.key){
    // ...
  case "12:809: Clear clicked":
    
    break
}
```

Implement corresponding input fields in the html

## Gateways
- Link gateways subflow
- Rerun estridi
- Validate subflow doesn't do anything an can be skipped. 

The handleAction function has access to the gateways object 
that has the gateway options for the current path. 
This can be used to determine the behavior of the action. 

```javascript
switch (args.key) {
      // ...
      case "12:810: Submit clicked":
        if(args.gateways["24:1050: Any validation errors"]==="no"){
          await args.page.getByLabel("Name").fill("Namn Namnsson")
          await args.page.getByLabel("Birthday").fill('2024-06-13')
          await args.page.locator("#submit").click()
        }
        else{
          await args.page.locator("#submit").click()
        }
        break
    }
```

## Mock serviceCall
- Link serviceCalls subflow
- Rerun estridi
- Mock the service call

```javascript
switch (args.key) {
  // ...
  case "25:1172: submit": {
    const gwValue = args.gateways['3895:5989: Error from validate service']
    if (gwValue === 'yes')
      await args.context.route(
              "/submit",
              async (route: Route) => {
                await route.fulfill({
                  status: 400,
                })
              }
      )
    else {
      await args.context.route(
              "/submit",
              async (route: Route) => {
                await route.fulfill({
                  contentType: 'application/json',
                  json: {message: "Well done!"},
                })
              }
      )
    }
    break
  }
}
```

## Concepts demoed
- [x] Estridi config file
- [x] Connecting root nodes
- [x] Running estridi binary
- [x] Setup
- [x] Start
- [x] Test
- [x] Changing requirements
- [x] Linking sub-flows
- [x] Including tables
- [x] Table requirements changing
- [x] Testing non-linked sub-flows
- [x] Reading tables
- [x] Action
- [x] Gateways
- [x] ServiceCall

## Advanced
- [ ] Breaking out separate files
- [ ] Variants
- [ ] Filter paths
- [ ] Setup-state
- [ ] Skipping tests
