class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;

    hash(key){
        let stringSum = 0
        for(let char of String(key)){
            console.log(char.charCodeAt(0))
            stringSum += char.charCodeAt(0)
        }

        return stringSum % this.#capacity;
    }

}

const map = new HashMap()

let result = map.hash('bac')

console.log(result);
