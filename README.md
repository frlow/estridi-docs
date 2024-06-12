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

## Install playwright

## Your first test
- setup (return {})
- start (await args.page.goto("/"))
- test (await expect(args.page.locator('h1:has-text("Hello World!")')).toBeVisible())

## Concepts demoed
- [x] Estridi config file
- [x] Connecting root nodes
- [x] Running estridi binary
- [x] Setup
- [ ] Setup-state
- [ ] ServiceCall
- [x] Start
- [ ] Action
- [x] Test
- [ ] Gateways
- [ ] Variants
- [ ] Breaking out separate files
