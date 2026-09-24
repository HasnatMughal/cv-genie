import { PrismaClient } from "@prisma/client"
import { writeFileSync } from "fs"

const prisma = new PrismaClient()

async function main() {
    const codes = await prisma.radeemCode.findMany({
        where: { isUsed: false },
        select: { code: true },
    })
    const csvContent = "code\n" + codes.map((c) => c.code).join('\n')
     writeFileSync("redeem-codes.csv", csvContent)


    console.log(`Exported ${codes.length} codes to redeem-codes.csv`)

}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())