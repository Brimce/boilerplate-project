export function AddTransition(style = {}, animation = '') {
    /// <summary>
    /// renvoie un nouveau style contenant la transition décrite par animation
    /// </summary>
    /// <param name="style = {}" type="type"></param>
    /// <param name="animation = ''" type="type"></param>
    
    if (animation == '')
        return style;

    return {
        ...style, 
        transition: animation,
        MozTransition: animation,
        OTransition: animation,
        WebKittransition: animation,
        msTransition: animation
    };
}