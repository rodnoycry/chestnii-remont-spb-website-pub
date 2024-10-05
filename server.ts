const { spawn } = require("child_process")

const bun = spawn("bun", ["start"])

bun.stdout.on("data", (data: string) => {
    console.log(`stdout: ${data}`)
})

bun.stderr.on("data", (data: string) => {
    console.error(`stderr: ${data}`)
})

bun.on("close", (code: string) => {
    console.log(`child process exited with code ${code}`)
})
