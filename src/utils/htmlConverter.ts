import showdown from "showdown";
import { mdHighlighter } from "./codeHighlight";

const htmlConverter = (md: any) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(mdHighlighter(md))
}

export default htmlConverter