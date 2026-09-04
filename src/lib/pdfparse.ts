import { arrayBuffer } from "stream/consumers"
import { PDFParse} from 'pdf-parse'

export default async function pdfToText(resumeUrl:string){
    const response = await fetch(resumeUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer =  Buffer.from(arrayBuffer)

    const parser = new PDFParse({data: buffer})
    const result = await parser.getText()
    await parser.destroy()

    return result.text
}