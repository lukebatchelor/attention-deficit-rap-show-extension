// This is the code that is injected by the addon
(() => {
    console.log('Starting Attention Deficit Rap Disorder Helper content-script!');
    const MIN_FONT_SIZE = 2;  // The actual minimum font size in rem
    const MAX_FONT_SIZE = 8;  // The actual maximum font size in rem
    const DEFAULT_FONT_SIZE_INCR = 0;  // The font size _increment_ that we are adding based on the number of clicks (between 0 and (MAX_FONT_SIZE - MIN_FONT_SIZE))
    const FONT_SIZE_INCR_VAR = '__ardp_fontSize';
    
    if (!window[FONT_SIZE_INCR_VAR]) window[FONT_SIZE_INCR_VAR] = DEFAULT_FONT_SIZE_INCR;

    const changeFontSize = () => {
        console.log('Changing font size')
        const curFontSizeInc =  window[FONT_SIZE_INCR_VAR] || DEFAULT_FONT_SIZE_INCR;
        const newFontSizeInc =  ( curFontSizeInc + 1) % (MAX_FONT_SIZE - MIN_FONT_SIZE);
        const actualFontSize = MIN_FONT_SIZE + newFontSizeInc;
        window[FONT_SIZE_INCR_VAR] = newFontSizeInc;

        const existingEl = document.querySelector('style[data-adrp-addon="true"]');
        if (existingEl) existingEl.remove();
        
        const newStyleEl = document.createElement('style');
        newStyleEl.setAttribute('type', 'text/css');
        newStyleEl.setAttribute('data-adrp-addon', 'true');
        // first rule matches the choices when viewing all, the second matches when viewing a single one
        const newCssStr = `button[aria-label="Show single question"]>span[font-size="175"],[font-size="250"] { font-size: ${actualFontSize}rem; }`;
        newStyleEl.textContent = newCssStr;
        document.head.appendChild(newStyleEl);
        
        console.log(`Font size (0-${MAX_FONT_SIZE - MIN_FONT_SIZE}): ${newFontSizeInc}`)
    }
    document.body.addEventListener('click', (e) => {
        if (e.shiftKey) {
            changeFontSize()
        }
    });
})()