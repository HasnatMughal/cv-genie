import { PrismaClient } from "@prisma/client"
import { error } from "console"
import { randomBytes } from "crypto"

const prisma = new PrismaClient()

 const generateCode = () => {
        const random = randomBytes(4).toString('hex').toUpperCase()
        return `CVGENIE-${random}`
    }

async function main() {
    const NUMBER_OF_CODES = 150

    const codes = Array.from({length:NUMBER_OF_CODES}, () => ({
        code: generateCode()
    }))

    await prisma.radeemCode.createMany({
        data:codes,
        skipDuplicates: true
    })

      console.log(`${NUMBER_OF_CODES} codes generated successfully!`, codes)
}

main()
.catch((e) => console.log(e))
.finally(() => prisma.$disconnect())
