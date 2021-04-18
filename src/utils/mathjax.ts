import "mathjax/es5/tex-svg-full";
export function mathjax_load() {
    if (!window.MathJax.config.tex.inlineMath) {
        window.MathJax.config.tex.inlineMath = [
            ["$", "$"],
            ["\\(", "\\)"],
        ];
        window.MathJax.startup.getComponents();
    }
}
export function mathjax_typeset() {
    window.MathJax.typeset();
}