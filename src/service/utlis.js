
export const clone = (obj)=>{
	// Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    
    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");

}


export const s2m = (s)=>{

    function addPrix(num){
        return (Array(2).join(0) + num).slice(-2);
    }

    let sencond = addPrix(Math.floor(s)%60);
    let min     = addPrix(Math.floor(s/60));
    return min + ':' + sencond;
}

export const m2s = (m)=>{
    let min    = Number(m.split(':')[0]);
    let second = Number(m.split(':')[1].split('.')[0]);
    let ms     = Number(m.split(':')[1].split('.')[1]);

    let result = min*60 + second + ms/1000;

    return result;
}