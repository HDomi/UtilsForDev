import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

  export const highlighter = (code: any, codeType: any) => {
    const changeMd = hljs.highlight(code, {language: codeType}).value;
    return changeMd;
  }
  export const mdHighlighter = (md: any) => {
    const splittedMd = md.split('\n```');
    const splittedMdLength = splittedMd.length;
    const highlightSplittedMd = [];
    if(splittedMdLength === 1) return md;

    for(let i = 0; i < splittedMdLength / 2; i++) {
        const index = i * 2;

        if(index + 1 === splittedMdLength) { 
          highlightSplittedMd.push(splittedMd[splittedMdLength - 1]);
          break;
        }
        const codeArea = splittedMd[index+1];
        const codeStartIndex = codeArea.indexOf('\n');
        const codeType = codeArea.substr(0, codeStartIndex).trim();
        const code = codeArea.substr(codeStartIndex).trim();
        const highlightCode= codeType ? highlighter(code, codeType) : code;
        
        highlightSplittedMd.push(splittedMd[index]+ '\n');
        highlightSplittedMd.push(`<pre><code${codeType ? ` class="language-${codeType}"` : ''}>`);
        highlightSplittedMd.push(highlightCode);
        highlightSplittedMd.push(`</code></pre>`);
    }
    
    
  
    return highlightSplittedMd.join('');
  }